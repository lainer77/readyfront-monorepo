import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import serverless from 'serverless-http';
import { fileURLToPath } from 'url';

import { catPrompt2 as prompt } from './prompt.js';
const systemPrompt = prompt.prompt
    .replace(/\$name/g, prompt.profile.name)
    .replace(/\$age/g, prompt.profile.age)
    .replace(/\$gender/g, prompt.profile.gender)
    .replace(/\$master/g, prompt.profile.master);

dotenv.config();

const app = express();
const PORT = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ALLOWED_HOSTS = [
    process.env.ALLOWED_HOST || 'localhost:3000',
    'grymj7540j.execute-api.ap-northeast-2.amazonaws.com',
];

// __dirname을 대체하기 위한 코드
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// express에 public 디렉토리를 정적 호스팅 디렉토리로 추가합니다.
app.use(express.static(path.join(__dirname, 'public')));

// CORS 설정 추가
app.use((req, res, next) => {
    const host = req.headers['x-forwarded-host'] || req.get('host');

    if (!ALLOWED_HOSTS.includes(host)) {
        return res.status(403).send('Forbidden');
    }

    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function messageFilter(message) {
    if (message.match(`${prompt.profile.master}:`)) return false;
    if (!message.match('기분:')) return false;
    if (!message.match('[이전 대화 내용]')) return false;

    return true;
}
async function fetchAIResponse(req, res, count = 0) {
    const systemRole = {
        content: systemPrompt, // 사용자가 입력한 메시지
        role: 'system', // 메시지 역할을 user로 설정
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            body: JSON.stringify({
                frequency_penalty: 1, // 일반적으로 나오지 않는 단어를 억제하는 정도
                max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
                messages: [
                    ...req.body.messages,
                    systemRole,
                    {
                        content: req.body.prompt, // 사용자가 입력한 메시지
                        role: 'user', // 메시지 역할을 user로 설정
                    },
                ],
                model: 'gpt-4-1106-preview', // 사용할 AI 모델
                presence_penalty: 1, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
                stop: ['Human'], // 생성된 텍스트에서 종료 구문을 설정
                temperature: 1.1, // 모델의 출력 다양성

                top_p: 1, // 토큰 샘플링 확률을 설정
            }),
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const data = await response.json();
        let content = data.choices[0].message.content;
        if (!content.startsWith(`${prompt.profile.name}:`))
            content = `${prompt.profile.name}: content`;
        if (count < 5 && !messageFilter(content)) fetchAIResponse(req, res, count + 1);
        else res.json({ content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
app.post('/api/chatbot', async (req, res) => {
    fetchAIResponse(req, res);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export const handler = serverless(app);
