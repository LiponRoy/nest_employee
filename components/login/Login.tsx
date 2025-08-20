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
import { closeLoginModal } from "@/redux/slices/loginFormModalSlice";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/rtk/auth";
import { errorToast, successToast } from "../Toast";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {

  const router = useRouter();
  const [login, { isLoading}] = useLoginMutation();


  //for modal
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.loginFormModal.isOpen);
  //end for modal
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log("modal data: ", data);
    try {
      await login(data).unwrap();
      router.push("/jobs");
      successToast("login Successfully")
      dispatch(closeLoginModal())
    } catch (err) {
      errorToast("Something went wrong !!")
      dispatch(closeLoginModal())

      console.error("login failed", err);
    }
  };

  const bodyContent = (

    <div className="flex flex-col flex-1 justify-center px-2 py-4 md:py-8 ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
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
          disabled={isLoading}
            title="Login"
            className="w-full bg-secondary-1 text-white"
          >{isLoading?"Loading..":"Login"}</Button>
        </form>
      </FormProvider>
    </div>
  );

  return (
    <Modal
      title="Login"
      isOpen={isOpen}
      onClose={() => dispatch(closeLoginModal())}
    >
      {bodyContent}
    </Modal>
  );
};

export default Login;
