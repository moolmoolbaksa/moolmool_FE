import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';
import timeForToday from '../../shared/timeForToday';
import { ReactComponent as LocationIcon } from "../../images/좌표.svg";

const DetailContent = (props) => {
    const product_info = useSelector(state => state.product.product_info);
    
    const {
        title,
        date,
        contents,
        viewCnt,
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
                    lineHeight="12px"
                    letterSpacing="-1px"
                    width="max-content"
                    color="lightgray"
                />
                <Grid
                    flex
                >
                    <LocationIcon width="18" height="18" fill="lightgray"/>
                    <Text 
                        text="1.9km"
                        size="12px"
                        lineHeight="12px"
                        width="max-content"
                        color="lightgray"
                        margin="0 0 0 -3px"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    flex-grow: 1;
    padding: 10px 16px 0px;
    border-top: 1px #f5f5f5 solid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;


export default DetailContent;