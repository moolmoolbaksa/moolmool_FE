import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const FetchMore = ({paging, callNext}) => {
    const fetchMoreTrigger = useRef(null);
    const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
        if(isIntersecting) callNext();
    });
    
    useEffect(() => {
        if(!paging.next) return;
        if(!fetchMoreTrigger.current) return;
       
        fetchMoreObserver.observe(fetchMoreTrigger.current);
        return () => {
            fetchMoreObserver.disconnect();
        };
    }, [paging]);
    
    return (
        <>
            {paging.next &&
                <FetchMoreElement ref={fetchMoreTrigger}>
                    <Spinner size="50"/>
                </FetchMoreElement>
            }
        </>
    )
};

export default FetchMore;

const FetchMoreElement = styled.div``;