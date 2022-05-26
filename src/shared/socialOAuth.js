// KAKAO OAuth
const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/kakao/callback`;

// NAVER OAuth
const NAVER_REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/naver/callback`;

const randomString = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 6;
    let randomstring = "";
    for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
};

const newState = randomString();

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${newState}`;