import React from 'react';
import styled from 'styled-components';

import {ReactComponent as DirectIcon} from '../../images/직거래.svg';
import {ReactComponent as PostIcon} from '../../images/택배배송.svg';
import { useSelector } from 'react-redux';

const TransMethod = (props) => {
    const type = useSelector(state => state.product.product_info.type);
 
    return (
        <Container>
            {type === '상관없음'
                &&  <>
                        <Round>
                            <StyledPostIcon width="35" height="35"/>
                        </Round>
                        <Round>
                            <StyledDirectIcon width="35" height="35"/>
                        </Round>
                    </>
            }
            {type === '택배거래'
                &&  <Round>
                        <StyledPostIcon width="35" height="35"/>
                    </Round>
            }
            {type === '직거래'
                &&  <Round>
                        <StyledDirectIcon width="35" height="35"/>
                    </Round>
            }
            
        </Container>  
    );
};

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 13px;
    right: 13px;
    gap: 5px;
`;

const Round = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background-color: #FFD467;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledPostIcon = styled(PostIcon)`
    position: absolute;
    z-index: 1;
`;

const StyledDirectIcon = styled(DirectIcon)`
    position: absolute;
    z-index: 1;
`;

export default TransMethod;