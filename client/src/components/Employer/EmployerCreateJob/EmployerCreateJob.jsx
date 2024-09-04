import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../data/data";
import { createJob } from "../../../redux/actions/job";
import { toast } from "react-toastify";

const EmployerCreateJob = () => {
  const { employer } = useSelector((state) => state.employer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.job);

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [salary, setSalary] = useState();
  const [location, setLocation] = useState();
  const [category, setCategory] = useState();
  const [experience, setExperience] = useState();
  const [skills, setSkills] = useState();
  const [jobType, setJobType] = useState();
  const [education, setEducation] = useState();
  const [deadline, setDeadline] = useState();
  const [vacancy, setVacancy] = useState();
  const [tags, setTags] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Job Created Successfully");
      navigate("/employer/dashboard");
      window.location.reload(true);
    }
  }, [dispatch, error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("title", title);
    newForm.append("description", description);
    newForm.append("salary", salary);
    newForm.append("location", location);
    newForm.append("category", category);
    newForm.append("experience", experience);
    newForm.append("skills", skills);
    newForm.append("jobType", jobType);
    newForm.append("education", education);
    newForm.append("deadline", deadline);
    newForm.append("vacancy", vacancy);
    newForm.append("tags", tags);
    newForm.append("companyId", employer._id);
    newForm.append("companyName", employer.companyName);

    dispatch(createJob(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

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
            >
              <option disabled>-- Select Category --</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option key={i.title} value={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
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
            >
              <option disabled>-- Select Category --</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
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
            <label className="pb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle
                  size={30}
                  className="mt-3 cursor-pointer"
                  color="#555"
                />
              </label>
              {images &&
                images.map((i) => (
                  <img
                    src={URL.createObjectURL(i)}
                    alt=""
                    key={i}
                    className="w-[100px] mr-2 h-[100px] object-cover"
                  />
                ))}
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Create"
                className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerCreateJob;
