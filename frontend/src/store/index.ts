import Vue from "vue";
import Vuex from "vuex";
import { IWorkout, IExercise } from "../interfaces";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    workouts: [] as IWorkout[],
    workoutDetail: {} as IWorkout,
    currentExerciseFormData: {} as IExercise,
    workoutFormData: {
      title: "",
      description: "",
    } as IWorkout,
    workoutSearchText: "",
  },
  getters: {
    filteredWorkouts(state) {
      if (state.workoutSearchText) {
        return state.workouts.filter((w: IWorkout) =>
          w.title.toLowerCase().includes(state.workoutSearchText.toLowerCase())
        );
      }
    },
  },
  mutations: {
    getWorkoutsHandler(state, workouts: IWorkout[]) {
      state.workouts = workouts;
    },
    getWorkoutDetailHandler(state, workout: IWorkout) {
      state.workoutDetail = workout;
    },
    addWorkoutHandler(state, workout: IWorkout) {
      state.workouts.push(workout);
    },
    updateWorkoutHandler(state, workout: IWorkout) {
      const workoutIdx = state.workouts.findIndex(
        (w) => w.workoutId === workout.workoutId
      );

      if (workoutIdx > -1) {
        Vue.set(state.workouts, workoutIdx, workout);
      }
    },
    deleteWorkoutHandler(state, workout: IWorkout) {
      const workoutIdx = state.workouts.findIndex(
        (w) => w.workoutId === workout.workoutId
      );

      if (workoutIdx > -1) {
        state.workouts.splice(workoutIdx, 1);
      }
    },
    setCurrentExerciseFormDataHandler(state, exercise: IExercise) {
      state.currentExerciseFormData = exercise;
    },
    updateExerciseHandler(state, exercise: IExercise) {
      const exerciseIdx = state.workoutDetail.exercises?.findIndex(
        (exercise) => exercise.exerciseId === exercise.exerciseId
      );

      if (exerciseIdx! > -1) {
        Vue.set(state.workoutDetail.exercises!, exerciseIdx!, exercise);
      }
    },
    deleteExerciseHandler(state, exerciseId: string) {
      const exerciseIdx = state.workoutDetail.exercises?.findIndex(
        (exercise) => exercise.exerciseId === exerciseId
      );

      if (exerciseIdx! > -1) {
        state.workoutDetail, exerciseIdx, exerciseId;
        state.workoutDetail.exercises?.splice(exerciseIdx!, 1);
      }
    },
    addExerciseHandler(state, exercise: IExercise) {
      state.workoutDetail.exercises?.push(exercise);
    },
    setWorkoutFormDataHandler(state, workout: IWorkout) {
      state.workoutFormData = workout;
    },
    setWorkoutSearchTextHandler(state, searchText: string) {
      state.workoutSearchText = searchText;
    },
  },
  actions: {
    async getWorkouts({ commit }) {
      try {
        const workoutsResponse = await Vue.prototype.$axios.get(
          `${process.env.VUE_APP_API_URL}/workouts`
        );
        commit("getWorkoutsHandler", workoutsResponse.data);
        return workoutsResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    async getWorkoutDetail({ commit }, workoutId: string) {
      try {
        const workoutDetailResponse = await Vue.prototype.$axios.get(
          `${process.env.VUE_APP_API_URL}/workouts/${workoutId}`
        );
        commit("getWorkoutDetailHandler", workoutDetailResponse.data);
        return workoutDetailResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    async addWorkout({ commit }, workout: IWorkout) {
      try {
        const addedWorkoutResponse = await Vue.prototype.$axios.post(
          `${process.env.VUE_APP_API_URL}/workouts`,
          {
            title: workout.title,
            description: workout.description,
          }
        );
        commit("addWorkoutHandler", addedWorkoutResponse.data);
        return addedWorkoutResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    async updateWorkout(
      { commit },
      { workoutId, data }: { workoutId: string; data: IWorkout }
    ) {
      try {
        const updatedWorkoutResponse = await Vue.prototype.$axios.put(
          `${process.env.VUE_APP_API_URL}/workouts/${workoutId}`,
          data
        );
        commit("updateWorkoutHandler", updatedWorkoutResponse.data);
        return updatedWorkoutResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    async deleteWorkout({ commit }, workoutId: string) {
      try {
        const deletedWorkoutResponse = await Vue.prototype.$axios.delete(
          `${process.env.VUE_APP_API_URL}/workouts/${workoutId}`
        );
        commit("deleteWorkoutHandler", deletedWorkoutResponse.data);
        return deletedWorkoutResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    setCurrentExerciseFormData({ commit }, rowData: IExercise) {
      commit("setCurrentExerciseFormDataHandler", rowData);
    },
    async updateExercise(
      { commit },
      { exerciseId, data }: { exerciseId: string; data: IExercise }
    ) {
      try {
        const updatedExerciseResponse = await Vue.prototype.$axios.put(
          `${process.env.VUE_APP_API_URL}/exercises/${exerciseId}`,
          data
        );
        commit("updateExerciseHandler", updatedExerciseResponse.data);
        return updatedExerciseResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    async deleteExercise({ commit }, exerciseId: string) {
      try {
        const deletedExerciseResponse = await Vue.prototype.$axios.delete(
          `${process.env.VUE_APP_API_URL}/exercises/${exerciseId}`
        );

        commit("deleteExerciseHandler", exerciseId);
        return deletedExerciseResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    async addExercise({ commit }, data: IExercise) {
      try {
        const addedExerciseResponse = await Vue.prototype.$axios.post(
          `${process.env.VUE_APP_API_URL}/exercises`,
          data
        );
        commit("addExerciseHandler", addedExerciseResponse.data);
        return addedExerciseResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    setWorkoutFormData({ commit }, formData: IWorkout) {
      commit("setWorkoutFormDataHandler", formData);
    },
    setWorkoutSearchText({ commit }, searchText: string) {
      commit("setWorkoutSearchTextHandler", searchText);
    },
  },
});

export default store;
