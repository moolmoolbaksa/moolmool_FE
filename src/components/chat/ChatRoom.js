import React from 'react';
import styled from 'styled-components';

import { history } from '../../redux/configureStore';
import { ChatAPI } from '../../shared/api';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../../redux/modules/chat';
import { Grid, Text } from '../../elements';

const ChatRoom = ({userId, roomId, nickname, profile, message, isRead, unreadCnt, date}) => {
  	const dispatch =useDispatch();
	
	const _date = date.split('T')[0].split('-');
	const Year = _date[0].substr(2,2);
	const Month = _date[1];
	const Day = _date[2];

	const exitroom=()=>{
		ChatAPI.exitRoom(roomId)
			.then((res)=>{
				console.log(res);
			})
			.catch((err)=>{
				console.log(err);
			})
	};
	
	const onGoChatRoom = () => {
		history.push({pathname: `/chat/${roomId}`,state: {userId, profile, nickname}});
        dispatch(enterRoom({roomId, nickname, userId, profile}));
	};

    return(
		<Container onClick={onGoChatRoom}>
            <ImageOutter>
                <ImageWrap src={profile}/>
            </ImageOutter>
            <Grid
                is_flex
                is_column
                gap="15px"
            >
                <Grid
                    is_flex
                    is_column
                    gap="5px"
                >
					<Grid
						flex
						align="flex-start"
					>
						<Text 
							text={nickname}
							size="18px"
							bold="bold"
							letterSpacing="-1px"
							wordSpacing="-1px"
						/>
						<Text 
							text={[Year, Month, Day].join('.')}
							size="12px"
							letterSpacing="-.67px"
							color="#9D9D9D"
							textAlign="right"
						/>
					</Grid>
                    <Text 
                        text="물물어린이"
                        color="#9D9D9D"
						size="14px"
                        letterSpacing="-1px"
                        wordSpacing="-1px"
                    /> 
                </Grid>
                <Text 
					text={message}
					color="#9D9D9D"
				/>
            </Grid>
			{unreadCnt !== 0 && <UnreadNum>{unreadCnt}</UnreadNum>}
        </Container>
    );
};

const Container = styled.div`
    padding: 15px 5px;
    display: grid;
	position: relative;
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    gap: 15px;
    border-bottom: 1px #c4c4c4 solid;
`;

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(10 / 10 * 100%);
`;

const ImageWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
	height: 100%;
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
`;

const UnreadNum = styled.div`
	position: absolute;
	top: 35px;
	right: 5px;
	width: 20px;
	height: 20px;
	background-color: #2B9ECF;
	color: white;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
`;

export default ChatRoom;