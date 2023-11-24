import { useState } from "react";
import Button from "../components/Button";
import { BiSolidShow, BiSolidHide } from "react-icons/Bi";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { MdAppRegistration } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

function App() {
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedPhotoUrl, setIsFocusedPhotoUrl] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [showPassword, setShowPassWord] = useState(false);
  const navigate = useNavigate();

  const { createUser, updateUserInfo, successToast, errorToast } = useAuth();
  const [isLoading, setIsloading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleShowPassword = () => {
    setShowPassWord(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsloading(true);
    createUser(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        updateUserInfo({
          displayName: data.name,
          photoURL: data.photo,
        })
          .then(() => {
            // create user in mongodb
            const userInfo = {
              userName: data.name,
              email: data.email,
              role: "user",
            };
            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                setIsloading(false);
                console.log("Mongodb user collection", res.data);
                successToast("Account created successfully", 2000);
                setTimeout(() => {
                  navigate("/");
                }, 3000);
              })
              .catch((e) => {
                setIsloading(false);
                console.log(e);
              });
          })
          .catch((error) => {
            console.log(error);
            setIsloading(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        errorToast(errorCode, 2000);
        setIsloading(false);
      });
  };
  return (
    <>
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* inputs */}
              <div className="space-y-8">
                <div>
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
                      {...register("name", { required: true })}
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
                  {errors?.name?.type === "required" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Name is required
                      </p>
                    </div>
                  )}
                </div>

                <div>
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
                      {...register("photo", { required: true })}
                      id="photo"
                      type="text"
                      placeholder=" "
                      className="w-full h-12 py-6 px-8 text-base placeholder-gray-500 border border-[#3d5a80] rounded-md focus:outline-none 
              focus:ring focus:ring-[#3d5a80] focus:border-[#3d5a80]"
                      onFocus={() => setIsFocusedPhotoUrl(true)}
                      onBlur={(e) =>
                        e.target.value === ""
                          ? setIsFocusedPhotoUrl(false)
                          : null
                      }
                    />
                  </div>
                  {errors?.photo?.type === "required" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Photo is required
                      </p>
                    </div>
                  )}
                </div>
                <div>
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
                      // {...register("email")}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
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
                  {errors?.email?.type === "required" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Email is required
                      </p>
                    </div>
                  )}
                  {errors?.email?.type === "pattern" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Type a valid email
                      </p>
                    </div>
                  )}
                </div>
                <div>
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
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                      })}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=" "
                      className="w-full h-12 py-6 px-8 text-base placeholder-gray-500 border border-[#3d5a80] rounded-md focus:outline-none 
              focus:ring focus:ring-[#3d5a80] focus:border-[#3d5a80]"
                      onFocus={() => setIsFocusedPassword(true)}
                      onBlur={(e) =>
                        e.target.value === ""
                          ? setIsFocusedPassword(false)
                          : null
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
                  {errors?.password?.type === "required" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        password is required
                      </p>
                    </div>
                  )}
                  {errors?.password?.type === "minLength" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Password should be at least 6 character
                      </p>
                    </div>
                  )}
                  {errors?.password?.type === "pattern" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Give at least a character or at least a special
                        character
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* btn */}
              <div className="flex space-x-8">
                <Button
                  type="submit"
                  primary
                  className="px-4 py-2 rounded-sm flex space-x-1 items-center"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <MdAppRegistration className="text-lg" />
                  )}

                  <span>{isLoading ? "Signing..." : "Sing Up"} </span>
                </Button>
                <Button
                  to="/login"
                  type="button"
                  secondary
                  outline
                  className="px-4 py-2 rounded-sm flex space-x-1 items-center"
                >
                  <FiLogIn />
                  <span>Log In</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1 bg-[url('/1.jpg')] bg-center bg-no-repeat bg-cover">
          <div className=""></div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          display: "inline-block",
          width: "auto",
        }}
      />
    </>
  );
}

export default App;
