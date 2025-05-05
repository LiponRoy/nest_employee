import { strict } from 'assert';
import Document from 'next/document';

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
	title: string;
	description: string;
	requirements: string[];
	maxSalary: number;
	experienceLevel: number;
	location: string;
	jobType: string;
	position: number;
	company: number;
	companyId:string;
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
