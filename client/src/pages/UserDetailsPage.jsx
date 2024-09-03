import React from "react";
import Header from "../components/Layouts/Header";
import UserDetail from "../components/UserDetail/UserDetail";

const UserDetailsPage = () => {
  return (
    <>
      <Header activeHeading={0} />
      <UserDetail />
    </>
  );
};

export default UserDetailsPage;
