<template>
  <div id="app">
    <navigation />
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script lang="ts">
import Navigation from "./components/TheNavigation.vue";
import { mapActions, mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {
    Navigation,
  },
  methods: {
    ...mapActions(["setWorkoutFormData", "setCurrentExerciseFormData"]),
  },
  watch: {
    $route() {
      this.setWorkoutFormData({ title: "", description: "", exercises: [] });
      this.setCurrentExerciseFormData({});
    },
  },
});
</script>

<style lang="scss">
@import "./styles/normalize.scss";
</style>
