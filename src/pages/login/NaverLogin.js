import React from "react";
import { useDispatch } from "react-redux";
import { api as userActions } from "../../redux/modules/user";

const NaverLogin = (props) => {
    const dispatch = useDispatch();

    let code = new URL(window.location.href).searchParams.get("code");
    let state = new URL(window.location.href).searchParams.get("state");

    React.useEffect(() => {
        dispatch(userActions.naverLoginApi({code, state}));
    }, []);

    return null;
};

export default NaverLogin;