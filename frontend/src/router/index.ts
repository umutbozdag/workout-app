import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import WorkoutDetail from "../views/WorkoutDetail.vue";
import WorkoutAdd from "../views/WorkoutAdd.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/workouts/add",
    name: "WorkoutAdd",
    component: WorkoutAdd,
  },
  {
    path: "/workouts/:workoutId",
    name: "WorkoutDetail",
    component: WorkoutDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
