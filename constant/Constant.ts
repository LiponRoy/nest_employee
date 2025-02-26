import { InavLinks, IJobType, ILatestJobs } from '@/types/Types';

export const navLinks: InavLinks[] = [
	{ href: '/jobs', label: 'Jobs' },
	{ href: '/signup', label: 'Signup' },
	{ href: '/login', label: 'Login' },
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

export const latestJobs: ILatestJobs[] = [
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
	{
		companyName: 'Google',
		title: 'Software Engineer',
		description: 'bla bla bla',
		position: 2,
		jobType: 'Full Time',
	},
];

export const companyTypes = [
	"Partnership",
	"Private Limited ",
	"Public Limited ",
  ];

export const selectFieldStyle = {
	container: (provided: any) => ({
		...provided,
		// width: '500px', // Ensures the container is full width
	}),
	control: (provided:any) => ({
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
