import * as yup from "yup";

export const playerNameSchema = yup.object().shape({
  playerName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
});

export type PlayerNameFormValues = yup.InferType<typeof playerNameSchema>;
