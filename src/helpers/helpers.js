// src/helpers/helpers.js

/**
 * Returns a Date object for the start of the week (Monday) based on the provided date.
 * @param {Date} date
 * @returns {Date}
 */
export const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };
  
  /**
   * Generates an array of weeks, each containing weekdays (Monday to Friday).
   * @param {Date} startDate
   * @param {number} numberOfWeeks
   * @returns {Array<Array<Date>>}
   */
  export const generateWeeks = (startDate, numberOfWeeks = 2) => {
    const weeks = [];
    let currentDate = new Date(startDate);
  
    for (let i = 0; i < numberOfWeeks; i++) {
      const week = [];
      for (let j = 0; j < 5; j++) { // Monday to Friday
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
      // After Friday, skip to next Monday
      currentDate.setDate(currentDate.getDate() + 2); // Skip Saturday and Sunday
    }
  
    return weeks;
  };
  
  /**
   * Checks if a given date is in the past.
   * @param {Date} date
   * @returns {boolean}
   */
  export const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };
  
  /**
   * Checks if a given date is Tuesday or Friday.
   * @param {Date} date
   * @returns {boolean}
   */
  export const isUnclickableDay = (date) => {
    const day = date.getDay();
    return day === 2 || day === 5; // Tuesday or Friday
  };
  