import React, { useState } from 'react';
// import styled from 'styled-components';
import { alpha } from '@mui/material/styles';
import styled from 'styled-components';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';
import { FaStar } from 'react-icons/fa';
import LocationBar from '../components/LocationBar';
// import { FaStar } from 'react-icons/fa';

// Instantiation


const Rating = (props) => {
    const [rating, setRating]=useState(0);

    console.log(rating)
    const Rating=(idx)=>{
        setRating(idx+1);
    }
    return (
        <React.Fragment>
            <LocationBar title="교환평가"/>
            <div  style={{margin:'0px auto '}}>
                <div style={{width:'70vh',margin:'0 auto'}}>
                    <h1>
                        축구공님과의 <br></br>
                        교환은 어떠셨나요?
                    </h1>
                </div>
                <div>
                    <div style={{width:'70%', display:'flex', margin:'0 auto', justifyContent:'center'}} >
                        {
                            Array.from({length:5},(item,idx)=>{
                                return( <Image/>)
                            })
                        }
                    </div>
                    <div style={{width:'70%', margin:'0 auto', justifyContent:'center', textAlign:'center'}}>
                        화살표
                    </div>
                    <div>
                    <div style={{width:'70%', display:'flex', margin:'0 auto', justifyContent:'center'}} >
                        {
                            Array.from({length:3},(item,idx)=>{
                                return( <Image/>)
                            })
                        }
                    </div>
                    </div>
                </div>
                <Stars>
                    {
                        Array.from({length:5}, (item, idx)=>{
                            return (
                                <FaStar key={idx}  onClick={()=>setRating(idx+1)} style={{color:rating<idx+1?"grey":"yellow"}} />);
                        } )
                    }
                </Stars>
                <div>

                    <Button color='white'  text='평가하기' background='black' margin='auto'></Button>

                </div>



            </div>

            
            <IconTabs/>
        </React.Fragment>
        
        
        

    );
};

const Stars = styled.div`
display: flex;
padding-top: 5px;
width:70%;
margin: 0px auto;
justify-content:center;
// text-align:center;
// <div style={{width:'70%', display:'flex', margin:'0 auto', justifyContent:'center'}} >


svg {
    width:50px;
    height:50px;
  color: gray;
  cursor: pointer;
}

:hover svg {
  color: yellow;
}

& svg:hover ~ svg {
  color: gray;
}
& svg:hover + svg{
    color:red;
}
// .yellowStar {
//   color: #fcc419;
// }
`;
export default Rating;