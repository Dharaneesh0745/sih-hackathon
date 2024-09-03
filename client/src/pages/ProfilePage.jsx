import React, { useState } from "react";
import Header from "../components/Layouts/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import styles from "../styles/styles";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[225px] 800px:mt-0 fixed mt-[15%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="800px:mt-0 ml-8 800px:ml-56 mt-14 800px:mr-0 mr-2 800px:w-full w-72">
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
