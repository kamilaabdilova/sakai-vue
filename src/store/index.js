import { createStore } from 'vuex'


import auth from '@/store/auth'


const store = createStore({
  modules: {
    auth
  }
})

export function useStore() {
  return store
}

export default store
// import { createStore } from 'vuex';
// import { auth } from './auth.module';
//
// let url = '';
// if (window.location.hostname === 'localhost') {
//   url = 'https://localhost:8080';
// }
// // if (window.location.hostname === 'green-desert-021865b10.3.azurestaticapps.net') {
// //   url = 'https://bcf-backend.azurewebsites.net/';
// // }
//
// const store = createStore({
//
//   modules: {
//     auth
//   },
//   state: {
//     API_URI: url
//   }
// });
//
// export default store;