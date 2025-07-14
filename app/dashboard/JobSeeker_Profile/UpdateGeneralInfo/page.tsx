"use client"
import { TextInput,SelectInput } from '@/components/FormInputs';
import { errorToast, successToast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { useGetGeneralInfoByLoginUserQuery, useUpdateProfileGeneralInfoMutation } from '@/redux/rtk/profileApi';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";

const profileGeneralInfoSchema = z.object({
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  gender: z.enum(["male", "female", "other"]),
  age: z
    .string(),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Bio can't be more than 300 characters"),
  address: z.string().min(5, "Address is too short"),
  about: z.string().min(3, "About field must be more descriptive"),
});

type FormData = z.infer<typeof profileGeneralInfoSchema>;

const UpdateGeneralInfo = () => {

   const [updateProfileGeneralInfo, { isLoading, error }] = useUpdateProfileGeneralInfoMutation();

       const { data: general,} = useGetGeneralInfoByLoginUserQuery({});
  

  const genterCtegores=[{
    value:"male",
    label:"male"
  },{
    value:"female",
    label:"female"
  },{
    value:"other",
    label:"other"
  }];

     const methods = useForm<FormData>({
    resolver: zodResolver(profileGeneralInfoSchema),
  });

  const { reset } = methods;

  // Populate form when profile data arrives
  useEffect(() => {
    if (general?.data?.generalInfo) {
      const { phone, gender, age, bio, address, about } = general?.data?.generalInfo;
      reset({
        phone: phone || "",
        gender: gender || "male",
        age: age?.toString() || "",
        bio: bio || "",
        address: address || "",
        about: about || "",
      });
    }
  }, [general, reset]);
   
    const onSubmit: SubmitHandler<FormData> = async (data:any) => { 
      console.log("modal data: ", data);
         try {
           await updateProfileGeneralInfo(data).unwrap();
           successToast("GeneralInfo Update Successfully")
         } catch (err) {
           errorToast("Something went wrong !!", err)
           console.error("GeneralInfo Update Failed", err);
         }
    };


  return (
    <div>
      
    <div className="flex flex-col flex-1 justify-center  ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full flex justify-center items-center bg-red-500">
          
          </div>
          <TextInput name="phone" label="Phone" />
          <TextInput name="age" label="Age" />
          <SelectInput name="gender" label="gender" options={genterCtegores}/>
          <TextInput name="bio" label="bio"  />
          <TextInput name="address" label="address"  />
          <TextInput name="about" label="about"  />
          

          <Button
            className="w-full bg-secondary-1 hover:bg-secondary-1 text-white"
          >Update General Informetion</Button>
        </form>
      </FormProvider>
    </div>
    </div>
  )
}

export default UpdateGeneralInfo