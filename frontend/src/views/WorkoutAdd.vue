<template>
  <el-row type="flex" justify="center">
    <div class="workout-add">
      <h2>Add workout</h2>
      <workout-form />
    </div>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
import WorkoutForm from "../components/WorkoutForm.vue";

export default Vue.extend({
  name: "WorkoutAdd",
  components: {
    WorkoutForm,
  },
});
</script>

<style lang="scss" scoped>
.workout-add {
  width: 300px;
}
</style>
