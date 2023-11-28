// dateUtils.js
export function convertToCustomDateFormat(inputDate) {
  const parsedDate = new Date(inputDate);
  const options = { day: "2-digit", month: "short" };
  return parsedDate.toLocaleDateString("en-GB", options);
}

export function formatRemainingTime(deadline) {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();

  const timeRemaining = deadlineDate - currentDate;

  if (timeRemaining < 0) {
    return "Expired";
  }

  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

  if (daysRemaining > 0) {
    return `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} remaining`;
  } else if (hoursRemaining > 0) {
    return `${hoursRemaining} hour${hoursRemaining > 1 ? "s" : ""} remaining`;
  } else {
    return "Less than an hour remaining";
  }
}
