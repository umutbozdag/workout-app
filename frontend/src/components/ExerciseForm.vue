<template>
  <el-form
    :model="currentExerciseFormData"
    :rules="exerciseFormRules"
    ref="exerciseForm"
  >
    <el-form-item label="Title" prop="title">
      <el-input v-model="currentExerciseFormData.title"></el-input>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input
        type="textarea"
        v-model="currentExerciseFormData.description"
      ></el-input>
    </el-form-item>

    <el-form-item label="Completed" prop="completed">
      <el-switch v-model="currentExerciseFormData.completed"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "ExerciseForm",
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      exerciseFormRules: {
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
    ...mapActions(["setCurrentExerciseFormData"]),
  },
  computed: {
    ...mapState(["currentExerciseFormData"]),
  },
  mounted() {
    if (this.type === "add") {
      this.setCurrentExerciseFormData({});
    }
  },
});
</script>

<style></style>
