import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import Loading from "@/components/Loading.vue";
Vue.config.productionTip = false;
Vue.component("loading", Loading);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
