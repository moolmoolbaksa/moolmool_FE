import axios from 'axios';
import { persistor } from '../index';

export const instance = axios.create({
  	baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    withCredentials: true,
});

if(localStorage.getItem("accessToken")) {
    instance.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken');
};

let isRefreshing = false;
let refreshSubscribers = [];

const addRefreshSubscriber = (callback) => {
	refreshSubscribers.push(callback);
};

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response.status !== 401) {
                return new Promise((_, reject) => {
                    reject(error);
                });
            };

            const originalRequest = error.config;

            if(originalRequest.url === '/user/refresh'){
                console.log('...')
                localStorage.clear();
                sessionStorage.clear();
                persistor.purge();
                window.location.href = "/login";
                return;
            };
            
            const retryOriginalRequest = new Promise((resolve) => {
                addRefreshSubscriber((accessToken) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = 'BEARER ' + accessToken;
                        resolve(instance(originalRequest));
                    }
                });
            });
            
            if (!isRefreshing) {
                isRefreshing = true;
                const response = await instance.get('/user/refresh', {headers: {Authorization: localStorage.getItem('refreshToken')}});
                const newAccessToken = response.headers.authorization;
                localStorage.setItem('accessToken', `BEARER ${newAccessToken}`);
                isRefreshing = false;
                instance.defaults.headers.common['Authorization'] = `BEARER ${newAccessToken}`;
                refreshSubscribers.map((callback) => callback(newAccessToken));
                refreshSubscribers = [];
            };
            return retryOriginalRequest; //pending
        };
    }
);

export const userAPI = {
    // 로그인 체크
    loginCheck: () => instance.get(`user/check`),

    // 카카오 로그인
    kakaoLogin: (code) => instance.get(`/user/kakao?code=${code}`),
    
    // 구글 로그인
    googleLogin: (code) => instance.get(`/user/google?code=${code}`),
    
    // 최초 로그인 정보 수집
    firstUser: (address) => instance.put(`/user/info`, {address}),

    // 마이페이지 정보 요청
    getMyInfo: () => instance.get(`/user/mypage`),

    // 마이페이지(프로필) 수정
    updateMyInfo: (formData) => instance.post(`/user/mypage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 다른 유저 보따리 정보 요청
    getOtherUserInfo: (userId) => instance.get(`/user/store/${userId}`),
};

export const ItemAPI = {
    // 메인 아이템 조회(로그인 유저)
    getItems: (category, page) => instance.get(`/items?page=${page}&category=${category}`),

    // 핫딜 아이템 조회
    getHotDeal: () => instance.get(`/items/star`),

    // 아이템 등록
    registerItem: Formitem => instance.post('/items', Formitem, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 아이템 상세 조회
    getDetail: (itemId) => instance.get(`/items/details/${itemId}`),

    // 아이템 삭제
    deleteItem: (itemId) => instance.delete(`/item/${itemId}`),

    // 아이템 좋아요
    setScrabItem: (itemId) => instance.post(`/item/scrabs/${itemId}`, {}),

    // 좋아요 아이템 조회
    getScrabList: (itemId) => instance.get(`/user/mypage/scrabs`),

    // 아이템 수정
    editItem: (itemId,Formitem) => instance.put(`/item/${itemId}`, Formitem, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    }), 

    // 아이템 신고
    setReportItem: (itemId) => instance.put(`/item/report?itemId=${itemId}`, {}),

    // 아이템 검색
    getSearchItem: (search) => instance.get(`/item?keyword=${search}`),
    
    //교환내역 불러오기
    getMyhistory: () => instance.get('/user/barters'),
};

export const TradeAPI = {
    // 거래 아이템 조회
    getTradeItem: (itemId, userId) => instance.get(`/items/trade?itemId=${itemId}&userId=${userId}`),

    // 거래 신청
    setTrade: (userId, itemId, myItemIds) => instance.post(`/items/trade`, {userId, itemId, myItemIds}),
}

export const ChatAPI = {
    // 방 목록 가져오기
    getChatRoom: () => instance.get('/chat/rooms'),

    // 방 추가하기
    addChatRoom: (userid) => instance.post('/chat/room', { userId: userid }),

    // 방 접속하기
    enterRoom: (roomId) => instance.get(`/chat/room/${roomId}`),

    // 이전 메세지 가져오기
    getMessage: (roomId) => instance.get(`/chat/room/${roomId}`),

    //채팅방 나가기
    exitRoom: (roomId) => instance.get(`chat/room/exit/${roomId}`),
    
    //채팅방 유저차단
    banUser: (userId) => instance.get(`chat/room/banned/${userId}`),

    //차단한 유저 확인
    getBanUser: (userId) => instance.get('/chat/room/banned'),

    //차단한 유저 해제
    releaseUser: (userId) => instance.put(`/chat/room/banned/${userId}`, {}),    
};


export const HistoryAPI = {
    //교환내역 불러오기
    getMyhistory: () => instance.get('/user/barters'),

    //거래확인 불러오기
    getTradeCheck: (barterId) => instance.get(`/items/trade/decision?barterId=${barterId}`),

    //교환 수락
    acceptTrade: (barterid) => instance.put(`/items/trade/decision?barterId=${barterid}`, {}),

    //교환 거절
    rejectTrade: (barterid) => instance.delete(`/items/trade/decision?barterId=${barterid}`),

    //교환 완료하기
    completeTrade: (barterid) => instance.put(`/user/barters/handshake?barterId=${barterid}`, {}),

    //교환 취소하기
    cancelTrade: (barterid) => instance.delete(`/user/barters?barterId=${barterid}`),

    gobackCompleteTrade: (barterid) => instance.put(`/user/barters/cancel?barterId=${barterid}`, {}),

    //평가하기
    Rating: (barterId, userId, score) => instance.put( '/user/score', { barterId, userId, score }),
};

export const NotiApi = {
    // 전체 알림내역 불러오기
    getNoti: () => instance.get(`/user/notifications`),
    
    // 회원가입 알림
    getWelcomNoti: (notificationId) => instance.get(`/user/notification/signup?notificationId=${notificationId}`),

    // 거래 알림
    getBarterNoti: (changeId, notificationId) => 
        instance.get(`/user/notification/decision?barterId=${changeId}&notificationId=${notificationId}`),
    
    // 채팅 알림
    getChatNoti: (changeId, notificationId) => 
        instance.get(`/user/notification/chat?roomId=${changeId}&notificationId=${notificationId}`),

    // 평가 알림
    getScoreNoti: (changeId, notificationId) => 
        instance.get(`/user/notification/score?barterId=${changeId}&notificationId${notificationId}`),
};

