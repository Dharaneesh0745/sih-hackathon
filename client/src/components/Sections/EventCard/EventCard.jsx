import React from "react";
import styles from "../../../styles/styles";
import CountDown from "../../Layouts/CountDown.jsx";

const EventCard = ({ data, active }) => {
  console.log(data);
  return (
    <div
      className={`${
        active ? "unset" : "mb-12"
      } w-full block bg-white my-10 rounded-xl lg:flex p-2 mb-12`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src={
            data.image ||
            "https://img.freepik.com/free-vector/web-development-isometric-concept-composition-illustration_1284-55922.jpg"
          }
          alt={data.name || "Event Image"}
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          {data.name || "Default Event Title"}
        </h2>
        <p>{data.description || "Default event description."}</p>
        <div className="flex py-2 justify-between">
          <div className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.registered || "0"} Registered
          </div>
        </div>
        <div className="w-full">
          <CountDown data={data} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
