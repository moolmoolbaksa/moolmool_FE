import React from 'react';
import { useDispatch } from 'react-redux';
import { api as userApi } from '../redux/modules/user';
const LoginProgress = (props) => {
    const dispatch = useDispatch();

    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code)
    React.useEffect(() => {
      dispatch(userApi.kakaoLogin(code));
    }, []);
  
    return null;
  };

export default LoginProgress;