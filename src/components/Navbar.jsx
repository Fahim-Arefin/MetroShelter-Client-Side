import { NavLink, useNavigate } from "react-router-dom";

import Button from "./Button";
import { FiLogIn } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

function Navbar({ className }) {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  console.log(user?.photoURL);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("Logged out");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      className={`sticky shadow-2xl top-0 bg-white  z-50 px-12 mx-auto navbar ${className}`}
      style={{ fontWeight: 500 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-30 p-2 py-4 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/properties">All Properties</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="text-xl tracking-widest font-bold flex items-center space-x-4 px-6 py-4 rounded-lg">
          <div className="w-32 md:w-44">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </div>
          {/* <span className="bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent bg-clip-text text-xl lg:text-2xl">
            JobZen
          </span> */}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="option-menu flex space-x-4 text-gray-700 text-lg tracking-wide">
          <li>
            <NavLink
              className="cursor-pointer font-semibold hover:border-b-2 hover:border-b-[#f87060] transition-all duration-150 px-4 py-1 rounded-sm "
              to="/"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className="cursor-pointer font-semibold hover:border-b-2 hover:border-b-[#f87060] transition-all duration-150 px-4 py-1 rounded-sm "
              to="/properties"
            >
              All properties
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                className="cursor-pointer font-semibold hover:border-b-2 hover:border-b-[#f87060] transition-all duration-150 px-4 py-1 rounded-sm "
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar relative group"
            >
              <div className="w-10 rounded-full">
                <img src={`${user.photoURL}`} />
              </div>
              <div
                className="invisible group-hover:visible absolute right-12 top-4 w-32 h-[50px]
              opacity-0 transition-all duration-300 group-hover:opacity-100 mr-2 text-center "
              >
                <p className="">{user?.displayName}</p>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="hover:bg-[#aea1ea] rounded-lg">
                <a className="hover:text-white transition-all duration-150">
                  {user?.displayName}
                </a>
              </li>
              <li
                className="hover:bg-[#aea1ea] rounded-lg"
                onClick={handleLogOut}
              >
                <a className="hover:text-white transition-all duration-150">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          // <div className="flex justify-center items-center space-x-2">
          //   <div>
          //     <div>
          //       <img src="./defaultProPic.png" alt="" />
          //     </div>
          //     <div>
          //       <span>fahim</span>
          //     </div>
          //   </div>
          //   <div>log out</div>
          // </div>
          <div>
            {/* <Link to="/login">
              <button className="border border-[#aea1ea] text-zinc-800 px-3 py-2 rounded-md hover:bg-[#9b8ed7] active:bg-[#aea1ea]">
                Log in
              </button>
            </Link> */}
            <Button
              to="/login"
              primary
              outline
              className="px-4 py-2.5 flex space-x-2 rounded-sm"
            >
              <FiLogIn className="mt-[3px]" />
              <span>Log In</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
