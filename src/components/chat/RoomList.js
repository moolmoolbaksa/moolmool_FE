import React from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import ChatRoom from './ChatRoom';
import Inputbox from './Inputbox';
const Base = styled.div`
// list-style: none;
  margin: 0;
  padding: 36px 0 64px 0;

`;

const Container = styled.div`
  
`;



const RoomList = (props) => {
  const {roomlist}=props;
  console.log(roomlist);
  

    return(
        <Base>
                              
        </Base>

    );
        
    
};



export default RoomList;