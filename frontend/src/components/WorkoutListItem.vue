<template>
  <div class="workout-list-item" @click="handleOnItemClick(workoutId)">
    <div class="workout-list-item__info">
      <h3 class="workout-list-item__title">{{ title }}</h3>
      <p class="workout-list-item__desc">{{ description }}</p>
      <p v-if="completed && exerciseCount" class="workout-list-item__completed">
        Workout is completed
      </p>

      <div class="workout-list-item__exercise-count">
        <template v-if="exerciseCount === 0"> No exercises found. </template>
        <template v-if="exerciseCount > 1">
          {{ exerciseCount }} Exercises
        </template>
        <template v-if="exerciseCount === 1">
          {{ exerciseCount }} Exercise
        </template>
      </div>
    </div>

    <i class="el-icon-right workout-list-item__icon"></i>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "WorkoutListItem",
  props: {
    workoutId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    exerciseCount: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOnItemClick(workoutId: string) {
      this.$router.push({
        name: "WorkoutDetail",
        params: {
          workoutId,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.workout-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 2px 3px $primary;
  width: 620px;
  transition: 0.3s;
  cursor: pointer;
  border: 2px solid $primary;

  &:hover {
    box-shadow: 4px 6px $primary;
  }

  &__title {
    color: $primary-text;
    margin-top: 6px;
  }

  &__desc {
    color: $regular-text;
    margin-top: -6px;
    margin-bottom: 24px;
    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__exercise-count {
    color: $regular-text;
  }

  &__completed {
    color: $success;
  }

  &__icon {
    font-size: 32px;
  }
}
</style>
