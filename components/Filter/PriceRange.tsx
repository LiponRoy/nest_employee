"use client";

import ReactSlider from "react-slider";
const PriceRange = ({ min, max, priceValue, handleOnchange }: any) => (
  <div className="flex flex-col justify-start items-start gap-y-4">
    <span className=" font-semibold text-[16px]">Your Budget</span>
    <p className=" font-light text-[16px]">
      BDT: {min} - {max}
    </p>
    
    <div className="w-full space-y-2 bg-white rounded-lg ">
      <ReactSlider
        className="w-full"
        min={1000}
        max={90000}
        step={1}
        value={priceValue}
        onChange={handleOnchange}
        renderTrack={(props, state) => {
          const { key, ...restProps } = props; // Extract key separately
          return (
            <div
              key={key} // Apply key explicitly
              {...restProps}
              className={`h-1 rounded-full ${
                state.index === 1 ? "bg-slate-500" : "bg-orange-200"
              }`}
            />
          );
        }}
        renderThumb={(props) => {
          const { key, ...restProps } = props; // Extract key separately
          return (
            <div
              key={key} // Apply key explicitly
              {...restProps}
              className="h-5 w-5 rounded-full bg-orange-500 shadow-md cursor-pointer border-2 border-white focus:outline-none focus:ring-0"
              style={{
                ...props.style,
                transform: "translateY(-40%)", // Moves the thumb to the middle of the track
                top: "50%",
              }}
            />
          );
        }}
        renderMark={(props) => {
          const { key, ...restProps } = props; // Extract key separately
          return (
            <div key={key} {...restProps} className="h-5 w-0.5 bg-black" />
          );
        }}
      />
    </div>
  </div>
);

export default PriceRange;
