import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../../elements/index';

import IconTabs from '../IconTabs';
import Sidebar from './Sidebar';


const Mainheader = (props) => {
 

    return (
        <div className='page-wrap' style={{display:'relative'}}>
            <Sidebar pageWrapId={"Mainheader"} outerContainerId={"page-wrap"}/>
            <header>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <div>
                        asdf
                    </div>
                    <div>
                        zxcv
                    </div>
                    <div>
                        qwer
                    </div>
                </div>
            </header>
            <div style={{display:'flex', width:'100%', margin:'30px 0px 20px 0px'}}>
                <Image/>

                <div>
                    <p>안녕하세요, 물물박사님 </p>
                    <p>물물 교환을 시작해 볼까요?</p>



                </div>
                
            </div>        



        </div>
            
            


        
        
        

    );
};

export default Mainheader;
