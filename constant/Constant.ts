import { InavLinks, IJobType, ILatestJobs } from '@/types/Types';

export const navLinks: InavLinks[] = [
	{ href: '/jobs', label: 'Jobs' },
	{ href: '/jobDetail', label: 'jobDetail' },
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

export const selectFieldStyle = {
	container: (provided: any) => ({
		...provided,
		// width: '500px', // Ensures the container is full width
	}),
	control: (provided: any) => ({
		...provided,
		backgroundColor: 'transparent',
		borderColor: 'none', // White border
		boxShadow: 'none', // No focus ring
		color: 'black', // Black text
		cursor: 'pointer', // Pointer cursor
		width: '100%', // Full width
		'&:hover': {
			borderColor: '#E5E7EB', // Light gray on hover
		},
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: 'black', // Black selected text
	}),
	placeholder: (provided: any) => ({
		...provided,
		color: '#6B7280', // Gray placeholder
	}),
	dropdownIndicator: (provided: any) => ({
		...provided,
		color: '#D3D3D3', // Black dropdown arrow
		cursor: 'pointer', // Pointer cursor
		'&:hover': { color: '#4B5563' }, // Darker gray hover effect
	}),
	indicatorSeparator: () => ({
		display: 'none', // Remove separator line
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: '#F3F4F6', // Gray-100 dropdown background
		color: 'black',
		borderRadius: '8px', // Rounded corners for a modern look
		border: '1px solid #D1D5DB', // Light gray border
	}),
	option: (provided: any, state: any) => ({
		...provided,
		backgroundColor: state.isFocused ? '#E5E7EB' : '#F3F4F6', // Light gray hover effect
		color: 'black',
		padding: '10px',
		borderRadius: '4px', // Smooth edges
		cursor: 'pointer', // Pointer cursor
		'&:hover': {
			backgroundColor: '#D1D5DB', // Slightly darker gray on hover
		},
	}),
};
