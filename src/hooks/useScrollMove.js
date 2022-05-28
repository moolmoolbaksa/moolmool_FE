import { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useScrollMove = ({path, dom}) => {
    // scrollY는 왜 계속 0임?
    console.log('랜더링')
    const history = useHistory();
    const [scrollInfo, setScrollInfo] = useState(() => sessionStorage.getItem('scrollRestoration'));
    const match = useRouteMatch(path);
    console.log(history.location.pathname, match, dom)
    
    // 무한 스크롤로 아이템이 추가되면 dom 트리가 변하기에 재실행
    const scrollSave = useCallback(() => {
        const scrollPos = dom ? dom.scrollTop : window.scrollY;
        console.log(dom, scrollPos, dom?.scrollTop, window.scrollY)
        setScrollInfo(scrollPos);
        return sessionStorage.setItem('scrollRestoration', scrollPos);
    }, [dom]);

    const scrollRemove = useCallback(() => {
        setScrollInfo(0);
        sessionStorage.removeItem('scrollRestoration');
    }, []);

    useEffect(() => {
        // 언마운트 될 떄 스크롤 위치를 스토리지에 저장
        return () => {
            console.log('실행')
            // if(match?.isExact && history.location.pathname !== path) {
            //     scrollSave();
            // }
            scrollSave();
        }
    }, [scrollSave]);
    // scrollSave, match
    return {scrollInfo, scrollRemove};
}

export default useScrollMove;