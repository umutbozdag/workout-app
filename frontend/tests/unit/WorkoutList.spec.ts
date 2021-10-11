import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import WorkoutList from "@/components/WorkoutList.vue";
import { generateMockData } from "./generateMockData";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockWorkoutsData = generateMockData("workouts", 10);

describe("WorkoutList.vue", () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        getWorkouts: jest.fn(),
      },
      getters: {
        filteredWorkouts: jest.fn(),
      },
    });
  });

  it("Renders WorkoutListItem component in it correctly if 'workouts' array has items", () => {
    const wrapper = shallowMount(WorkoutList, {
      store,
      localVue,
      computed: {
        workouts() {
          return mockWorkoutsData;
        },
      },
    });

    const workoutListComp = wrapper.findComponent({ name: "WorkoutListItem" }); // => finds WorkoutListItem by `name`
    expect(workoutListComp.exists()).toBe(true);
  });

  it("Renders empty component if 'workouts' array is empty", () => {
    const wrapper = mount(WorkoutList, {
      store,
      localVue,
      computed: {
        workouts() {
          return [];
        },
      },
    });

    const workoutListComp = wrapper.findComponent({ name: "WorkoutListItem" }); // => finds WorkoutListItem by `name`
    expect(workoutListComp.exists()).toBe(false);
  });

  it("Renders correctly with 'workouts' data", () => {
    const wrapper = mount(WorkoutList, {
      store,
      localVue,
      computed: {
        workouts() {
          return mockWorkoutsData;
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
