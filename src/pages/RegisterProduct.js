import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button } from '../elements/index';

const RegisterProduct = (props) => {
    const filelist=[];
    return (
        <React.Fragment>
        <Grid>바꿀래요?</Grid>
        <hr></hr>
        <Button text='+카테고리 선택하기'></Button>
        <hr></hr>
        <Input placeholder='제목을 입력해주세요 (최대 30자)' type='text'  margin='10px'></Input>
        <Input placeholder='내용을 입력해주세요 (최대 30자)' type='text'  multiLine rows='20'  width='380px' margin='10px'/>
        
        <hr></hr>
        <Grid is_flex>
            <h2>사진 등록 ({filelist.length}/8)개</h2>
           
            <input accept="image/*"  id="raised-button-file"  multiple type="file" />
                  
        </Grid>

        </React.Fragment>
        

    );
};

export default RegisterProduct;