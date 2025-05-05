import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  id,
}: JobCardProps) => {
  const route = useRouter();
  return (
    <Card className="w-full max-w-md">
      
      <CardHeader>
      <div className="flex justify-start items-center space-x-3">
   <div className="">
   <Image
        src={logo}
        alt="Example"
        width={500}
        height={300}
        className="w-10 h-10"
      />
   </div>
        <div className="flex flex-col justify-normal items-start">
        <CardTitle className="text-[24px] font-semibold">{title}</CardTitle>
        <CardDescription>Job Details</CardDescription>
        </div>
      </div>
        
       
      </CardHeader>
      <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Type</Label>
            <p className="text-base font-medium">{jobType}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Location</Label>
            <p className="text-base font-medium">{location}</p>
          </div>
       
        <div>
          <Label className="text-muted-foreground">Salary</Label>
          <p className="text-base font-medium">{salary}</p>
        </div>

        <Button
          onClick={() => route.push(`/jobDetail/${id}`)}
          className="mt-2 w-fit bg-secondary-1"
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
};
