import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";

import { AuthContext } from "../AuthContext";
import { CLIENT_ID } from "../config";

const GoogleLogIn = () => {
  const auth = useContext(AuthContext);

  const responseGoogleSuccess = (response) => {
    auth.login(response.googleId);
  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFail}
        cookiePolicy={"single_host_origin"}
        theme="dark"
      />
      <p>Want to see your personalized feed? Login above with your Google account!</p>
    </div>
  );
};

export default GoogleLogIn;
