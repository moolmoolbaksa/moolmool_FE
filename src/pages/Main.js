import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Image, Grid, Text } from '../elements/index';
import Card from '../components/Main/Card'
import TabBar from '../components/TabBar';
import LoginModal from '../components/modal/LoginModal';
import Loading from '../components/shared/Loading';
import { ReactComponent as HambergerIcon } from '../images/햄버거.svg';
import { ReactComponent as NotiIcon } from '../images/종.svg';
import { ReactComponent as SearchIcon } from '../images/돋보기.svg';

import { ItemAPI,ChatAPI } from '../shared/api';
import { setRoomlist } from '../redux/modules/chat';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { setLoading } from '../redux/modules/user';
import { setUnreadNoti } from '../redux/modules/notification';
import { setAlertModal } from '../redux/modules/modal';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import HotDeal from '../components/Main/HotDeal';


const Main = (props) => {
	const dispatch = useDispatch();
	const is_token = localStorage.getItem("token");
	
	const userId = useSelector(state => state.user.user_info.userId);
	const is_loading = useSelector(state => state.user.is_loading);
	const {nickname, profile} = useSelector(state => state.user.user_info);
	const unread_noti = useSelector(state => state.notification.unread_noti);

	const [filter,setfilter] = useState('전체');
	const [openFilter,setopenfilter] = useState(false);
	const [cardList, setCardlist]=useState([]);
	const sock = new SockJS('https://langho968.shop/wss-stomp');
	const client = Stomp.over(sock);
  	
	useEffect(() => {
		if(is_token){
			client.connect({"Authorization": localStorage.getItem('token')}, () => {
				// client.subscribe(`/user/sub/notification/`,() => {},{"Authorization" : localStorage.getItem('token')});
				client.subscribe(`/sub/notification/${userId}`, (data) => {
					console.log(data.body)
					const unread_noti = JSON.parse(data.body);
					dispatch(setUnreadNoti(unread_noti.NotificationCnt));
				}, {"Authorization" : localStorage.getItem('token')})
				client.send(`/pub/notification`, {"Authorization" : localStorage.getItem('token')},{});
			});

			return () => {
				client.disconnect();
			};
		};
  	}, [userId]);
	React.useEffect(()=>{
		ChatAPI.getChatRoom()
            .then((res)=>{
                dispatch(setRoomlist(res.data));
                console.log(res.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }, []);
	

  	React.useEffect(()=>{
		let category_string = null;

		if(filter==='전체'){
			category_string = '/items?category';
		} else {
			category_string=`/items?category=${filter}`;
		};

		if(!is_token){
			ItemAPI.getItemswitoutlogin(category_string)
			.then((res)=>{
				setCardlist(res.data);
				dispatch(setLoading(false));
			})
			.catch((error)=>{
				console.log(error);
			})
		} else {
			ItemAPI.getItems(category_string)
			.then((res)=>{
				setCardlist(res.data);
				dispatch(setLoading(false));
			})
			.catch((error)=>{
				console.log(error);
			})
		};
  	}, [openFilter]);

	const Drawers = () => {
		if(openFilter){
			setopenfilter(false);
		} else {
			setopenfilter(true);
		};
	};

    return (
		<>
			<Grid
				height="100%"
			>
				<Grid
					flex
					padding="10px 16px"
				>
					<HambergerIcon onClick={Drawers}/>
					<Grid
						flex
						gap="15px"
					>
						<SearchIcon width="25" height="25" onClick={() => {history.push('/search')}}/>
						<NotiWrap>
							<NotiIcon onClick={() => {history.push('/noti')}}/>
							{unread_noti !== 0 && <NotiSign />}
						</NotiWrap>
					</Grid>
				</Grid>
				<Grid
					is_flex
					align="center"
					padding="0px 16px 15px"
					gap="10px"
					borderB="1px #dadada solid"
				>
					<Image size='50' src={profile ? profile : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSjj5IrkGRH6VDUgnUiMCjY2Npu5S8fDew1Q&usqp=CAU'}/>
					<Grid>
						<Text 
							text={`안녕하세요, ${nickname ? nickname : '방문자'}님`}
							letterSpacing="-1px"
						/>
						<Text 
							text="물물교환을 시작해 볼까요?"
							bold="bold"
							size="16px"
							letterSpacing="-1px"
							wordSpacing="-1px"
						/>
					</Grid>
				</Grid>

				<Drawer
					PaperProps={{ style: {height: "60vh"}}}
					open={openFilter}
					onClose={Drawers}
				>
					<div style={{width:'55vw'}}>
						<List>
							<ListItem style={{background:'#FFD467'}} key='default' onClick={()=>{
								setopenfilter(false);
								}} >
								<ListItemIcon style={{color:'white'}}><ArrowBackIosNewIcon/></ListItemIcon>
								<ListItemText style={{color:'white'}} primary='카테고리' />
							</ListItem>
							{['전체',"디지털기기","생활가전","가구/인테리어",
							"유아동","유아도서","생활/가공식품","스포츠/레저",
							"여성잡화","여성의류","남성패션/잡화","게임/취미",
							"뷰티/미용","반려동물용품","도서/티켓/음반","식물"]
							.map((text,index)=>(
								<ListItem key={text}>
									<ListItemText primary={text} onClick={()=>{
									setfilter(text);
									console.log(text);
									setopenfilter(false);
									}}/>
								</ListItem>
							))}
						</List>
					</div>
				</Drawer>
				<CardWrap>
					<HotDeal />
					{cardList.map((p, idx) => { 
						return 	<Card 
									key={p.itemId} 
									{...p}
								/>
					})}
				</CardWrap>	
				<TabBar />
			</Grid>
			<LoginModal />
			{is_loading && <Loading />}
		</>
    );
};

const BlinkSign = keyframes`
	0% {
		opacity: 0;
	}
	50%{
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;

const CardWrap = styled.div`
	height: calc(100% - 200px);
	overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
`;

const NotiWrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

const NotiSign = styled.div`
	position: absolute;
	top: 4px;
	right: -1px;
	width: 7px;
	height: 7px;
	background-color: red;
	border-radius: 10px;
	animation: ${BlinkSign} 3s infinite ease-out;
`;

export default Main;