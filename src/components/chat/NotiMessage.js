import React from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';




///알림용 메시지 작성할래말래??
const NotiMessage = ({message}) => {
    
    return(
        <Messagewrap>
          <ChatRecived>
            <Messagetext>
              {message}
            </Messagetext>
          </ChatRecived>
        </Messagewrap>
    );
        
    
};
const Messagewrap = styled.div`
    display: flex;
    justify-content:center;
    margin: 20px 0px 0px 0px;
`;
const ChatRecived = styled.div`
    position: relative;
    max-width: 300px;
    background-color: #E8E8E8;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 0px 0px 10px;
    padding:10px;
   
`;

const Messagetext = styled.div`
    width: inherit;
    height: inherit;
    padding: 10px 20px;
    word-break: break-all;
    user-select: text;
    font-size:0.8rem;
`;

export default NotiMessage;