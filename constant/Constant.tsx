import { BriefcaseBusiness } from 'lucide-react';
import { InavLinks, IJobType, } from '@/types/Types';

export const navLinks: InavLinks[] = [
	{ href: '/jobs', label: 'Browse Jobs' },
];

export const JobType: IJobType[] = [
	{ value: 'software Engineer', label: 'Software Engineer' },
	{ value: 'electrical Engineer', label: 'Electrical Engineer' },
	{ value: 'banker', label: 'Banker' },
];
export const OrganizationsType: IJobType[] = [
	{ value: 'Private', label: 'Private' },
	{ value: 'Govt', label: 'Govt' },
	{ value: 'NGO', label: 'NGO' },
];

export const JobsCategory = [
	{ id: 1, title: 'FrontEnd Developer ' },
	{ id: 2, title: 'BackEnd Developer' },
	{ id: 3, title: 'Data Engineer' },
	{ id: 4, title: 'Banker' },
	{ id: 5, title: 'Teacher' },
];

export const jobType = ['Full-time', 'Part-time'];

export const Gender = ['Female Only', 'Male Only', 'Both'];

export const categories: string[] = [
	'UI/UX Designer',
	'Software Developer',
	'IT Support / Technician',
	'Cybersecurity Specialist',
	'Education & Training',
	'Garments & Textile Industry',
	'Healthcare & Pharmaceuticals',
	'Marketing & Sales',
	'Creative & Media',
	'Government & NGO Jobs',
];

export type ISearchCategories = {
	value: string;
	label: string;
};

export const searchCategories: ISearchCategories[] = [
	{ value: 'All Category', label: 'All Category' },
	{ value: 'UI/UX Designer', label: 'UI/UX Designer' },
	{ value: 'Software Developer', label: 'Software Developer' },
	{ value: 'IT Support / Technician', label: 'IT Support / Technician' },
	{ value: 'Cybersecurity Specialist', label: 'Cybersecurity Specialist' },
	{ value: 'Education & Training', label: 'Education & Training' },
	{
		value: 'Garments & Textile Industry',
		label: 'Garments & Textile Industry',
	},
	{
		value: 'Healthcare & Pharmaceuticals',
		label: 'Healthcare & Pharmaceuticals',
	},
	{ value: 'Marketing & Sales', label: 'Marketing & Sales' },
	{ value: 'Creative & Media', label: 'Creative & Media' },
	{ value: 'Government & NGO Jobs', label: 'Government & NGO Jobs' },
];

export const optionCategories = [
	{ id: 1, title: 'UI/UX Designer', checked: false },
	{ id: 2, title: 'Software Developer', checked: false },
	{ id: 3, title: 'IT Support / Technician', checked: false },
	{ id: 4, title: 'Cybersecurity', checked: false },
	{ id: 5, title: 'Education', checked: false },
	{ id: 6, title: 'Garments', checked: false },
	{ id: 7, title: 'Marketing', checked: false },
];

export const optionJobType = [
	{ id: 1, title: 'Full-time', checked: false },
	{ id: 2, title: 'Part-time', checked: false },
	{ id: 3, title: 'Freelanc', checked: false },
];
export const optionJobGender = [
	{ id: 1, title: 'Both', checked: false },
	{ id: 2, title: 'Female Only', checked: false },
	{ id: 3, title: 'Male Only', checked: false },
];

export const optionDivision = [
	{ id: 3, title: 'Dhaka', checked: false },
	{ id: 3, title: 'Chattogram', checked: false },
	{ id: 3, title: 'Khulna', checked: false },
	{ id: 3, title: 'Rajshahi', checked: false },
	{ id: 3, title: 'Barishal', checked: false },
	{ id: 3, title: 'Sylhet', checked: false },
	{ id: 3, title: 'Rangpur', checked: false },
	{ id: 3, title: 'Mymensingh', checked: false },
];

export const companyTypes = [
	'Partnership',
	'Private Limited ',
	'Public Limited ',
];

export const sortOptions = [
	{ value: '', label: 'Default' },
	{ value: 'Price Low to High', label: 'Price Low to High' },
	{ value: 'Price High to Low', label: 'Price High to Low' },
];

export const allCategory = [
	{ id: 1, title: 'Software Development', checked: false },
	{ id: 2, title: 'IT & Networking', checked: false },
	{ id: 3, title: 'Design & Creative', checked: false },
	{ id: 4, title: 'Customer Service', checked: false },
];

export const PopularCategoriesData = [
  {
    name: "Software Developer",
    title: "154 open position",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "IT Support",
    title: "122 open position",
    icon: <BriefcaseBusiness />,
  }, {
    name: "Cybersecurity Specialist",
    title: "94 open position",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Education & Training",
    title: "255 open position",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Garments & Textile Industry",
    title: "12 open position",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Healthcare",
    title: "53 open position",
    icon: <BriefcaseBusiness />,
  },
];

