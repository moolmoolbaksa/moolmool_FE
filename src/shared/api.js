import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;


// http://13.125.220.67:8080
const api = axios.create({
  baseURL: "http://13.124.0.71",
});

const chatapi = axios.create({
	baseURL: "http://13.124.0.71",
  });

export const UserAPI = {
	login: (formLogin) => api.post("/user/login", formLogin),
	
	signup: (id, nickname, pw, pwcheck) =>
		api.post("/api/register", {
		username: id,
		nickName: nickname,
		password: pw,
		passwordCheck: pwcheck,
		}),

	idcheck: (email) => api.post("api/idCheck", { username: email }),

	nicknamecheck: (nickname) => api.post("api/nickName", { nickName: nickname }),

	islogin: () =>
		api.get("/api/isLogin", {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),

	getAllUser: () =>
		api.get("/api/users", {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),

	editimage: (file) =>
		api.put("api/userImage", file, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),

  //
};
export const ItemAPI = {

  getItems: (category_string) => api.get(`${category_string}`, {
    headers: {
      "Authorization": `${localStorage.getItem('token')}`,
    },
  }),
  getItemswitoutlogin: (category_string) => api.get(`${category_string}`),

  registerItem: (Formitem) => api.post('/api/items',Formitem, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `${localStorage.getItem('token')}`,
    },
  }),
  getMyhistory: ()=>api.get('/api/myhistory',{
    headers: {
      "Authorization": `${localStorage.getItem('token')}`,
    },
  }),
  
}

export const ChatAPI = {
	// 방 목록 가져오기
	getChatRoom: () =>
		chatapi.get("/chat/rooms", {
		headers: {
			"Authorization": `${localStorage.getItem('token')}`,
		},
		}),

	// 방 추가하기
	addChatRoom: (userid) => chatapi.post("/chat/room", {userId:userid}, {
		headers: {
			"Authorization":  `${localStorage.getItem('token')}`,
		},
		})
		,

	// 방 접속하기
	enterRoom: (roomId) =>
	chatapi.get(`/chat/room/${roomId}`, {
		headers: {
			Authorization:  `${localStorage.getItem('token')}`,
		},
		}),

	// 이전 메세지 가져오기
	getMessage: (roomId) =>
	chatapi.get(`/chat/room/${roomId}?page=`, {
		headers: {
			Authorization: `${localStorage.getItem("token")}`,
		},
		}),
	
	exitRoom: (roomId) =>
		chatapi.get(`chat/room/${roomId}/exit`, {
			headers: {
				Authorization: `${localStorage.getItem("token")}`,
			},
			}),
};
