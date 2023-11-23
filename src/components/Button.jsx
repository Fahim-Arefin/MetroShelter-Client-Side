import { Link } from "react-router-dom";

function Button({ children, primary, secondary, outline, ...rest }) {
  let primaryStyle = ` border-none bg-[#f87060] font-semibold  tracking-wide
  transition-all duration-150 hover:bg-[#d65a4b] focus:outline-none focus:ring focus:ring-[#d65a4b] 
  focus:ring-offset-2 active:bg-[#ba4b3d] disabled:cursor-not-allowed disabled:bg-purple-200`;

  let primaryOutline = ` border border-[#f87060] font-semibold  tracking-wide
  transition-all duration-150 hover:bg-[#f87060] focus:outline-none focus:ring focus:ring-[#f87060] 
  focus:ring-offset-2 active:bg-[#ba4b3d] disabled:cursor-not-allowed disabled:bg-purple-200`;

  let secondaryStyle = ` border-none bg-[#3d5a80] font-semibold  tracking-wide
  transition-all duration-150 hover:bg-[#2e4a6e] focus:outline-none focus:ring focus:ring-[#2e4a6e] 
  focus:ring-offset-2 active:bg-[#72d8e1] disabled:cursor-not-allowed disabled:bg-purple-200 `;

  let secondaryOutline = ` border border-[#3d5a80] font-semibold  tracking-wide
  transition-all duration-150 hover:bg-[#3d5a80] focus:outline-none focus:ring focus:ring-[#3d5a80] 
  focus:ring-offset-2 active:bg-[#2e4a6e] disabled:cursor-not-allowed disabled:bg-purple-200`;

  // let secondaryStyle = ` border-none bg-[#b4b4b4] font-semibold  tracking-wide
  // transition-all duration-150 hover:bg-[#9e9d9d] focus:outline-none focus:ring focus:ring-[#9e9d9d]
  // focus:ring-offset-2 active:bg-[#72d8e1] disabled:cursor-not-allowed disabled:bg-purple-200 `;

  // let secondaryOutline = ` border border-[#b4b4b4] font-semibold  tracking-wide
  // transition-all duration-150 hover:bg-[#b4b4b4] focus:outline-none focus:ring focus:ring-[#b4b4b4]
  // focus:ring-offset-2 active:bg-[#9e9d9d] disabled:cursor-not-allowed disabled:bg-purple-200`;

  // b2ebf9
  //if button use as a link
  if (rest?.to) {
    return (
      <Link
        className={`${
          primary
            ? outline
              ? primaryOutline
              : primaryStyle
            : secondary
            ? outline
              ? secondaryOutline
              : secondaryStyle
            : ""
        } ${rest.className}`}
        to={rest.to}
      >
        {children}
      </Link>
    );
  }

  //primary button
  return (
    <div>
      <button
        {...rest}
        className={`${
          //   primary ? primaryStyle : secondary ? secondaryStyle : ""
          primary
            ? outline
              ? primaryOutline
              : primaryStyle
            : secondary
            ? outline
              ? secondaryOutline
              : secondaryStyle
            : ""
        } ${rest.className}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
