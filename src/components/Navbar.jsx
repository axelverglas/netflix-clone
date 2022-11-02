import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = UserAuth();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex p-4 z-[100] w-full fixed ${
        isScrolled ? "bg-black" : "transparen"
      }`}
    >
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer mr-6">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <>
          <ul className="flex items-center">
            <li className="text-white ml-5">
              <Link to="/myshows">My Shows</Link>
            </li>
          </ul>
          <div className="flex self-center justify-end right-60 top-0 h-full flex-grow">
            <Link to="/account">
              <img
                className="rounded cursor-pointer"
                src="https://occ-0-55-56.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                alt="profile icon"
              />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-end right-60 top-0 h-full flex-grow">
          <Link to="/login">
            <button className="text-white pr-4">Connexion</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Inscription
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
