import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../Sections/EventCard/EventCard";
import { server } from "../../server";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${server}/event/getAllEvents`);
        console.log(response); // Replace with your actual API endpoint
        // if (Array.isArray(response.data.events)) {
        setEvents(response.data.events);
        // } else {
        //   console.error("Unexpected data format:", response.data);
        // }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.length > 0 ? (
        events.map((event, index) => (
          <EventCard key={index} active={true} data={event} />
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default Events;
