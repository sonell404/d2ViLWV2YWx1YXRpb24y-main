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

import { DateTime } from "luxon";

const calculateRelativeDate = (inputDate) => {
  // Current date
  const today = DateTime.local();
  // Current week number
  const currentWeek = today.weekNumber;
  // Current month
  const currentMonth = today.month;
  // Current year
  const currentYear = today.year;

  // Input date
  const input = DateTime.fromISO(inputDate);
  // Input week number
  const inputWeek = input.weekNumber;
  // Input month
  const inputMonth = input.month;
  // Input year
  const inputYear = input.year;

  // Calculate the difference between the two dates using toRelativeCalendar()
  const diff = input.toRelativeCalendar(today);

  const returnMessage = () => {
    // If the input date is today, return message is today
    if (diff === "today") {
      return "Today";
    }

    // If the input date is yesterday, return message is yesterday
    if (diff === "yesterday") {
      return "Yesterday";
    }

    // If the input date is within the current week, return message is this week
    if (inputYear === currentYear && inputWeek === currentWeek) {
      return "This week";
    }

    // If the input date is within the last week of the same year, return message is last week
    if (inputYear === currentYear && inputWeek === currentWeek - 1) {
      return "Last week";
    }

    // If the input date is within the current month of the same year, return message is this month
    if (inputYear === currentYear && inputMonth === currentMonth) {
      return "This month";
    }

    // If the input date is within the last month of the same year, return message is last month
    if (inputYear === currentYear && inputMonth === currentMonth - 1) {
      return "Last month";
    }

    // If the input date is within the current year, return message is this year
    if (inputYear === currentYear) {
      return "This year";
    }

    // If the input date is within the last year, return message is last year
    if (inputYear === currentYear - 1) {
      return "Last year";
    }

    // If the input date is not within the last 2 years, return message is long time ago
    if (inputYear < currentYear - 1) {
      return "Long time ago";
    }
  };

  // Return the difference
  return returnMessage();
};

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
