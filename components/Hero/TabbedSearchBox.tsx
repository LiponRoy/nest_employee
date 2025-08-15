"use client";
import React, { useState } from "react";
import { SearchCheck } from "lucide-react";
import SearchBar from "../searchBar/SearchBar";
import SearchByAnything from "../searchBar/SearchByAnything";

interface Tab {
  id: number;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}


                    

const tabs: Tab[] = [
  { id: 0, label: "By Category", icon: <SearchCheck size={18} />, component: <SearchBar /> },
  { id: 1, label: "By Anything", icon: <SearchCheck size={18} />, component: <SearchByAnything/> },
];

const TabbedSearchBox = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full md:w-[80%] flex justify-start items-start relative z-20 mt-10">
      {/* Tabs */}
      <div
        className=" absolute -top-8 left-1/2 -translate-x-1/2 flex justify-between items-center
        w-[50%] max-w-sm bg-white/90 backdrop-blur-md border border-gray-200 rounded-md shadow-xl overflow-hidden "
        role="tablist"
      >
        {/* Sliding Gradient Indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-md transition-all duration-500 bg-gradient-to-r from-secondary-1 to-green-600 shadow-lg "
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(activeTab / tabs.length) * 100}%`,
          }}
        ></div>

        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              w-full relative flex-1 h-8 md:h-10 flex justify-center items-center gap-x-1 z-10
              text-sm md:text-base font-semibold transition-all duration-300 
              ${activeTab === tab.id ? "text-white scale-105" : "text-gray-600"}
            `}
          >
          <span className="hidden md:block"> {tab.icon}</span>
            <span className="text-[12px] md:text-[16px]">{tab.label}</span>

            {/* Glow effect */}
            {activeTab === tab.id && (
              <span className="absolute inset-0 rounded-xl bg-white/10 blur-2xl animate-pulse pointer-events-none"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main Search Box */}
      <div className=" w-full relative mt-2 md:mt-6 p-[2px]  ">
        <div className=" rounded-xl p-2 md:p-2 shadow-inner flex justify-center items-center border border-transparent">
          <div className="w-full max-w-3xl">
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedSearchBox;