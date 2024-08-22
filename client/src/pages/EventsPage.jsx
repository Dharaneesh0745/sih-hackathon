import React from "react";
import Events from "../components/Events/Events";
import Header from "../components/Layouts/Header";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <Events />
    </div>
  );
};

export default EventsPage;
