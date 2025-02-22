'use client';
import { selectFieldStyle } from '@/constant/Constant';
import React from 'react';
import Select from 'react-select';

interface SelectInputProps<T> {
    options: T[];
    value: T | null;
    onChange: (option: T | null) => void;
    newStyle: {};
    placeholder?: string;
    // isClearable?: boolean;
    className?: string;
}

const SelectInput = <T,>({
    options,
    value,
    onChange,
    newStyle,
    placeholder = 'Select an option',
    // isClearable = true,
    className = 'w-[80%] text-slate-900',
}: SelectInputProps<T>) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            styles={selectFieldStyle}
            placeholder={placeholder}
            // isClearable={isClearable}
            className={className}
        />
    );
};

export default SelectInput;
