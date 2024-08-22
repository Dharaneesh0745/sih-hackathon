import React from "react";
import EventCard from "../Sections/EventCard/EventCard";

const Events = () => {
  return (
    <div>
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  );
};

export default Events;
