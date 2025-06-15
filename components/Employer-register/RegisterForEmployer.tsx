"use client";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextInput } from "../FormInputs";
import { Button } from "../ui/button";
import { Modal } from "../Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSignupMutation } from "@/redux/rtk/auth";
import { useRouter } from "next/navigation";
import { closeEmployerRegisterModal } from "@/redux/slices/employerRegisterFormModalSlice";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
  role: z.enum(["employer"], {
    required_error: "Please select a role",
  }),
});

type FormData = z.infer<typeof schema>;

const RegisterForEmployer = () => {
  const router = useRouter();
  const [signup] = useSignupMutation();
  //for modal
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.employerRegisterFormModal.isOpen
  );
  //end for modal
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "employer", // Default value set to "job_seeker"
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
    <div className=" grid grid-cols-6">
      {/* <div className="col-span-1 h-full bg-blue-900"></div> */}
      <div
        className="col-span-2 h-full flex items-center justify-center bg-cover bg-center "
        style={{ backgroundImage: "url(/authGirl.jpg)" }}
      ></div>
      <div className="col-span-4 flex flex-col flex-1 justify-center py-4 px-2 ">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput name="name" label="Contact Person Name" />
            <TextInput name="email" label="Contact Person Email" />
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

            <Button className="w-full bg-secondary-1 hover:bg-orange-600 text-white">
              Employer Register
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );

  return (
    <Modal
      title="Employer Register"
      isOpen={isOpen}
      onClose={() => dispatch(closeEmployerRegisterModal())}
    >
      {bodyContent}
    </Modal>
  );
};

export default RegisterForEmployer;
