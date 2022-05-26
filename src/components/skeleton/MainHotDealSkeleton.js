import React from 'react';
import MainHotItemSkeleton from '../../elements/skeleton/MainHotItemSkeleton';

const MainHotDealSkeleton = (props) => {
    return (
        <>
            <MainHotItemSkeleton />
            <MainHotItemSkeleton />
            <MainHotItemSkeleton />
        </>
    );
};

export default MainHotDealSkeleton;