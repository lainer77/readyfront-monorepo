// 채팅 메시지를 표시할 DOM
const chatMessages = document.querySelector('#chat-messages');
const image = document.querySelector('#image');
// 사용자 입력 필드
const userInput = document.querySelector('#user-input input');
// 전송 버튼
const sendButton = document.querySelector('#user-input button');

let historyList = [];

const catsImageUrl = 'https://cdn.readyfront.co.kr/img/cats/고양이_';
// 기쁨, 분노, 슬픔, 즐거움, 좋아함, 싫어함, 욕망, 편안, 귀찮음, 우울함, 행복함, 의욕넘침
const catsData = {
    귀찮음: '09',
    기쁨: '01',
    분노: '02',
    슬픔: '03',
    싫어함: '06',
    욕망: '07',
    우울함: '10',
    의욕넘침: '12',
    좋아함: '05',
    즐거움: '04',
    편안: '08',
    행복함: '11',
};

function addMessage(message, sender) {
    // 새로운 div 생성
    const messageElement = document.createElement('pre');
    // 생성된 요소에 클래스 추가
    messageElement.className = 'message';

    // 채팅 메시지 목록에 새로운 메시지 추가
    if (sender) messageElement.textContent = `${sender}: ${message}`;
    else messageElement.textContent = message;
    chatMessages.prepend(messageElement);
}
function imageChange(status) {
    console.log(`imageChange: '${status}', '${catsData[status]}'`);
    if (catsData[status]) image.src = catsImageUrl + catsData[status] + '.png';
}
function messageFilter(message) {
    if (message.match('집사:')) return false;
    if (!message.startsWith('나비:')) return false;
    if (!message.match('기분:')) return false;
    if (!message.match('[이전 대화 내용]')) return false;

    return true;
}
// ChatGPT API 요청
async function fetchAIResponse(prompt, count = 0) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        body: JSON.stringify({
            messages: [
                ...historyList,
                systemRole,
                {
                    content: prompt, // 사용자가 입력한 메시지
                    role: 'user', // 메시지 역할을 user로 설정
                },
            ],
        }),
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };
    // API 요청후 응답 처리
    try {
        const response = await fetch('/api/chatbot', requestOptions);
        const data = await response.json();
        let aiResponse = data.choices[0].message.content;
        if (!aiResponse.startsWith('나비:')) aiResponse = '나비: ' + aiResponse;
        if (count < 5 && !messageFilter(aiResponse))
            aiResponse = await fetchAIResponse(prompt, count + 1);
        historyList = historyList.concat([
            {
                content: prompt, // 사용자가 입력한 메시지
                role: 'user', // 메시지 역할을 user로 설정
            },
            {
                content: aiResponse,
                role: 'assistant',
            },
        ]);
        if (historyList.length >= 15) {
            historyList.shift();
            historyList.shift();
        }
        return aiResponse;
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}

let doubleCheck = false;
// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener('click', async () => {
    if (doubleCheck) {
        userInput.value = '';
        return;
    }
    doubleCheck = true;
    // 사용자가 입력한 메시지
    const inputText = userInput.value.trim();

    // 메시지가 비어있으면 리턴
    if (inputText.length === 0) return;
    // 사용자 메시지 화면에 추가
    addMessage(inputText, '집사');
    userInput.value = '';
    userInput.disabled = true;
    // 로딩 아이콘 표시
    document.getElementById('click-icon').style.display = 'none';
    document.getElementById('loading-icon').style.display = 'inline-block';

    //ChatGPT API 요청후 답변을 화면에 추가
    const aiResponse = await fetchAIResponse(`집사: ${inputText}`);
    // 로딩 아이콘 숨김
    document.getElementById('click-icon').style.display = 'inline-block';
    document.getElementById('loading-icon').style.display = 'none';
    userInput.disabled = false;
    userInput.focus();

    history += `\n집사: ${inputText}\n${aiResponse}`;
    // history += aiResponse;
    const status = aiResponse.split('기분:')[1];
    if (status) imageChange(status.trim());
    addMessage(aiResponse.split('기분:')[0]);
    doubleCheck = false;
});
// 사용자 입력 필드에서 Enter 키 이벤트를 처리
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
userInput.value = '안녕! 나비야!';
sendButton.click();
