import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaDribbble, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import style from "../../styles/Form.module.css";
import Bread from "../Bread";
import OTPField from "../OTPField";

const SocialTypes = [
  {
    name: "Linked In",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <RiInstagramFill />,
  },
  {
    name: "Behance",
    icon: <SiBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
];
export default function SellerForm() {
  const [seller, setSeller] = useState({
    image: null,
    name: "",
    userName: "",
    email: "",
    city: "",
    profession: "",
    gender: "",
    experience: "",
    services: [],
    skills: [],
    collegeName: "",
    resume: null,
    description: "",
    socialMediaLinks: [],
    experienceDetails: [],
    images: [null, null, null, null, null, null],
    coordinates: { longitude: 0, latitude: 0 },
  });

  const imagesRef = useRef([]);

  //----> form dynamics only --start

  const [skillInput, setSkillInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const [socialType, setSocialType] = useState("");
  const [socialLink, setSocialLink] = useState("");

  const [page, setPage] = useState(1);
  const [otpField, setOTPField] = useState(false);
  const [verifyButton, setVerifyButton] = useState(false);

  const handleAddSkills = (e) => {
    if (e.key === "Enter") {
      const newSkill = skillInput.trim();
      if (newSkill !== "") {
        setSeller((prev) => {
          return { ...prev, skills: [...prev.skills, newSkill] };
        });
        setSkillInput("");
      }
    }
  };

  const handleAddServices = (e) => {
    if (e.key === "Enter") {
      const newService = serviceInput.trim();
      if (newService !== "") {
        setSeller((prev) => {
          return { ...prev, services: [...prev.services, newService] };
        });
        setServiceInput("");
      }
    }
  };

  const handleRemoveSkills = (index) => {
    setSeller((prev) => {
      const updatedSkills = prev.skills.filter((_, i) => i !== index);
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleRemoveServices = (index) => {
    setSeller((prev) => {
      const updatedServices = prev.services.filter((_, i) => i !== index);
      return { ...prev, services: updatedServices };
    });
  };

  const handleAddExperinces = () => {
    setSeller((prev) => {
      return {
        ...prev,
        experienceDetails: [
          ...prev.experienceDetails,
          { title: "", link: "", content: "" },
        ],
      };
    });
  };

  const handleExpFields = ({ index, field, value }) => {
    setSeller((prev) => {
      let expArr = prev.experienceDetails;
      expArr[index][field] = value;
      return { ...prev, experienceDetails: expArr };
    });
  };

  const handleRemoveExp = (index) => {
    setSeller((prev) => {
      const newExpArr = prev.experienceDetails.filter((_, i) => i !== index);
      return { ...prev, experienceDetails: newExpArr };
    });
  };

  function getIconByName(name) {
    const socialType = SocialTypes.find(
      (social) => social.name.toLowerCase() === name?.toLowerCase()
    );
    return socialType ? socialType.icon : null;
  }

  function addSocials({ type, link }) {
    setSeller((prev) => {
      return {
        ...prev,
        socialMediaLinks: [
          ...prev.socialMediaLinks,
          { platformType: type, link: link },
        ],
      };
    });
    setSocialLink("");
    setSocialType("");
  }

  function removeSocials(index) {
    let arr = seller.socialMediaLinks;
    arr.splice(index, 1);
    setSeller({ ...seller, socialMediaLinks: arr });
  }

  const hamdleImagesAdd = ({ index, file }) => {
    setSeller((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = file;
      return { ...prev, images: imgsArr };
    });
  };

  const handleRemoveImages = (index) => {
    setSeller((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = null;
      return { ...prev, images: imgsArr };
    });

    if (imagesRef.current[index] && imagesRef.current[index].current) {
      imagesRef.current[index].current.value = "";
    }
  };

  const handleGetOTP = () => {
    setOTPField(true);
    setVerifyButton(true);
  };

  useEffect(() => {
    // Initialize refs for all input fields
    imagesRef.current = Array(seller.images.length)
      .fill()
      .map((_, i) => imagesRef.current[i] || React.createRef());
  }, [seller.images.length]);

  //----> form dynamics only --end

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", seller.image);
    formData.append("resume", seller.resume);
    formData.append("name", seller.name);
    formData.append("userName", seller.userName);
    formData.append("gender", seller.gender);
    formData.append("email", seller.email);
    formData.append("phone_number", seller.phone_number);
    formData.append("city", seller.city);
    formData.append("profession", seller.profession);
    formData.append("experience", seller.experience);
    formData.append("collegeName", seller.collegeName);
    formData.append("description", seller.description);
    formData.append("services", JSON.stringify(seller.services));
    formData.append("skills", JSON.stringify(seller.skills));
    formData.append(
      "experienceDetails",
      JSON.stringify(seller.experienceDetails)
    );
    formData.append(
      "socialMediaLinks",
      JSON.stringify(seller.socialMediaLinks)
    );

    // Append images
    seller.images.forEach((img, index) => {
      formData.append("images", img);
    });

    // Append coordinates
    formData.append("coordinates", JSON.stringify(seller.coordinates));

    try {
      const response = await axios.post(
        "http://localhost:4000/main/seller",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(seller);
  }, [seller]);

  return (
    <>
      <div className={style.Container}>
        <div className={style.Center}>
          <div className={style.Wrapper}>
            <Bread page={page}></Bread>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {page === 1 ? (
                <div className={style.Page}>
                  <div className={style.Header}>Verify yourself</div>
                  <div className={style.Subtext}>
                    Please enter your phone number. You will receive a text
                    message to verify your account. Message & data rates may
                    apply.
                  </div>
                  <div className={style.NumberField}>
                    <label htmlFor="numberfield">Phone Number</label>
                    <input id="numberfield" placeholder="+91"></input>
                  </div>

                  {otpField === true ? <OTPField></OTPField> : null}

                  <div className={style.Btn}>
                    {verifyButton === false ? (
                      <input
                        className="PrimaryBtn"
                        type="button"
                        value={"Get OTP"}
                        id="OtpButton"
                        // Add OTP function here
                        // Also add validations for phone number
                        onClick={() => handleGetOTP()}
                      />
                    ) : (
                      <input
                        className="PrimaryBtn"
                        type="button"
                        value={"Verify & Continue"}
                        id="OtpButton"
                        // Add OTP verification function here
                        onClick={() => {
                          setPage(2);
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : null}
              {page === 2 ? (
                <div className={style.Page}>
                  <div className={style.Image}>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      required
                      onChange={(e) =>
                        setSeller((prev) => ({
                          ...prev,
                          image: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                  <div>
                    <div className={style.TextField}>
                      <label htmlFor="name" className={style.Label}>
                        Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Harsh Singh"
                        required
                        value={seller.name}
                        className={style.TextInput}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className={style.TextField}>
                      <label htmlFor="userName" className={style.Label}>
                        Username
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Harsh Singh"
                        className={style.TextInput}
                        required
                        value={seller.userName}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            userName: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className={style.TextField}>
                      <label htmlFor="gender" className={style.Label}>
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        value={seller.gender}
                        className={style.Dropdown}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select a gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                    <div className={style.TextField}>
                      <label htmlFor="email" className={style.Label}>
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="randomemail@gmail.com"
                        className={style.TextInput}
                        required
                        value={seller.email}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className={style.TextField}>
                      <label htmlFor="phone_number" className={style.Label}>
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone_number"
                        id="phone_number"
                        className={style.TextInput}
                        placeholder="+91 1234567890"
                        required
                        disabled
                        value={seller.phone_number}
                      />
                    </div>
                    <div className={style.TextField}>
                      <label htmlFor="city" className={style.Label}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className={style.TextInput}
                        placeholder="Enter your current city"
                        required
                        value={seller.city}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <input
                      className="PrimaryBtn"
                      type="button"
                      value={"Save & Continue"}
                      id="OtpButton"
                      onClick={() => {
                        setPage(3);
                      }}
                    />
                  </div>
                </div>
              ) : null}
              {page === 3 ? (
                <div className={style.Page}>
                  <div>
                    <div className={style.TextField}>
                      <label htmlFor="profession" className={style.Label}>
                        Profession
                      </label>
                      <select
                        name="profession"
                        id="profession"
                        required
                        value={seller.profession}
                        className={style.Dropdown}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            profession: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select a profession
                        </option>
                        <option value="Photo grapher">Photo grapher</option>
                        <option value="Designer">Designer</option>
                        <option value="Software Enginner">
                          Software Enginner
                        </option>
                      </select>
                    </div>
                    <div className={style.TextField}>
                      <label htmlFor="experience" className={style.Label}>
                        Experience
                      </label>
                      <select
                        name="experience"
                        id="experience"
                        className={style.Dropdown}
                        required
                        value={seller.experience}
                        onChange={(e) =>
                          setSeller((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Experience in Years
                        </option>
                        <option value="0-1">0-1</option>
                        <option value="1-3">1-3</option>
                        <option value="3-5">3-5</option>
                        <option value="5-above">5-above</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className={style.TextField}>
                      <label htmlFor="services" className={style.Label}>
                        Services Provided
                      </label>
                      <div className={style.TagsContainer}>
                        {seller.services.map((service, index) => (
                          <div key={index} className={style.Tag}>
                            <button
                              className={style.Remove}
                              type="button"
                              onClick={() => handleRemoveServices(index)}
                            >
                              x
                            </button>
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        name="services"
                        id="services"
                        placeholder=" "
                        className={style.TextInput}
                        value={serviceInput}
                        onChange={(e) => setServiceInput(e.target.value)}
                        onKeyDown={handleAddServices}
                      />
                    </div>
                    <div className={style.TextField}>
                      <label htmlFor="skills" className={style.Label}>
                        Skills
                      </label>
                      <div className={style.TagsContainer}>
                        {seller.skills.map((skill, index) => (
                          <div key={index} className={style.Tag}>
                            <span>{skill}</span>
                            <button
                              type="button"
                              className={style.Remove}
                              onClick={() => handleRemoveSkills(index)}
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        name="skills"
                        id="skills"
                        className={style.TextInput}
                        placeholder=" "
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkills}
                      />
                    </div>
                  </div>
                  <div className={style.TextField}>
                    <label htmlFor="collegeName" className={style.Label}>
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collegeName"
                      id="collegeName"
                      className={style.TextInput}
                      placeholder=" "
                      value={seller.collegeName}
                      onChange={(e) =>
                        setSeller((prev) => ({
                          ...prev,
                          collegeName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className={style.TextField}>
                    <label htmlFor="resume" className={style.Label}>
                      Resume
                    </label>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      className={style.TextInput}
                      onChange={(e) =>
                        setSeller((prev) => ({
                          ...prev,
                          resume: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                  <input
                    className="PrimaryBtn"
                    type="button"
                    value={"Save & Continue"}
                    id="OtpButton"
                    onClick={() => {
                      setPage(4);
                    }}
                  />
                </div>
              ) : null}
              {page === 4 ? (
                <div className={style.page}>
                  <div className={style.TextField}>
                    <label htmlFor="description" className={style.Label}>
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder=" "
                      className={style.TextInput}
                      required
                      value={seller.description}
                      onChange={(e) =>
                        setSeller((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className={style.TextField}>
                    <label htmlFor="experienceDetails" className={style.Label}>
                      Experinces
                    </label>
                    <div>
                      {seller.experienceDetails.map((obj, index, idx) => (
                        <div key={idx}>
                          <div>
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              name="title"
                              required
                              value={obj.title}
                              onChange={(e) =>
                                handleExpFields({
                                  index,
                                  field: "title",
                                  value: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="link">Link</label>
                            <input
                              type="text"
                              name="link"
                              required
                              value={obj.link}
                              onChange={(e) =>
                                handleExpFields({
                                  index,
                                  field: "link",
                                  value: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="content">Details</label>
                            <input
                              type="text"
                              name="content"
                              required
                              value={obj.content}
                              onChange={(e) =>
                                handleExpFields({
                                  index,
                                  field: "content",
                                  value: e.target.value,
                                })
                              }
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExp(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleAddExperinces}>
                      Add Experiences
                    </button>
                  </div>
                  <div>
                    <label htmlFor="socialMediaLinks">Social Types</label>
                    <ul>
                      {seller?.socialMediaLinks?.map((social, index) => (
                        <li key={index}>
                          <div>
                            <div>
                              <div>{getIconByName(social.platformType)}</div>
                            </div>
                            <span>{social.platformType}</span>
                          </div>
                          <div>
                            <span>{social.link}</span>
                            <button
                              type="button"
                              onClick={() => removeSocials(index)}
                            >
                              <RxCross2 />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <select
                        name="social-media"
                        id="social-media"
                        value={socialType}
                        onChange={(e) => setSocialType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a platform
                        </option>
                        {SocialTypes.map((social, index) => (
                          <option key={index} value={social.name}>
                            {social.name}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder="Enter your profile URL"
                        type="text"
                        value={socialLink}
                        onChange={(e) => setSocialLink(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          addSocials({ type: socialType, link: socialLink })
                        }
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSocialLink("");
                          setSocialType("");
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="images">Images</label>
                    {seller.images.map((img, index) => (
                      <div key={index}>
                        <input
                          type="file"
                          onChange={(e) =>
                            hamdleImagesAdd({ index, file: e.target.files[0] })
                          }
                          ref={imagesRef.current[index]}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImages(index)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="submit">Submit</button>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
