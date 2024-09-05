import React from "react";
import styles from "../../../styles/styles";
import CountDown from "../../Layouts/CountDown.jsx";

const EventCard = ({ active }) => {
  return (
    <div
      className={`${
        active ? "unset" : "mb-12"
      } w-full block bg-white rounded-xl lg:flex p-2 mb-12`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src="https://img.freepik.com/free-vector/web-development-isometric-concept-composition-illustration_1284-55922.jpg"
          alt=""
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Cloud Computing Workshop</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet labore
          nihil eos magnam! Ad laboriosam aliquid in, quis atque, doloribus
          veniam deserunt exercitationem ducimus, voluptatem incidunt excepturi
          delectus sunt eos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Amet labore nihil eos magnam! Ad laboriosam aliquid in, quis
          atque, doloribus veniam deserunt exercitationem ducimus, voluptatem
          incidunt excepturi delectus sunt eos.
        </p>
        <div className="flex py-2 justify-between">
          <div className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 Registered
          </div>
        </div>
        <div className="w-full">
          <CountDown />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
