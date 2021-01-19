import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';


const Login = (props) => {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    /*alert(
      `Logged in successfully welcome ${res.profileObj.name}.\n 😍 \n`
    );*/

    props.saveToken(res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.\n 😢 \n`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
