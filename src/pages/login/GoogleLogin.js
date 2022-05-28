import React from "react";
import { useDispatch } from "react-redux";
import { api as userActions } from "../../redux/modules/user";

const GoogleLogin = (props) => {
    const dispatch = useDispatch();

    let code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(() => {
        dispatch(userActions.googleLoginApi(code));
    }, []);

    return null;
};

export default GoogleLogin;