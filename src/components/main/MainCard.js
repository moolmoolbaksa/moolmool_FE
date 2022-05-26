import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';
import { api as productActions } from '../../redux/modules/product';
import { useDispatch } from 'react-redux';
import { ReactComponent as HeartIcon } from '../../images/하트.svg';
import { ReactComponent as ViewIcon } from '../../images/view.svg';
import { ReactComponent as LocationIcon } from '../../images/좌표.svg';

const MainCard = ({itemId, image, address, title, contents, scrab, scrabCnt, viewCnt}) => {
    const dispatch = useDispatch();
  
    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };

    return (
        <Container>
            <ImageOutter onClick={onGoDetail}>
                <ImageWrap src={image}/>
            </ImageOutter>
            <Grid is_column justify="space-between">
                <Grid is_column gap="8px">
                    <Text 
                        onClick={onGoDetail}
                        text={title}
                        size="16px"
                        bold="bold"
                        wordSpacing="-1px"
                    />
                    <Text 
                        multi="3"
                        onClick={onGoDetail}
                        text={contents}
                        color="#9D9D9D"
                    />
                </Grid>
                <IconWrap>
                    <Grid is_flex align="center">
                        <StyledHeartIcon width="20" height="20" stroke="gray"/>
                        <span className='num'>{scrabCnt}</span>
                    </Grid>
                    <Grid is_flex align="center" gap="1px">
                        <ViewIcon />
                        <span className='num'>{viewCnt}</span>
                    </Grid>
                </IconWrap>
            </Grid>
        </Container>
    );
};

export default MainCard;

const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
    padding: 15px 0px;
    gap: 15px;
    border-bottom: 1px #e8e8e8 solid;
`;

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(10 / 10 * 100%);
`;

const ImageWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
	height: 100%;
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
`;

const IconWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2px;

    & span {
        position: relative;
        color: #9d9d9d;
        font-size: 18px;
        vertical-align: middle;
        text-indent: -9999;
    }
    & span.num {
        text-align: 18px;
        font-size: 14px;
        line-height: 1;
    }
`;

const StyledHeartIcon = styled(HeartIcon)`
    padding-top: 1px;
`;


