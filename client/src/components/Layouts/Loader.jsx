import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/Animations/Animation - 1725296887444.json";

const Loader = () => {
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
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    </>
  );
};

export default Loader;
