import React from 'react';
import styled from 'styled-components';

import Grid from '../Grid';
import { loading } from '../../animation/skeleton';

const MainCardSkeleton = (props) => {
    return (
        <SkeletonContainer>
            <SkeletonImgOuter>
                <SkeletonImgInner />
            </SkeletonImgOuter>
            <Grid is_column gap="10px">
                <SkeletonTitle />
                <SkeletonContents />
                <SkeletonChip />
            </Grid>
        </SkeletonContainer>
    );
};

const SkeletonContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
    padding: 15px 0px;
    gap: 15px;
    border-bottom: 1px #e8e8e8 solid;

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

const SkeletonImgOuter = styled.div`
    position: relative;
    background-color: #e7e7e7;
    padding-bottom: 100%;
    border-radius: 5px;
`;

const SkeletonImgInner = styled.div`
    width: 100%;
`;

const SkeletonTitle = styled.div`
    width: 100%;
    height: 25px;
    background-color: #e7e7e7;
    border-radius: 5px;
`;

const SkeletonContents = styled.div`
    width: 100%;
    height: 50px;
    background-color: #e7e7e7;
    border-radius: 5px;
`;

const SkeletonChip = styled.div`
    width: 80px;
    height: 15px;
    background-color: #e7e7e7;
    border-radius: 5px;
    margin-left: auto;
`;

export default MainCardSkeleton;