<template>
  <div class="workout-list-container">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <h2>Workouts</h2>
      </el-col>

      <el-col :span="12" :offset="12">
        <el-button
          type="primary"
          size="small"
          plain
          icon="el-icon-plus"
          @click="pushToAddWorkout"
          >Add workout</el-button
        >
      </el-col>
    </el-row>
    <el-input
      v-model="searchText"
      prefix-icon="el-icon-search"
      placeholder="Workout name"
      clearable
    >
    </el-input>

    <el-divider></el-divider>

    <div
      v-if="computedWorkoutsData && computedWorkoutsData.length"
      class="workout-list"
    >
      <workout-list-item
        v-for="workout in computedWorkoutsData"
        :key="workout.workoutId"
        :title="workout.title"
        :description="workout.description"
        :completed="workout.exercises.every((exercise) => exercise.completed)"
        :workout-id="workout.workoutId"
        :exerciseCount="workout.exercises.length"
      />
    </div>

    <el-empty description="No workouts." v-else>
      <el-button type="primary" @click="pushToAddWorkout"
        >Add Workout</el-button
      >
    </el-empty>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { IWorkout } from "../interfaces";
import WorkoutListItem from "./WorkoutListItem.vue";

export default Vue.extend({
  name: "WorkoutList",
  components: { WorkoutListItem },
  data() {
    return {
      searchText: "",
    };
  },
  async mounted() {
    await this.getWorkouts();
  },
  watch: {
    searchText(newVal: string) {
      this.setWorkoutSearchText(newVal);
    },
  },
  methods: {
    ...mapActions(["getWorkouts", "setWorkoutSearchText"]),
    pushToAddWorkout() {
      this.$router.push({ name: "WorkoutAdd" });
    },
  },
  computed: {
    ...mapState(["workouts"]),
    ...mapGetters(["filteredWorkouts"]),
    computedWorkoutsData() {
      if (this.filteredWorkouts && this.filteredWorkouts) {
        return this.filteredWorkouts;
      } else {
        return this.workouts;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.workout-list {
  height: 500px;
  overflow-y: auto;
  &-item {
    margin-bottom: 18px;
    margin-right: 12px;
  }
}
</style>
