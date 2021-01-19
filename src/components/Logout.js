import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

const Logout = (props) => {
  const onSuccess = () => {
    console.log('Logout made successfully');
    //alert('Logout made successfully.\n ✌ \n');
    props.saveToken(null, false);
    props.clearLocalStorage();
  };


  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
