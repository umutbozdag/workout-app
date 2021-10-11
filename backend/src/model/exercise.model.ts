import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface ExerciseDocument extends mongoose.Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  exerciseId: string;
  completed: boolean;
  workoutId: string;
}

const ExerciseSchema = new mongoose.Schema(
  {
    exerciseId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    title: { type: String, default: true },
    description: { type: String, default: true },
    completed: { type: Boolean, default: false },
    workoutId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model<ExerciseDocument>("Exercise", ExerciseSchema);

export default Exercise;
