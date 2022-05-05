import React from 'react';
import styled from 'styled-components';
const Base = styled.div`
// list-style: none;
  margin: 0;
  padding: 36px 0 64px 0;

`;

const Container = styled.div`

`;

const RoomList = (children) => {
    return(
        <Base>{children}</Base>

    );
        
    
};



export default RoomList;