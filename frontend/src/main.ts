import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AxiosPlugin from "./plugins/axios";
import locale from "element-ui/lib/locale/lang/en";
import UtilsPlugin from "./plugins/utils";

Vue.config.productionTip = false;
Vue.use(Element, { locale });
Vue.use(AxiosPlugin);
Vue.use(UtilsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
