import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

const useScrollRestoration = ({dom}) => {        
    const [scrollInfo, setScrollInfo] = useState(() => sessionStorage.getItem('scrollRestoration'));

    const scrollSave = useCallback(_.throttle(() => {
        const scrollPos = dom.scrollTop;
        setScrollInfo(scrollPos);
        sessionStorage.setItem('scrollRestoration', scrollPos);
    }, 500), [dom]);

    useEffect(() => {
        // 언마운트 이전에 실행되는데 왜 계속 0이 찍혀??
        if(dom){
            dom.addEventListener('scroll', scrollSave);
        }

        if(dom){
            return () => {
                dom.removeEventListener('scroll', scrollSave);
            }
        }
    }, [dom, scrollSave]);

    return {scrollInfo}
}

export default useScrollRestoration;