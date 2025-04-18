'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/components/Toast';
import { useGetProfileQuery } from '@/redux/rtk/auth';
import { useCreateJobsMutation } from '@/redux/rtk/jobsApi';
import { useCreateCompanyMutation } from '@/redux/rtk/companyApi';

const formSchema = z.object({
    name: z.string().min(1, 'name is required'),
    title: z.string().min(1, 'title is required'),
    about: z.string().min(1, 'about is required'),
    location: z.string().min(1, 'location is required'),
    teamMember: z.preprocess(
        (value) => Number(value),
        z.number().positive('TeamMember must be greater than zero')
    ),
    officeBranches: z.preprocess(
        (value) => Number(value),
        z.number().positive('OfficeBranches must be greater than zero')
    ),
    FoundedDate: z.string().min(1, 'FoundedDate is required'),
    // creator: z.string().min(1, 'creator is required'),
});

type FormSchema = z.infer<typeof formSchema>;

const AddCOmpanyForm: React.FC = () => {

    // Job Create RTK
    const [createCompany, { isLoading, isSuccess, error }] = useCreateCompanyMutation();
    // Profile for current user RTK
    const { data: currentUser, isLoading: profileLoading } = useGetProfileQuery({});

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            title: '',
            about: '',
            location: '',
            teamMember: 0,
            officeBranches: 0,
            FoundedDate: '',
            // creator: '',
        },
    });


    const onSubmit = async (data: FormSchema) => {
        console.log("company data ", data)
        if (!currentUser?.data._id) {
            errorToast('Your are not loged in');
            return;
        }

        const payload = {
            ...data,
            creator: currentUser?.data._id, //  filled current User
        };
        try {
            const result = await createCompany({ ...payload }).unwrap();
            console.log("result :", result)
            successToast('Company created successfully!');
            reset();

        } catch (err) {
            errorToast("Company creation failed")
        }
    };



    return (
        <div className="flex justify-center items-center">
            <div className="w-1/2 flex items-center justify-center bg-white p-6">
                <div className="w-full">
                    <h4 className='text-2xl font-semibold my-4 bg-slate-200 p-2' >Add Company</h4>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mb-10 w-full space-y-6 "
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                {...register('name')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        {/* Name End */}
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                {...register('title')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        {/* Title End */}

                        {/* About */}
                        <div>
                            <label className="block text-sm font-medium mb-1">About</label>
                            <input
                                {...register('about')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter about"
                            />
                            {errors.about && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.about.message}
                                </p>
                            )}
                        </div>
                        {/* About End */}

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                {...register('location')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter location"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>
                        {/* Location End */}

                        {/* Team Member */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Team Member
                            </label>
                            <input
                                {...register('teamMember')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter teamMember"
                                type="number"
                            />
                            {errors.teamMember && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.teamMember?.message}
                                </p>
                            )}
                        </div>
                        {/* Team Member End */}
                        {/* office Branches */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                office Branches
                            </label>
                            <input
                                {...register('officeBranches')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter officeBranches"
                                type="number"
                            />
                            {errors.officeBranches && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.officeBranches?.message}
                                </p>
                            )}
                        </div>
                        {/* office Branches End */}
                        {/* Founded Date */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Founded Date </label>
                            <input
                                {...register('FoundedDate')}
                                className="border-gray-300 w-full rounded border p-2"
                                placeholder="Enter FoundedDate"
                            />
                            {errors.FoundedDate && (
                                <p className="text-red-500 text-sm text-red">
                                    {errors.FoundedDate.message}
                                </p>
                            )}
                        </div>
                        {/* Founded Date End */}


                        <div className="flex w-full items-center justify-center ">
                            <Button className="w-full bg-secondary-1 hover:bg-orange-600">
                                POST JOB
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCOmpanyForm;
