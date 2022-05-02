import React from 'react';
import { useDispatch } from 'react-redux';

import { api as userApi } from '../redux/modules/user';

const LoginProgress = (props) => {
    const dispatch = useDispatch();

    const code = new URL(window.location.href).searchParams.get("code");
  
    React.useEffect(() => {
      dispatch(userApi.kakaoLoginApi(code));
    }, []);
  
    return null;
};

export default LoginProgress;