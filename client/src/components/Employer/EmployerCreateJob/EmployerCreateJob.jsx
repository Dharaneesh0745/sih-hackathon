import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../data/data";
import { createJob } from "../../../redux/actions/job";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../server";

const EmployerCreateJob = () => {
  const { employer } = useSelector((state) => state.employer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.job);

  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("");
  const [education, setEducation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [tags, setTags] = useState("");
  const [locationType, setLocationType] = useState("");
  const [errors, setErrors] = useState("");

  const handleFileUpload = () => {
    window.cloudinary.openUploadWidget(
      { cloudName: "dzutfi16w", uploadPreset: "bjydfkpb" },
      (error, result) => {
        if (result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image!");
      return;
    }

    try {
      const res = await axios.post(`${server}/job/create-job`, {
        title,
        description,
        salary,
        location,
        category,
        experience,
        skills,
        jobType,
        locationType,
        education,
        deadline,
        vacancy,
        tags,
        companyId: employer._id,
        imageUrl,
      });
      toast.success(res.data.message);
      setImageUrl("");
      setTitle("");
      setDescription("");
      setSalary("");
      setLocation("");
      setCategory("");
      setExperience("");
      setSkills("");
      setJobType("");
      setEducation("");
      setDeadline("");
      setVacancy("");
      setTags("");
      setLocationType("");
      setErrors("");

      navigate("/employer/allJobs");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  //   if (success) {
  //     toast.success("Job Created Successfully");
  //     navigate("/employer/allJobs");
  //     window.location.reload(true);
  //   }
  // }, [dispatch, error, success]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (category === "") {
  //     setErrors("Please select a location type.");
  //   }
  //   if (jobType === "") {
  //     setErrors("Please select a location type.");
  //   }
  //   if (locationType === "") {
  //     setErrors("Please select a location type.");
  //   } else {
  //     setErrors("");
  //   }

  //   const newForm = new FormData();

  //   images.forEach((image) => {
  //     newForm.append("images", image);
  //   });

  //   newForm.append("title", title);
  //   newForm.append("description", description);
  //   newForm.append("salary", salary);
  //   newForm.append("location", location);
  //   newForm.append("category", category);
  //   newForm.append("experience", experience);
  //   newForm.append("skills", skills);
  //   newForm.append("jobType", jobType);
  //   newForm.append("locationType", locationType);
  //   newForm.append("education", education);
  //   newForm.append("deadline", deadline);
  //   newForm.append("vacancy", vacancy);
  //   newForm.append("tags", tags);
  //   newForm.append("companyId", employer._id);
  //   newForm.append("companyName", employer.companyName);

  //   dispatch(createJob(newForm));
  // };

  // const handleImageChange = (e) => {
  //   e.preventDefault();

  //   let files = Array.from(e.target.files);
  //   setImages((prevImages) => [...prevImages, ...files]);
  // };

  return (
    <>
      <div className="800px:w-[50%] w-[90%] bg-white shadow h-[80vh] rounded-md p-3 overflow-y-scroll">
        <h5 className="text-[30px] font-bold text-center">Create Job</h5>

        {/* create job */}
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Job Title..."
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
              placeholder="Enter Job Description..."
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
              Job Tags <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Job Tags..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Salary Range <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Salary Range..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Job Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Job Location..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Required Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Required Experience..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Required Skills..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-md"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
            {errors && <p className="text-red-500">{errors}</p>}
          </div>
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
              <option value="">-- Select Category --</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
            {errors && <p className="text-red-500">{errors}</p>}
          </div>
          <br />
          <div>
            <label className="pb-2">
              Required Educational Level <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Required Educational Level..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Deadline..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Vacancy <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="vacancy"
              value={vacancy}
              onChange={(e) => setVacancy(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Vacancy..."
            />
          </div>
          <br />
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <div className="mt-2 flex items-center">
              <span className="inline-block cursor-pointer h-8 w-8 rounded-full overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
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
                <span>Upload company logo</span>
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
              className="group mt-5a relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerCreateJob;
