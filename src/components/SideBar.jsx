import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function SideBar() {
  // user,admin,agent
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  // User
  const [isWishListHovered, setIsWishListHovered] = useState(false);
  const [isMyReviewHovered, setIsMyReviewHovered] = useState(false);
  const [isPropertyBroughtHovered, setIsPropertyBroughtHovered] =
    useState(false);

  // Admin
  const [isManagePropertiesHovered, setIsManagePropertiesHovered] =
    useState(false);
  const [isManageUsersHovered, setIsManageUsersHovered] = useState(false);
  const [isManageReviewsHovered, setIsManageReviewsHovered] = useState(false);

  // Agent
  const [isAddPropertyHovered, setIsAddPropertyHovered] = useState(false);
  const [isMyAddedPropertiesHovered, setIsMyAddedPropertiesHovered] =
    useState(false);
  const [isMySoldPropertiesHovered, setIsMySoldPropertiesHovered] =
    useState(false);
  const [isMyRequestedPropertiesHovered, setIsMyRequestedPropertiesHovered] =
    useState(false);

  // const location = useLocation();
  // const parts = location.pathname.split("/");
  // const defaultValue = parts[2];
  const [isActive, setIsActive] = useState("profile");

  // console.log(location);
  // console.log(defaultValue);
  const isUser = false;
  const isAdmin = false;
  const isAgent = true;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="drawer-button cursor-pointer p-4 lg:hidden"
        >
          <GiHamburgerMenu className="text-xl" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="dashboard p-4 w-52 md:w-80 min-h-full bg-gray-700 font-semibold text-xs md:text-sm lg:text-lg">
          {/* Sidebar content here */}
          <li className="mt-1">
            <div className="">
              <img className="w-full h-full" src="/dashboard_logo.png" alt="" />
            </div>
          </li>
          <div className="mt-4  md:px-5 space-y-1">
            <li>
              <NavLink className="bg-red-200 " to="/">
                <div
                  onClick={() => setIsActive("home")}
                  onMouseEnter={() => setIsHomeHovered(true)}
                  onMouseLeave={() => setIsHomeHovered(false)}
                  className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7">
                    <img
                      className="h-full w-full"
                      src={
                        isHomeHovered || isActive === "home"
                          ? "https://img.icons8.com/sf-regular-filled/48/home.png"
                          : "https://img.icons8.com/sf-regular-filled/48/f87060/home.png"
                      }
                      alt="home"
                    />
                  </div>
                  <span>Home</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="bg-red-200 " to="/dashboard/profile  ">
                <div
                  onClick={() => setIsActive("profile")}
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                  className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                >
                  <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                    <img
                      className="h-full w-full"
                      src={
                        isProfileHovered || isActive === "profile"
                          ? "https://img.icons8.com/ios-filled/50/user-group-man-man.png"
                          : "https://img.icons8.com/ios-filled/50/f87060/user-group-man-man.png"
                      }
                      alt="user-group-man-man"
                    />
                  </div>
                  <span>My Profile</span>
                </div>
              </NavLink>
            </li>
            {isUser && (
              <>
                <li>
                  <NavLink className="bg-red-200 " to="/dashboard/wishlist">
                    <div
                      onClick={() => setIsActive("wishlist")}
                      onMouseEnter={() => setIsWishListHovered(true)}
                      onMouseLeave={() => setIsWishListHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isWishListHovered || isActive === "wishlist"
                              ? "https://img.icons8.com/ios-filled/50/list.png"
                              : "https://img.icons8.com/ios-filled/50/f87060/list.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>WishList</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="bg-red-200 " to="/dashboard/properties">
                    <div
                      onClick={() => setIsActive("property-brought")}
                      onMouseEnter={() => setIsPropertyBroughtHovered(true)}
                      onMouseLeave={() => setIsPropertyBroughtHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isPropertyBroughtHovered ||
                            isActive === "property-brought"
                              ? "https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/external-keys-hotel-services-and-city-elements-flatart-icons-solid-flatarticons.png"
                              : "https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/f87060/external-keys-hotel-services-and-city-elements-flatart-icons-solid-flatarticons.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>Property Brought</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="bg-red-200 " to="/dashboard/reviews">
                    <div
                      onClick={() => setIsActive("myreview")}
                      onMouseEnter={() => setIsMyReviewHovered(true)}
                      onMouseLeave={() => setIsMyReviewHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isMyReviewHovered || isActive === "myreview"
                              ? "https://img.icons8.com/ios-filled/50/000000/mark-as-favorite.png"
                              : "https://img.icons8.com/ios-filled/50/f87060/mark-as-favorite.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>My Review</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    className="bg-red-200 "
                    to="/dashboard/manage-properties"
                  >
                    <div
                      onClick={() => setIsActive("manage-properties")}
                      onMouseEnter={() => setIsManagePropertiesHovered(true)}
                      onMouseLeave={() => setIsManagePropertiesHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isManagePropertiesHovered ||
                            isActive === "manage-properties"
                              ? "https://img.icons8.com/ios-filled/50/view-details.png"
                              : "https://img.icons8.com/ios-filled/50/f87060/view-details.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>Manage Properties</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="bg-red-200 " to="/dashboard/manage-users">
                    <div
                      onClick={() => setIsActive("manage-users")}
                      onMouseEnter={() => setIsManageUsersHovered(true)}
                      onMouseLeave={() => setIsManageUsersHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isManageUsersHovered || isActive === "manage-users"
                              ? "https://img.icons8.com/glyph-neue/64/users-settings.png"
                              : "https://img.icons8.com/glyph-neue/64/f87060/users-settings.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>Manage Users</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-red-200 "
                    to="/dashboard/manage-reviews"
                  >
                    <div
                      onClick={() => setIsActive("manage-reviews")}
                      onMouseEnter={() => setIsManageReviewsHovered(true)}
                      onMouseLeave={() => setIsManageReviewsHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isManageReviewsHovered ||
                            isActive === "manage-reviews"
                              ? "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-rate-user-tanah-basah-glyph-tanah-basah.png"
                              : "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/f87060/external-rate-user-tanah-basah-glyph-tanah-basah.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>Manage reviews</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
            {isAgent && (
              <>
                <li>
                  <NavLink className="bg-red-200 " to="/dashboard/add-property">
                    <div
                      onClick={() => setIsActive("add-property")}
                      onMouseEnter={() => setIsAddPropertyHovered(true)}
                      onMouseLeave={() => setIsAddPropertyHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isAddPropertyHovered || isActive === "add-property"
                              ? "https://img.icons8.com/ios-glyphs/30/add--v1.png"
                              : "https://img.icons8.com/ios-glyphs/30/f87060/add--v1.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>Add Property</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-red-200 "
                    to="/dashboard/my-added-properties"
                  >
                    <div
                      onClick={() => setIsActive("my-added-properties")}
                      onMouseEnter={() => setIsMyAddedPropertiesHovered(true)}
                      onMouseLeave={() => setIsMyAddedPropertiesHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isMyAddedPropertiesHovered ||
                            isActive === "my-added-properties"
                              ? "https://img.icons8.com/ios-filled/50/add-property.png"
                              : "https://img.icons8.com/ios-filled/50/f87060/add-property.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>My Added Properties</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-red-200 "
                    to="/dashboard/my-sold-properties"
                  >
                    <div
                      onClick={() => setIsActive("my-sold-properties")}
                      onMouseEnter={() => setIsMySoldPropertiesHovered(true)}
                      onMouseLeave={() => setIsMySoldPropertiesHovered(false)}
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7">
                        <img
                          className="h-full w-full"
                          src={
                            isMySoldPropertiesHovered ||
                            isActive === "my-sold-properties"
                              ? "https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/78/external-Closing-property-sale-glyph-silhouettes-icons-papa-vector.png"
                              : "https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/78/f87060/external-Closing-property-sale-glyph-silhouettes-icons-papa-vector.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>My Sold Properties</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-red-200 "
                    to="/dashboard/my-requested-properties"
                  >
                    <div
                      onClick={() => setIsActive("my-requested-properties")}
                      onMouseEnter={() =>
                        setIsMyRequestedPropertiesHovered(true)
                      }
                      onMouseLeave={() =>
                        setIsMyRequestedPropertiesHovered(false)
                      }
                      className="flex space-x-2 items-center cursor-pointer text-[#f87060] hover:bg-[#f87060] hover:text-black transition-all duration-150 px-3 py-2 rounded-md"
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6">
                        <img
                          className="h-full w-full"
                          src={
                            isMyRequestedPropertiesHovered ||
                            isActive === "my-requested-properties"
                              ? "https://img.icons8.com/ios-filled/50/ask-question.png"
                              : "https://img.icons8.com/ios-filled/50/f87060/ask-question.png"
                          }
                          alt="user-group-man-man"
                        />
                      </div>
                      <span>Requested Properties</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
