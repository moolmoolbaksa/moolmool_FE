import axios from 'axios';

axios.defaults.withCredentials = true; // ??

const api = axios.create({
  	baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

// api.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export const userAPI = {

    // 로그인 체크
    loginCheck: () => api.get(`user/check`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        }
    }),

    // 카카오 로그인
    kakaoLogin: (code) => api.get(`/user/kakao?code=${code}`),
    
    // 최초 로그인 정보 수집
    firstUser: (address) => api.put(`/user/info`, {address}, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        }
    }),

    // 마이페이지 정보 요청
    getMyInfo: () => api.get(`/user/mypage`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        }
    }),

    // 마이페이지(프로필) 수정
    updateMyInfo: (formData) => api.post(`/user/mypage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
        },
    }),

    // 다른 유저 보따리 정보 요청
    getOtherUserInfo: (userId) => api.get(`/user/store/${userId}`),
};

export const ItemAPI = {
    // 메인 아이템 조회(로그인 유저)
    getItems: (category, page) => api.get(`/items/page=${page}?category=${category}`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),

    // 메인 아이템 조회(비로그인 유저)
    getItemsWitoutLogin: (category, page) => api.get(`/items/page=${page}?category=${category}`),

    // 교환 물품 등록
    registerItem: Formitem =>
        api.post('/items', Formitem, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),

    //교환내역 불러오기
    getMyhistory: () =>
        api.get('/user/barters', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    // 교환 물품 수정
    editItem: (itemId,Formitem) =>
    api.put(`/item/${itemId}`, Formitem, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${localStorage.getItem('token')}`,
        },
    }), 
};

export const ChatAPI = {
    // 방 목록 가져오기
    getChatRoom: () =>
        api.get('/chat/rooms', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),

    // 방 추가하기
    addChatRoom: userid =>
        api.post(
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
        api.get(`/chat/room/${roomId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    // 이전 메세지 가져오기
    getMessage: roomId =>
        api.get(`/chat/room/${roomId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //채팅방 나가기
    exitRoom: roomId =>
        api.get(`chat/room/exit/${roomId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //채팅방 유저차단
    banUser: userId =>
    api.get(`chat/room/banned/${userId}`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),
    //차단한 유저 확인
    getBanUser: userId =>
    api.get('/chat/room/banned', {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),
    //차단한 유저 해제
    releaseUser: userId =>
    api.put(`/chat/room/banned/${userId}`,{}, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    }),

    
};
// /api/trade/decision?barterId=거래내역아이디
export const HistoryAPI = {
    //교환내역 불러오기
    getMyhistory: () =>
        api.get('/user/barters', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //거래확인 불러오기
    getTradeCheck: barterId =>
        api.get(`/items/trade/decision?barterId=${barterId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //교환 수락
    acceptTrade: barterid =>
        api.put(
            `/items/trade/decision?barterId=${barterid}`,
            {},
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
    //교환 거절
    rejectTrade: barterid =>
        api.delete(`/items/trade/decision?barterId=${barterid}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    //교환 완료하기
    completeTrade: barterid =>
        api.put(
            `/user/barters/handshake?barterId=${barterid}`,
            {},
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
    //교환 취소하기
    cancelTrade: barterid =>
        api.delete(`/user/barters?barterId=${barterid}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        }),
    gobackCompleteTrade: barterid =>
        api.put(
            `/user/barters/cancel?barterId=${barterid}`,
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
            '/user/score',
            { barterId: barterId, userId: userId, score: score },
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            },
        ),
};
