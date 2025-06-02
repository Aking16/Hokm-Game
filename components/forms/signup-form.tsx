"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorCard from "../custom-ui/error-card";
import SuccessCard from "../custom-ui/success-card";
import axiosInstance from "@/lib/axios";

interface SignUpFormProps {
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const SignUpForm: FC<SignUpFormProps> = ({ setSelectedTab }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setError("");
    setSuccess("");

    try {
      await axiosInstance.post("/auth/signup", values);

      setSuccess("حساب شما با موفقیت ساخته شد!");
    } catch {
      setError("خطا در ساخت حساب شما!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-3 px-1 py-1">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input placeholder="نام کاربری" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="رمز عبور" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تکرار رمز عبور</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="رمز عبور" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-1 text-sm">
          <UserPlus className="text-muted-foreground size-5" />
          <span>حساب دارید؟</span>
          <Button type="button" variant="link" className="px-0" onClick={() => setSelectedTab("login")}>اینجا کلیک کنید</Button>
        </div>
        <SuccessCard message={success} />
        <ErrorCard message={error} />
        <Button type="submit" className="w-full">ثبت نام</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;