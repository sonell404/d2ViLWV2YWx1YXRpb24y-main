/*
 * Write a function that will take a date and compare with today date and return text:
 * - Today: same year, same month, same date
 * - Yesterday: date = today - 1
 * - This week: today - 7 < date < today - 1
 * - Last week: today - 14 < date <= today - 7
 * - This month: same year, same month, date <= today - 14
 * - Last month: month = current month - 1
 * - This year: same year
 * - last year: year = current year - 1
 * - Long time ago: everything else
 *
 * Lastly, please write a unit test for calculateRelativeDate function
 * */

function calculateRelativeDate(date) {
  const today = new Date();
  const inputDate = new Date(date);

  // Compare the year, month, and date of the input date with the current date
  if (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  ) {
    return "Today";
  }

  // Calculate the difference in milliseconds between the input date and the current date
  const timeDiff = today.getTime() - inputDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Compare the difference in days with the predefined ranges
  if (daysDiff === 1) {
    return "Yesterday";
  } else if (daysDiff > 1 && daysDiff <= 7) {
    return "This week";
  } else if (daysDiff > 7 && daysDiff <= 14) {
    return "Last week";
  } else if (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() <= today.getDate() - 14
  ) {
    return "This month";
  } else if (inputDate.getMonth() === today.getMonth() - 1) {
    return "Last month";
  } else if (inputDate.getFullYear() === today.getFullYear()) {
    return "This year";
  } else if (inputDate.getFullYear() === today.getFullYear() - 1) {
    return "Last year";
  } else {
    return "Long time ago";
  }
}

const View = {
  init: () => {
    document
      .getElementById("relative-date-btn")
      .addEventListener("click", () => {
        const msgElement = document.getElementById("relative-date-msg");
        const inputDateElem = document.getElementById("relative-date-input");
        msgElement.textContent = calculateRelativeDate(inputDateElem.value);
      });
  },
};

document.addEventListener("DOMContentLoaded", View.init);
export { calculateRelativeDate };
