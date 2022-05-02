import React from 'react';
import styled from 'styled-components';

import { Grid, Image, Text } from '../../elements/index';

const MypageTop = ({user_info}) => {
    const {nickname, profile, storeInfo, degree, address} = user_info;

    return (
        <Container>
            <Grid  flex justify="center">
                <Image
                    type="circle"
                    src={profile}
                    size="140"
                    margin="0"
                />
            </Grid>
            <Grid
                width="100%"
                margin="0 0 0 20px"
                is_flex
                is_column
                gap="10px"
            >
                <div>
                    <Grid
                        is_flex
                    >
                        <Text 
                            text={nickname}
                            bold="bold"
                            size="22px"
                            width="auto"
                            letterSpacing="-1px"
                        />
                        <Span>Lv. {degree}</Span>
                    </Grid>
                    <Text 
                        text={address}
                        color="gray"
                        letterSpacing="-1px"
                    />
                </div>
                <Text 
                    text={storeInfo}
                    letterSpacing="-1px"
                />
            </Grid>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    padding: 15px 0px;
    margin-bottom: 20px;
    border-bottom: 1px lightgray solid;
`;

const Span = styled.div`
    font-size: 14px;
    height: 14px;
    padding-top: 7px;
    letter-spacing: -1px;
    margin-left: 5px;
`

export default MypageTop;