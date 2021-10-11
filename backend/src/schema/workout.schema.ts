import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    description: string()
      .required("Description is required")
      .min(20, "Description is too short - should be 40 chars minimum.")
      .max(240, "Description is too long - should be 240 chars maximum."),
  }),
};

const params = {
  params: object({
    workoutId: string().required("workoutId is required"),
  }),
};

export const createWorkoutSchema = object({
  ...payload,
});

export const updateWorkoutSchema = object({
  ...params,
  ...payload,
});

export const deleteWorkoutSchema = object({
  ...params,
});
