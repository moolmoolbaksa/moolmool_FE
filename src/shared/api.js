import axios from 'axios';

axios.defaults.withCredentials = true;

// https://13.125.220.67:8080 //이승재
// "http://13.124.0.71", //황석준
// 13.125.220.67:8080 //엄성훈
// ${process.env.REACT_APP_SERVER_URL}

const api = axios.create({
  	baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

const chatapi = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const ItemAPI = {
    //메인 아이템조회
    getItems: category_string =>
        api.get(`${category_string}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),

    // 메인 로그인 없이 아이템 조회
    getItemswitoutlogin: category_string => api.get(`${category_string}`),

    // 교환 물품 등록
    registerItem: Formitem =>
        api.post('/api/items', Formitem, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),

    //교환내역 불러오기
    getMyhistory: () =>
        api.get('/api/myhistory', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    // 교환 물품 수정
    editItem: (itemId,Formitem) =>
    api.put(`/api/items/${itemId}`, Formitem, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${localStorage.getItem('token')}`,
        },
    }), 
};

export const ChatAPI = {
    // 방 목록 가져오기
    getChatRoom: () =>
        chatapi.get('/chat/rooms', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),

    // 방 추가하기
    addChatRoom: userid =>
        chatapi.post(
            '/chat/room',
            { userId: userid },
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
    // 방 접속하기
    enterRoom: roomId =>
        chatapi.get(`/chat/room/${roomId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    // 이전 메세지 가져오기
    getMessage: roomId =>
        chatapi.get(`/chat/room/${roomId}?page=`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //채팅방 나가기
    exitRoom: roomId =>
        chatapi.get(`chat/room/${roomId}/exit`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //채팅방 유저차단
    banUser: userId =>
    chatapi.get(`chat/room/${userId}/banned`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),
    //차단한 유저 확인
    getBanUser: userId =>
    chatapi.get('/chat/room/banned', {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),
    //차단한 유저 해제
    releaseUser: userId =>
    chatapi.put(`/chat/room/${userId}/banned`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),

    
};
// /api/trade/decision?barterId=거래내역아이디
export const HistoryAPI = {
    //교환내역 불러오기
    getMyhistory: () =>
        api.get('/api/myhistory', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //거래확인 불러오기
    getTradeCheck: barterId =>
        api.get(`/api/trade/decision?baterId=${barterId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //교환 수락
    acceptTrade: barterid =>
        api.put(
            `/api/trade/decision?baterId=${barterid}`,
            {},
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
    //교환 거절
    rejectTrade: barterid =>
        api.delete(`/api/trade/decision?baterId=${barterid}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //교환 완료하기
    completeTrade: barterid =>
        api.put(
            `/api/myhistory/handshake?barterId=${barterid}`,
            {},
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
    //교환 취소하기
    cancelTrade: barterid =>
        api.delete(`/api/myhistory?barterId=${barterid}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    gobackCompleteTrade: barterid =>
        api.put(
            `/api/myhistory/cancel?barterId=${barterid}`,
            {},
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
    //평가하기
    Rating: (barterId, userId, score) =>
        api.put(
            '/api/score',
            { barterId: barterId, userId: userId, score: score },
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
};
