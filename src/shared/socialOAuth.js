// KAKAO OAuth
const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/kakao/callback`;

// NAVER OAuth
const GOOGLE_REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/google/callback`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;