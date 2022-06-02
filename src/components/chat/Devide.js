import { TodayTwoTone } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const Devide = ({message,date}) => {
  console.log(date);
  const temp= new Date(date);
  let week= ['일','월','화','수','목','금','토'];
  let dayName=week[temp.getDay()];
  console.log(dayName);
  const date1=date.split('T')[0].slice(2,10).replaceAll("-",".");
  
  console.log(date1);
    return(
        <Messagewrap date={date1}>
            <Line/>
            <p>{date1} ({dayName})</p>
            <Line/>
        </Messagewrap>
    ); 
};



const Line=styled.hr`
// outline: 0;
  border: 1px solid #9D9D9D;
  color: black;
  text-align: center;
  flex-grow:1;
  width:inherit;
  margin: 0 auto;
`;

const Messagewrap=styled.div`
    display: flex;
    justify-content: center;
    // background:red;
    align-items:center;
    font-size:0.9rem;
    padding:5px 0;
    margin:5px 0;
    
    & > p{
     margin: 0 20px;
     color: #9D9D9D;
    }
`;


export default Devide;