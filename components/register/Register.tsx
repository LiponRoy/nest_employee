"use client";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextInput } from "../FormInputs";
import { Button } from "../ui/button";
import { Modal } from "../Modal";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  // .regex(/^[a-zA-Z\s]+$/, {
  // 	message: "Name must only contain letters and spaces",
  // }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  //for modal
  const [isOpen, setIsOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {};

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-orange-50">
		
      <Button onClick={() => setIsOpen(true)}>Register</Button>

      <Modal title="Register" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex bg-white shadow-inner rounded-lg overflow-hidden max-w-full">
          <div className="flex flex-col flex-1 justify-center p-8">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <TextInput name="name" label="Name" />
                <TextInput name="email" label="Email" />
                <div className="relative">
                  <TextInput
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <div
                    className="absolute right-3 top-10 cursor-pointer "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash color="#6d6d6d" />
                    ) : (
                      <FaEye color="#6d6d6d" />
                    )}
                  </div>
                </div>

                <Button
                  title="Sign Up"
                  className="w-full bg-slate-500 text-white"
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
