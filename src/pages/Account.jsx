import React, { useRef, useState } from "react";
import { updateEmail } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, logOut } = UserAuth();
  const email = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //change mail
  const handleEmailChange = async () => {
    try {
      await updateEmail(user, email.current.value);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="w-full px-4 py-36 z-50">
        <div className="max-w-[600px] h-[600px] mx-auto bg-black/75 text-white">
          <h1 className="text-white text-3xl md:text-5xl pb-2">Edit Profile</h1>
          <div className="border-t-2 border-gray-900">
            {error ? <p className="p-3 bg-red-400 my-2">{error}</p> : null}
            <div className="flex py-4">
              <div>
                <img
                  className="w-[100px]"
                  src="https://occ-0-55-56.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABVdopoc4DhJ9M4hert4MN_F1EbR5f7rDgDjhPSqx0nRvGQvcD9zL1In0fwJumR96g-0ir2WORbrmQZ6OkfyCZtQryMVbqUWwKw.png?r=e6e"
                  alt="profile icon"
                />
              </div>
              <div className="pl-6 w-full">
                <input
                  className="w-full bg-gray-900 text-white p-3"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  ref={email}
                />
                <button
                  className="bg-red-600 mt-4 px-6 py-2 rounded cursor-pointer"
                  onClick={handleEmailChange}
                >
                  Change Email
                </button>
                <div className="mt-4">
                  <button
                    className="w-full bg-red-600 mt-4 px-6 py-2 rounded cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
