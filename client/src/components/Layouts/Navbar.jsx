import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../data/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-pink-500 bg-white py-4 px-[10px] rounded-lg"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-5 cursor-pointer flex flex-col items-center`}
            >
              <span className="mx-auto text-center -mt-1">{i.icon}</span>{" "}
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
