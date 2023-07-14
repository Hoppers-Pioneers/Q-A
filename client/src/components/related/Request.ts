import axios from "axios";
const Request = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/',
  auth: {
    "Authorization": import.meta.env.VITE_AUTH_TOKEN
  },
  count: 0,
  get: () => {
//    console.log(Request.count++);
    return  axios.get(Request.url + 'products', {
      headers: Request.auth,
      params: {
        "sort": "newest",
        "product_id": 1
      }
    });
  },
  getById: (id: number) => {
//    console.log(Request.count++);
    return axios.get(Request.url + `products/${id}`, {
      headers: Request.auth
    });
  },
  getRelated: (id : number) => {
//    console.log(Request.count++);
    return axios.get(Request.url + `products/${id}/related`, {
      headers: Request.auth
    });
  },
  getStyles: (id : number) => {
//    console.log(Request.count++);\
    return axios.get(Request.url + `products/${id}/styles`, {
      headers: Request.auth,
      params: {
        "product_id": id
      }
    })
  },
  getRatings: (id: number) => {
//    console.log(Request.count++);
// console.count();
    return axios.get(Request.url + 'reviews/meta', {
      headers: Request.auth,
      params: {
        "product_id": id
      }
    })
  }
};

export default Request;