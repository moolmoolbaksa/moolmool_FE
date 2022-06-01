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
        if(dom){
            dom.addEventListener('scroll', scrollSave);
        
            return () => {
                dom.removeEventListener('scroll', scrollSave);
            }
        }
    }, [dom, scrollSave]);

    return {scrollInfo}
};

export default useScrollRestoration;