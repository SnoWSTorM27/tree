import React, { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import ButtonVK from "../ui/buttonVK/buttonVK";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { RequestState } from "../../types/RequestState";
import ButtonYandex from "../ui/buttonYandex";
import ButtonGoogle from "../ui/buttonGoogle/buttonGoogle";

// import axios from "axios";
const PRIVATE_ROUTES = ["/login"];

const Login = observer(() => {
  // const { userVK, state, getProfile, logout } = useStore();
  // let history = useHistory();

  function handleCallbackResponse(response) {
    console.log("JWT ID token: ", response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  const [user, setUser] = useState({});
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");

  //   if (PRIVATE_ROUTES.includes(history.location.pathname) && !token)
  //     return history.push("/login");

  //   if (!userVK && state !== RequestState.LOADING && token) {
  //     getProfile().catch(() => {
  //       history.push("/login");
  //       logout();
  //     });
  //   }
  // }, [userVK, state, getProfile, logout, history]);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "380374464498-mg9suuoi9a3hjbi692nnjnfo5s08qpmg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    // google.accounts.id.renderButton(
    //   document.getElementById("signInDiv"),
    //   { type: "standart", theme: "outline", size: "large" }
    // );
    /* global YaAuthSuggest */
    //   YaAuthSuggest.init(
    //     {
    //         client_id: 'fe51041c99a540689282d3d04925d51b',
    //         response_type: 'token',
    //         redirect_uri: 'http://localhost:3000/login'
    //     },
    //     'http://localhost:3000'
    // )
    //     .then(({handler}) => handler())
    //     .then(data => console.log('Сообщение с токеном', data))
    //     .catch(error => console.log('Обработка ошибки', error));
  }, []);

  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  return (
    <>
      <div className="card shadow p-4 mx-3">
        <h1 className="text-center card-header">Войти</h1>
        <div className="card-body d-flex align-items-center justify-content-around">
          <div className="d-flex">
            <ButtonGoogle />
          </div>
          <div className="d-flex">
            <ButtonVK />
          </div>
          <div className="d-flex">
            <ButtonYandex />
          </div>
        </div>
      </div>
    </>
  );
});

export default Login;
