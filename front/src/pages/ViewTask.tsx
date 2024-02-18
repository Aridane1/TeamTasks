import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { backendImageEndpoint } from "../constants/backendEndpoints";

export default function ViewTask() {
  const location = useLocation();
  const { title, description, image, quantityUser } = location.state || {};
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <Header />
      <div className="flex mt-20 justify-center items-center bg-yellow-100 max-w-[1200px] mx-auto rounded-xl shadow">
        <div className="w-full flex mx-auto mt-5">
          <div className="w-[800px] ">
            <div className="relative flex justify-center">
              <img
                src={`${backendImageEndpoint}/${image}`}
                alt={title}
                className={`size-96 rounded-2xl ${
                  isHovered ? "blur-[2px] transition ease-in-out" : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {isHovered && (
                <p className="absolute top-[50%] translate-y-[-50%]">
                  #html #css #js
                </p>
              )}
            </div>
            <p className="ml-12 mt-2">{quantityUser} usuarios</p>
          </div>
          <div className="w-full flex flex-col gap-y-8">
            <h1 className="text-6xl">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
