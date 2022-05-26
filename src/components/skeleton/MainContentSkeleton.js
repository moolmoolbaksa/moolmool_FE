import React from 'react';
import MainCardSkeleton from '../../elements/skeleton/MainCardSkeleton';

const MainContentSkeleton = (props) => {
    return (
        <>
            <MainCardSkeleton />
            <MainCardSkeleton />
            <MainCardSkeleton />
            <MainCardSkeleton />
            <MainCardSkeleton />
        </>
    );
};

export default MainContentSkeleton;