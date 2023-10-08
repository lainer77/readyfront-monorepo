import UAParser from 'ua-parser-js';

export const isValidCookie = (cookieValue?: string): boolean => {
    // 쿠키 값이 문자열이 아니거나 비어있으면 올바르지 않음
    if (typeof cookieValue !== 'string' || cookieValue.trim() === '') {
        return false;
    }

    // 각 쿠키는 세미콜론으로 구분되므로 세미콜론을 기준으로 분리하여 배열로 만듦
    const cookies = cookieValue.split(';');

    // 각 쿠키가 올바른 형식인지 검사
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');

        // key=value 형태가 아니면 올바르지 않음
        if (!key || !value) {
            return false;
        }
    }

    // 모든 쿠키가 올바른 형식이면 true 반환
    return true;
};

export const getUserAgentInfo = (userAgentString: string) => {
    const userAgent = new UAParser(userAgentString);
    return userAgent;
};
