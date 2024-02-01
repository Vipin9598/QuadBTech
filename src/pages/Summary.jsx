import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setTicket } from "../slices/movieSlice";
import { motion, AnimatePresence, animate } from "framer-motion";

const dropIn = {
  initial: {
    opacity: 0,
    y: "-100vh",
  },
  animate: {
    opacity: 1,
    y: -350,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200,
      damped: 5,
    },
  },
  exit: {
    opacity: 0,
    y: "100vh",
  },
};

const Summary = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.movieData);
  const [showform, setshowform] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    slot: "",
  });

  function changeHandler(event) {
    setFormData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event, data) {
    event.preventDefault();
    toast.success("Ticket Booked Successfully");
    console.log("formData", formData);
    setTicket();
    setshowform(false);
  }

  return (
    <div className="grad">
      <div className="md:w-9/12 relative sm:w-11/12  mx-auto flex flex-col justify-center items-center  ">
      <div className="py-5 flex flex-col gap-5">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border text-xl text-white bg-blue-500 transition-all duration-200 rounded-md w-fit"
        >
          Back
        </button>
        {!data ? (
          <Spinner />
        ) : (
          <motion.div initial={{opacity:0,x:-100}} animate={{opacity:1,x:0,transition:{duration:1}}} className="relative">
            <div className=" w-full flex sm:flex-row flex-col ">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={data.show.image?.original}
                  className=" h-[400px] w-[1800px] "
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-5 px-5 sm:py-0 py-5   text-white">
                <div className="flex flex-col gap-7">
                  <p className="text-2xl font-bold">{`${data.show.name}
                   (${data.show.premiered.split("-").splice(0,1)})`}</p>
                  <p>Language : {data.show.language}</p>
                  <p className="text-sm">
                    {data.show.summary.split(" ").length > 35
                      ? data.show.summary.split(" ").splice(0, 50).join(" ") +
                        "..."
                      : data.show.summary}
                  </p>
                  <div className=" w-full flex justify-between">
                    <button
                      onClick={() => setshowform(true)}
                      className=" bg-orange-800 px-3 py-1 rounded-xl"
                    >
                     {showform?"Cancel" : " Book Tickets"}
                    </button>
                    <p>Rating : ({data.show.rating.average}/10)</p>
                  </div>
                </div>
                {/* <div className="w-full "> */}
                  

              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showform && (
          <motion.form
            variants={dropIn}
            initial="initial"
            animate="animate"
            exit="exit"
            onSubmit={submitHandler}
            className={`flex flex-col   gap-5  h-fit p-2 bg-white border rounded-md px-2   bottom-0 sm:w-[400px] w-auto`}
          >
            <div className="flex flex-col  gap-5">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="name" className="text-black">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={changeHandler}
                  required={true}
                  className=" text-white px-2 py-1  rounded-md border border-r-zinc-800 bg-slate-500"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="email" className="text-black">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={changeHandler}
                  value={data.email}
                  required={true}
                  className=" text-white px-2 py-1  rounded-md border border-r-zinc-800 bg-slate-500"
                />
              </div>
            </div>

            <div className="flex  flex-col gap-5 ">
              <div className="flex flex-col gap-1">
                <label htmlFor="options" className="text-lg text-black">
                  Choose Slot
                </label>
                <select
                  id="options"
                  name="slot"
                  value={data.slot}
                  onChange={changeHandler}
                  className="bg-slate-500  px-2 py-1 rounded-md text-white"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              <div className="flex justify-end items-center gap-5">
                <button
                  type="submit"
                  className="text-white bg-blue-500 px-2 py-1 h-fit rounded-md"
                >
                  Confirm
                </button>
                <button
                  className="text-white bg-red-500 px-2 py-1 h-fit rounded-md"
                  onClick={() => setshowform(false)}
                >
                  cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

    
    </div>
    </div>
  );
};

export default Summary;
