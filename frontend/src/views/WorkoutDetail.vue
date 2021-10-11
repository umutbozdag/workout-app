<template>
  <div class="workout-detail" v-if="workoutDetail">
    <div class="workout-detail__info">
      <h2 class="workout-detail___title">{{ workoutDetail.title }}</h2>
      <p class="workout-detail__desc">{{ workoutDetail.description }}</p>
    </div>

    <exercises-table />

    <el-row
      type="flex"
      justify="space-between"
      align="center"
      class="workout-detail__delete"
    >
      <el-col> </el-col>
      <el-col :span="12" :offset="12">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="handleOnDeleteWorkout"
          >Delete workout</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import ExercisesTable from "../components/ExercisesTable.vue";

export default Vue.extend({
  components: {
    ExercisesTable,
  },
  computed: {
    ...mapState(["workoutDetail", "currentExerciseFormData"]),
  },

  methods: {
    ...mapActions(["getWorkoutDetail", "deleteWorkout"]),
    async handleOnDeleteWorkout() {
      this.$confirm(
        "This will permanently delete the workout. Continue?",
        "Delete workout",
        {
          confirmButtonText: "DELETE",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          await this.deleteWorkout(this.$route.params.workoutId);
          this.$message({
            type: "success",
            message: "Workout successfully deleted.",
          });
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Deleting workout canceled.",
          });
        });
    },
  },
  async mounted() {
    await this.getWorkoutDetail(this.$route.params.workoutId);
  },
});
</script>

<style lang="scss" scoped>
.workout-detail {
  &__info {
    margin-bottom: 60px;
  }

  &__desc {
    color: $regular-text;
  }

  &__delete {
    margin-top: 32px;
  }
}
</style>
