import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type JobCardProps = {
  title: string;
  jobType: string;
  logo: string;
  location: string;
  salary: string | number;
  id: string;
};

export const JobCard = ({
  title,
  logo,
  jobType,
  location,
  salary,
  category,
  id,
}: JobCardProps) => {
  const route = useRouter();
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-start items-center space-x-2">
          <div className="">
            <Image
              src={logo}
              alt="Example"
              width={500}
              height={300}
              className="w-6 h-6"
            />
          </div>
          <div className="flex flex-col justify-normal items-start">
            <CardTitle className="text-[18px] font-semibold">{title}</CardTitle>
            {/* <CardDescription>Job Details</CardDescription> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-start items-center gap-x-6">
          <div>
            <Label className="text-muted-foreground">Type</Label>
            <p className="text-base font-medium">{jobType}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Salary</Label>
            <p className="text-base font-medium">
              {salary.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div>
          <Label className="text-muted-foreground">Location</Label>
          <p className="text-base font-medium">{location}</p>
        </div>

        <div>
          <Label className="text-muted-foreground">Category</Label>
          <p className="text-base font-medium">{category}</p>
        </div>
      </CardContent>
      <div className="p-3">
        <Button
          onClick={() => route.push(`/jobDetail/${id}`)}
          className="mt-2 w-full bg-secondary-1  "
        >
          Details
        </Button>
      </div>
    </Card>
  );
};
