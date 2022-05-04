import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';
import { api as userActions } from '../../redux/modules/user';
import timeForToday from '../../shared/timeForToday';
import { ReactComponent as InfoWindow } from "../../images/좌표.svg";

const DetailContent = (props) => {
    const product_info = useSelector(state => state.product.product_info);
    
    const {
        title,
        date,
        contents,
        viewCnt,
        scrabCnt,
    } = product_info;
   
    return (
        <Container>
            <Grid> 
                <Grid
                    flex
                    margin="0 0 16px 0"
                >
                    <Text 
                        text={title}
                        bold="bold"
                        size="18px"
                        width="max-content"
                    />
                    <Text 
                        text={timeForToday(date)}
                        size="12px"
                        letterSpacing="-1px"
                        color="lightgray"
                        width="max-content"
                        padding="0 0 5px 0"
                    />
                </Grid>
                <Text 
                    text={contents}
                />
            </Grid>
            <Grid 
                is_flex
                align="center"
                justify="flex-end"
                gap="10px"
            >
                <Text 
                    text={`조회 ${viewCnt}`}
                    size="12px"
                    letterSpacing="-1px"
                    width="fit-content"
                    color="lightgray"
                />
                <Text 
                    text={`찜 ${scrabCnt ? scrabCnt : '0'}`}
                    size="12px"
                    letterSpacing="-1px"
                    color="lightgray"
                    width="fit-content"
                    textAlign="center"
                />
                <Grid
                    flex
                >
                    <InfoWindow />
                    <Text 
                    text="1.9km"
                    size="12px"
                    width="fit-content"
                    color="lightgray"
                    margin="0 0 0 -3px"
                />
                </Grid>
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    margin-bottom: 96px;
    flex-grow: 1;
    padding: 10px 16px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;


export default DetailContent;