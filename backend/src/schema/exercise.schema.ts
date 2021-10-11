import { object, string } from "yup";

const payload = {
  description: object({
    title: string().required("Title is required"),
    description: string()
      .required("Description is required")
      .min(20, "Description is too short - should be 20 chars minimum.")
      .max(240, "Description is too long - should be 240 chars maximum."),
  }),
};

const params = {
  params: object({
    exerciseId: string().required("exerciseId is required"),
  }),
};

export const createExerciseSchema = object({
  ...payload,
});

export const updateExerciseSchema = object({
  ...params,
  ...payload,
});

export const deleteExerciseSchema = object({
  ...params,
});
