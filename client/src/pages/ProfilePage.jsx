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
        <div className="w-[50px] 800px:w-[335px] 800px:mt-0 sticky mt-[15%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
