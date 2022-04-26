import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';

const ImageSlide = (props) => {
    let filelist=[];
    const fileInput=React.useRef();
    const selectfile=(e)=>{
        const reader=new FileReader;
        const file = fileInput.current.files[0];
        console.log(fileInput.current.files);
        reader.readAsDataURL(file);
        console.log(file);
        filelist=[...fileInput.current.files];
        console.log(filelist);

    }
    return (
        <React.Fragment>
            
            <Image></Image>
        
        </React.Fragment>
        

    );
};

export default ImageSlide;