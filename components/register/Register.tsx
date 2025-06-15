"use client";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {TextInput } from "../FormInputs";
import { Button } from "../ui/button";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeRegisterModal } from "@/redux/slices/registerFormModalSlice";
import { useSignupMutation } from "@/redux/rtk/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
  role: z.enum(["job_seeker"], {
    required_error: "Please select a role",
  }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const router = useRouter();
  const [signup,] = useSignupMutation();
  //for modal
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.registerFormModal.isOpen);
  //end for modal
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "job_seeker", // Default value set to "job_seeker"
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log("modal data: ", data);
    try {
      await signup(data).unwrap();
      router.push("/"); // Redirect after signup
      window.alert("Signup Successfully");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  const bodyContent = (

    <div className="flex flex-col flex-1 justify-center p-8 ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
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
            className="w-full bg-secondary-1 hover:bg-orange-600 text-white"
          >Sign Up</Button>
        </form>
      </FormProvider>
    </div>
  );

  return (
    <Modal
      title="Register"
      isOpen={isOpen}
      onClose={() => dispatch(closeRegisterModal())}
    >
      {bodyContent}
    </Modal>
  );
};

export default Register;
