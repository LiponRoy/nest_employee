import Marquee from "react-fast-marquee";
import { companyLogo, ITrustedCompanies } from "./CompanyData";
import Image from "next/image";

const CompanyLogoData = () => {
  const randomItems = companyLogo
    .sort(() => 0.5 - Math.random())
    .slice(0, companyLogo.length);
  return (
    <div className="pt-[10px] md:pt-[30px] container-custom">
      <div className="w-full flex flex-col justify-start items-start my-6 bg-slate-100 p-2">
        <span className="text-[24px] md:text-[32px] font-medium">
          Trusted by Leading <span className="text-primary-1">Companies</span>
        </span>
      </div>
      <Marquee
        // pauseOnHover={true}
        speed={100}
        gradient={false}
        play={true}
        direction={"right"}
        className="pb-[14px] "
      >
        {randomItems.map((Company: ITrustedCompanies, i) => (
          <div
            key={i}
            className="w-[80px] md:w-[160px] h-[100px] md:h-[150px] m-2 flex justify-center items-center bg-slate-50 shadow-sm"
          >
            <Image
              src={Company.imageUrl}
              alt="My Photo"
              width={300}
              height={300}
            className="w-[120px] p-2 "

            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyLogoData;
