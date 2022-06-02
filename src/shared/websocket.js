import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
export const client = Stomp.over(sock);