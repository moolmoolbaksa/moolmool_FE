import React from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';

const Base=styled.div`
height:80vh;
`;



const MessageList = (props) => {
    
    return(
        <Base>{props.children}</Base>
    );
        
    
};



export default MessageList;