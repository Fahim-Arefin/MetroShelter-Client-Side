import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

function MyProfile() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosPublic.get("/users");
      const found = res.data.find((data) => data.email === user.email);
      if (found) {
        setUserData(found);
      }
    };
    fetch();
  }, [axiosPublic, user]);

  return (
    <div className="h-screen py-12 px-4 md:p-24 overflow-scroll bg-[#f6fcff]">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          My Profile
        </h1>
      </div>
      <div>
        <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
          <div className="flex space-x-6 items-center">
            <img
              src={user.photoURL}
              alt={userData.name}
              className="w-[100px] h-[100px]"
            />
            <div>
              <h2 className="text-2xl font-semibold">{userData.userName}</h2>
              {userData.role !== "user" && (
                <p className="text-gray-600">Role: {userData.role}</p>
              )}
              <div>{userData.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
