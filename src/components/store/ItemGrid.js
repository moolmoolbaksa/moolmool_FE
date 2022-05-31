import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { history } from '../../redux/configureStore';

import TradeMyItem from '../trade/TradeMyItem';
import ItemImage from './ItemImage';
import { Text, Grid } from '../../elements/index';
import { ReactComponent as PlusIcon } from '../../images/plus_round.svg';

const ItemGrid = ({item_list, type,is_edit}) => {
    console.log(is_edit);
    const onGoCreateItem = () => {
        history.push('/registerproduct');
    };
    if(type==='trade'&& is_edit){
      return (
          <Grid
              padding="20px 0 0 0"
          >
              <Text
                  text="나의 보따리"
                  bold="bold"
                  size="22px"
                  letterSpacing="-1px"
              />
              <Grid gridBox margin="20px 0">
                  {item_list && item_list.map((v, i) => {
                      return  <TradeMyItem 
                                  key={i}
                                  {...v}
                              />       
                  })}
              </Grid>
          </Grid> 
      );
  };
    if(type==='trade'){
        return (
            <Grid
                padding="20px 0 0 0"
            >
                <Text
                    text="나의 보따리"
                    bold="bold"
                    size="22px"
                    letterSpacing="-1px"
                />
                <Grid gridBox margin="20px 0">
                    {item_list && item_list.map((v, i) => {
                        return  <TradeMyItem 
                                    key={i}
                                    {...v}
                                />       
                    })}
                </Grid>
            </Grid> 
        );
    };

    if(type==='mall'){
        return (
            <Grid>
                <Grid gridBox>
                    {item_list && item_list.map((v, i) => {
                        return  <ItemImage 
                                    key={i}
                                    {...v}
                                />       
                    })}
                </Grid>
            </Grid> 
        );
    };

    if(type==='scrab'){
        return (
            <>
                <Grid
                    padding="10px 0 0 0"
                    flex
                >
                    <Text 
                        text="찜한 상품"
                        bold="bold"
                        size="22px"
                        letterSpacing="-1px"
                        width="max-content"
                    />
                    {item_list.length >= 3
                        &&  <StyledLink
                                to="/scrab"
                            >
                                더보기
                            </StyledLink>
                    }
                </Grid>
                {item_list.length !== 0
                    ?   <Grid gridBox margin="20px 0">
                            {item_list && item_list.map((v, i) => {
                                return  <ItemImage 
                                            key={i}
                                            {...v}
                                        />       
                            })}
                        </Grid>
                    :   <EmptyZone>
                            <Text 
                                text="찜한 상품이 없습니다."
                                textAlign="center"
                                size="16px"
                                color="#ffca39"
                                bold="bold"
                                padding="50px 0"
                            />
                        </EmptyZone>
                }
            </>
        );
    };

    // 길이 9의 배열을 만들고, 나의 보따리 상품을 뺸 나머지 요소는 PLUS 뷰로 보여주기 위한 작업
    const new_item_list = Array.from({length: 9}, v => '');
        for(let i=0; i < 9; i++){
            if(item_list[i]){
                new_item_list[i] = item_list[i];
            };
    };

    return (
        <Grid
            padding="20px 0 0 0"
        >
            <Text
                text="나의 보따리"
                bold="bold"
                size="22px"
                letterSpacing="-1px"
            />
            {!item_list.length
                ?   (<PlusZone onClick={onGoCreateItem}>
                        <Text 
                            text="보따리에 물건을 추가해보세요!"
                            textAlign="center"
                            size="16px"
                            color="#ffca39"
                            bold="bold"
                            padding="50px 0"
                        />
                    </PlusZone>)
                :   (<Grid gridBox margin="20px 0">
                        {new_item_list && new_item_list.map((v, i) => {
                            return  v   ?   <ItemImage 
                                                key={i}
                                                {...v}
                                            /> 
                                        :   <PlusItem key={i} onClick={onGoCreateItem}>
                                                <PlusIcon/>
                                            </PlusItem>   
                        })}
                    </Grid>)
            }
        </Grid> 
    );
};

const PlusItem = styled.div`
    width: 100%;
    height: 100%;
    border: 2px #C4C4C4 solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
`;

const PlusZone = styled.div`
    width: 100%;
    border: 2px #ffca39 solid;
    border-radius: 5px;
    margin: 15px 0;
    cursor: pointer;
`;

const EmptyZone = styled.div`
    width: 100%;
    border: 2px #ffca39 solid;
    border-radius: 5px;
    margin: 16px 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 13px;
    line-height: 12.5px;
    color: black;
    letter-spacing: -1px;
    border-bottom: 1px #9d9d9d solid;
    cursor: pointer;
`;

export default ItemGrid;