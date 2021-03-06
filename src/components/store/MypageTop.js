import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';

import { Grid, Image, Text } from '../../elements/index';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as Level1 } from '../../images/level/level_1.svg';
import { ReactComponent as Level2 } from '../../images/level/level_2.svg';
import { ReactComponent as Level3 } from '../../images/level/level_3.svg';
import { ReactComponent as Level4 } from '../../images/level/level_4.svg';

const MypageTop = ({user_info, page}) => {
    const {nickname, profile, storeInfo, degree, address, acceptorCnt, requesterCnt, scoreCnt, degreePoint, totalPoint } = user_info;
    
    return (
        <>  
            <Background page={page}/>
            <Container page={page}>
                {page !== 'mall' &&
                    <StyledLink to="/editmyinfo">   
                            <EditIcon />
                    </StyledLink>
                }
                <UserInfo>
                    <Image
                        type="circle"
                        src={profile}
                        size="60"
                        margin="0"
                    />
                    <Grid is_column gap="4px" is_overflow>
                        <Grid is_flex align="center" gap="7px">
                            <Text 
                                text={nickname}
                                bold="bold"
                                size="18px"
                                width="max-content"
                                letterSpacing="-1px"
                            />
                                <Text 
                                text={address ? `· ${address.split(' ').splice(0, 2).join(' ')}` : '주소를 설정해주세요.'}
                                color="gray"
                                size="12px"
                                width="max-content"
                                letterSpacing="-1px"
                            />
                        </Grid>
                        <Text 
                            multiLine 
                            multi="3"
                            text={storeInfo ? storeInfo : '아직 보따리 소개가 없어요.'}
                            size="13px"
                            letterSpacing="-.36px"
                        />
                    </Grid>
                </UserInfo>
                {page !== 'mall' &&
                <BarterInfoWrap>
                    <BarterInfo onClick={() => history.push('/trhistory')}>
                        <span className='title'>받은 교환</span>
                        <span className='content'><span>{acceptorCnt}</span>건</span>
                    </BarterInfo>
                    <BarterInfo onClick={() => history.push({pathname: '/trhistory', state:{value: true}})}>
                        <span className='title'>신청한 교환</span>
                        <span className='content'><span>{requesterCnt}</span>건</span>
                    </BarterInfo>
                    <BarterInfo>
                        <span className='title'>받은 평가</span>
                        <span className='content'><span>{scoreCnt}</span>건</span>
                    </BarterInfo>
                </BarterInfoWrap>
                }
                <UserExp>
                    {degree === '물물어린이' 
                        ?   <Level1/>
                        :   degree === '물물학사'
                            ?   <Level2/>
                            :   degree === '물물석사'
                                ?   <Level3/>
                                :   <Level4/>
                    }
                    <Grid flex grow="1" justify="space-between">
                        <Text 
                            text={`Lv. ${degree}`}
                            size="17px"
                            width="auto"
                            bold="bold"
                        />
                        <span>EXP <span className='point'>{totalPoint}</span>/{degreePoint}</span>
                    </Grid>
                </UserExp>
            </Container>
        </>
    );
};

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;
    ${props => props.page ? 'padding: 20px 16px 0' : 'padding: 30px 16px 0'};
`;

const Background = styled.div`
    position: absolute;
    width: 100%;
    ${props => props.page ? 'height: 200px' : 'height: 212px'};
    border-radius: 0 0 20px 20px;
    background: linear-gradient(313deg, rgba(255, 212, 103, 1) 60%, rgba(255, 238, 194, 1));
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const StyledLink = styled(Link)`
    position: absolute;
    top: 4%;
    right: 2%;
    text-decoration: none;
`;

const BarterInfoWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
`;

const BarterInfo = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    height: 60px;
    border-radius: 4px;
    padding: 5px 0px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;

    span.title {
        font-size: 12px;
        letter-spacing: -.22px;
        word-spacing: -1px;
        text-align: center;
    }
    span.content {
        font-size: 13px;
        text-align: center;
        & > span {
            font-size: 18px;
            font-weight: bold;
        }
    }
`;

const UserExp = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    min-height: 85px;
    padding: 10px 20px 10px 10px;
    border-radius: 8px;
    box-shadow: 0 2px 7px -2px rgba(40, 40, 40, 0.4);
    background-color: #fff;

    span.point {
        font-size: 18px;
        color: ${props => props.theme.palette.blue};
        font-weight: bold;
        text-align: center;
    }
`;  

export default MypageTop;