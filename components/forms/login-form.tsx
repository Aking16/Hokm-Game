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
import { loginFormSchema } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorCard from "../custom-ui/error-card";
import SuccessCard from "../custom-ui/success-card";
import axiosInstance from "@/lib/axios";

interface LoginFormProps {
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const LoginForm: FC<LoginFormProps> = ({ setSelectedTab }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError("");
    setSuccess("");

    try {
      await axiosInstance.post("/auth/login", values);

      setSuccess("ورود با موفقیت انجام شد!");
    } catch {
      setError("خطا در ورود!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                <Input placeholder="رمز عبور" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-1 text-sm">
          <UserPlus className="text-muted-foreground size-5" />
          <span>حساب ندارید؟</span>
          <Button type="button" variant="link" className="px-0" onClick={() => setSelectedTab("signup")}>اینجا کلیک کنید</Button>
        </div>
        <SuccessCard message={success} />
        <ErrorCard message={error} />
        <Button type="submit" className="w-full">ورود</Button>
      </form>
    </Form>
  );
};

export default LoginForm;