import React, { useState } from 'react';
// import styled from 'styled-components';
import { alpha } from '@mui/material/styles';
import styled from 'styled-components';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';
import { FaStar } from 'react-icons/fa';

// Instantiation


const Rating = (props) => {
    const [rating, setRating]=useState(0);



    return (
        <React.Fragment>
            <div>
                <div>
                    <h1>
                        축구공님과의 <br></br>
                        교환은 어떠셨나요?
                    </h1>
                </div>
                <div>
                    <div>
                        img1
                    </div>
                    <div>
                        화살표
                    </div>
                    <div>
                        img2
                    </div>
                </div>
                {/* <Stars>
                    {
                        Array.from({length:5}, (item, idx)=>{
                            return (
                                <FaStar/>);
                        } )
                    }
                </Stars> */}
                
                <Button>평가하기</Button>





            </div>

            
            <IconTabs/>
        </React.Fragment>
        
        
        

    );
};

const Stars = styled.div`
display: flex;
padding-top: 5px;

& svg {
  color: gray;
  cursor: pointer;
}

:hover svg {
  color: #fcc419;
}

& svg:hover ~ svg {
  color: gray;
}

.yellowStar {
  color: #fcc419;
}
`;
export default Rating;