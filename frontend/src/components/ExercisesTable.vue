<template>
  <div>
    <el-row
      class="workout-detail__exercises-header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <el-col>
        <h3 class="workout-detail__exercises-title">Exercises</h3>
      </el-col>

      <el-col
        v-if="workoutDetail.exercises && workoutDetail.exercises.length"
        :span="12"
        :offset="12"
      >
        <el-button
          type="primary"
          size="small"
          plain
          icon="el-icon-plus"
          @click="handleOnOpenModal('add')"
          >Add new exercise</el-button
        >
      </el-col>
    </el-row>
    <el-table
      class="workout-detail__table"
      :data="workoutDetail.exercises"
      highlight-current-row
      height="325"
    >
      <el-table-column label="Title" prop="title" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="Description"
        prop="description"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        label="Create date"
        prop="createdAt"
        :formatter="
          (row, column, cellValue) =>
            $utils.convertDateStrToUTCDateStr(cellValue)
        "
      >
      </el-table-column>
      <el-table-column
        label="Last updated date"
        prop="updatedAt"
        :formatter="
          (row, column, cellValue) =>
            $utils.convertDateStrToUTCDateStr(cellValue)
        "
      >
      </el-table-column>
      <el-table-column
        label="Completed"
        prop="completed"
        class-name="workout-detail__table-completed"
        :formatter="
          (row, column, cellValue) =>
            cellValue ? 'Completed' : 'Not completed'
        "
      >
      </el-table-column>

      <template slot="empty">
        <el-col>
          <div>No exercises found.</div>
          <el-button type="primary" plain @click="handleOnOpenModal('add')"
            >Add new exercise</el-button
          >
        </el-col>
      </template>
      <el-table-column>
        <template slot-scope="scope">
          <el-row type="flex">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleOnOpenModal('edit', scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleOnOpenModal('delete', scope.$index, scope.row)"
              >Delete</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <exercise-dialog
      title="Edit exercise"
      type="edit"
      :visible="editDialogVisible"
      @canceled="handleOnModalAction('edit', 'canceled')"
      @confirmed="handleOnModalAction('edit', 'confirmed')"
      @close="handleOnCloseModal"
    >
      <exercise-form type="edit" />
    </exercise-dialog>
    <exercise-dialog
      title="Delete exercise"
      type="delete"
      :visible="deleteDialogVisible"
      @canceled="handleOnModalAction('delete', 'canceled')"
      @confirmed="handleOnModalAction('delete', 'confirmed')"
      @close="handleOnCloseModal"
    >
      <span v-if="Object.keys(currentExerciseFormData).length">
        <i class="el-icon-delete"></i> Delete exercise
        {{ currentExerciseFormData.title }}
      </span>
    </exercise-dialog>

    <exercise-dialog
      title="Add exercise"
      type="add"
      :visible="addDialogVisible"
      @canceled="handleOnModalAction('add', 'canceled')"
      @confirmed="handleOnModalAction('add', 'confirmed')"
      @close="handleOnCloseModal"
    >
      <exercise-form type="add" />
    </exercise-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ExerciseDialog from "./ExerciseDialog.vue";
import ExerciseForm from "./ExerciseForm.vue";
import { mapActions, mapState } from "vuex";
import { IExercise, ModalActionTypes, ModalTypes } from "../interfaces";

export default Vue.extend({
  components: { ExerciseDialog, ExerciseForm },
  data() {
    return {
      editDialogVisible: false,
      deleteDialogVisible: false,
      addDialogVisible: false,
    };
  },
  computed: {
    ...mapState(["workoutDetail", "currentExerciseFormData"]),
  },

  methods: {
    ...mapActions([
      "getWorkoutDetail",
      "setCurrentExerciseFormData",
      "updateExercise",
      "deleteExercise",
      "addExercise",
      "deleteWorkout",
    ]),
    handleOnOpenModal(
      modalType: ModalTypes,
      index: number,
      rowData: IExercise
    ) {
      if (modalType === "add") {
        this.addDialogVisible = true;
      } else if (modalType === "edit") {
        this.setCurrentExerciseFormData(rowData);
        this.editDialogVisible = true;
      } else {
        this.setCurrentExerciseFormData(rowData);
        this.deleteDialogVisible = true;
      }
    },
    handleOnCloseModal() {
      this.addDialogVisible = false;
      this.editDialogVisible = false;
      this.deleteDialogVisible = false;
    },
    async handleOnModalAction(
      modalType: ModalTypes,
      actionType: ModalActionTypes
    ) {
      if (modalType === "edit") {
        if (actionType === "confirmed") {
          await this.updateExercise({
            exerciseId: this.currentExerciseFormData.exerciseId,
            data: {
              ...this.currentExerciseFormData,
            },
          });
          this.$notify({
            title: "Success!",
            type: "success",
            message: "Exercise updated!",
          });
        }

        this.setCurrentExerciseFormData({});
        this.editDialogVisible = false;
      } else if (modalType === "delete") {
        if (actionType === "confirmed") {
          await this.deleteExercise(this.currentExerciseFormData.exerciseId);
          this.$notify({
            title: "Success!",
            type: "success",
            message: "Exercise deleted!",
          });
        }
        this.setCurrentExerciseFormData({});
        this.deleteDialogVisible = false;
      } else {
        if (actionType === "confirmed") {
          await this.addExercise({
            ...this.currentExerciseFormData,
            workoutId: this.$route.params.workoutId,
          });
          this.$notify({
            title: "Success!",
            type: "success",
            message: "Exercise added!",
          });
        }

        this.setCurrentExerciseFormData({});
        this.addDialogVisible = false;
      }
    },
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
});
</script>

<style></style>
