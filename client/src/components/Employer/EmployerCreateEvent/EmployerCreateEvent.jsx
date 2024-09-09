import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../data/data";
import { toast } from "react-toastify";
import { createevent } from "../../../redux/actions/event";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../server";

const EmployerCreateEvent = () => {
  const { employer } = useSelector((state) => state.employer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.events);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [theme, setTheme] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [totalSlots, setTotalSLots] = useState("");
  const [errors, setErrors] = useState("");
  const [eventType, setEventType] = useState("");

  const [succ, setSucc] = useState(false);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setEventStartDate(startDate);
    setEventEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEventEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = eventStartDate
    ? new Date(eventStartDate.getTime() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  // useEffect(() => {
  //   // if (error) {
  //   //   toast.error(error);
  //   // }
  //   if (succ === true) {
  //     toast.success("Job Created Successfully");
  //     navigate("/employer/allEvents");
  //     window.location.reload(true);
  //     setSucc(false);
  //   }
  //   // console.log(success);
  // }, [dispatch, error, success]);

  const handleFileUpload = () => {
    window.cloudinary.openUploadWidget(
      { cloudName: "dzutfi16w", uploadPreset: "bjydfkpb" },
      (error, result) => {
        if (result && result.event === "success") {
          setImage(result.info.secure_url);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      const res = await axios.post(`${server}/event/create-event`, {
        name,
        eventStartDate: eventStartDate.toISOString(),
        eventEndDate: eventEndDate.toISOString(),
        description,
        category,
        theme,
        tags,
        originalPrice,
        discountPrice,
        locationType,
        location,
        totalSlots,
        companyId: employer._id,
        image,
        eventType,
      });
      toast.success(res.data.message);
      setImage(null);
      setName("");
      setEventStartDate("");
      setEventEndDate("");
      setDescription("");
      setCategory("");
      setTheme("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setLocation("");
      setLocationType("");
      setTotalSLots("");
      setErrors("");

      setSucc(true);
      toast.success("Job Created Successfully");
      navigate("/employer/allEvents");
      window.location.reload(true);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="800px:w-[50%] w-[90%] bg-white shadow h-[80vh] rounded-md p-3 overflow-y-scroll">
        <h5 className="text-[30px] font-bold text-center">Create Event</h5>

        {/* create event */}
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Event Name..."
              required
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              rows="8"
              required
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Event Description..."
            ></textarea>
          </div>

          <br />
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option key={i.title} value={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
            {errors && <p className="text-red-500">{errors}</p>}
          </div>

          <br />
          <div>
            <label className="pb-2">
              Event Tags <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Event Tags..."
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Event Theme <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tags"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Event Theme..."
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tags"
              id="start-date"
              value={
                eventStartDate ? eventStartDate.toISOString().slice(0, 10) : ""
              }
              onChange={handleStartDateChange}
              min={today}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tags"
              id="end-date"
              value={
                eventEndDate ? eventEndDate.toISOString().slice(0, 10) : ""
              }
              min={minEndDate}
              onChange={handleEndDateChange}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Original Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="salary"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Original Price..."
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="salary"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Discount Price..."
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Event Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Event Location..."
            />
          </div>

          <br />
          <div>
            <label className="pb-2">
              Location Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-md"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              required
            >
              <option value="">-- Select Location Type --</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            {errors && <p className="text-red-500">{errors}</p>}
          </div>

          <br />
          <div>
            <label className="pb-2">
              Event Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-md"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            >
              <option value="">-- Select Event Type --</option>
              <option value="Webinars">Webinars</option>
              <option value="Training Program">Training Program</option>
              <option value="Workshop">Workshop</option>
            </select>
            {errors && <p className="text-red-500">{errors}</p>}
          </div>

          <br />
          <div>
            <label className="pb-2">
              Total Slots <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="education"
              value={totalSlots}
              onChange={(e) => setTotalSLots(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Total Slots..."
            />
          </div>

          <br />
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image
            </label>
            <div className="mt-2 flex items-center">
              <span className="inline-block cursor-pointer h-8 w-8 rounded-full overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center cursor-pointer justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload event image</span>
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Upload
                </button>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full mt-5 h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerCreateEvent;
