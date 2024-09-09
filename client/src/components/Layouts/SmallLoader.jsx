import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/Animations/Animation - 1725870134956.json";

const SmallLoader = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    </>
  );
};

export default SmallLoader;
