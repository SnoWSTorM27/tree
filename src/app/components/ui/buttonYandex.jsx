import React, { useState, useEffect, useContext } from "react";
import { useLocation, withRouter } from "react-router-dom";
import queryString from "query-string";
import yandex from "../../assets/yandex.svg";

const ButtonYandex = () => {
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();

  const cbLink = `http://localhost:3000/login`;

  const handleSignInYandex = () => {
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.REACT_APP_YANDEX_CLIENT_ID}&redirect_uri=${cbLink}&force_confirm=yes`;
  };

  // useEffect(() => {
  //   const handleLogin = (code) => {
  //     store.loginYa(code)
  //       .then(() => {
  //         history.push("/login");
  //       })
  //       .catch(() => setIsError(true));
  //   };

  //   let queryObj = queryString.parse(search);

  //   // if (isError) window.location.href = cbLink;

  //   if (!isEmptyObj(queryObj) && queryObj.code) handleLogin(queryObj.code);
  // }, [search, isError, cbLink, history, store]);

  return (
    <>
      <div>
        <img
          onClick={handleSignInYandex}
          src={yandex}
          style={{ width: "3rem", height: "3rem", border: "1px gray solid", borderRadius: "50%" }}
          alt="google logo"
          role="button"
        />
      </div>
    </>
  );
};

export default withRouter(ButtonYandex);
