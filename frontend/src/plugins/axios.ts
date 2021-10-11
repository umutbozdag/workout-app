import axios from "axios";
import _Vue from "vue";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default {
  install(Vue: any) {
    Vue.prototype.$axios = instance;
  },
};
