import React from 'react';
import styled from 'styled-components';
const Base = styled.div`
width: 100%;
height: 100vh;
padding: 0 12px;
box-sizing: border-box;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Chatroomlist = (props) => {
    return(
        <Base>
            <Container>
                {/* <RoomList></RoomList> */}
            </Container>
        </Base>

    );
        
    
};



export default Chatroomlist;