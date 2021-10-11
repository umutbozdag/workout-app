import axios from "axios";
import _Vue from "vue";
import utils from "../utils/index";

export default {
  install(Vue: any) {
    Vue.prototype.$utils = utils;
  },
};
