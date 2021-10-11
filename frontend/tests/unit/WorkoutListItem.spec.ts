import { mount } from "@vue/test-utils";
import WorkoutListItem from "@/components/WorkoutListItem.vue";
import { mockExerciseData } from "./generateMockData";

describe("WorkoutListItem.vue", () => {
  const wrapper = mount(WorkoutListItem, {
    propsData: {
      workoutId: mockExerciseData.workoutId,
      title: mockExerciseData.title,
      description: mockExerciseData.description,
      exerciseCount: 4,
      completed: mockExerciseData.completed,
    },
  });

  it("Props passes correctly", () => {
    expect(wrapper.props("workoutId")).toBe(mockExerciseData.workoutId);
    expect(wrapper.props("title")).toBe(mockExerciseData.title);
    expect(wrapper.props("description")).toBe(mockExerciseData.description);
    expect(wrapper.props("exerciseCount")).toBe(4);
    expect(wrapper.props("completed")).toBe(mockExerciseData.completed);
  });

  it("Contains 'workout-list-item' class", () => {
    expect(wrapper.classes()).toContain("workout-list-item");
  });

  it("Renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
