import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { MdNotificationsActive } from "react-icons/md";

const Notification = ({ setOpenNotification }) => {
  const notificationData = [
    {
      id: 1,
      title: "New Job Alert",
      message: "A new job has been posted",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "New Job Alert",
      message: "A new job has been posted",
      date: "2 days ago",
    },
    {
      id: 3,
      title: "New Job Alert",
      message: "A new job has been posted",
      date: "2 days ago",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenNotification(false)}
            />
          </div>
          {/* notifications length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <MdNotificationsActive size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 Notifications</h5>
          </div>

          {/* notifications data */}
          <br />
          <div className="w-full border-t">
            {notificationData.map((data) => (
              <div key={data.id} className="p-3 border-b">
                <h5 className="font-[500]">{data.title}</h5>
                <p className="text-[14px]">{data.message}</p>
                <p className="text-[12px] text-gray-500">{data.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
