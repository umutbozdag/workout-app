import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import WorkoutForm from "@/components/WorkoutForm.vue";
import Vuex from "vuex";
import { mockWorkoutData } from "./generateMockData";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("WorkoutForm.vue", () => {
  const store = new Vuex.Store({
    state: {
      workoutFormData: {
        title: "",
        description: "",
      },
    },
    actions: {
      addWorkout: jest.fn(),
      setWorkoutFormData: jest.fn(),
    },
  });

  const wrapper = mount(WorkoutForm, {
    store,
    localVue,
  });

  it("Changes title and description correctly", async () => {
    const workoutTitleInputEl = wrapper.find(
      ".workout-form__title .el-input__inner"
    );
    await workoutTitleInputEl.setValue(mockWorkoutData.title);

    const titleInputField: HTMLInputElement =
      workoutTitleInputEl.element as HTMLInputElement;

    expect(titleInputField.value).toBe(mockWorkoutData.title);

    const workoutTitleDesc = wrapper.find(
      ".workout-form__desc .el-textarea__inner"
    );
    await workoutTitleDesc.setValue(mockWorkoutData.description);
    const descInputField: HTMLInputElement =
      workoutTitleDesc.element as HTMLInputElement;

    expect(descInputField.value).toBe(mockWorkoutData.description);
  });

  it("Renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
