import React from 'react';
import styled from 'styled-components';

import Grid from '../Grid';
import { loading } from '../../animation/skeleton';

const MainHotItemSkeleton = (props) => {
    return (
        <SkeletonContainer>
            <SkeletonImg />
            <Grid is_column padding="10px 10px 15px" gap="5px">
                <SkeletonTitle />
                <SkeletonContent />
            </Grid>
        </SkeletonContainer>
    )
}

const SkeletonContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 53%;
    max-width: 53%;
    border-radius: 10px;
    box-shadow: 4px 3px 9px 0px rgba(0, 0, 0, 0.09);

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 10%;
        background: rgba(255, 255, 255, 0.2);
        z-index: 1;
        animation: ${loading} 2s infinite;
    }
`;

const SkeletonImg = styled.div`
    width: 100%;
    height: 0;
    background-color: #e7e7e7;
    padding-bottom: 100%;
    border-radius: 10px 10px 0 0;
`;

const SkeletonTitle = styled.div`
    width: 100%;
    height: 25px;
    background-color: #e7e7e7;
    border-radius: 5px;
`;

const SkeletonContent = styled.div`
    width: 100%;
    height: 15px;
    background-color: #e7e7e7;
    border-radius: 5px;
`;

export default MainHotItemSkeleton;