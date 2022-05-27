import React from 'react';
import { useDispatch } from 'react-redux';

import { api as userActions } from '../../redux/modules/user';

const KaKaoLogin = (props) => {
    const dispatch = useDispatch();

    const code = new URL(window.location.href).searchParams.get("code");
  
    React.useEffect(() => {
      dispatch(userActions.kakaoLoginApi(code));
    }, []);
  
    return null;
};

export default KaKaoLogin;