<template>
  <div class="home">
    <workout-list />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WorkoutList from "../components//WorkoutList.vue";

export default Vue.extend({
  name: "Home",
  components: {
    WorkoutList,
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
}
</style>
