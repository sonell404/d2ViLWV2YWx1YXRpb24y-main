import { html, fixture, expect } from "@open-wc/testing";
import { calculateRelativeDate } from "./relative-date";
import { DateTime } from "luxon";

describe("calculateRelativeDate", () => {
  // TEST FOR FUTURE
  it('returns "Today" when the input date is today', async () => {
    const today = DateTime.local().plus({ years: 1}).toISODate();
    expect(calculateRelativeDate(today)).to.equal("Invalid date");
  });

  // TEST FOR TODAY
  it('returns "Today" when the input date is today', async () => {
    const today = DateTime.local().toISODate();
    expect(calculateRelativeDate(today)).to.equal("Today");
  });

  // TEST FOR YESTERDAY
  it('returns "Yesterday" when the input date is yesterday', async () => {
    const yesterday = DateTime.local().minus({ days: 1 }).toISODate();
    expect(calculateRelativeDate(yesterday)).to.equal("Yesterday");
  });

  // TEST FOR THIS WEEK
  it('returns "This week" when the input date is within the current week', async () => {
    const today = DateTime.local();
    const startOfWeek = today.startOf("week").toISODate();
    expect(calculateRelativeDate(startOfWeek)).to.equal("This week");
  });

  // TEST FOR LAST WEEK
  it('returns "Last week" when the input date is within the last week', async () => {
    const lastWeekStart = DateTime.local()
      .minus({ weeks: 1 })
      .startOf("week")
      .toISODate();
    expect(calculateRelativeDate(lastWeekStart)).to.equal("Last week");
  });

  // TEST FOR THIS MONTH
  it('returns "This month" when the input date is within the current month', async () => {
    const today = DateTime.local();
    const startOfMonth = today.startOf("month").toISODate();
    expect(calculateRelativeDate(startOfMonth)).to.equal("This month");
  });

  // TEST FOR LAST MONTH
  it('returns "Last month" when the input date is within the last month', async () => {
    const lastMonthStart = DateTime.local()
      .minus({ months: 1 })
      .startOf("month")
      .toISODate();
    expect(calculateRelativeDate(lastMonthStart)).to.equal("Last month");
  });

  // TEST FOR THIS YEAR
  it('returns "This year" when the input date is within the current year', async () => {
    // Mock date from a datepicker
    const mockInput = DateTime.local().plus({ months: 3 }).toISODate();

    expect(calculateRelativeDate(mockInput)).to.equal("This year");
  });

  // TEST FOR LAST YEAR
  it('returns "Last year" when the input date is within the last year', async () => {
    const lastYear = DateTime.local().minus({ years: 1 }).toISODate();
    expect(calculateRelativeDate(lastYear)).to.equal("Last year");
  });

  // TEST FOR LONG TIME AGO
  it('returns "A long time ago" when the input date is not within the current year', async () => {
    const longTimeAgo = DateTime.local().minus({ years: 2 }).toISODate();
    expect(calculateRelativeDate(longTimeAgo)).to.equal("Long time ago");
  });
});
