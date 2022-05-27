import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';
import timeForToday from '../../shared/timeForToday';
import { ReactComponent as LocationIcon } from "../../images/좌표.svg";

const DetailContent = (props) => {
    const { title, date, contents, viewCnt, address, nickname } = useSelector(state => state.product.product_info);
    const my_nickname = useSelector(state => state.user.user_info.nickname);
    const is_login = useSelector(state => state.user.is_login);
    
    return (
        <Container>
            <Grid> 
                <Grid flex margin="0 0 16px 0" gap="10px">
                    <Text 
                        multi="2"
                        text={title}
                        bold="bold"
                        size="18px"
                    />
                    <Text 
                        text={timeForToday(date)}
                        size="12px"
                        letterSpacing="-1px"
                        color="lightgray"
                        textAlign="right"
                        width="60px"
                        padding="0 0 5px 0"
                    />
                </Grid>
                <Text 
                    multi="20"
                    text={contents}
                />
            </Grid>
            <Grid 
                is_flex
                align="center"
                justify="flex-end"
                gap="5px"
            >
                <Text 
                    text={`조회수 ${viewCnt} `}
                    size="12px"
                    lineHeight="12px"
                    textAlign="right"
                    letterSpacing="-1px"
                    width="max-content"
                    color="lightgray"
                />
                {is_login && address && nickname !== my_nickname && 
                    <Grid flex>
                        <LocationIcon width="18" height="18" fill="lightgray"/>
                        <Text 
                            text={address}
                            size="12px"
                            lineHeight="12px"
                            width="max-content"
                            color="lightgray"
                            margin="0 0 0 -3px"
                        />
                    </Grid>
                }
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    flex-grow: 1;
    min-height: 120px;
    padding: 10px 16px 5px;
    border-top: 1px #f5f5f5 solid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export default DetailContent;