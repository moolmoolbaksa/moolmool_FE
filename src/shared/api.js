import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

const token = localStorage.getItem('token');

const api = axios.create({
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
  registerItem: (Formitem) => api.post('/api/items',Formitem, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `${localStorage.getItem('token')}`,
    },
  })
  
}

export const ChatAPI = {
	// 방 목록 가져오기
	getChatRoom: () =>
		api.get("/api/chat/rooms", {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),

	// 방 추가하기
	addChatRoom: (room) =>
		api.post("/api/chat/rooms", room, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),

	// 방 접속하기
	enterRoom: (roomId) =>
		api.get(`/api/chat/rooms/${roomId}`, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),

	// 유저 초대하기
	inviteUser: (roomid, username) =>
		api.post(
		`/api/chat/invite`,
		{ username: username, roomId: roomid },
		{
			headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		}
		),

	// 이전 메세지 가져오기
	getMessage: (roomId) =>
		api.get(`/api/chat/rooms/${roomId}/messages`, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
		}),
};
