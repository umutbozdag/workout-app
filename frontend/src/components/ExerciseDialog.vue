<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visible"
      width="50%"
      @close="$emit('close')"
    >
      <slot> </slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('canceled')">Cancel</el-button>
        <el-button
          v-if="type === 'add' || type === 'edit'"
          type="primary"
          :disabled="isConfirmDisabled"
          @click="$emit('confirmed')"
          >Confirm</el-button
        >
        <el-button
          v-if="type === 'delete'"
          type="danger"
          @click="$emit('confirmed')"
          >Delete</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ExerciseDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
  },
  computed: {
    ...mapState(["currentExerciseFormData"]),
    isConfirmDisabled() {
      return (
        !this.currentExerciseFormData.title ||
        !this.currentExerciseFormData.description ||
        this.currentExerciseFormData.description.length < 20 ||
        this.currentExerciseFormData.description.length > 240
      );
    },
  },
});
</script>

<style></style>
