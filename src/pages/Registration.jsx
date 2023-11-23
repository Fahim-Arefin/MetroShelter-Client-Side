import { useState } from "react";
import Button from "./components/Button";
import { BiSolidShow, BiSolidHide } from "react-icons/Bi";

function Registration() {
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedPhotoUrl, setIsFocusedPhotoUrl] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [showPassword, setShowPassWord] = useState(false);

  const handleShowPassword = () => {
    setShowPassWord(!showPassword);
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
        <div className="w-full p-4 md:p-0 md:w-[65%]  space-y-12">
          {/* heading */}
          <div className="space-y-4">
            <h1 className="text-[#b4b4b4] text-4xl font-semibold">
              We Are <span className="text-[#f87060]">MetroShelter</span>
            </h1>
            <p className="text-[16px] text-[#9f9f9f] ">
              Please Registration first for log in <br /> to your account
            </p>
          </div>

          {/* inputs */}
          <div className="space-y-8">
            <div className="relative w-full md:w-96">
              <label
                htmlFor="name"
                className={`absolute left-3 ${
                  isFocusedName
                    ? "bottom-10 text-sm text-[#3d5a80] font-bold leading-7 tracking-wider "
                    : "bottom-3 text-base text-[#314c6f] "
                } transition-all duration-300 ease-in-out pointer-events-none bg-white px-1`}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder=" "
                className="w-full h-12 py-6 px-8 text-base placeholder-gray-500 border border-[#3d5a80] rounded-md focus:outline-none 
              focus:ring focus:ring-[#3d5a80] focus:border-[#3d5a80]"
                onFocus={() => setIsFocusedName(true)}
                onBlur={(e) =>
                  e.target.value === "" ? setIsFocusedName(false) : null
                }
              />
            </div>
            <div className="relative w-full md:w-96">
              <label
                htmlFor="photo"
                className={`absolute left-3 ${
                  isFocusedPhotoUrl
                    ? "bottom-10 text-sm text-[#3d5a80] font-bold leading-7 tracking-wider "
                    : "bottom-3 text-base text-[#314c6f] "
                } transition-all duration-300 ease-in-out pointer-events-none bg-white px-1`}
              >
                Photo
              </label>
              <input
                id="photo"
                type="text"
                placeholder=" "
                className="w-full h-12 py-6 px-8 text-base placeholder-gray-500 border border-[#3d5a80] rounded-md focus:outline-none 
              focus:ring focus:ring-[#3d5a80] focus:border-[#3d5a80]"
                onFocus={() => setIsFocusedPhotoUrl(true)}
                onBlur={(e) =>
                  e.target.value === "" ? setIsFocusedPhotoUrl(false) : null
                }
              />
            </div>
            <div className="relative w-full md:w-96">
              <label
                htmlFor="email"
                className={`absolute left-3 ${
                  isFocusedEmail
                    ? "bottom-10 text-sm text-[#3d5a80] font-bold leading-7 tracking-wider "
                    : "bottom-3 text-base text-[#314c6f] "
                } transition-all duration-300 ease-in-out pointer-events-none bg-white px-1`}
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder=" "
                className="w-full h-12 py-6 px-8 text-base placeholder-gray-500 border border-[#3d5a80] rounded-md focus:outline-none 
              focus:ring focus:ring-[#3d5a80] focus:border-[#3d5a80]"
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={(e) =>
                  e.target.value === "" ? setIsFocusedEmail(false) : null
                }
              />
            </div>
            <div className="relative w-full md:w-96">
              <label
                htmlFor="password"
                className={`absolute left-3 ${
                  isFocusedPassword
                    ? "bottom-10 text-sm text-[#3d5a80] font-bold leading-7 tracking-wider "
                    : "bottom-3 text-base text-[#314c6f] "
                } transition-all duration-300 ease-in-out pointer-events-none bg-white px-1`}
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                className="w-full h-12 py-6 px-8 text-base placeholder-gray-500 border border-[#3d5a80] rounded-md focus:outline-none 
              focus:ring focus:ring-[#3d5a80] focus:border-[#3d5a80]"
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={(e) =>
                  e.target.value === "" ? setIsFocusedPassword(false) : null
                }
              />
              {showPassword ? (
                <div className="absolute right-4 top-3">
                  <BiSolidShow
                    onClick={handleShowPassword}
                    className="text-xl cursor-pointer"
                  />
                </div>
              ) : (
                <div className="absolute right-4 top-3">
                  <BiSolidHide
                    onClick={handleShowPassword}
                    className="text-xl cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
          {/* btn */}
          <div className="flex space-x-8">
            <Button primary className="px-4 py-2 rounded-sm">
              Sing Up
            </Button>
            <Button secondary outline className="px-4 py-2 rounded-sm">
              Log In
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1 bg-[url('/login.jpg')] bg-center bg-no-repeat bg-cover">
        <div className=""></div>
      </div>
    </div>
  );
}

export default Registration;
