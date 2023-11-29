import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import React, { useState } from "react";
import useUserAPI from "../hooks/API/useUserAPI";
import Button from "../components/Button";

function ManageUsers() {
  const boxStyle = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };

  const { getAllUser, updateUserRole } = useUserAPI();
  const [isClicked, setIsClicked] = useState(null);
  const [role, setRole] = useState(null);

  const { isPending, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      console.log("hi");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (e) => {
      console.log("err", e);
    },
  });

  const handleMakeAdmin = (id, index) => {
    console.log(id);
    setIsClicked(index);
    setRole("admin");
    const updatedData = {
      role: "admin",
    };
    mutation.mutate({ id, updatedData });
  };
  const handleMakeAgent = (id, index) => {
    setIsClicked(index);
    setRole("agent");
    const updatedData = {
      role: "agent",
    };
    mutation.mutate({ id, updatedData });
  };

  return (
    <div className="h-screen py-12 px-4 md:p-24 overflow-scroll bg-[#f6fcff]">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          All User
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">
          Total User : {isPending ? "Loading..." : data?.length}
        </h3>
      </div>
      <div>{isPending && <SpinnerWithBlur />}</div>
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && (
        <div
          style={boxStyle}
          className="grid grid-cols-1 overflow-x-auto mt-12"
        >
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  User Name
                </th>

                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  User Email
                </th>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Role
                </th>

                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Action
                </th>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Action
                </th>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Action
                </th>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-6 px-4 border-b text-center">
                      {user.userName}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {user.email}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {user.role}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      <Button
                        onClick={() => handleMakeAdmin(user._id, index)}
                        primary
                        className="px-4 py-2 rounded-md "
                        disabled={
                          mutation.isPending &&
                          isClicked === index &&
                          role === "admin"
                        }
                      >
                        {mutation.isPending &&
                        isClicked === index &&
                        role === "admin" ? (
                          <div className="flex space-x-1 items-center">
                            <span className="loading loading-spinner loading-sm"></span>
                            <div>Changing...</div>
                          </div>
                        ) : (
                          "Make Admin"
                        )}
                      </Button>
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      <Button
                        onClick={() => handleMakeAgent(user._id, index)}
                        primary
                        className="px-4 py-2 rounded-md "
                        disabled={
                          mutation.isPending &&
                          isClicked === index &&
                          role === "agent"
                        }
                      >
                        {mutation.isPending &&
                        isClicked === index &&
                        role === "agent" ? (
                          <div className="flex space-x-1 items-center">
                            <span className="loading loading-spinner loading-sm"></span>
                            <div>Changing...</div>
                          </div>
                        ) : (
                          "Make Agent"
                        )}
                      </Button>
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {user.role === "agent" && (
                        <button
                          className="border-none bg-[#b4b4b4] font-semibold  tracking-wide
                                    transition-all duration-150 hover:bg-[#9e9d9d] focus:outline-none focus:ring focus:ring-[#9e9d9d]
                                    focus:ring-offset-2 active:bg-[#b4b4b4] disabled:cursor-not-allowed disabled:bg-purple-200 px-4 py-2 rounded-md "
                        >
                          Mark as froud
                        </button>
                      )}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      <button
                        className="  border border-[#f93953] font-semibold  tracking-wide
                                    transition-all duration-150 hover:bg-[#fe324d] focus:outline-none focus:ring focus:ring-[#f93953]
                                    focus:ring-offset-2 active:bg-[#e84a5f] disabled:cursor-not-allowed disabled:bg-[#e97584e7] px-4 py-2 rounded-md "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
