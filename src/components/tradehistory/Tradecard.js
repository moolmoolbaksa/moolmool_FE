import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../../elements/index';

const Tradecard = (props) => {
    
    return (
        <React.Fragment>
            <div>
                <div>
                    <h1>우아악님과의 교환</h1>
                </div>
                <div>
                    교환완료 :2022.02.02
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div>
                    <Image margin='0 auto' size='100' shape='sqaure'></Image>
                    </div>
                    <div>
                        <h2>--- &gt;</h2>
                        <h2>&lt;--- </h2>
                    </div>
                    <div>
                    <Image margin='0 auto' size='100' shape='sqaure'></Image>
                    </div>
                </div>
                <Button margin='10px 0px 10px 0px' text='교환 평가하기' border='2px solid grey'></Button>
            </div>
        </React.Fragment>
        

    );
};

export default Tradecard;