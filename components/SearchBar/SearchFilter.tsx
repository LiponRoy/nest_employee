"use client";
import { companyTypes } from "@/constant/Constant";
import { useRouter } from "next/navigation";
import * as React from "react";

const SearchFilter = () => {
	const router = useRouter();

	const [value, setValue] = React.useState("");
	const [suggestion, setSuggestion] = React.useState("");
	const [isFocused, setIsFocused] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleInputChange = (input: string) => {
		setValue(input);

		if (input.length === 0) {
			setSuggestion("");
			return;
		}

		const matchedCountry = companyTypes?.find((country: string) =>
			country.toLowerCase().startsWith(input.toLowerCase())
		);

		if (matchedCountry) {
			setSuggestion(matchedCountry.slice(input.length));
		} else {
			setSuggestion("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Tab" && suggestion) {
			e.preventDefault();
			setValue(value + suggestion);
			setSuggestion("");
		}
	};

	const updateCountry = (matchingCountry: string) => {
		router.push("/packages/FilterPackage");
		console.log(matchingCountry)

	};

	return (
		<div className="">
			<div className="relative w-full my-2">
			<div className="relative flex items-center">
				<div className="w-full rounded-lg gradient-animation">
				<input
					ref={inputRef}
					value={value}
					onChange={(e) => handleInputChange(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Slight delay for selection
					placeholder="Search"
					className="w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-0  pr-12 m-[2px] "
				/>
				</div>
				<button
					className="absolute -right-2 h-full px-4 bg-orange-500 text-white rounded-lg w-20 md:w-52 hover:bg-orange-600 transition-colors"
					onClick={() => updateCountry(value)}
				>
					<span className="w-full flex justify-center item-center">
						<div className="flex flex-col justify-center items-center">
							
							<span className="hidden md:flex text-sm">Search</span>
						</div>
					</span>
				</button>
			</div>

			{/* Country suggestions dropdown */}
			{isFocused && (
				<ul className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-50">
					{companyTypes
						?.filter((country: string) =>
							country.toLowerCase().includes(value.toLowerCase())
						)
						?.map((country: string) => (
							<li
								key={country}
								onClick={() => {
									setValue(country?.toLowerCase());
									setSuggestion("");
									setIsFocused(false);
								}}
								className="px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-[15px] capitalize"
							>
								{country}
							</li>
						))}
					{companyTypes?.filter((country: string) =>
						country?.toLowerCase()?.includes(value.toLowerCase())
					).length === 0 && (
						<li className="px-4 py-2.5 text-gray-500 text-[15px]">
							No country found.
						</li>
					)}
				</ul>
			)}
		</div>
		</div>
	);
};

export default SearchFilter;
