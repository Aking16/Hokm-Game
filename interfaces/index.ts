import { z } from "zod";

export const signUpFormSchema = z.object({
  username: z.string({
    required_error: "نام کاربری الزامی است"
  }).min(2, {
    message: "نام کاربری باید حداقل 2 کاراکتر باشد."
  }),
  password: z.string({
    required_error: "رمز عبور الزامی است.",
  }).min(6, {
    message: "رمز عبور باید حداقل 6 کاراکتر باشد."
  }),
  confPassword: z.string({
    required_error: "تایید رمز عبور الزامی است.",
  }).min(6, {
    message: "تایید رمز عبور باید حداقل 6 کاراکتر باشد."
  })
}).refine((data) => data.password === data.confPassword, {
  message: "رمز عبور و تایید آن مطابقت ندارند!",
  path: ["confPassword"],
});

export const loginFormSchema = z.object({
  username: z.string({
    required_error: "نام کاربری الزامی است"
  }).min(2, {
    message: "نام کاربری باید حداقل 2 کاراکتر باشد."
  }),
  password: z.string({
    required_error: "رمز عبور الزامی است.",
  })
});