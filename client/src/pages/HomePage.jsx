import React from "react";
import Header from "../components/Layouts/Header";
import Home from "../components/Home/Home";
import ChatBotCard from "./ChatBot/ChatBotCard";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Home />
      <div className="absolute">
        <ChatBotCard />
      </div>
    </div>
  );
};

export default HomePage;
