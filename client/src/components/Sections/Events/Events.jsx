import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../EventCard/EventCard";
import styles from "../../../styles/styles";
import { server } from "../../../server";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${server}/event/getAllEvents`);
        console.log(response); // Check the response structure
        if (Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Ongoing Events</h1>
        </div>
        <div className="w-full grid">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard key={index} active={true} data={event} />
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
