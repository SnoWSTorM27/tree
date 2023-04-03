import React, { useState, useEffect, useContext } from "react";
import { useLocation, withRouter } from "react-router-dom";
import queryString from "query-string";

import vk from "../../../assets/icons8-vk-com.svg";
import styles from "./buttonVK.module.css";

const ButtonVK = () => {
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();
  // console.log(`"${process.env.REACT_APP_GOOGLE_CLIENT_ID}"`);

  // const host =
  //   process.env.REACT_APP_MODE === "production"
  //     ? process.env.REACT_APP_HOST_PROD
  //     : process.env.REACT_APP_HOST_LOCAL;

  const cbLink = `http://localhost:3000/login`;

  const handleRedirect = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=51526723&display=popup&redirect_uri=http://localhost:3000/login&scope=email&response_type=code&v=5.120`;
  };
  const handleRedirect2 = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=mobile&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.131`;
  };

  useEffect(() => {
    const handleLogin = (code) => {
      // store.loginVk(code)
      //   .then(() => {
      //     history.push("/login");
      //   })
      //   .catch(() => setIsError(true));
    };
    const queryObj = queryString.parse(search);

    // if (isError) window.location.href = cbLink;

    if (queryObj.code) handleLogin(queryObj.code);
  }, [search, isError, cbLink, history]);

  return (
    <div>
      <img
        onClick={handleRedirect2}
        src={vk}
        style={{ width: "3rem", height: "3rem", border: "1px gray solid", borderRadius: "50%" }}
        alt="google logo"
        role="button"
      />
    </div>
  );
};

export default withRouter(ButtonVK);
