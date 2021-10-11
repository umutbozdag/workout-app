import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { ExerciseDocument } from "./exercise.model";

export interface WorkoutDocument extends mongoose.Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  workoutId: string;
  exercises: Array<any>;
  completed: boolean;
}

const WorkoutSchema = new mongoose.Schema(
  {
    workoutId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    title: { type: String, default: true },
    description: { type: String, default: true },
    exercises: { type: Array },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Workout = mongoose.model<WorkoutDocument>("Workout", WorkoutSchema);

export default Workout;
