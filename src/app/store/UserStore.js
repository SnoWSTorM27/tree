// import { makeAutoObservable } from "mobx";

// import { RequestState } from "../types/RequestState";

// class UserStore {
//   userVK = {};
//   isAuth = false;
//   state = RequestState.PENDING;
//   constructor() {
//     makeAutoObservable(this);
//   }
//   setAuth(bool) {
//     this.isAuth = bool;
//   }
//   /* http://localhost:3000/auth/login/vk замокал ссылку для разработки*/
//   loginVk = (code) => {
//     this.state = RequestState.LOADING;

//     return fetch(`https://oauth.vk.com/access_token?client_id=51526723&client_secret=hoHhnZYbTFyZLNFEC3Bi&redirect_uri=http://localhost:3000/login&code=${code}`, {
//       method: "POST",
//       body: JSON.stringify({ code }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         switch (res.status) {
//           case 200:
//           case 201:
//             return res.json();
//           default:
//             this.setError();
//             return Promise.reject();
//         }
//       })
//       .then((userVK) => {
//         console.log(userVK);
//         this.setUser(userVK);
//         this.setAuth(true);
//       });
//   };

//   loginYa = (code) => {
//     this.state = RequestState.LOADING;

//     return fetch(`https://oauth.yandex.ru/authorize?grant_type=authorization_code&code=${code}&client_id=fe51041c99a540689282d3d04925d51b`, {
//       method: "POST",
//       body: JSON.stringify({ code }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         switch (res.status) {
//           case 200:
//           case 201:
//             return res.json();
//           default:
//             this.setError();
//             return Promise.reject();
//         }
//       })
//       .then((userVK) => {
//         console.log(userVK);
//         this.setUser(userVK);
//         this.setAuth(true);
//       });
//   };

//   getProfile = () => {
//     this.state = RequestState.LOADING;
//     const token = sessionStorage.getItem("token");

//     if (!token) Promise.reject();

//     return fetch(`http://localhost:3000/users/profile`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         switch (res.status) {
//           case 200:
//           case 201:
//             return res.json();
//           default:
//             this.setError();
//             return Promise.reject();
//         }
//       })
//       .then((userVK) => this.setUser(userVK));
//   };

//   logout = () => {
//     this.userVK = null;
//     this.setAuth(false);
//     sessionStorage.clear();
//     this.state = RequestState.PENDING;
//   };

//   setUser = (userVK) => {
//     this.userVK = userVK;
//     this.state = RequestState.SUCCESS;

//     if (userVK["token"]) {
//       sessionStorage.setItem("token", userVK.token);
//     }
//   };

//   setError = () => {
//     this.state = RequestState.ERROR;
//   };
// }

// export default UserStore;
