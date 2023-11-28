import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import Button from "./Button";
import useReviewAPI from "../hooks/API/useReviewAPI";
import { useForm } from "react-hook-form";
import SpinnerWithBlur from "./SpinnerWithBlur";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

function Modal({ modalRef, data }) {
  const { user, errorToast } = useAuth();
  const { createAReview } = useReviewAPI();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAReview,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Review Added Successfully 🤙",
        icon: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["properties", "show", data._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not add your review ⛔",
        icon: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    modalRef.current.close();
    if (!user) {
      errorToast("You Need to login first to give review", 2000);
      return;
    }
    const reviewData = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      reviewDescription: formData.description,
      property: data,
    };
    mutation.mutate(reviewData);
  };

  return (
    <>
      {mutation.isPending && <SpinnerWithBlur />}
      <div className="">
        <dialog
          ref={modalRef}
          id="my_modal_3"
          className="modal z-50 fixed inset-0 flex items-center justify-center bg-slate-300/30 backdrop-blur-sm"
        >
          <div className="modal-box">
            {/* modal close form */}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-xl text-zinc-700 mb-2">
              Give Review
            </h3>
            {/* form */}
            <div className="w-full max-w-md mx-auto ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    User Name:
                  </label>
                  <input
                    className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3
                 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                 disabled:bg-gray-200"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    defaultValue={user?.displayName}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Review:
                  </label>
                  <textarea
                    className="w-full input-field h-24"
                    placeholder="Type your review ..."
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors?.description?.type === "required" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Description is required
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Button primary className="px-4 py-2 rounded-sm">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
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

export default Modal;
