import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useScrollRestoration = ({dom}) => {
    const history = useHistory();
        
    const scrollSave = _.throttle(() => {
        const scrollPos = dom.current.scrollTop;
        console.log(scrollPos)
        sessionStorage.setItem('scrollRestoration', scrollPos);
    }, 500);

    useEffect(() => {
        // 언마운트 이전에 실행되는데 왜 계속 0이 찍혀??
        if(dom.current){
            dom.current.addEventListener('scroll', scrollSave);
        }
        return () => {
            console.log('실행')
            // dom?.current.removeEventListener('scroll', scrollSave);
        }
    }, []);

    useEffect(() => {
        if(dom.current && history.action === 'POP'){
            const scrollPos = sessionStorage.getItem('scrollRestoration');
            dom.current.scrollTop = scrollPos;
        }
    }, [history, dom]);
}

export default useScrollRestoration;