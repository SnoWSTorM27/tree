import React, { useState, useEffect, useContext } from "react";
import { useLocation, withRouter } from "react-router-dom";
import queryString from "query-string";

import g from "../../../assets/icons8-google.svg";
import styles from "./buttonGoogle.module.css";

const ButtonGoogle = () => {
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();
  // console.log(`"${process.env.REACT_APP_GOOGLE_CLIENT_ID}"`);

  // const host =
  //   process.env.REACT_APP_MODE === "production"
  //     ? process.env.REACT_APP_HOST_PROD
  //     : process.env.REACT_APP_HOST_LOCAL;

  const cbLink = `http://localhost:3000/login`;

  const handleRedirect = () => {
    // console.log(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=openid%20profile&redirect_uri=${cbLink}`);
    // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=openid%20profile&redirect_uri=${cbLink}`;
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=380374464498-mg9suuoi9a3hjbi692nnjnfo5s08qpmg.apps.googleusercontent.com&scope=openid%20profile&redirect_uri=http://localhost:3000/login&access_type=offline`;
  };
  const handleRedirect2 = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=openid%20profile&redirect_uri=${cbLink}&access_type=offline`;
    // window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=page&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.131`;
  };

  useEffect(() => {
    const handleLogin = (code) => {
      // store.loginVk(code)
      //   .then(() => {
      //     history.push("/login");
      //   })
      //   .catch(() => setIsError(true));
      console.log(code);
    };
    const queryObj = queryString.parse(search);

    // if (isError) window.location.href = cbLink;

    if (queryObj.code) handleLogin(queryObj.code);
  }, [search, isError, cbLink, history]);

  return (
    <div>
      <img
        onClick={handleRedirect2}
        src={g}
        style={{ width: "3rem", height: "3rem", border: "1px gray solid", borderRadius: "50%" }}
        alt="google logo"
        role="button"
      />
    </div>
  );
};

export default ButtonGoogle;
