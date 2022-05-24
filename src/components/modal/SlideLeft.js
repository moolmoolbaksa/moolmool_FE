
import React from 'react';
import styled,{ keyframes} from 'styled-components';


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const SlideLeft = (props) => {
  const categorylist=[ '전체',
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '유아동',
    '유아도서',
    '생활/가공식품',
    '스포츠/레저',
    '여성잡화',
    '여성의류',
    '남성패션/잡화',
    '게임/취미',
    '뷰티/미용',
    '반려동물용품',
    '도서/티켓/음반',
    '식물',
]
  
  return(
    <ModalBackground onClick={props.closeSlide}>
      <Modalcontents>
        <Button color><ArrowBackIosNewIcon /><p> 카테고리</p></Button>
      {categorylist.map((text, index) => (
        <Button onClick={() => {props.setfilter(text)}}>{text}</Button>))}
      </Modalcontents>
    </ModalBackground>

    
  );
};
const boxFade = keyframes`
  0% {
    z-index:-1;
    opacity: 0;
    // display:none;
    // transform:translate3d(-0.1px,0,10px);
    // clip: rect(10px,10px,0,0 );
    width:0;
    
  }
  100% {
    opacity: 1;
    left:0;
    
    // transform:perspective(500px) translate3d(100px,0,10px);
    // clip: rect(100%);
    width:60%;
  }
`;

const Modalcontents=styled.div`
  display:flex;
  flex-flow:column;
  position:fixed;
  top:50px;
  // transform:translateX(80%);
  left:0;
  height:85vh;
  width:60%;
  border-radius:10px;
  background:white;
  animation: ${boxFade} 0.2s;

`

const ModalBackground = styled.div`
    position: absolute;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    // pointer-events:none;
`;

const Button=styled.button`
  position:relative;  
  flex:1;
  text-align:left;
  font-size:1.3rem;
  padding:0 0 0 10px;
  background:${props=>props.color?props.theme.palette.yellow:"white"};
  border:none;
  & > svg{
    position:absolute;
    margin: auto 0;
    top:0;
    bottom:0;
    color:white;
  }
  & > p{
    display:block;
    color:white;
  }
  & > p::before{
    content:"";
    margin:0 0 0 1.5rem;

  }
`;

export default SlideLeft;