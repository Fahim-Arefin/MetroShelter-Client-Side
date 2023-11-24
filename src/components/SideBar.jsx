import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="dashboard p-4 w-80 min-h-full bg-gray-700 font-semibold text-lg">
          {/* Sidebar content here */}
          <li className="mt-1">
            <div className="">
              <img className="w-full h-full" src="/dashboard_logo.png" alt="" />
            </div>
          </li>
          <div className="mt-4 px-5 space-y-1">
            <li>
              <NavLink className="bg-red-200 " to="/">
                <div className="cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-white transition-all duration-150 px-3 py-2 rounded-md">
                  Home
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="bg-red-200 " to="/dashboard/profile  ">
                <div className="cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-white transition-all duration-150 px-3 py-2 rounded-md">
                  My Profile
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="bg-red-200 " to="/dashboard/wishlist">
                <div className="cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-white transition-all duration-150 px-3 py-2 rounded-md">
                  Wishlist
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="bg-red-200 " to="/dashboard/properties">
                <div className="cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-white transition-all duration-150 px-3 py-2 rounded-md">
                  Property bought
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="bg-red-200 " to="/dashboard/reviews">
                <div className="cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-white transition-all duration-150 px-3 py-2 rounded-md">
                  My reviews
                </div>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
