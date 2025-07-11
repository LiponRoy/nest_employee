"use client"
import { TextInput } from '@/components/FormInputs';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";

const profileGeneralInfoSchema = z.object({
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  gender: z.enum(["male", "female", "other"]),
  age: z
    .string(),
    // .min(0, "Age must be positive")
    // .max(120, "Age seems unrealistic"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Bio can't be more than 300 characters"),
  address: z.string().min(5, "Address is too short"),
  about: z.string().min(3, "About field must be more descriptive"),
});

type FormData = z.infer<typeof profileGeneralInfoSchema>;

const ProfileForJobSeeker = () => {

    const methods = useForm<FormData>({
      resolver: zodResolver(profileGeneralInfoSchema),
      // defaultValues: {
      //   role: "job_seeker", // Default value set to "job_seeker"
      // },
    });
   
    const onSubmit: SubmitHandler<FormData> = async (data) => { 
      console.log("modal data: ", data);
      try {
        // await signup(data).unwrap();
        // router.push("/"); // Redirect after signup
        // successToast("Signup Successfully")
        // dispatch(closeRegisterModal())
        // dispatch(openLoginModal());
  
      } catch (err) {
        console.error("Signup failed", err);
      }
    };
  return (
    <div>
      
    <div className="flex flex-col flex-1 justify-center p-8 ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput name="phone" label="Phone" />
          <TextInput name="gender" label="Gender" />
          <TextInput name="age" label="Age" />
          <TextInput name="bio" label="bio"  />
          <TextInput name="address" label="address"  />
          <TextInput name="about" label="about"  />
          

          <Button
            className="w-full bg-secondary-1 hover:bg-secondary-1 text-white"
          >Sign Up</Button>
        </form>
      </FormProvider>
    </div>
    </div>
  )
}

export default ProfileForJobSeeker