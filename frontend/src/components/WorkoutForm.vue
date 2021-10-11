<template>
  <el-form
    :model="workoutFormData"
    :rules="workoutFormRules"
    ref="workoutForm"
    class="workout-form"
  >
    <el-form-item class="workout-form__title" label="Title" prop="title">
      <el-input
        class="workout-form__title-input"
        v-model="workoutFormData.title"
      ></el-input>
    </el-form-item>

    <el-form-item
      class="workout-form__desc"
      label="Description"
      prop="description"
    >
      <el-input
        type="textarea"
        class="workout-form__title-textarea"
        v-model="workoutFormData.description"
      ></el-input>
    </el-form-item>

    <el-button
      type="primary"
      :disabled="isAddWorkoutDisabled"
      @click="handleOnAddWorkout"
      >Add Workout</el-button
    >
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { IWorkout } from "../interfaces";

export default Vue.extend({
  name: "WorkoutForm",
  data() {
    return {
      workoutFormRules: {
        title: [
          {
            required: true,
            message: "Please type a Exercise title",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please type a Exercise description",
            trigger: "blur",
          },
          {
            min: 20,
            max: 240,
            message: "Length should be 20 to 240",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["addWorkout", "setWorkoutFormData"]),
    handleOnAddWorkout() {
      this.$refs["workoutForm"].validate(async (valid: boolean) => {
        if (valid) {
          try {
            const addedWorkout: IWorkout = await this.addWorkout(
              this.workoutFormData
            );
            this.$notify({
              title: "Success!",
              message: "Workout added successfully",
              type: "success",
            });
            this.$router.push({
              name: "WorkoutDetail",
              params: { workoutId: addedWorkout.workoutId },
            });
            this.setWorkoutFormData({
              title: "",
              description: "",
            });
          } catch (e) {
            this.$notify({
              title: "Error!",
              message: e,
              type: "error",
            });
          }
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    ...mapState(["workoutFormData"]),
    isAddWorkoutDisabled() {
      return (
        !this.workoutFormData.title ||
        !this.workoutFormData.description ||
        this.workoutFormData.description.length < 20 ||
        this.workoutFormData.description.length > 240
      );
    },
  },
});
</script>

<style></style>
