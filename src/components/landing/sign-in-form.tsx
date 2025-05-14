"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { signIn } from "@/auth/actions";
import { Button } from "../ui/button";

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      role: "user",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    await signIn(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insert your name...</FormLabel>
              <FormControl>
                <Input className="bg-white" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose your role...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? "user"}>
                  <FormItem className="flex items-center flex-nowrap">
                    <FormControl>
                      <RadioGroupItem value="user" />
                    </FormControl>
                    <FormLabel className="font-normal">User</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center flex-nowrap">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal">Admin</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center flex-nowrap">
                    <FormControl>
                      <RadioGroupItem value="super-admin" />
                    </FormControl>
                    <FormLabel className="font-normal">Super Admin</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full bg-[#4A8394] cursor-pointer" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
