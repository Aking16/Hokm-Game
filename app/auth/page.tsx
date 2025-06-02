"use client";

import LoginForm from "@/components/forms/login-form";
import SignUpForm from "@/components/forms/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4 container mx-auto">
      <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="w-full" dir="rtl">
        <TabsList className="w-full">
          <TabsTrigger value="login">ورود</TabsTrigger>
          <TabsTrigger value="signup">ثبت نام</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm setSelectedTab={setSelectedTab} />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm setSelectedTab={setSelectedTab} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
