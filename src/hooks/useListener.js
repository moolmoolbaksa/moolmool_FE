import { useEffect } from "react";

const useListener = ({eventType, listner, dom}) => {
    useEffect(() => {
        const domElement = dom.current;
        domElement.addEventListener(eventType, listner);
        return () => {
            domElement.removeEventListener(eventType, listner);
        }
    }, [eventType, listner, dom]);
};

export default useListener;