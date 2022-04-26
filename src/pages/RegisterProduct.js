import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';
import ImageSlide from '../components/ImageSlide';
import ScrollHorizontal from 'react-scroll-horizontal';
import IconTabs from '../components/IconTabs';



const Imageitem = ({src})=>{
    return <ImageSlide/>;
};
const child   = { width: `100%`, height: `100%`}
    const parent  = { width: `100%`, height: `100%`}

const RegisterProduct = (props) => {
    // let filelist=['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDQ0NDQ0PDQ0NDw0NDg8ODRANDQ0NFREWFhURFRUYHSggGBolGxgTITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMkA+wMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQUGBAMCB//EADYQAQACAAIFCAkEAwEAAAAAAAABAgMRBAUSITETFUFRUpLB0SIyM1NhcYKRokJyobGBsuFi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP6EigCZKgKioCgAAAgqSAoAAAIoAAAAAigIqKAAAIoCKgCgAioAQoAAAACAAoAIoAAAAAgoAkqkgCoAoAAAIqAoACZKgKioCgACSoIBIKAACAqKgKIoCKgKCSBAQSCiKAAAioCgAIqAqKgKAAACEkkgoPvgaFiYnq0nLtW9GoPgtazM5REzPVEZy2NH1NWN+JabfCvox5tDDwqYUejFaR08I+8gxdH1TiX9bLDj477fZpYGq8KmUzG3PXbfH24PzpGtcOm6ueJP/n1fu8uja1vfFrFoitLTs5Rv3zwnMHy11gbGJFojKLx0dqOPgz3Ra1wOUwbZetX04/xxj7ZudAAASVSQICAFAAAARUBQAEVAVFQFBAUerR9XYuJv2dmOu27+OLT0fU+HXfeZvPdr9gYmHh2vOVazafhGbQ0fU17b72ikdUelbybNa1plWIisdERlD9g8uj6vwsPhXOe1b0pfrSNNw8P1rxn1Rvt9nz0jRMTEzice1YnorWIj78Xl5jj3s92AfPSNczO7Drs/G2+fszsbGviTne02+fD7cGrzJHvZ7sHMce9nuwDHTP79HzbPMce9nuwcxx72e7ANDQ8blcOt+uN/z4S53TMHk8S9OiJzr+2d8N/QdE5Gs125tEznGcZZbnz07V8Y1q22prMRluiJzgHPDY5kj3s92EtqWIiZ5Wd0TPqwDISSFBIJABQAAARUBQAAQFRUBX10XG5PEpfoid/y4S+SA67PdnG/p3dLCx9b4lt1IjDjvW8mjqjH28GvXT0J/wAcP4ZOtcHYxrdV/Tj5zx/kH61ZebaRSbTNp9LfM5z6stjWGkzg4cXiItviuUzlxYuqfb0+r/WWlrz2P118Qebnu3u696fI57v7uvenyZTUwNTWtXO99iZ/TFdrL57wOe7e7r3p8l57t7uvenyeLTNEtg2ytlMTviY4S84NXnu3u696fI57t7uvenyZaA1ee7e7r3p8jnu3u696fJlKDTnXdvd170+TYvOdJnrrP9OTng6ufU+nwBykKkAKhACiQoAACKgBkAECoBIAAqA0NS4+zi7E8MSMvqjh4vdrvB2sPbjjhzn9M7p8GHS01mLRxrMTHzh1FLRi4cT+m9f4mAYOqPb0+r/WWlrz2P118Wfq7DmmlVpPGs3j8Z3tDXnsfrr4gxtFtFcTDtO6IvWZ+EZuqchk9WDp+LSNmt93RFoi2X3Boa/vGxSv6traj4VymJ/uGK/WJebzNrTNrTxmX5AbWqdBjYm+JG/EiaxE9FJ8/J4tV6Jyt87R6FMpnqmeirogcppGFOHe1J/TOWfXHRL5urtg0m23NKzaIyzmImcmJrvC2cXa6Lxn/mN0+AM6eDrJ9T6fBykusn1Pp8AclEKQSAAAEKCAAZAAoACKgKioCgANrUWNnS2HPGk5x+2f+/2xXo1djcni1nPKJ9G3yn/uQNbGwMtKwsSOF4tWf3RWfD+k157H66+LQmsTlnHCc4+E5ZPBrz2Mfvr4gwRM2zqrV+WWLiRv40r1fGfiD8aPqjaw5m8zW876xx2Y6p63ivoOJXEjDmu+05VmPVmOvN0wD5aNgRhUileEdPTM9MvqADO13hZ4W100mJ/xO6fBovxj4e3S1Z/VEx94ByduDq59T6fByl4yzieMZxPzh1c+p9PgDlIJIAAgBRFAAARUBQSAVFQFRUBQQFQAdNq7H5TCpbpy2bfujc+GvPY/XXxePUmkRW1qWmIi0bUTM5RtR/z+mxy1O3XvQDla2ymJjjE574zh6+dMbt/hXyb/AC1O3TvQctTt070AwOdMbt/hXyOdMbt/hXyb/LU7dO9By1O3TvQDA50xu3+FfI50xu3+FfJv8tTt070HLU7dO9AMDnTG7f4V8jnTG7f4V8m/y1O3TvQctTt070A5XEtNptaeM5zO7Le6qfU+nwOWp26d6H5xMamzb068J/VHUDloVI4AEBACiKAAAioCgmYKioCoqAoICiKCGQSBl8DKFQDL4GRmAZQZfBUAyMoADL4GSoCpISAEEgKigAAIAKIAoICiAKIAogCoAKIAogCiAKIAogCiKAIAoigCAKgACoCoqAAACoACggAAAAqAAACoAAACggACooICggAEBABAQABIAAASSSAEgBkKCAQAAAEAAAAAAAAAAEAAA//Z',''];
    const fileInput=React.useRef();
    const [files,setFiles]=useState([]);

    const selectfile=(e)=>{
        const reader=new FileReader;
        const file = fileInput.current.files[0];
        console.log(fileInput.current.files);
        reader.readAsDataURL(file);
        console.log(file);
        let filelist=[...fileInput.current.files];
        
        setFiles(filelist);
        

    }
    
    React.useEffect(()=>{
        console.log("useeffect");
        console.log(files);
        // console.log(files.length);

    },[files]);

    return (
        <React.Fragment>
        <Grid>바꿀래요?</Grid>
        <hr></hr>
        <Button text='+카테고리 선택하기'></Button>
        <hr></hr>
        <Input placeholder='제목을 입력해주세요 (최대 30자)' type='text'  margin='0px' width='100%'></Input>
        <Input placeholder='내용을 입력해주세요 (최대 30자)' type='text'  multiLine rows='20'  width='380px' margin='10px'/>
        
        <hr></hr>
        <Grid>
            <h2>사진 등록 ({files.length}/8)개</h2>

            <input onChange={selectfile} accept="image/*" id="raised-button-file"  ref={fileInput}  multiple type="file" />
            <div style={{display:'flex'}}>
            
            {files.map((n,idx) => {
            console.log(n);
            console.log();
            return <ImageSlide></ImageSlide>;
            
          })}
          </div>

        </Grid>
          <hr></hr>
       
              {/* <ScrollHorizontal>
              <div style={child}>asdasd</div>
              <div style={child}>123123</div>
              <div style={child}>asdasd</div>

              </ScrollHorizontal> */}
     
     
        <Grid>
            <Text text='선호하는 교환품목'/>
            <div>

            </div>
        </Grid>
        <hr></hr>
        <Grid>
          <Text text='선호하는 거래조건'/>
        </Grid>
        <hr></hr>

        <Grid>
            <Text text='택배거래/직거래/상관없음'/>
        </Grid>
        <hr></hr>

        물품 거래 주희사항을 모두확인했으며 이에 동의합니다.<input type='checkbox'/>
        <hr></hr>

        <Button height='40px' radius='4px' background='black' color='white' text='바꿀래요'></Button>
        <IconTabs></IconTabs>
        </React.Fragment>
        
        
        

    );
};

export default RegisterProduct;