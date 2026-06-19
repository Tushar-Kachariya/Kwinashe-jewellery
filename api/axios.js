import axios from "axios";

const api = axios.create({
  // baseURL: "https://api.weingenious.in/kwinashe/api",
  // baseURL: "http://192.168.1.178:8888/kohira-next-lara/lmda-ctrl-zeta-layer",
  baseURL: "https://api.weingenious.in/kohira/lmda-ctrl-zeta-layer",
  // baseURL: "http://192.168.1.178:8888/kohira-next-lara/public/api",
  // baseURL: "http://localhost/diora_adams/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://192.168.1.178:8888/kohira-next-lara/public/api",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
// });

// export default api;