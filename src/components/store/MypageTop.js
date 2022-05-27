import React from 'react';
import styled from 'styled-components';

import { Grid, Image, Text } from '../../elements/index';

const MypageTop = ({user_info}) => {
    const {nickname, profile, storeInfo, degree, address} = user_info;
    
    return (
        <>  
            <Container>
                <Grid flex justify="center">
                    <Image
                        type="circle"
                        src={profile}
                        size="100"
                        margin="0"
                    />
                </Grid>
                <Grid is_column gap="10px" is_overflow>
                    <Grid>
                        <Grid is_column>
                            <Text 
                                text={address ? address.split(' ').splice(0, 2).join(' ') : '주소를 설정해주세요.'}
                                color="gray"
                                size="12px"
                                letterSpacing="-1px"
                            />
                            <Grid is_flex align="flex-end" gap="5px">
                                <Text 
                                    text={nickname}
                                    bold="bold"
                                    size="22px"
                                    width="max-content"
                                    letterSpacing="-1px"
                                />
                                <Text 
                                    text={degree}
                                    size="14px"
                                    width="auto"
                                    padding="0 0 2px"
                                    letterSpacing="-1px"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Text 
                        multi="3"
                        text={storeInfo ? storeInfo : '아직 보따리 소개가 없어요.'}
                        letterSpacing="-.36px"
                    />
                </Grid>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    gap: 30px;
    padding: 15px 0px;
    border-bottom: 1px #e8e8e8 solid;
`;

export default MypageTop;