export const GeneralInfoData = [
  {
    quantity: 512,
    title: "LIVE JOBS",
    icon: <BriefcaseBusiness />,
  },
  {
    quantity: 90,
    title: "VACANCIES",
    icon: <BriefcaseBusiness />,
  },
  {
    quantity: 70,
    title: "COMPANIES",
    icon: <BriefcaseBusiness />,
  },
  {
    quantity: 170,
    title: "NEW JOBS",
    icon: <BriefcaseBusiness />,
  },
  
];

export type JobCardProps = {
  logo: string;
  companyName: string;
  title: string;
  gender: string;
  jobType: string;
  maxSalary: number;
  minSalary: number;
  location: string;
  id: string;
};

export const selectFieldStyle = {
  container: (provided: any) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none !important",
    borderColor: "transparent !important",
    boxShadow: "none !important",
    cursor: "pointer",
    width: "100%",
	fontSize: "16px", // Increased text size
    "&:hover": {
      border: "none !important",
      borderColor: "transparent !important",
    },
    "&:focus": {
      border: "none !important",
      borderColor: "transparent !important",
      boxShadow: "none !important",
    },
    "&:focus-within": {
      border: "none !important",
      borderColor: "transparent !important",
      boxShadow: "none !important",
    },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 8px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
  }),
  placeholder: (provided: any) => ({
    ...provided,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#ffffff",
    border: "none",
    borderColor: "transparent",
    borderRadius: "12px",
    boxShadow:
      "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 8px 24px rgba(0, 0, 0, 0.06)", // soft layered shadow
    padding: "8px",
    marginTop: "6px",
    overflow: "hidden",
    width: "100%",
    minWidth: "unset",
    animation: "fadeIn 0.15s ease-in-out",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "linear-gradient(90deg, #6366F1, #A855F7)"
      : state.isFocused
      ? "#F3F4F6"
      : "transparent",
    color: state.isSelected ? "#215AAC" : "#111827",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.40s ease",
    fontWeight: state.isSelected ? 500 : 400,
    "&:hover": {
      backgroundColor: state.isSelected
        ? "linear-gradient(90deg, #6366F1, #A855F7)"
        : "#E5E7EB",
      color: state.isSelected ? "#fff" : "#111827",
    },
  }),
};

export const bangladeshDivisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

// Company Types all//
export interface ICompany {
  id: string;
  name: string;
  title: string;
  about: string;
  website: string;
  location: string;
  teamMember: number;
  officeBranches: number;
  foundedDate: string;
  jobs: string[]; 
  creator: string; 
  logoImage: string;
  cloudinary_id: string;
}

// Job Types all//
export interface IJob {
	_id: string;
	title: string;
	description: string;
	requirements: string[];
	responsibility: string[];
	salaryAndBenefits: string[];
	skillAndExperience: string[];
	minSalary: number;
	maxSalary: number;
	experienceLevel: number;
	location: string;
	division: string;
	jobType: string;
	category: string;
	datePosted: string; 
	dateDeadline: string; 
	vacancy: number;
	educationQualification: string;
	gender: string;
	companyId: ICompany; 
	created_by: string; 
	applications: string[]; 
	logoImage: string;
	cloudinary_id: string;
}

export interface JobsResponse {
  success: boolean;
  message: string;
   meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IJob[];
}
export interface JobsResponseSingle {
  success: boolean;
  message: string;
  data: IJob;
}

export interface AlreadyAppliedJobResponse {
  success: boolean;
  message: string;
  data: {
    data: boolean;
  };
}
export interface Requirement {
  title: string;
  _id: string;
}

export interface Responsibility {
  title: string;
  _id: string;
}

export interface SalaryAndBenefit {
  title: string;
  _id: string;
}

export interface SkillAndExperience {
  title: string;
  // _id: string;
}


// Profile Types all//
export interface User {
  _id: string;
  name: string;
  role: string;
}

export interface GeneralInfo {
  phone: string;
  gender: string;
  age: number;
  bio: string;
  address: string;
  about: string;
}
export interface IEducation {
  instituteName: string;
  degree: string;
  cgpa: string;
  passingYear: string;
}

export interface IExperience {
  organizationName: string;
  yearsOfExperience: number;
  position: string;
}

export interface ProfileData {
  _id: string;
  userId: User;
  skills: string[];    
  education: IEducation[]; 
  experience: IExperience[];
  createdAt: string; 
  updatedAt: string; 
  generalInfo: GeneralInfo;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}
export interface EducationResponse {
  success: boolean;
  message: string;
  data: {
    education:IEducation[]
  };
}

export interface GeneralInfoResponse {
  success: boolean;
  message: string;
  data: {
    generalInfo: GeneralInfo;
  };
}
