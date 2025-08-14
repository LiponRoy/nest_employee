



export interface InavLinks {
  href: string;
  label: string;
}

export interface IJobType {
  value: string;
  label: string;
}


export interface SelectInputProps<T> {
  options: T[];
  value: T | null;
  onChange: (option: T | null) => void;
  placeholder?: string;
  isClearable?: boolean;
  className?: string;
}
