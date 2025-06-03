import { strict } from "assert";
import Document from "next/document";

export interface InavLinks {
  href: string;
  label: string;
}

export interface IJobType {
  value: string;
  label: string;
}
export interface ILatestJobs extends Document {
  _id: string;
  logo: string;
  companyName: string;
  title: string;
  gender: string;
  description: string;
  requirements: string[];
  maxSalary: string;
  minSalary: string;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: number;
  companyId: string;
  category: string;
  applications: string[];
}

export interface SelectInputProps<T> {
  options: T[];
  value: T | null;
  onChange: (option: T | null) => void;
  placeholder?: string;
  isClearable?: boolean;
  className?: string;
}
