/*!
  react-datepicker v8.3.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
import { clsx } from "clsx";
import React, {
  useRef,
  useCallback,
  useEffect,
  cloneElement,
  Component,
  createRef,
  createElement,
} from "react";
import {
  isSameDay as isSameDay$1,
  isWithinInterval,
  startOfWeek,
  format,
  startOfDay,
  endOfDay,
  isEqual as isEqual$1,
  parseISO,
  toDate,
  differenceInCalendarDays,
  isValid as isValid$1,
  isBefore,
  getISOWeek,
  isSameMonth as isSameMonth$1,
  isSameQuarter as isSameQuarter$1,
  getYear,
  getMonth,
  getQuarter,
  startOfMonth,
  startOfQuarter,
  endOfMonth,
  setMonth,
  setQuarter,
  isSameYear as isSameYear$1,
  setHours,
  getHours,
  setMinutes,
  getMinutes,
  setSeconds,
  getSeconds,
  addHours,
  addMinutes,
  addSeconds,
  isAfter,
  startOfYear,
  endOfYear,
  min,
  max,
  subMonths,
  differenceInCalendarMonths,
  subQuarters,
  differenceInCalendarQuarters,
  subYears,
  differenceInCalendarYears,
  addMonths,
  addQuarters,
  addYears,
  isDate,
  parse,
  endOfWeek,
  getDay,
  getDate,
  addDays,
  addWeeks,
  getTime,
  setYear,
  differenceInDays,
  subWeeks,
  subDays,
} from "date-fns";
import {
  useFloating,
  autoUpdate,
  flip,
  offset,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";
import ReactDOM from "react-dom";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var _extendStatics = function extendStatics(d, b) {
  _extendStatics =
    Object.setPrototypeOf ||
    ({
      __proto__: [],
    } instanceof Array &&
      function (d, b) {
        d.__proto__ = b;
      }) ||
    function (d, b) {
      for (var p in b)
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError(
      "Class extends value " + String(b) + " is not a constructor or null",
    );
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}
var _assign = function __assign() {
  _assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function"
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message);
      return (
        (e.name = "SuppressedError"),
        (e.error = error),
        (e.suppressed = suppressed),
        e
      );
    };

var CalendarContainer = function (_a) {
  var _b = _a.showTimeSelectOnly,
    showTimeSelectOnly = _b === void 0 ? false : _b,
    _c = _a.showTime,
    showTime = _c === void 0 ? false : _c,
    className = _a.className,
    children = _a.children;
  var ariaLabel = showTimeSelectOnly
    ? "Choose Time"
    : "Choose Date".concat(showTime ? " and Time" : "");
  return React.createElement(
    "div",
    {
      className: className,
      role: "dialog",
      "aria-label": ariaLabel,
      "aria-modal": "true",
    },
    children,
  );
};

var useDetectClickOutside = function (onClickOutside, ignoreClass) {
  var ref = useRef(null);
  var onClickOutsideRef = useRef(onClickOutside);
  onClickOutsideRef.current = onClickOutside;
  var handleClickOutside = useCallback(
    function (event) {
      var _a;
      var target =
        (event.composed &&
          event.composedPath &&
          event.composedPath().find(function (eventTarget) {
            return eventTarget instanceof Node;
          })) ||
        event.target;
      if (ref.current && !ref.current.contains(target)) {
        if (
          !(
            ignoreClass &&
            target instanceof HTMLElement &&
            target.classList.contains(ignoreClass)
          )
        ) {
          (_a = onClickOutsideRef.current) === null || _a === void 0
            ? void 0
            : _a.call(onClickOutsideRef, event);
        }
      }
    },
    [ignoreClass],
  );
  useEffect(
    function () {
      document.addEventListener("mousedown", handleClickOutside);
      return function () {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [handleClickOutside],
  );
  return ref;
};
var ClickOutsideWrapper = function (_a) {
  var children = _a.children,
    onClickOutside = _a.onClickOutside,
    className = _a.className,
    containerRef = _a.containerRef,
    style = _a.style,
    ignoreClass = _a.ignoreClass;
  var detectRef = useDetectClickOutside(onClickOutside, ignoreClass);
  return React.createElement(
    "div",
    {
      className: className,
      style: style,
      ref: function (node) {
        detectRef.current = node;
        if (containerRef) {
          containerRef.current = node;
        }
      },
    },
    children,
  );
};

var KeyType;
(function (KeyType) {
  KeyType["ArrowUp"] = "ArrowUp";
  KeyType["ArrowDown"] = "ArrowDown";
  KeyType["ArrowLeft"] = "ArrowLeft";
  KeyType["ArrowRight"] = "ArrowRight";
  KeyType["PageUp"] = "PageUp";
  KeyType["PageDown"] = "PageDown";
  KeyType["Home"] = "Home";
  KeyType["End"] = "End";
  KeyType["Enter"] = "Enter";
  KeyType["Space"] = " ";
  KeyType["Tab"] = "Tab";
  KeyType["Escape"] = "Escape";
  KeyType["Backspace"] = "Backspace";
  KeyType["X"] = "x";
})(KeyType || (KeyType = {}));
function getLocaleScope() {
  // Use this cast to avoid messing with users globalThis (like window) and the rest of keys in the globalThis object we don't care about
  var scope = typeof window !== "undefined" ? window : globalThis;
  return scope;
}
var DEFAULT_YEAR_ITEM_NUMBER = 12;
// ** Date Constructors **
function newDate(value) {
  if (value == null) {
    return new Date();
  }
  var d = typeof value === "string" ? parseISO(value) : toDate(value);
  return isValid(d) ? d : new Date();
}
/**
 * Parses a date.
 *
 * @param value - The string representing the Date in a parsable form, e.g., ISO 1861
 * @param dateFormat - The date format.
 * @param locale - The locale.
 * @param strictParsing - The strict parsing flag.
 * @param refDate - The base date to be passed to date-fns parse() function.
 * @returns - The parsed date or null.
 */
function parseDate(value, dateFormat, locale, strictParsing, refDate) {
  if (refDate === void 0) {
    refDate = newDate();
  }
  var localeObject =
    getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
  var formats = Array.isArray(dateFormat) ? dateFormat : [dateFormat];
  for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
    var format_1 = formats_1[_i];
    var parsedDate = parse(value, format_1, refDate, {
      locale: localeObject,
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
    if (
      isValid(parsedDate) &&
      (!strictParsing || value === formatDate(parsedDate, format_1, locale))
    ) {
      return parsedDate;
    }
  }
  return null;
}
/**
 * Checks if a given date is valid and not before the minimum date.
 * @param date - The date to be checked.
 * @param minDate - The minimum date allowed. If not provided, defaults to "1/1/1800".
 * @returns A boolean value indicating whether the date is valid and not before the minimum date.
 */
function isValid(date, minDate) {
  /* the fallback date is essential to not break test case
   * `should auto update calendar when the updated date text is after props.minDate`
   * and backward compatibility respectfully
   */
  return isValid$1(date) && !isBefore(date, new Date("1/1/1800"));
}
// ** Date Formatting **
/**
 * Formats a date.
 *
 * @param date - The date.
 * @param formatStr - The format string.
 * @param locale - The locale.
 * @returns - The formatted date.
 */
function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr, {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
  }
  var localeObj = locale ? getLocaleObject(locale) : undefined;
  if (locale && !localeObj) {
    console.warn(
      'A locale object was not found for the provided string ["'.concat(
        locale,
        '"].',
      ),
    );
  }
  localeObj = localeObj || getLocaleObject(getDefaultLocale());
  return format(date, formatStr, {
    locale: localeObj,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true,
  });
}
/**
 * Safely formats a date.
 *
 * @param date - The date.
 * @param options - An object containing the dateFormat and locale.
 * @returns - The formatted date or an empty string.
 */
function safeDateFormat(date, _a) {
  var dateFormat = _a.dateFormat,
    locale = _a.locale;
  var formatStr =
    Array.isArray(dateFormat) && dateFormat.length > 0
      ? dateFormat[0]
      : dateFormat; // Cast to string because it's impossible to get `string | string[] | undefined` here and typescript doesn't know that
  return (date && formatDate(date, formatStr, locale)) || "";
}
/**
 * Safely formats a date range.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @param props - The props.
 * @returns - The formatted date range or an empty string.
 */
function safeDateRangeFormat(startDate, endDate, props) {
  if (!startDate) {
    return "";
  }
  var formattedStartDate = safeDateFormat(startDate, props);
  var formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
  return "".concat(formattedStartDate, " - ").concat(formattedEndDate);
}
/**
 * Safely formats multiple dates.
 *
 * @param dates - The dates.
 * @param props - The props.
 * @returns - The formatted dates or an empty string.
 */
function safeMultipleDatesFormat(dates, props) {
  if (!(dates === null || dates === void 0 ? void 0 : dates.length)) {
    return "";
  }
  var formattedFirstDate = dates[0] ? safeDateFormat(dates[0], props) : "";
  if (dates.length === 1) {
    return formattedFirstDate;
  }
  if (dates.length === 2 && dates[1]) {
    var formattedSecondDate = safeDateFormat(dates[1], props);
    return "".concat(formattedFirstDate, ", ").concat(formattedSecondDate);
  }
  var extraDatesCount = dates.length - 1;
  return "".concat(formattedFirstDate, " (+").concat(extraDatesCount, ")");
}
// ** Date Setters **
/**
 * Sets the time for a given date.
 *
 * @param date - The date.
 * @param time - An object containing the hour, minute, and second.
 * @returns - The date with the time set.
 */
function setTime(date, _a) {
  var _b = _a.hour,
    hour = _b === void 0 ? 0 : _b,
    _c = _a.minute,
    minute = _c === void 0 ? 0 : _c,
    _d = _a.second,
    second = _d === void 0 ? 0 : _d;
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
function getWeek(date) {
  return getISOWeek(date);
}
/**
 * Gets the day of the week code for a given day.
 *
 * @param day - The day.
 * @param locale - The locale.
 * @returns - The day of the week code.
 */
function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}
// *** Start of ***
/**
 * Gets the start of the day for a given date.
 *
 * @param date - The date.
 * @returns - The start of the day.
 */
function getStartOfDay(date) {
  return startOfDay(date);
}
/**
 * Gets the start of the week for a given date.
 *
 * @param date - The date.
 * @param locale - The locale.
 * @param calendarStartDay - The day the calendar starts on.
 * @returns - The start of the week.
 */
function getStartOfWeek(date, locale, calendarStartDay) {
  var localeObj = locale
    ? getLocaleObject(locale)
    : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, {
    locale: localeObj,
    weekStartsOn: calendarStartDay,
  });
}
/**
 * Gets the start of the month for a given date.
 *
 * @param date - The date.
 * @returns - The start of the month.
 */
function getStartOfMonth(date) {
  return startOfMonth(date);
}
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
function getStartOfYear(date) {
  return startOfYear(date);
}
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
function getStartOfQuarter(date) {
  return startOfQuarter(date);
}
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
function getStartOfToday() {
  return startOfDay(newDate());
}
// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
function getEndOfDay(date) {
  return endOfDay(date);
}
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
function getEndOfWeek(date) {
  return endOfWeek(date);
}
/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
function getEndOfMonth(date) {
  return endOfMonth(date);
}
/**
 * Checks if two dates are in the same year.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same year, false otherwise.
 */
function isSameYear(date1, date2) {
  if (date1 && date2) {
    return isSameYear$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are in the same month.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same month, false otherwise.
 */
function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return isSameMonth$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are in the same quarter.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same quarter, false otherwise.
 */
function isSameQuarter(date1, date2) {
  if (date1 && date2) {
    return isSameQuarter$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are on the same day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are on the same day, false otherwise.
 */
function isSameDay(date1, date2) {
  if (date1 && date2) {
    return isSameDay$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are equal.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are equal, false otherwise.
 */
function isEqual(date1, date2) {
  if (date1 && date2) {
    return isEqual$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if a day is within a date range.
 *
 * @param day - The day to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns - True if the day is within the range, false otherwise.
 */
function isDayInRange(day, startDate, endDate) {
  var valid;
  var start = startOfDay(startDate);
  var end = endOfDay(endDate);
  try {
    valid = isWithinInterval(day, { start: start, end: end });
  } catch (err) {
    valid = false;
  }
  return valid;
}
// ** Date Localization **
/**
 * Registers a locale.
 *
 * @param localeName - The name of the locale.
 * @param localeData - The data of the locale.
 */
function registerLocale(localeName, localeData) {
  var scope = getLocaleScope();
  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }
  scope.__localeData__[localeName] = localeData;
}
/**
 * Sets the default locale.
 *
 * @param localeName - The name of the locale.
 */
function setDefaultLocale(localeName) {
  var scope = getLocaleScope();
  scope.__localeId__ = localeName;
}
/**
 * Gets the default locale.
 *
 * @returns - The default locale.
 */
function getDefaultLocale() {
  var scope = getLocaleScope();
  return scope.__localeId__;
}
/**
 * Gets the locale object.
 *
 * @param localeSpec - The locale specification.
 * @returns - The locale object.
 */
function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    // Treat it as a locale name registered by registerLocale
    var scope = getLocaleScope();
    // Null was replaced with undefined to avoid type coercion
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : undefined;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}
/**
 * Formats the weekday in a given locale.
 *
 * @param date - The date to format.
 * @param formatFunc - The formatting function.
 * @param locale - The locale to use for formatting.
 * @returns - The formatted weekday.
 */
function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}
/**
 * Gets the minimum weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The minimum weekday.
 */
function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}
/**
 * Gets the short weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short weekday.
 */
function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}
/**
 * Gets the month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The month.
 */
function getMonthInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}
/**
 * Checks if a day is disabled.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is disabled, false otherwise.
 */
function isDayDisabled(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    excludeDateIntervals = _b.excludeDateIntervals,
    includeDates = _b.includeDates,
    includeDateIntervals = _b.includeDateIntervals,
    filterDate = _b.filterDate;
  return (
    isOutOfBounds(day, { minDate: minDate, maxDate: maxDate }) ||
    (excludeDates &&
      excludeDates.some(function (excludeDate) {
        if (excludeDate instanceof Date) {
          return isSameDay(day, excludeDate);
        } else {
          return isSameDay(day, excludeDate.date);
        }
      })) ||
    (excludeDateIntervals &&
      excludeDateIntervals.some(function (_a) {
        var start = _a.start,
          end = _a.end;
        return isWithinInterval(day, { start: start, end: end });
      })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameDay(day, includeDate);
      })) ||
    (includeDateIntervals &&
      !includeDateIntervals.some(function (_a) {
        var start = _a.start,
          end = _a.end;
        return isWithinInterval(day, { start: start, end: end });
      })) ||
    (filterDate && !filterDate(newDate(day))) ||
    false
  );
}
/**
 * Checks if a day is excluded.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is excluded, false otherwise.
 */
function isDayExcluded(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    excludeDates = _b.excludeDates,
    excludeDateIntervals = _b.excludeDateIntervals;
  if (excludeDateIntervals && excludeDateIntervals.length > 0) {
    return excludeDateIntervals.some(function (_a) {
      var start = _a.start,
        end = _a.end;
      return isWithinInterval(day, { start: start, end: end });
    });
  }
  return (
    (excludeDates &&
      excludeDates.some(function (excludeDate) {
        var _a;
        if (excludeDate instanceof Date) {
          return isSameDay(day, excludeDate);
        } else {
          return isSameDay(
            day,
            (_a = excludeDate.date) !== null && _a !== void 0 ? _a : new Date(),
          );
        }
      })) ||
    false
  );
}
function isMonthDisabled(month, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates,
    filterDate = _b.filterDate;
  return (
    isOutOfBounds(month, {
      minDate: minDate ? startOfMonth(minDate) : undefined,
      maxDate: maxDate ? endOfMonth(maxDate) : undefined,
    }) ||
    (excludeDates === null || excludeDates === void 0
      ? void 0
      : excludeDates.some(function (excludeDate) {
          return isSameMonth(
            month,
            excludeDate instanceof Date ? excludeDate : excludeDate.date,
          );
        })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameMonth(month, includeDate);
      })) ||
    (filterDate && !filterDate(newDate(month))) ||
    false
  );
}
function isMonthInRange(startDate, endDate, m, day) {
  var startDateYear = getYear(startDate);
  var startDateMonth = getMonth(startDate);
  var endDateYear = getYear(endDate);
  var endDateMonth = getMonth(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateMonth <= m) ||
      (dayYear === endDateYear && endDateMonth >= m) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
  return false;
}
/**
 * To check if a date's month and year are disabled/excluded
 * @param date Date to check
 * @returns {boolean} true if month and year are disabled/excluded, false otherwise
 */
function isMonthYearDisabled(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates;
  return (
    isOutOfBounds(date, { minDate: minDate, maxDate: maxDate }) ||
    (excludeDates &&
      excludeDates.some(function (excludedDate) {
        return isSameMonth(
          excludedDate instanceof Date ? excludedDate : excludedDate.date,
          date,
        );
      })) ||
    (includeDates &&
      !includeDates.some(function (includedDate) {
        return isSameMonth(includedDate, date);
      })) ||
    false
  );
}
function isQuarterDisabled(quarter, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates,
    filterDate = _b.filterDate;
  return (
    isOutOfBounds(quarter, { minDate: minDate, maxDate: maxDate }) ||
    (excludeDates === null || excludeDates === void 0
      ? void 0
      : excludeDates.some(function (excludeDate) {
          return isSameQuarter(
            quarter,
            excludeDate instanceof Date ? excludeDate : excludeDate.date,
          );
        })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameQuarter(quarter, includeDate);
      })) ||
    (filterDate && !filterDate(newDate(quarter))) ||
    false
  );
}
function isYearInRange(year, start, end) {
  if (!start || !end) return false;
  if (!isValid$1(start) || !isValid$1(end)) return false;
  var startYear = getYear(start);
  var endYear = getYear(end);
  return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates,
    filterDate = _b.filterDate;
  var date = new Date(year, 0, 1);
  return (
    isOutOfBounds(date, {
      minDate: minDate ? startOfYear(minDate) : undefined,
      maxDate: maxDate ? endOfYear(maxDate) : undefined,
    }) ||
    (excludeDates === null || excludeDates === void 0
      ? void 0
      : excludeDates.some(function (excludeDate) {
          return isSameYear(
            date,
            excludeDate instanceof Date ? excludeDate : excludeDate.date,
          );
        })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameYear(date, includeDate);
      })) ||
    (filterDate && !filterDate(newDate(date))) ||
    false
  );
}
function isQuarterInRange(startDate, endDate, q, day) {
  var startDateYear = getYear(startDate);
  var startDateQuarter = getQuarter(startDate);
  var endDateYear = getYear(endDate);
  var endDateQuarter = getQuarter(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateQuarter <= q) ||
      (dayYear === endDateYear && endDateQuarter >= q) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
  return false;
}
function isOutOfBounds(day, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a,
    minDate = _c.minDate,
    maxDate = _c.maxDate;
  return (_b =
    (minDate && differenceInCalendarDays(day, minDate) < 0) ||
    (maxDate && differenceInCalendarDays(day, maxDate) > 0)) !== null &&
    _b !== void 0
    ? _b
    : false;
}
function isTimeInList(time, times) {
  return times.some(function (listTime) {
    return (
      getHours(listTime) === getHours(time) &&
      getMinutes(listTime) === getMinutes(time) &&
      getSeconds(listTime) === getSeconds(time)
    );
  });
}
function isTimeDisabled(time, _a) {
  var _b = _a === void 0 ? {} : _a,
    excludeTimes = _b.excludeTimes,
    includeTimes = _b.includeTimes,
    filterTime = _b.filterTime;
  return (
    (excludeTimes && isTimeInList(time, excludeTimes)) ||
    (includeTimes && !isTimeInList(time, includeTimes)) ||
    (filterTime && !filterTime(time)) ||
    false
  );
}
function isTimeInDisabledRange(time, _a) {
  var minTime = _a.minTime,
    maxTime = _a.maxTime;
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }
  var baseTime = newDate();
  baseTime = setHours(baseTime, getHours(time));
  baseTime = setMinutes(baseTime, getMinutes(time));
  baseTime = setSeconds(baseTime, getSeconds(time));
  var min = newDate();
  min = setHours(min, getHours(minTime));
  min = setMinutes(min, getMinutes(minTime));
  min = setSeconds(min, getSeconds(minTime));
  var max = newDate();
  max = setHours(max, getHours(maxTime));
  max = setMinutes(max, getMinutes(maxTime));
  max = setSeconds(max, getSeconds(maxTime));
  var valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min, end: max });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function monthDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var previousMonth = subMonths(day, 1);
  return (
    (minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarMonths(includeDate, previousMonth) > 0;
      })) ||
    false
  );
}
function monthDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var nextMonth = addMonths(day, 1);
  return (
    (maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarMonths(nextMonth, includeDate) > 0;
      })) ||
    false
  );
}
function quarterDisabledBefore(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var firstDateOfYear = startOfYear(date);
  var previousQuarter = subQuarters(firstDateOfYear, 1);
  return (
    (minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
      })) ||
    false
  );
}
function quarterDisabledAfter(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var lastDateOfYear = endOfYear(date);
  var nextQuarter = addQuarters(lastDateOfYear, 1);
  return (
    (maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
      })) ||
    false
  );
}
function yearDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var previousYear = subYears(day, 1);
  return (
    (minDate && differenceInCalendarYears(minDate, previousYear) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarYears(includeDate, previousYear) > 0;
      })) ||
    false
  );
}
function yearsDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    _c = _b.yearItemNumber,
    yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var previousYear = getStartOfYear(subYears(day, yearItemNumber));
  var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
  var minDateYear = minDate && getYear(minDate);
  return (minDateYear && minDateYear > endPeriod) || false;
}
function yearDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var nextYear = addYears(day, 1);
  return (
    (maxDate && differenceInCalendarYears(nextYear, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarYears(nextYear, includeDate) > 0;
      })) ||
    false
  );
}
function yearsDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    _c = _b.yearItemNumber,
    yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var nextYear = addYears(day, yearItemNumber);
  var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
  var maxDateYear = maxDate && getYear(maxDate);
  return (maxDateYear && maxDateYear < startPeriod) || false;
}
function getEffectiveMinDate(_a) {
  var minDate = _a.minDate,
    includeDates = _a.includeDates;
  if (includeDates && minDate) {
    var minDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays(includeDate, minDate) >= 0;
    });
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_a) {
  var maxDate = _a.maxDate,
    includeDates = _a.includeDates;
  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays(includeDate, maxDate) <= 0;
    });
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
  } else {
    return maxDate;
  }
}
/**
 * Get a map of highlighted dates with their corresponding classes.
 * @param highlightDates The dates to highlight.
 * @param defaultClassName The default class to use for highlighting.
 * @returns A map with dates as keys and arrays of class names as values.
 */
function getHighLightDaysMap(highlightDates, defaultClassName) {
  var _a;
  if (highlightDates === void 0) {
    highlightDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--highlighted";
  }
  var dateClasses = new Map();
  for (var i = 0, len = highlightDates.length; i < len; i++) {
    var obj = highlightDates[i];
    if (isDate(obj)) {
      var key = formatDate(obj, "MM.dd.yyyy");
      var classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      var keys = Object.keys(obj);
      var className = (_a = keys[0]) !== null && _a !== void 0 ? _a : "";
      var arrOfDates = obj[className];
      if (typeof className === "string" && Array.isArray(arrOfDates)) {
        for (var k = 0, len_1 = arrOfDates.length; k < len_1; k++) {
          var dateK = arrOfDates[k];
          if (dateK) {
            var key = formatDate(dateK, "MM.dd.yyyy");
            var classNamesArr = dateClasses.get(key) || [];
            if (!classNamesArr.includes(className)) {
              classNamesArr.push(className);
              dateClasses.set(key, classNamesArr);
            }
          }
        }
      }
    }
  }
  return dateClasses;
}
/**
 * Compare the two arrays
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @returns true, if the passed arrays are equal, false otherwise.
 */
function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every(function (value, index) {
    return value === array2[index];
  });
}
/**
 * Assign the custom class to each date
 * @param holidayDates array of object containing date and name of the holiday
 * @param defaultClassName className to be added.
 * @returns Map containing date as key and array of className and holiday name as value
 */
function getHolidaysMap(holidayDates, defaultClassName) {
  if (holidayDates === void 0) {
    holidayDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--holidays";
  }
  var dateClasses = new Map();
  holidayDates.forEach(function (holiday) {
    var dateObj = holiday.date,
      holidayName = holiday.holidayName;
    if (!isDate(dateObj)) {
      return;
    }
    var key = formatDate(dateObj, "MM.dd.yyyy");
    var classNamesObj = dateClasses.get(key) || {
      className: "",
      holidayNames: [],
    };
    if (
      "className" in classNamesObj &&
      classNamesObj["className"] === defaultClassName &&
      arraysAreEqual(classNamesObj["holidayNames"], [holidayName])
    ) {
      return;
    }
    classNamesObj["className"] = defaultClassName;
    var holidayNameArr = classNamesObj["holidayNames"];
    classNamesObj["holidayNames"] = holidayNameArr
      ? __spreadArray(
          __spreadArray([], holidayNameArr, true),
          [holidayName],
          false,
        )
      : [holidayName];
    dateClasses.set(key, classNamesObj);
  });
  return dateClasses;
}
/**
 * Determines the times to inject after a given start of day, current time, and multiplier.
 * @param startOfDay The start of the day.
 * @param currentTime The current time.
 * @param currentMultiplier The current multiplier.
 * @param intervals The intervals.
 * @param injectedTimes The times to potentially inject.
 * @returns An array of times to inject.
 */
function timesToInjectAfter(
  startOfDay,
  currentTime,
  currentMultiplier,
  intervals,
  injectedTimes,
) {
  var l = injectedTimes.length;
  var times = [];
  for (var i = 0; i < l; i++) {
    var injectedTime = startOfDay;
    var injectedTimeValue = injectedTimes[i];
    if (injectedTimeValue) {
      injectedTime = addHours(injectedTime, getHours(injectedTimeValue));
      injectedTime = addMinutes(injectedTime, getMinutes(injectedTimeValue));
      injectedTime = addSeconds(injectedTime, getSeconds(injectedTimeValue));
    }
    var nextTime = addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
    if (
      isAfter(injectedTime, currentTime) &&
      isBefore(injectedTime, nextTime) &&
      injectedTimeValue != undefined
    ) {
      times.push(injectedTimeValue);
    }
  }
  return times;
}
/**
 * Adds a leading zero to a number if it's less than 10.
 * @param i The number to add a leading zero to.
 * @returns The number as a string, with a leading zero if it was less than 10.
 */
function addZero(i) {
  return i < 10 ? "0".concat(i) : "".concat(i);
}
/**
 * Gets the start and end years for a period.
 * @param date The date to get the period for.
 * @param yearItemNumber The number of years in the period. Defaults to DEFAULT_YEAR_ITEM_NUMBER.
 * @returns An object with the start and end years for the period.
 */
function getYearsPeriod(date, yearItemNumber) {
  if (yearItemNumber === void 0) {
    yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER;
  }
  var endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  var startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod: startPeriod, endPeriod: endPeriod };
}
/**
 * Gets the number of hours in a day.
 * @param d The date to get the number of hours for.
 * @returns The number of hours in the day.
 */
function getHoursInDay(d) {
  var startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var startOfTheNextDay = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    24,
  );
  return Math.round((+startOfTheNextDay - +startOfDay) / 3600000);
}
/**
 * Returns the start of the minute for the given date
 *
 * NOTE: this function is a DST and timezone-safe analog of `date-fns/startOfMinute`
 * do not make changes unless you know what you're doing
 *
 * See comments on https://github.com/Hacker0x01/react-datepicker/pull/4244
 * for more details
 *
 * @param d date
 * @returns start of the minute
 */
function startOfMinute(d) {
  var seconds = d.getSeconds();
  var milliseconds = d.getMilliseconds();
  return toDate(d.getTime() - seconds * 1000 - milliseconds);
}
/**
 * Returns whether the given dates are in the same minute
 *
 * This function is a DST and timezone-safe analog of `date-fns/isSameMinute`
 *
 * @param d1
 * @param d2
 * @returns
 */
function isSameMinute(d1, d2) {
  return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
}
/**
 * Returns a new datetime object representing the input date with midnight time
 * @param date The date to get the midnight time for
 * @returns A new datetime object representing the input date with midnight time
 */
function getMidnightDate(date) {
  if (!isDate(date)) {
    throw new Error("Invalid date");
  }
  var dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
}
/**
 * Is the first date before the second one?
 * @param date The date that should be before the other one to return true
 * @param dateToCompare The date to compare with
 * @returns The first date is before the second date
 *
 * Note:
 *  This function considers the mid-night of the given dates for comparison.
 *  It evaluates whether date is before dateToCompare based on their mid-night timestamps.
 */
function isDateBefore(date, dateToCompare) {
  if (!isDate(date) || !isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }
  var midnightDate = getMidnightDate(date);
  var midnightDateToCompare = getMidnightDate(dateToCompare);
  return isBefore(midnightDate, midnightDateToCompare);
}
/**
 * Checks if the space key was pressed down.
 *
 * @param event - The keyboard event.
 * @returns - Returns true if the space key was pressed down, false otherwise.
 */
function isSpaceKeyDown(event) {
  return event.key === KeyType.Space;
}

/**
 * `InputTime` is a React component that manages time input.
 *
 * @component
 * @example
 * <InputTime timeString="12:00" />
 *
 * @param props - The properties that define the `InputTime` component.
 * @param props.onChange - Function that is called when the date changes.
 * @param props.date - The initial date value.
 * @param props.timeString - The initial time string value.
 * @param props.timeInputLabel - The label for the time input.
 * @param props.customTimeInput - An optional custom time input element.
 *
 * @returns The `InputTime` component.
 */
var InputTime = /** @class */ (function (_super) {
  __extends(InputTime, _super);
  function InputTime(props) {
    var _this = _super.call(this, props) || this;
    _this.inputRef = React.createRef();
    _this.onTimeChange = function (time) {
      var _a, _b;
      _this.setState({ time: time });
      var propDate = _this.props.date;
      var isPropDateValid = propDate instanceof Date && !isNaN(+propDate);
      var date = isPropDateValid ? propDate : new Date();
      if (time === null || time === void 0 ? void 0 : time.includes(":")) {
        var _c = time.split(":"),
          hours = _c[0],
          minutes = _c[1];
        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
      }
      (_b = (_a = _this.props).onChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, date);
    };
    _this.renderTimeInput = function () {
      var time = _this.state.time;
      var _a = _this.props,
        date = _a.date,
        timeString = _a.timeString,
        customTimeInput = _a.customTimeInput;
      if (customTimeInput) {
        return cloneElement(customTimeInput, {
          date: date,
          value: time,
          onChange: _this.onTimeChange,
        });
      }
      return React.createElement("input", {
        type: "time",
        className: "react-datepicker-time__input",
        placeholder: "Time",
        name: "time-input",
        ref: _this.inputRef,
        onClick: function () {
          var _a;
          (_a = _this.inputRef.current) === null || _a === void 0
            ? void 0
            : _a.focus();
        },
        required: true,
        value: time,
        onChange: function (event) {
          _this.onTimeChange(event.target.value || timeString);
        },
      });
    };
    _this.state = {
      time: _this.props.timeString,
    };
    return _this;
  }
  InputTime.getDerivedStateFromProps = function (props, state) {
    if (props.timeString !== state.time) {
      return {
        time: props.timeString,
      };
    }
    // Return null to indicate no change to state.
    return null;
  };
  InputTime.prototype.render = function () {
    return React.createElement(
      "div",
      { className: "react-datepicker__input-time-container" },
      React.createElement(
        "div",
        { className: "react-datepicker-time__caption" },
        this.props.timeInputLabel,
      ),
      React.createElement(
        "div",
        { className: "react-datepicker-time__input-container" },
        React.createElement(
          "div",
          { className: "react-datepicker-time__input" },
          this.renderTimeInput(),
        ),
      ),
    );
  };
  return InputTime;
})(Component);

/**
 * `Day` is a React component that represents a single day in a date picker.
 * It handles the rendering and interaction of a day.
 *
 * @prop ariaLabelPrefixWhenEnabled - Aria label prefix when the day is enabled.
 * @prop ariaLabelPrefixWhenDisabled - Aria label prefix when the day is disabled.
 * @prop disabledKeyboardNavigation - Whether keyboard navigation is disabled.
 * @prop day - The day to be displayed.
 * @prop dayClassName - Function to customize the CSS class of the day.
 * @prop endDate - The end date in a range.
 * @prop highlightDates - Map of dates to be highlighted.
 * @prop holidays - Map of holiday dates.
 * @prop inline - Whether the date picker is inline.
 * @prop shouldFocusDayInline - Whether the day should be focused when date picker is inline.
 * @prop month - The month the day belongs to.
 * @prop onClick - Click event handler.
 * @prop onMouseEnter - Mouse enter event handler.
 * @prop handleOnKeyDown - Key down event handler.
 * @prop usePointerEvent - Whether to use pointer events.
 * @prop preSelection - The date that is currently selected.
 * @prop selected - The selected date.
 * @prop selectingDate - The date currently being selected.
 * @prop selectsEnd - Whether the day can be the end date in a range.
 * @prop selectsStart - Whether the day can be the start date in a range.
 * @prop selectsRange - Whether the day can be in a range.
 * @prop showWeekPicker - Whether to show week picker.
 * @prop showWeekNumber - Whether to show week numbers.
 * @prop selectsDisabledDaysInRange - Whether to select disabled days in a range.
 * @prop selectsMultiple - Whether to allow multiple date selection.
 * @prop selectedDates - Array of selected dates.
 * @prop startDate - The start date in a range.
 * @prop renderDayContents - Function to customize the rendering of the day's contents.
 * @prop containerRef - Ref for the container.
 * @prop excludeDates - Array of dates to be excluded.
 * @prop calendarStartDay - The start day of the week.
 * @prop locale - The locale object.
 * @prop monthShowsDuplicateDaysEnd - Whether to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Whether to show duplicate days at the start of the month.
 * @prop includeDates - Array of dates to be included.
 * @prop includeDateIntervals - Array of date intervals to be included.
 * @prop minDate - The minimum date that can be selected.
 * @prop maxDate - The maximum date that can be selected.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import Day from './day';
 *
 * function MyComponent() {
 *   const handleDayClick = (event) => {
 *     console.log('Day clicked', event);
 *   };
 *
 *   const handleDayMouseEnter = (event) => {
 *     console.log('Mouse entered day', event);
 *   };
 *
 *   const renderDayContents = (date) => {
 *     return <div>{date.getDate()}</div>;
 *   };
 *
 *   return (
 *     <Day
 *       day={new Date()}
 *       onClick={handleDayClick}
 *       onMouseEnter={handleDayMouseEnter}
 *       renderDayContents={renderDayContents}
 *     />
 *   );
 * }
 *
 * export default MyComponent;
 * ```
 */
var Day = /** @class */ (function (_super) {
  __extends(Day, _super);
  function Day() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.dayEl = createRef();
    _this.handleClick = function (event) {
      console.log("handleClick");
      if (!_this.isDisabled() && _this.props.onClick) {
        _this.props.onClick(event);
      }
    };
    _this.handleMouseEnter = function (event) {
      if (!_this.isDisabled() && _this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    };
    _this.handleOnKeyDown = function (event) {
      var _a, _b;
      var eventKey = event.key;
      if (eventKey === KeyType.Space) {
        event.preventDefault();
        event.key = KeyType.Enter;
      }
      (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
    };
    _this.isSameDay = function (other) {
      return isSameDay(_this.props.day, other);
    };
    _this.isKeyboardSelected = function () {
      var _a;
      if (_this.props.disabledKeyboardNavigation) {
        return false;
      }
      var isSelectedDate = _this.props.selectsMultiple
        ? (_a = _this.props.selectedDates) === null || _a === void 0
          ? void 0
          : _a.some(function (date) {
              return _this.isSameDayOrWeek(date);
            })
        : _this.isSameDayOrWeek(_this.props.selected);
      var isDisabled =
        _this.props.preSelection && _this.isDisabled(_this.props.preSelection);
      return (
        !isSelectedDate &&
        _this.isSameDayOrWeek(_this.props.preSelection) &&
        !isDisabled
      );
    };
    _this.isDisabled = function (day) {
      if (day === void 0) {
        day = _this.props.day;
      }
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayDisabled(day, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
        includeDateIntervals: _this.props.includeDateIntervals,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.isExcluded = function () {
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayExcluded(_this.props.day, {
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
      });
    };
    _this.isStartOfWeek = function () {
      return isSameDay(
        _this.props.day,
        getStartOfWeek(
          _this.props.day,
          _this.props.locale,
          _this.props.calendarStartDay,
        ),
      );
    };
    _this.isSameWeek = function (other) {
      return (
        _this.props.showWeekPicker &&
        isSameDay(
          other,
          getStartOfWeek(
            _this.props.day,
            _this.props.locale,
            _this.props.calendarStartDay,
          ),
        )
      );
    };
    _this.isSameDayOrWeek = function (other) {
      return _this.isSameDay(other) || _this.isSameWeek(other);
    };
    _this.getHighLightedClass = function () {
      var _a = _this.props,
        day = _a.day,
        highlightDates = _a.highlightDates;
      if (!highlightDates) {
        return false;
      }
      // Looking for className in the Map of {'day string, 'className'}
      var dayStr = formatDate(day, "MM.dd.yyyy");
      return highlightDates.get(dayStr);
    };
    // Function to return the array containing className associated to the date
    _this.getHolidaysClass = function () {
      var _a;
      var _b = _this.props,
        day = _b.day,
        holidays = _b.holidays;
      if (!holidays) {
        // For type consistency no other reasons
        return [undefined];
      }
      var dayStr = formatDate(day, "MM.dd.yyyy");
      // Looking for className in the Map of {day string: {className, holidayName}}
      if (holidays.has(dayStr)) {
        return [
          (_a = holidays.get(dayStr)) === null || _a === void 0
            ? void 0
            : _a.className,
        ];
      }
      // For type consistency no other reasons
      return [undefined];
    };
    _this.isInRange = function () {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isDayInRange(day, startDate, endDate);
    };
    _this.isInSelectingRange = function () {
      var _a;
      var _b = _this.props,
        day = _b.day,
        selectsStart = _b.selectsStart,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange,
        selectsDisabledDaysInRange = _b.selectsDisabledDaysInRange,
        startDate = _b.startDate,
        endDate = _b.endDate;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (
        !(selectsStart || selectsEnd || selectsRange) ||
        !selectingDate ||
        (!selectsDisabledDaysInRange && _this.isDisabled())
      ) {
        return false;
      }
      if (
        selectsStart &&
        endDate &&
        (isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))
      ) {
        return isDayInRange(day, selectingDate, endDate);
      }
      if (
        selectsEnd &&
        startDate &&
        !endDate &&
        (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))
      ) {
        return isDayInRange(day, startDate, selectingDate);
      }
      if (
        selectsRange &&
        startDate &&
        !endDate &&
        (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))
      ) {
        return isDayInRange(day, startDate, selectingDate);
      }
      return false;
    };
    _this.isSelectingRangeStart = function () {
      var _a;
      if (!_this.isInSelectingRange()) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        startDate = _b.startDate,
        selectsStart = _b.selectsStart;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsStart) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, startDate);
      }
    };
    _this.isSelectingRangeEnd = function () {
      var _a;
      if (!_this.isInSelectingRange()) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        endDate = _b.endDate,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsEnd || selectsRange) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, endDate);
      }
    };
    _this.isRangeStart = function () {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(startDate, day);
    };
    _this.isRangeEnd = function () {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(endDate, day);
    };
    _this.isWeekend = function () {
      var weekday = getDay(_this.props.day);
      return weekday === 0 || weekday === 6;
    };
    _this.isAfterMonth = function () {
      return (
        _this.props.month !== undefined &&
        (_this.props.month + 1) % 12 === getMonth(_this.props.day)
      );
    };
    _this.isBeforeMonth = function () {
      return (
        _this.props.month !== undefined &&
        (getMonth(_this.props.day) + 1) % 12 === _this.props.month
      );
    };
    _this.isCurrentDay = function () {
      return _this.isSameDay(newDate());
    };
    _this.isSelected = function () {
      var _a;
      if (_this.props.selectsMultiple) {
        return (_a = _this.props.selectedDates) === null || _a === void 0
          ? void 0
          : _a.some(function (date) {
              return _this.isSameDayOrWeek(date);
            });
      }
      return _this.isSameDayOrWeek(_this.props.selected);
    };
    _this.getClassNames = function (date) {
      var dayClassName = _this.props.dayClassName
        ? _this.props.dayClassName(date)
        : undefined;
      return clsx(
        "react-datepicker__day",
        dayClassName,
        "react-datepicker__day--" + getDayOfWeekCode(_this.props.day),
        {
          "react-datepicker__day--disabled": _this.isDisabled(),
          "react-datepicker__day--excluded": _this.isExcluded(),
          "react-datepicker__day--selected": _this.isSelected(),
          "react-datepicker__day--keyboard-selected":
            _this.isKeyboardSelected(),
          "react-datepicker__day--range-start": _this.isRangeStart(),
          "react-datepicker__day--range-end": _this.isRangeEnd(),
          "react-datepicker__day--in-range": _this.isInRange(),
          "react-datepicker__day--in-selecting-range":
            _this.isInSelectingRange(),
          "react-datepicker__day--selecting-range-start":
            _this.isSelectingRangeStart(),
          "react-datepicker__day--selecting-range-end":
            _this.isSelectingRangeEnd(),
          "react-datepicker__day--today": _this.isCurrentDay(),
          "react-datepicker__day--weekend": _this.isWeekend(),
          "react-datepicker__day--outside-month":
            _this.isAfterMonth() || _this.isBeforeMonth(),
        },
        _this.getHighLightedClass(),
        _this.getHolidaysClass(),
      );
    };
    _this.getAriaLabel = function () {
      var _a = _this.props,
        day = _a.day,
        _b = _a.ariaLabelPrefixWhenEnabled,
        ariaLabelPrefixWhenEnabled = _b === void 0 ? "Choose" : _b,
        _c = _a.ariaLabelPrefixWhenDisabled,
        ariaLabelPrefixWhenDisabled = _c === void 0 ? "Not available" : _c;
      var prefix =
        _this.isDisabled() || _this.isExcluded()
          ? ariaLabelPrefixWhenDisabled
          : ariaLabelPrefixWhenEnabled;
      return ""
        .concat(prefix, " ")
        .concat(formatDate(day, "PPPP", _this.props.locale));
    };
    // A function to return the holiday's name as title's content
    _this.getTitle = function () {
      var _a = _this.props,
        day = _a.day,
        _b = _a.holidays,
        holidays = _b === void 0 ? new Map() : _b,
        excludeDates = _a.excludeDates;
      var compareDt = formatDate(day, "MM.dd.yyyy");
      var titles = [];
      if (holidays.has(compareDt)) {
        titles.push.apply(titles, holidays.get(compareDt).holidayNames);
      }
      if (_this.isExcluded()) {
        titles.push(
          excludeDates === null || excludeDates === void 0
            ? void 0
            : excludeDates
                .filter(function (excludeDate) {
                  if (excludeDate instanceof Date) {
                    return isSameDay(excludeDate, day);
                  }
                  return isSameDay(
                    excludeDate === null || excludeDate === void 0
                      ? void 0
                      : excludeDate.date,
                    day,
                  );
                })
                .map(function (excludeDate) {
                  if (excludeDate instanceof Date) {
                    return undefined;
                  }
                  return excludeDate === null || excludeDate === void 0
                    ? void 0
                    : excludeDate.message;
                }),
        );
      }
      // I'm not sure that this is a right output, but all tests are green
      return titles.join(", ");
    };
    _this.getTabIndex = function () {
      var selectedDay = _this.props.selected;
      var preSelectionDay = _this.props.preSelection;
      var tabIndex =
        !(
          _this.props.showWeekPicker &&
          (_this.props.showWeekNumber || !_this.isStartOfWeek())
        ) &&
        (_this.isKeyboardSelected() ||
          (_this.isSameDay(selectedDay) &&
            isSameDay(preSelectionDay, selectedDay)))
          ? 0
          : -1;
      return tabIndex;
    };
    // various cases when we need to apply focus to the preselected day
    // focus the day on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
    // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
    _this.handleFocusDay = function () {
      var _a;
      // only do this while the input isn't focused
      // otherwise, typing/backspacing the date manually may steal focus away from the input
      _this.shouldFocusDay() &&
        ((_a = _this.dayEl.current) === null || _a === void 0
          ? void 0
          : _a.focus({ preventScroll: true }));
    };
    _this.renderDayContents = function () {
      if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth())
        return null;
      if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth())
        return null;
      return _this.props.renderDayContents
        ? _this.props.renderDayContents(
            getDate(_this.props.day),
            _this.props.day,
          )
        : getDate(_this.props.day);
    };
    _this.render = function () {
      return (
        // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
        React.createElement(
          "div",
          {
            ref: _this.dayEl,
            className: _this.getClassNames(_this.props.day),
            onKeyDown: _this.handleOnKeyDown,
            onClick: _this.handleClick,
            onMouseEnter: !_this.props.usePointerEvent
              ? _this.handleMouseEnter
              : undefined,
            onPointerEnter: _this.props.usePointerEvent
              ? _this.handleMouseEnter
              : undefined,
            tabIndex: _this.getTabIndex(),
            "aria-label": _this.getAriaLabel(),
            role: "option",
            title: _this.getTitle(),
            "aria-disabled": _this.isDisabled(),
            "aria-current": _this.isCurrentDay() ? "date" : undefined,
            "aria-selected": _this.isSelected() || _this.isInRange(),
          },
          _this.renderDayContents(),
          _this.getTitle() !== "" &&
            React.createElement(
              "span",
              { className: "overlay" },
              _this.getTitle(),
            ),
        )
      );
    };
    return _this;
  }
  Day.prototype.componentDidMount = function () {
    this.handleFocusDay();
  };
  Day.prototype.componentDidUpdate = function () {
    this.handleFocusDay();
  };
  Day.prototype.shouldFocusDay = function () {
    var shouldFocusDay = false;
    if (this.getTabIndex() === 0 && this.isSameDay(this.props.preSelection)) {
      // there is currently no activeElement and not inline
      if (!document.activeElement || document.activeElement === document.body) {
        shouldFocusDay = true;
      }
      // inline version:
      // do not focus on initial render to prevent autoFocus issue
      // focus after month has changed via keyboard
      if (this.props.inline && !this.props.shouldFocusDayInline) {
        shouldFocusDay = false;
      }
      if (this.isDayActiveElement()) {
        shouldFocusDay = true;
      }
      if (this.isDuplicateDay()) {
        shouldFocusDay = false;
      }
    }
    return shouldFocusDay;
  };
  // the activeElement is in the container, and it is another instance of Day
  Day.prototype.isDayActiveElement = function () {
    var _a, _b, _c;
    return (
      ((_b =
        (_a = this.props.containerRef) === null || _a === void 0
          ? void 0
          : _a.current) === null || _b === void 0
        ? void 0
        : _b.contains(document.activeElement)) &&
      ((_c = document.activeElement) === null || _c === void 0
        ? void 0
        : _c.classList.contains("react-datepicker__day"))
    );
  };
  Day.prototype.isDuplicateDay = function () {
    return (
      //day is one of the non rendered duplicate days
      (this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth()) ||
      (this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth())
    );
  };
  return Day;
})(Component);

var WeekNumber = /** @class */ (function (_super) {
  __extends(WeekNumber, _super);
  function WeekNumber() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.weekNumberEl = createRef();
    _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    };
    _this.handleOnKeyDown = function (event) {
      var _a, _b;
      var eventKey = event.key;
      if (eventKey === KeyType.Space) {
        event.preventDefault();
        event.key = KeyType.Enter;
      }
      (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
    };
    _this.isKeyboardSelected = function () {
      return (
        !_this.props.disabledKeyboardNavigation &&
        !isSameDay(_this.props.date, _this.props.selected) &&
        isSameDay(_this.props.date, _this.props.preSelection)
      );
    };
    _this.getTabIndex = function () {
      return _this.props.showWeekPicker &&
        _this.props.showWeekNumber &&
        (_this.isKeyboardSelected() ||
          (isSameDay(_this.props.date, _this.props.selected) &&
            isSameDay(_this.props.preSelection, _this.props.selected)))
        ? 0
        : -1;
    };
    // various cases when we need to apply focus to the preselected week-number
    // focus the week-number on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
    // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
    _this.handleFocusWeekNumber = function (prevProps) {
      var shouldFocusWeekNumber = false;
      // only do this while the input isn't focused
      // otherwise, typing/backspacing the date manually may steal focus away from the input
      if (
        _this.getTabIndex() === 0 &&
        !(prevProps === null || prevProps === void 0
          ? void 0
          : prevProps.isInputFocused) &&
        isSameDay(_this.props.date, _this.props.preSelection)
      ) {
        // there is currently no activeElement and not inline
        if (
          !document.activeElement ||
          document.activeElement === document.body
        ) {
          shouldFocusWeekNumber = true;
        }
        // inline version:
        // do not focus on initial render to prevent autoFocus issue
        // focus after month has changed via keyboard
        if (_this.props.inline && !_this.props.shouldFocusDayInline) {
          shouldFocusWeekNumber = false;
        }
        // the activeElement is in the container, and it is another instance of WeekNumber
        if (
          _this.props.containerRef &&
          _this.props.containerRef.current &&
          _this.props.containerRef.current.contains(document.activeElement) &&
          document.activeElement &&
          document.activeElement.classList.contains(
            "react-datepicker__week-number",
          )
        ) {
          shouldFocusWeekNumber = true;
        }
      }
      shouldFocusWeekNumber &&
        _this.weekNumberEl.current &&
        _this.weekNumberEl.current.focus({ preventScroll: true });
    };
    return _this;
  }
  Object.defineProperty(WeekNumber, "defaultProps", {
    get: function () {
      return {
        ariaLabelPrefix: "week ",
      };
    },
    enumerable: false,
    configurable: true,
  });
  WeekNumber.prototype.componentDidMount = function () {
    this.handleFocusWeekNumber();
  };
  WeekNumber.prototype.componentDidUpdate = function (prevProps) {
    this.handleFocusWeekNumber(prevProps);
  };
  WeekNumber.prototype.render = function () {
    var _a = this.props,
      weekNumber = _a.weekNumber,
      isWeekDisabled = _a.isWeekDisabled,
      _b = _a.ariaLabelPrefix,
      ariaLabelPrefix =
        _b === void 0 ? WeekNumber.defaultProps.ariaLabelPrefix : _b,
      onClick = _a.onClick;
    var weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!onClick && !isWeekDisabled,
      "react-datepicker__week-number--selected":
        !!onClick && isSameDay(this.props.date, this.props.selected),
    };
    return React.createElement(
      "div",
      {
        ref: this.weekNumberEl,
        className: clsx(weekNumberClasses),
        "aria-label": ""
          .concat(ariaLabelPrefix, " ")
          .concat(this.props.weekNumber),
        onClick: this.handleClick,
        onKeyDown: this.handleOnKeyDown,
        tabIndex: this.getTabIndex(),
      },
      weekNumber,
    );
  };
  return WeekNumber;
})(Component);

var Week = /** @class */ (function (_super) {
  __extends(Week, _super);
  function Week() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.isDisabled = function (day) {
      return isDayDisabled(day, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
        includeDateIntervals: _this.props.includeDateIntervals,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.handleDayClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    };
    _this.handleDayMouseEnter = function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    };
    _this.handleWeekClick = function (day, weekNumber, event) {
      var _a, _b, _c;
      var enabledWeekDay = new Date(day);
      for (var i = 0; i < 7; i++) {
        var processingDay = new Date(day);
        processingDay.setDate(processingDay.getDate() + i);
        var isEnabled = !_this.isDisabled(processingDay);
        if (isEnabled) {
          enabledWeekDay = processingDay;
          break;
        }
      }
      if (typeof _this.props.onWeekSelect === "function") {
        _this.props.onWeekSelect(enabledWeekDay, weekNumber, event);
      }
      if (_this.props.showWeekPicker) {
        _this.handleDayClick(enabledWeekDay, event);
      }
      if (
        (_a = _this.props.shouldCloseOnSelect) !== null && _a !== void 0
          ? _a
          : Week.defaultProps.shouldCloseOnSelect
      ) {
        (_c = (_b = _this.props).setOpen) === null || _c === void 0
          ? void 0
          : _c.call(_b, false);
      }
    };
    _this.formatWeekNumber = function (date) {
      if (_this.props.formatWeekNumber) {
        return _this.props.formatWeekNumber(date);
      }
      return getWeek(date);
    };
    _this.isWeekDisabled = function () {
      var startOfWeek = _this.startOfWeek();
      var endOfWeek = addDays(startOfWeek, 6);
      var processingDate = new Date(startOfWeek);
      while (processingDate <= endOfWeek) {
        if (!_this.isDisabled(processingDate)) return false;
        processingDate = addDays(processingDate, 1);
      }
      return true;
    };
    _this.renderDays = function () {
      var startOfWeek = _this.startOfWeek();
      var days = [];
      var weekNumber = _this.formatWeekNumber(startOfWeek);
      if (_this.props.showWeekNumber) {
        var onClickAction =
          _this.props.onWeekSelect || _this.props.showWeekPicker
            ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber)
            : undefined;
        days.push(
          React.createElement(
            WeekNumber,
            _assign({ key: "W" }, Week.defaultProps, _this.props, {
              weekNumber: weekNumber,
              isWeekDisabled: _this.isWeekDisabled(),
              date: startOfWeek,
              onClick: onClickAction,
            }),
          ),
        );
      }
      return days.concat(
        [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = addDays(startOfWeek, offset);
          return React.createElement(
            Day,
            _assign({}, Week.defaultProps, _this.props, {
              ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix,
              ariaLabelPrefixWhenDisabled:
                _this.props.disabledDayAriaLabelPrefix,
              key: day.valueOf(),
              day: day,
              onClick: _this.handleDayClick.bind(_this, day),
              onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
            }),
          );
        }),
      );
    };
    _this.startOfWeek = function () {
      return getStartOfWeek(
        _this.props.day,
        _this.props.locale,
        _this.props.calendarStartDay,
      );
    };
    _this.isKeyboardSelected = function () {
      return (
        !_this.props.disabledKeyboardNavigation &&
        !isSameDay(_this.startOfWeek(), _this.props.selected) &&
        isSameDay(_this.startOfWeek(), _this.props.preSelection)
      );
    };
    return _this;
  }
  Object.defineProperty(Week, "defaultProps", {
    get: function () {
      return {
        shouldCloseOnSelect: true,
      };
    },
    enumerable: false,
    configurable: true,
  });
  Week.prototype.render = function () {
    var weekNumberClasses = {
      "react-datepicker__week": true,
      "react-datepicker__week--selected": isSameDay(
        this.startOfWeek(),
        this.props.selected,
      ),
      "react-datepicker__week--keyboard-selected": this.isKeyboardSelected(),
    };
    return React.createElement(
      "div",
      { className: clsx(weekNumberClasses) },
      this.renderDays(),
    );
  };
  return Week;
})(Component);

var _a;
var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;
var MONTH_COLUMNS_LAYOUT = {
  TWO_COLUMNS: "two_columns",
  THREE_COLUMNS: "three_columns",
  FOUR_COLUMNS: "four_columns",
};
var MONTH_COLUMNS =
  ((_a = {}),
  (_a[MONTH_COLUMNS_LAYOUT.TWO_COLUMNS] = {
    grid: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [10, 11],
    ],
    verticalNavigationOffset: 2,
  }),
  (_a[MONTH_COLUMNS_LAYOUT.THREE_COLUMNS] = {
    grid: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
    ],
    verticalNavigationOffset: 3,
  }),
  (_a[MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS] = {
    grid: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
    ],
    verticalNavigationOffset: 4,
  }),
  _a);
var MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;
function getMonthColumnsLayout(
  showFourColumnMonthYearPicker,
  showTwoColumnMonthYearPicker,
) {
  if (showFourColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
  }
  if (showTwoColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
  }
  return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
}
/**
 * `Month` is a React component that represents a month in a calendar.
 * It accepts a `MonthProps` object as props which provides various configurations and event handlers.
 *
 * @prop dayClassName - Function to determine the class name for a day.
 * @prop monthClassName - Function to determine the class name for a month.
 * @prop filterDate - Function to filter dates.
 * @prop formatWeekNumber - Function to format the week number.
 * @prop onDayClick - Function to handle day click events.
 * @prop onDayMouseEnter - Function to handle mouse enter events on a day.
 * @prop onMouseLeave - Function to handle mouse leave events.
 * @prop onWeekSelect - Function to handle week selection.
 * @prop setPreSelection - Function to set pre-selection.
 * @prop setOpen - Function to set open state.
 * @prop renderDayContents - Function to render day contents.
 * @prop renderMonthContent - Function to render month content.
 * @prop renderQuarterContent - Function to render quarter content.
 * @prop handleOnKeyDown - Function to handle key down events.
 * @prop handleOnMonthKeyDown - Function to handle key down events on a month.
 * @prop ariaLabelPrefix - Aria label prefix.
 * @prop chooseDayAriaLabelPrefix - Aria label prefix for choosing a day.
 * @prop disabledDayAriaLabelPrefix - Aria label prefix for disabled day.
 * @prop disabledKeyboardNavigation - Flag to disable keyboard navigation.
 * @prop day - The day.
 * @prop endDate - The end date.
 * @prop orderInDisplay - The order in display.
 * @prop excludeDates - Dates to exclude.
 * @prop excludeDateIntervals - Date intervals to exclude.
 * @prop fixedHeight - Flag to set fixed height.
 * @prop highlightDates - Dates to highlight.
 * @prop holidays - Holidays.
 * @prop includeDates - Dates to include.
 * @prop includeDateIntervals - Date intervals to include.
 * @prop inline - Flag to set inline.
 * @prop shouldFocusDayInline - Flag to set focus on day inline.
 * @prop locale - The locale.
 * @prop maxDate - The maximum date.
 * @prop minDate - The minimum date.
 * @prop usePointerEvent - Flag to use pointer event.
 * @prop peekNextMonth - Flag to peek next month.
 * @prop preSelection - The pre-selection.
 * @prop selected - The selected date.
 * @prop selectingDate - The selecting date.
 * @prop calendarStartDay - The calendar start day.
 * @prop selectsEnd - Flag to select end.
 * @prop selectsStart - Flag to select start.
 * @prop selectsRange - Flag to select range.
 * @prop selectsDisabledDaysInRange - Flag to select disabled days in range.
 * @prop selectsMultiple - Flag to select multiple.
 * @prop selectedDates - The selected dates.
 * @prop showWeekNumbers - Flag to show week numbers.
 * @prop startDate - The start date.
 * @prop shouldCloseOnSelect - Flag to close on select.
 * @prop showMonthYearPicker - Flag to show month year picker.
 * @prop showFullMonthYearPicker - Flag to show full month year picker.
 * @prop showTwoColumnMonthYearPicker - Flag to show two column month year picker.
 * @prop showFourColumnMonthYearPicker - Flag to show four column month year picker.
 * @prop showQuarterYearPicker - Flag to show quarter year picker.
 * @prop showWeekPicker - Flag to show week picker.
 * @prop isInputFocused - Flag to set input focus.
 * @prop weekAriaLabelPrefix - Aria label prefix for week.
 * @prop containerRef - The container reference.
 * @prop monthShowsDuplicateDaysEnd - Flag to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Flag to show duplicate days at the start of the month.
 *
 * @example
 * ```tsx
 * function App() {
 *  const handleDayClick = (date) => {
 *     console.log('Day clicked: ', date);
 *   };
 *
 *   const handleDayMouseEnter = (date) => {
 *     console.log('Mouse entered on day: ', date);
 *   };
 *
 *   return (
 *     <div>
 *       <Month
 *         day={new Date()}
 *         endDate={new Date()}
 *         onDayClick={handleDayClick}
 *         onDayMouseEnter={handleDayMouseEnter}
 *         disabledKeyboardNavigation={false}
 *         showWeekNumbers={true}
 *         showMonthYearPicker={false}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
var Month = /** @class */ (function (_super) {
  __extends(Month, _super);
  function Month() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.MONTH_REFS = __spreadArray([], Array(12), true).map(function () {
      return createRef();
    });
    _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function () {
      return createRef();
    });
    _this.isDisabled = function (day) {
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayDisabled(day, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
        includeDateIntervals: _this.props.includeDateIntervals,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.isExcluded = function (day) {
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayExcluded(day, {
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
      });
    };
    _this.handleDayClick = function (day, event) {
      var _a, _b;
      (_b = (_a = _this.props).onDayClick) === null || _b === void 0
        ? void 0
        : _b.call(_a, day, event, _this.props.orderInDisplay);
    };
    _this.handleDayMouseEnter = function (day) {
      var _a, _b;
      (_b = (_a = _this.props).onDayMouseEnter) === null || _b === void 0
        ? void 0
        : _b.call(_a, day);
    };
    _this.handleMouseLeave = function () {
      var _a, _b;
      (_b = (_a = _this.props).onMouseLeave) === null || _b === void 0
        ? void 0
        : _b.call(_a);
    };
    _this.isRangeStartMonth = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameMonth(setMonth(day, m), startDate);
    };
    _this.isRangeStartQuarter = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(setQuarter(day, q), startDate);
    };
    _this.isRangeEndMonth = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameMonth(setMonth(day, m), endDate);
    };
    _this.isRangeEndQuarter = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(setQuarter(day, q), endDate);
    };
    _this.isInSelectingRangeMonth = function (m) {
      var _a;
      var _b = _this.props,
        day = _b.day,
        selectsStart = _b.selectsStart,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange,
        startDate = _b.startDate,
        endDate = _b.endDate;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
        return false;
      }
      if (selectsStart && endDate) {
        return isMonthInRange(selectingDate, endDate, m, day);
      }
      if (selectsEnd && startDate) {
        return isMonthInRange(startDate, selectingDate, m, day);
      }
      if (selectsRange && startDate && !endDate) {
        return isMonthInRange(startDate, selectingDate, m, day);
      }
      return false;
    };
    _this.isSelectingMonthRangeStart = function (m) {
      var _a;
      if (!_this.isInSelectingRangeMonth(m)) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        startDate = _b.startDate,
        selectsStart = _b.selectsStart;
      var _month = setMonth(day, m);
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsStart) {
        return isSameMonth(_month, selectingDate);
      } else {
        return isSameMonth(_month, startDate);
      }
    };
    _this.isSelectingMonthRangeEnd = function (m) {
      var _a;
      if (!_this.isInSelectingRangeMonth(m)) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        endDate = _b.endDate,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange;
      var _month = setMonth(day, m);
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsEnd || selectsRange) {
        return isSameMonth(_month, selectingDate);
      } else {
        return isSameMonth(_month, endDate);
      }
    };
    _this.isInSelectingRangeQuarter = function (q) {
      var _a;
      var _b = _this.props,
        day = _b.day,
        selectsStart = _b.selectsStart,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange,
        startDate = _b.startDate,
        endDate = _b.endDate;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
        return false;
      }
      if (selectsStart && endDate) {
        return isQuarterInRange(selectingDate, endDate, q, day);
      }
      if (selectsEnd && startDate) {
        return isQuarterInRange(startDate, selectingDate, q, day);
      }
      if (selectsRange && startDate && !endDate) {
        return isQuarterInRange(startDate, selectingDate, q, day);
      }
      return false;
    };
    _this.isWeekInMonth = function (startOfWeek) {
      var day = _this.props.day;
      var endOfWeek = addDays(startOfWeek, 6);
      return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
    };
    _this.isCurrentMonth = function (day, m) {
      return getYear(day) === getYear(newDate()) && m === getMonth(newDate());
    };
    _this.isCurrentQuarter = function (day, q) {
      return getYear(day) === getYear(newDate()) && q === getQuarter(newDate());
    };
    _this.isSelectedMonth = function (day, m, selected) {
      return getMonth(selected) === m && getYear(day) === getYear(selected);
    };
    _this.isSelectMonthInList = function (day, m, selectedDates) {
      return selectedDates.some(function (selectedDate) {
        return _this.isSelectedMonth(day, m, selectedDate);
      });
    };
    _this.isSelectedQuarter = function (day, q, selected) {
      return getQuarter(day) === q && getYear(day) === getYear(selected);
    };
    _this.renderWeeks = function () {
      var weeks = [];
      var isFixedHeight = _this.props.fixedHeight;
      var i = 0;
      var breakAfterNextPush = false;
      var currentWeekStart = getStartOfWeek(
        getStartOfMonth(_this.props.day),
        _this.props.locale,
        _this.props.calendarStartDay,
      );
      var isPreSelected = function (preSelection) {
        return _this.props.showWeekPicker
          ? getStartOfWeek(
              preSelection,
              _this.props.locale,
              _this.props.calendarStartDay,
            )
          : _this.props.preSelection;
      };
      var isSelected = function (selected) {
        return _this.props.showWeekPicker
          ? getStartOfWeek(
              selected,
              _this.props.locale,
              _this.props.calendarStartDay,
            )
          : _this.props.selected;
      };
      var selected = _this.props.selected
        ? isSelected(_this.props.selected)
        : undefined;
      var preSelection = _this.props.preSelection
        ? isPreSelected(_this.props.preSelection)
        : undefined;
      while (true) {
        weeks.push(
          React.createElement(
            Week,
            _assign({}, _this.props, {
              ariaLabelPrefix: _this.props.weekAriaLabelPrefix,
              key: i,
              day: currentWeekStart,
              month: getMonth(_this.props.day),
              onDayClick: _this.handleDayClick,
              onDayMouseEnter: _this.handleDayMouseEnter,
              selected: selected,
              preSelection: preSelection,
              showWeekNumber: _this.props.showWeekNumbers,
            }),
          ),
        );
        if (breakAfterNextPush) break;
        i++;
        currentWeekStart = addWeeks(currentWeekStart, 1);
        // If one of these conditions is true, we will either break on this week
        // or break on the next week
        var isFixedAndFinalWeek =
          isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
        var isNonFixedAndOutOfMonth =
          !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);
        if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
          if (_this.props.peekNextMonth) {
            breakAfterNextPush = true;
          } else {
            break;
          }
        }
      }
      return weeks;
    };
    _this.onMonthClick = function (event, m) {
      var _a = _this.isMonthDisabledForLabelDate(m),
        isDisabled = _a.isDisabled,
        labelDate = _a.labelDate;
      if (isDisabled) {
        return;
      }
      _this.handleDayClick(getStartOfMonth(labelDate), event);
    };
    _this.onMonthMouseEnter = function (m) {
      var _a = _this.isMonthDisabledForLabelDate(m),
        isDisabled = _a.isDisabled,
        labelDate = _a.labelDate;
      if (isDisabled) {
        return;
      }
      _this.handleDayMouseEnter(getStartOfMonth(labelDate));
    };
    _this.handleMonthNavigation = function (newMonth, newDate) {
      var _a, _b, _c, _d;
      (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
        ? void 0
        : _b.call(_a, newDate);
      (_d =
        (_c = _this.MONTH_REFS[newMonth]) === null || _c === void 0
          ? void 0
          : _c.current) === null || _d === void 0
        ? void 0
        : _d.focus();
    };
    _this.handleKeyboardNavigation = function (event, eventKey, month) {
      var _a;
      var _b = _this.props,
        selected = _b.selected,
        preSelection = _b.preSelection,
        setPreSelection = _b.setPreSelection,
        minDate = _b.minDate,
        maxDate = _b.maxDate,
        showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker,
        showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker;
      if (!preSelection) return;
      var monthColumnsLayout = getMonthColumnsLayout(
        showFourColumnMonthYearPicker,
        showTwoColumnMonthYearPicker,
      );
      var verticalOffset = _this.getVerticalOffset(monthColumnsLayout);
      var monthsGrid =
        (_a = MONTH_COLUMNS[monthColumnsLayout]) === null || _a === void 0
          ? void 0
          : _a.grid;
      var calculateNewDateAndMonth = function (eventKey, date, month) {
        var _a, _b;
        var newCalculatedDate = date;
        var newCalculatedMonth = month;
        switch (eventKey) {
          case KeyType.ArrowRight:
            newCalculatedDate = addMonths(
              date,
              MONTH_NAVIGATION_HORIZONTAL_OFFSET,
            );
            newCalculatedMonth =
              month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
            break;
          case KeyType.ArrowLeft:
            newCalculatedDate = subMonths(
              date,
              MONTH_NAVIGATION_HORIZONTAL_OFFSET,
            );
            newCalculatedMonth =
              month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
            break;
          case KeyType.ArrowUp:
            newCalculatedDate = subMonths(date, verticalOffset);
            newCalculatedMonth = (
              (_a =
                monthsGrid === null || monthsGrid === void 0
                  ? void 0
                  : monthsGrid[0]) === null || _a === void 0
                ? void 0
                : _a.includes(month)
            )
              ? month + 12 - verticalOffset
              : month - verticalOffset;
            break;
          case KeyType.ArrowDown:
            newCalculatedDate = addMonths(date, verticalOffset);
            newCalculatedMonth = (
              (_b =
                monthsGrid === null || monthsGrid === void 0
                  ? void 0
                  : monthsGrid[monthsGrid.length - 1]) === null || _b === void 0
                ? void 0
                : _b.includes(month)
            )
              ? month - 12 + verticalOffset
              : month + verticalOffset;
            break;
        }
        return {
          newCalculatedDate: newCalculatedDate,
          newCalculatedMonth: newCalculatedMonth,
        };
      };
      var getNewDateAndMonth = function (eventKey, selectedDate, month) {
        var MAX_ITERATIONS = 40;
        var eventKeyCopy = eventKey;
        var validDateFound = false;
        var iterations = 0;
        var _a = calculateNewDateAndMonth(eventKeyCopy, selectedDate, month),
          newCalculatedDate = _a.newCalculatedDate,
          newCalculatedMonth = _a.newCalculatedMonth;
        while (!validDateFound) {
          if (iterations >= MAX_ITERATIONS) {
            newCalculatedDate = selectedDate;
            newCalculatedMonth = month;
            break;
          }
          // if minDate exists and the new month is before the minimum month, it will try to find the next available month after
          if (minDate && newCalculatedDate < minDate) {
            eventKeyCopy = KeyType.ArrowRight;
            var obj = calculateNewDateAndMonth(
              eventKeyCopy,
              newCalculatedDate,
              newCalculatedMonth,
            );
            newCalculatedDate = obj.newCalculatedDate;
            newCalculatedMonth = obj.newCalculatedMonth;
          }
          // if maxDate exists and the new month is after the maximum month, it will try to find the next available month before
          if (maxDate && newCalculatedDate > maxDate) {
            eventKeyCopy = KeyType.ArrowLeft;
            var obj = calculateNewDateAndMonth(
              eventKeyCopy,
              newCalculatedDate,
              newCalculatedMonth,
            );
            newCalculatedDate = obj.newCalculatedDate;
            newCalculatedMonth = obj.newCalculatedMonth;
          }
          if (isMonthYearDisabled(newCalculatedDate, _this.props)) {
            var obj = calculateNewDateAndMonth(
              eventKeyCopy,
              newCalculatedDate,
              newCalculatedMonth,
            );
            newCalculatedDate = obj.newCalculatedDate;
            newCalculatedMonth = obj.newCalculatedMonth;
          } else {
            validDateFound = true;
          }
          iterations++;
        }
        return {
          newCalculatedDate: newCalculatedDate,
          newCalculatedMonth: newCalculatedMonth,
        };
      };
      if (eventKey === KeyType.Enter) {
        if (!_this.isMonthDisabled(month)) {
          _this.onMonthClick(event, month);
          setPreSelection === null || setPreSelection === void 0
            ? void 0
            : setPreSelection(selected);
        }
        return;
      }
      var _c = getNewDateAndMonth(eventKey, preSelection, month),
        newCalculatedDate = _c.newCalculatedDate,
        newCalculatedMonth = _c.newCalculatedMonth;
      switch (eventKey) {
        case KeyType.ArrowRight:
        case KeyType.ArrowLeft:
        case KeyType.ArrowUp:
        case KeyType.ArrowDown:
          _this.handleMonthNavigation(newCalculatedMonth, newCalculatedDate);
          break;
      }
    };
    _this.getVerticalOffset = function (monthColumnsLayout) {
      var _a, _b;
      return (_b =
        (_a = MONTH_COLUMNS[monthColumnsLayout]) === null || _a === void 0
          ? void 0
          : _a.verticalNavigationOffset) !== null && _b !== void 0
        ? _b
        : 0;
    };
    _this.onMonthKeyDown = function (event, month) {
      var _a = _this.props,
        disabledKeyboardNavigation = _a.disabledKeyboardNavigation,
        handleOnMonthKeyDown = _a.handleOnMonthKeyDown;
      var eventKey = event.key;
      if (eventKey !== KeyType.Tab) {
        // preventDefault on tab event blocks focus change
        event.preventDefault();
      }
      if (!disabledKeyboardNavigation) {
        _this.handleKeyboardNavigation(event, eventKey, month);
      }
      handleOnMonthKeyDown && handleOnMonthKeyDown(event);
    };
    _this.onQuarterClick = function (event, q) {
      var labelDate = setQuarter(_this.props.day, q);
      if (isQuarterDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayClick(getStartOfQuarter(labelDate), event);
    };
    _this.onQuarterMouseEnter = function (q) {
      var labelDate = setQuarter(_this.props.day, q);
      if (isQuarterDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayMouseEnter(getStartOfQuarter(labelDate));
    };
    _this.handleQuarterNavigation = function (newQuarter, newDate) {
      var _a, _b, _c, _d;
      if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) {
        return;
      }
      (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
        ? void 0
        : _b.call(_a, newDate);
      (_d =
        (_c = _this.QUARTER_REFS[newQuarter - 1]) === null || _c === void 0
          ? void 0
          : _c.current) === null || _d === void 0
        ? void 0
        : _d.focus();
    };
    _this.onQuarterKeyDown = function (event, quarter) {
      var _a, _b;
      var eventKey = event.key;
      if (!_this.props.disabledKeyboardNavigation) {
        switch (eventKey) {
          case KeyType.Enter:
            _this.onQuarterClick(event, quarter);
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
              ? void 0
              : _b.call(_a, _this.props.selected);
            break;
          case KeyType.ArrowRight:
            if (!_this.props.preSelection) {
              break;
            }
            _this.handleQuarterNavigation(
              quarter === 4 ? 1 : quarter + 1,
              addQuarters(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowLeft:
            if (!_this.props.preSelection) {
              break;
            }
            _this.handleQuarterNavigation(
              quarter === 1 ? 4 : quarter - 1,
              subQuarters(_this.props.preSelection, 1),
            );
            break;
        }
      }
    };
    _this.isMonthDisabledForLabelDate = function (month) {
      var _a;
      var _b = _this.props,
        day = _b.day,
        minDate = _b.minDate,
        maxDate = _b.maxDate,
        excludeDates = _b.excludeDates,
        includeDates = _b.includeDates;
      var labelDate = setMonth(day, month);
      return {
        isDisabled:
          (_a =
            (minDate || maxDate || excludeDates || includeDates) &&
            isMonthDisabled(labelDate, _this.props)) !== null && _a !== void 0
            ? _a
            : false,
        labelDate: labelDate,
      };
    };
    _this.isMonthDisabled = function (month) {
      var isDisabled = _this.isMonthDisabledForLabelDate(month).isDisabled;
      return isDisabled;
    };
    _this.getMonthClassNames = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate,
        preSelection = _a.preSelection,
        monthClassName = _a.monthClassName;
      var _monthClassName = monthClassName
        ? monthClassName(setMonth(day, m))
        : undefined;
      var selection = _this.getSelection();
      return clsx(
        "react-datepicker__month-text",
        "react-datepicker__month-".concat(m),
        _monthClassName,
        {
          "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
          "react-datepicker__month-text--selected": selection
            ? _this.isSelectMonthInList(day, m, selection)
            : undefined,
          "react-datepicker__month-text--keyboard-selected":
            !_this.props.disabledKeyboardNavigation &&
            preSelection &&
            _this.isSelectedMonth(day, m, preSelection) &&
            !_this.isMonthDisabled(m),
          "react-datepicker__month-text--in-selecting-range":
            _this.isInSelectingRangeMonth(m),
          "react-datepicker__month-text--in-range":
            startDate && endDate
              ? isMonthInRange(startDate, endDate, m, day)
              : undefined,
          "react-datepicker__month-text--range-start":
            _this.isRangeStartMonth(m),
          "react-datepicker__month-text--range-end": _this.isRangeEndMonth(m),
          "react-datepicker__month-text--selecting-range-start":
            _this.isSelectingMonthRangeStart(m),
          "react-datepicker__month-text--selecting-range-end":
            _this.isSelectingMonthRangeEnd(m),
          "react-datepicker__month-text--today": _this.isCurrentMonth(day, m),
        },
      );
    };
    _this.getTabIndex = function (m) {
      if (_this.props.preSelection == null) {
        return "-1";
      }
      var preSelectedMonth = getMonth(_this.props.preSelection);
      var isPreSelectedMonthDisabled =
        _this.isMonthDisabledForLabelDate(preSelectedMonth).isDisabled;
      var tabIndex =
        m === preSelectedMonth &&
        !(isPreSelectedMonthDisabled || _this.props.disabledKeyboardNavigation)
          ? "0"
          : "-1";
      return tabIndex;
    };
    _this.getQuarterTabIndex = function (q) {
      if (_this.props.preSelection == null) {
        return "-1";
      }
      var preSelectedQuarter = getQuarter(_this.props.preSelection);
      var isCurrentQuarterDisabled = isQuarterDisabled(
        _this.props.day,
        _this.props,
      );
      var tabIndex =
        q === preSelectedQuarter &&
        !(isCurrentQuarterDisabled || _this.props.disabledKeyboardNavigation)
          ? "0"
          : "-1";
      return tabIndex;
    };
    _this.getAriaLabel = function (month) {
      var _a = _this.props,
        _b = _a.chooseDayAriaLabelPrefix,
        chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b,
        _c = _a.disabledDayAriaLabelPrefix,
        disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c,
        day = _a.day,
        locale = _a.locale;
      var labelDate = setMonth(day, month);
      var prefix =
        _this.isDisabled(labelDate) || _this.isExcluded(labelDate)
          ? disabledDayAriaLabelPrefix
          : chooseDayAriaLabelPrefix;
      return ""
        .concat(prefix, " ")
        .concat(formatDate(labelDate, "MMMM yyyy", locale));
    };
    _this.getQuarterClassNames = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate,
        selected = _a.selected,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        excludeDates = _a.excludeDates,
        includeDates = _a.includeDates,
        filterDate = _a.filterDate,
        preSelection = _a.preSelection,
        disabledKeyboardNavigation = _a.disabledKeyboardNavigation;
      var isDisabled =
        (minDate || maxDate || excludeDates || includeDates || filterDate) &&
        isQuarterDisabled(setQuarter(day, q), _this.props);
      return clsx(
        "react-datepicker__quarter-text",
        "react-datepicker__quarter-".concat(q),
        {
          "react-datepicker__quarter-text--disabled": isDisabled,
          "react-datepicker__quarter-text--selected": selected
            ? _this.isSelectedQuarter(day, q, selected)
            : undefined,
          "react-datepicker__quarter-text--keyboard-selected":
            !disabledKeyboardNavigation &&
            preSelection &&
            _this.isSelectedQuarter(day, q, preSelection) &&
            !isDisabled,
          "react-datepicker__quarter-text--in-selecting-range":
            _this.isInSelectingRangeQuarter(q),
          "react-datepicker__quarter-text--in-range":
            startDate && endDate
              ? isQuarterInRange(startDate, endDate, q, day)
              : undefined,
          "react-datepicker__quarter-text--range-start":
            _this.isRangeStartQuarter(q),
          "react-datepicker__quarter-text--range-end":
            _this.isRangeEndQuarter(q),
          "react-datepicker__quarter-text--today": _this.isCurrentQuarter(
            day,
            q,
          ),
        },
      );
    };
    _this.getMonthContent = function (m) {
      var _a = _this.props,
        showFullMonthYearPicker = _a.showFullMonthYearPicker,
        renderMonthContent = _a.renderMonthContent,
        locale = _a.locale,
        day = _a.day;
      var shortMonthText = getMonthShortInLocale(m, locale);
      var fullMonthText = getMonthInLocale(m, locale);
      if (renderMonthContent) {
        return renderMonthContent(m, shortMonthText, fullMonthText, day);
      }
      return showFullMonthYearPicker ? fullMonthText : shortMonthText;
    };
    _this.getQuarterContent = function (q) {
      var _a;
      var _b = _this.props,
        renderQuarterContent = _b.renderQuarterContent,
        locale = _b.locale;
      var shortQuarter = getQuarterShortInLocale(q, locale);
      return (_a =
        renderQuarterContent === null || renderQuarterContent === void 0
          ? void 0
          : renderQuarterContent(q, shortQuarter)) !== null && _a !== void 0
        ? _a
        : shortQuarter;
    };
    _this.renderMonths = function () {
      var _a;
      var _b = _this.props,
        showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker,
        showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker,
        day = _b.day,
        selected = _b.selected;
      var monthColumns =
        (_a =
          MONTH_COLUMNS[
            getMonthColumnsLayout(
              showFourColumnMonthYearPicker,
              showTwoColumnMonthYearPicker,
            )
          ]) === null || _a === void 0
          ? void 0
          : _a.grid;
      return monthColumns === null || monthColumns === void 0
        ? void 0
        : monthColumns.map(function (month, i) {
            return React.createElement(
              "div",
              { className: "react-datepicker__month-wrapper", key: i },
              month.map(function (m, j) {
                return React.createElement(
                  "div",
                  {
                    ref: _this.MONTH_REFS[m],
                    key: j,
                    onClick: function (event) {
                      _this.onMonthClick(event, m);
                    },
                    onKeyDown: function (event) {
                      if (isSpaceKeyDown(event)) {
                        event.preventDefault();
                        event.key = KeyType.Enter;
                      }
                      _this.onMonthKeyDown(event, m);
                    },
                    onMouseEnter: !_this.props.usePointerEvent
                      ? function () {
                          return _this.onMonthMouseEnter(m);
                        }
                      : undefined,
                    onPointerEnter: _this.props.usePointerEvent
                      ? function () {
                          return _this.onMonthMouseEnter(m);
                        }
                      : undefined,
                    tabIndex: Number(_this.getTabIndex(m)),
                    className: _this.getMonthClassNames(m),
                    "aria-disabled": _this.isMonthDisabled(m),
                    role: "option",
                    "aria-label": _this.getAriaLabel(m),
                    "aria-current": _this.isCurrentMonth(day, m)
                      ? "date"
                      : undefined,
                    "aria-selected": selected
                      ? _this.isSelectedMonth(day, m, selected)
                      : undefined,
                  },
                  _this.getMonthContent(m),
                );
              }),
            );
          });
    };
    _this.renderQuarters = function () {
      var _a = _this.props,
        day = _a.day,
        selected = _a.selected;
      var quarters = [1, 2, 3, 4];
      return React.createElement(
        "div",
        { className: "react-datepicker__quarter-wrapper" },
        quarters.map(function (q, j) {
          return React.createElement(
            "div",
            {
              key: j,
              ref: _this.QUARTER_REFS[j],
              role: "option",
              onClick: function (event) {
                _this.onQuarterClick(event, q);
              },
              onKeyDown: function (event) {
                _this.onQuarterKeyDown(event, q);
              },
              onMouseEnter: !_this.props.usePointerEvent
                ? function () {
                    return _this.onQuarterMouseEnter(q);
                  }
                : undefined,
              onPointerEnter: _this.props.usePointerEvent
                ? function () {
                    return _this.onQuarterMouseEnter(q);
                  }
                : undefined,
              className: _this.getQuarterClassNames(q),
              "aria-selected": selected
                ? _this.isSelectedQuarter(day, q, selected)
                : undefined,
              tabIndex: Number(_this.getQuarterTabIndex(q)),
              "aria-current": _this.isCurrentQuarter(day, q)
                ? "date"
                : undefined,
            },
            _this.getQuarterContent(q),
          );
        }),
      );
    };
    _this.getClassNames = function () {
      var _a = _this.props,
        selectingDate = _a.selectingDate,
        selectsStart = _a.selectsStart,
        selectsEnd = _a.selectsEnd,
        showMonthYearPicker = _a.showMonthYearPicker,
        showQuarterYearPicker = _a.showQuarterYearPicker,
        showWeekPicker = _a.showWeekPicker;
      return clsx(
        "react-datepicker__month",
        {
          "react-datepicker__month--selecting-range":
            selectingDate && (selectsStart || selectsEnd),
        },
        { "react-datepicker__monthPicker": showMonthYearPicker },
        { "react-datepicker__quarterPicker": showQuarterYearPicker },
        { "react-datepicker__weekPicker": showWeekPicker },
      );
    };
    return _this;
  }
  Month.prototype.getSelection = function () {
    var _a = this.props,
      selected = _a.selected,
      selectedDates = _a.selectedDates,
      selectsMultiple = _a.selectsMultiple;
    if (selectsMultiple) {
      return selectedDates;
    }
    if (selected) {
      return [selected];
    }
    return undefined;
  };
  Month.prototype.render = function () {
    var _a = this.props,
      showMonthYearPicker = _a.showMonthYearPicker,
      showQuarterYearPicker = _a.showQuarterYearPicker,
      day = _a.day,
      _b = _a.ariaLabelPrefix,
      ariaLabelPrefix = _b === void 0 ? "Month " : _b;
    var formattedAriaLabelPrefix = ariaLabelPrefix
      ? ariaLabelPrefix.trim() + " "
      : "";
    return React.createElement(
      "div",
      {
        className: this.getClassNames(),
        onMouseLeave: !this.props.usePointerEvent
          ? this.handleMouseLeave
          : undefined,
        onPointerLeave: this.props.usePointerEvent
          ? this.handleMouseLeave
          : undefined,
        "aria-label": ""
          .concat(formattedAriaLabelPrefix)
          .concat(formatDate(day, "MMMM, yyyy", this.props.locale)),
        role: "listbox",
      },
      showMonthYearPicker
        ? this.renderMonths()
        : showQuarterYearPicker
          ? this.renderQuarters()
          : this.renderWeeks(),
    );
  };
  return Month;
})(Component);

var MonthDropdownOptions = /** @class */ (function (_super) {
  __extends(MonthDropdownOptions, _super);
  function MonthDropdownOptions() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.isSelectedMonth = function (i) {
      return _this.props.month === i;
    };
    _this.renderOptions = function () {
      return _this.props.monthNames.map(function (month, i) {
        return React.createElement(
          "div",
          {
            className: _this.isSelectedMonth(i)
              ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
              : "react-datepicker__month-option",
            key: month,
            onClick: _this.onChange.bind(_this, i),
            "aria-selected": _this.isSelectedMonth(i) ? "true" : undefined,
          },
          _this.isSelectedMonth(i)
            ? React.createElement(
                "span",
                { className: "react-datepicker__month-option--selected" },
                "\u2713",
              )
            : "",
          month,
        );
      });
    };
    _this.onChange = function (month) {
      return _this.props.onChange(month);
    };
    _this.handleClickOutside = function () {
      return _this.props.onCancel();
    };
    return _this;
  }
  MonthDropdownOptions.prototype.render = function () {
    return React.createElement(
      ClickOutsideWrapper,
      {
        className: "react-datepicker__month-dropdown",
        onClickOutside: this.handleClickOutside,
      },
      this.renderOptions(),
    );
  };
  return MonthDropdownOptions;
})(Component);

var MonthDropdown = /** @class */ (function (_super) {
  __extends(MonthDropdown, _super);
  function MonthDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function (monthNames) {
      return monthNames.map(function (m, i) {
        return React.createElement("option", { key: m, value: i }, m);
      });
    };
    _this.renderSelectMode = function (monthNames) {
      return React.createElement(
        "select",
        {
          value: _this.props.month,
          className: "react-datepicker__month-select",
          onChange: function (e) {
            return _this.onChange(parseInt(e.target.value));
          },
        },
        _this.renderSelectOptions(monthNames),
      );
    };
    _this.renderReadView = function (visible, monthNames) {
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-read-view",
          onClick: _this.toggleDropdown,
        },
        React.createElement("span", {
          className: "react-datepicker__month-read-view--down-arrow",
        }),
        React.createElement(
          "span",
          { className: "react-datepicker__month-read-view--selected-month" },
          monthNames[_this.props.month],
        ),
      );
    };
    _this.renderDropdown = function (monthNames) {
      return React.createElement(
        MonthDropdownOptions,
        _assign({ key: "dropdown" }, _this.props, {
          monthNames: monthNames,
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
        }),
      );
    };
    _this.renderScrollMode = function (monthNames) {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible, monthNames)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown(monthNames));
      }
      return result;
    };
    _this.onChange = function (month) {
      _this.toggleDropdown();
      if (month !== _this.props.month) {
        _this.props.onChange(month);
      }
    };
    _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible,
      });
    };
    return _this;
  }
  MonthDropdown.prototype.render = function () {
    var _this = this;
    var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonthInDropdown
        ? function (m) {
            return getMonthShortInLocale(m, _this.props.locale);
          }
        : function (m) {
            return getMonthInLocale(m, _this.props.locale);
          },
    );
    var renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode(monthNames);
        break;
      case "select":
        renderedDropdown = this.renderSelectMode(monthNames);
        break;
    }
    return React.createElement(
      "div",
      {
        className:
          "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(
            this.props.dropdownMode,
          ),
      },
      renderedDropdown,
    );
  };
  return MonthDropdown;
})(Component);

function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);
  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = addMonths(currDate, 1);
  }
  return list;
}
var MonthYearDropdownOptions = /** @class */ (function (_super) {
  __extends(MonthYearDropdownOptions, _super);
  function MonthYearDropdownOptions(props) {
    var _this = _super.call(this, props) || this;
    _this.renderOptions = function () {
      return _this.state.monthYearsList.map(function (monthYear) {
        var monthYearPoint = getTime(monthYear);
        var isSameMonthYear =
          isSameYear(_this.props.date, monthYear) &&
          isSameMonth(_this.props.date, monthYear);
        return React.createElement(
          "div",
          {
            className: isSameMonthYear
              ? "react-datepicker__month-year-option--selected_month-year"
              : "react-datepicker__month-year-option",
            key: monthYearPoint,
            onClick: _this.onChange.bind(_this, monthYearPoint),
            "aria-selected": isSameMonthYear ? "true" : undefined,
          },
          isSameMonthYear
            ? React.createElement(
                "span",
                { className: "react-datepicker__month-year-option--selected" },
                "\u2713",
              )
            : "",
          formatDate(monthYear, _this.props.dateFormat, _this.props.locale),
        );
      });
    };
    _this.onChange = function (monthYear) {
      return _this.props.onChange(monthYear);
    };
    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };
    _this.state = {
      monthYearsList: generateMonthYears(
        _this.props.minDate,
        _this.props.maxDate,
      ),
    };
    return _this;
  }
  MonthYearDropdownOptions.prototype.render = function () {
    var dropdownClass = clsx({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable":
        this.props.scrollableMonthYearDropdown,
    });
    return React.createElement(
      ClickOutsideWrapper,
      { className: dropdownClass, onClickOutside: this.handleClickOutside },
      this.renderOptions(),
    );
  };
  return MonthYearDropdownOptions;
})(Component);

var MonthYearDropdown = /** @class */ (function (_super) {
  __extends(MonthYearDropdown, _super);
  function MonthYearDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function () {
      var currDate = getStartOfMonth(_this.props.minDate);
      var lastDate = getStartOfMonth(_this.props.maxDate);
      var options = [];
      while (!isAfter(currDate, lastDate)) {
        var timePoint = getTime(currDate);
        options.push(
          React.createElement(
            "option",
            { key: timePoint, value: timePoint },
            formatDate(currDate, _this.props.dateFormat, _this.props.locale),
          ),
        );
        currDate = addMonths(currDate, 1);
      }
      return options;
    };
    _this.onSelectChange = function (event) {
      _this.onChange(parseInt(event.target.value));
    };
    _this.renderSelectMode = function () {
      return React.createElement(
        "select",
        {
          value: getTime(getStartOfMonth(_this.props.date)),
          className: "react-datepicker__month-year-select",
          onChange: _this.onSelectChange,
        },
        _this.renderSelectOptions(),
      );
    };
    _this.renderReadView = function (visible) {
      var yearMonth = formatDate(
        _this.props.date,
        _this.props.dateFormat,
        _this.props.locale,
      );
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-year-read-view",
          onClick: _this.toggleDropdown,
        },
        React.createElement("span", {
          className: "react-datepicker__month-year-read-view--down-arrow",
        }),
        React.createElement(
          "span",
          {
            className:
              "react-datepicker__month-year-read-view--selected-month-year",
          },
          yearMonth,
        ),
      );
    };
    _this.renderDropdown = function () {
      return React.createElement(
        MonthYearDropdownOptions,
        _assign({ key: "dropdown" }, _this.props, {
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
        }),
      );
    };
    _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    };
    _this.onChange = function (monthYearPoint) {
      _this.toggleDropdown();
      var changedDate = newDate(monthYearPoint);
      if (
        isSameYear(_this.props.date, changedDate) &&
        isSameMonth(_this.props.date, changedDate)
      ) {
        return;
      }
      _this.props.onChange(changedDate);
    };
    _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible,
      });
    };
    return _this;
  }
  MonthYearDropdown.prototype.render = function () {
    var renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }
    return React.createElement(
      "div",
      {
        className:
          "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(
            this.props.dropdownMode,
          ),
      },
      renderedDropdown,
    );
  };
  return MonthYearDropdown;
})(Component);

var Time = /** @class */ (function (_super) {
  __extends(Time, _super);
  function Time() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      height: null,
    };
    _this.scrollToTheSelectedTime = function () {
      requestAnimationFrame(function () {
        var _a, _b, _c;
        if (!_this.list) return;
        _this.list.scrollTop =
          (_c =
            _this.centerLi &&
            Time.calcCenterPosition(
              _this.props.monthRef
                ? _this.props.monthRef.clientHeight -
                    ((_b =
                      (_a = _this.header) === null || _a === void 0
                        ? void 0
                        : _a.clientHeight) !== null && _b !== void 0
                      ? _b
                      : 0)
                : _this.list.clientHeight,
              _this.centerLi,
            )) !== null && _c !== void 0
            ? _c
            : 0;
      });
    };
    _this.handleClick = function (time) {
      var _a, _b;
      if (
        ((_this.props.minTime || _this.props.maxTime) &&
          isTimeInDisabledRange(time, _this.props)) ||
        ((_this.props.excludeTimes ||
          _this.props.includeTimes ||
          _this.props.filterTime) &&
          isTimeDisabled(time, _this.props))
      ) {
        return;
      }
      (_b = (_a = _this.props).onChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, time);
    };
    _this.isSelectedTime = function (time) {
      return _this.props.selected && isSameMinute(_this.props.selected, time);
    };
    _this.isDisabledTime = function (time) {
      return (
        ((_this.props.minTime || _this.props.maxTime) &&
          isTimeInDisabledRange(time, _this.props)) ||
        ((_this.props.excludeTimes ||
          _this.props.includeTimes ||
          _this.props.filterTime) &&
          isTimeDisabled(time, _this.props))
      );
    };
    _this.liClasses = function (time) {
      var _a;
      var classes = [
        "react-datepicker__time-list-item",
        _this.props.timeClassName ? _this.props.timeClassName(time) : undefined,
      ];
      if (_this.isSelectedTime(time)) {
        classes.push("react-datepicker__time-list-item--selected");
      }
      if (_this.isDisabledTime(time)) {
        classes.push("react-datepicker__time-list-item--disabled");
      }
      //convert this.props.intervals and the relevant time to seconds and check if it it's a clean multiple of the interval
      if (
        _this.props.injectTimes &&
        (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds(time)) %
          (((_a = _this.props.intervals) !== null && _a !== void 0
            ? _a
            : Time.defaultProps.intervals) *
            60) !==
          0
      ) {
        classes.push("react-datepicker__time-list-item--injected");
      }
      return classes.join(" ");
    };
    _this.handleOnKeyDown = function (event, time) {
      var _a, _b;
      if (event.key === KeyType.Space) {
        event.preventDefault();
        event.key = KeyType.Enter;
      }
      if (
        (event.key === KeyType.ArrowUp || event.key === KeyType.ArrowLeft) &&
        event.target instanceof HTMLElement &&
        event.target.previousSibling
      ) {
        event.preventDefault();
        event.target.previousSibling instanceof HTMLElement &&
          event.target.previousSibling.focus();
      }
      if (
        (event.key === KeyType.ArrowDown || event.key === KeyType.ArrowRight) &&
        event.target instanceof HTMLElement &&
        event.target.nextSibling
      ) {
        event.preventDefault();
        event.target.nextSibling instanceof HTMLElement &&
          event.target.nextSibling.focus();
      }
      if (event.key === KeyType.Enter) {
        _this.handleClick(time);
      }
      (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
    };
    _this.renderTimes = function () {
      var _a;
      var times = [];
      var format =
        typeof _this.props.format === "string" ? _this.props.format : "p";
      var intervals =
        (_a = _this.props.intervals) !== null && _a !== void 0
          ? _a
          : Time.defaultProps.intervals;
      var activeDate =
        _this.props.selected || _this.props.openToDate || newDate();
      var base = getStartOfDay(activeDate);
      var sortedInjectTimes =
        _this.props.injectTimes &&
        _this.props.injectTimes.sort(function (a, b) {
          return a.getTime() - b.getTime();
        });
      var minutesInDay = 60 * getHoursInDay(activeDate);
      var multiplier = minutesInDay / intervals;
      for (var i = 0; i < multiplier; i++) {
        var currentTime = addMinutes(base, i * intervals);
        times.push(currentTime);
        if (sortedInjectTimes) {
          var timesToInject = timesToInjectAfter(
            base,
            currentTime,
            i,
            intervals,
            sortedInjectTimes,
          );
          times = times.concat(timesToInject);
        }
      }
      // Determine which time to focus and scroll into view when component mounts
      var timeToFocus = times.reduce(function (prev, time) {
        if (time.getTime() <= activeDate.getTime()) {
          return time;
        }
        return prev;
      }, times[0]);
      return times.map(function (time) {
        return React.createElement(
          "li",
          {
            key: time.valueOf(),
            onClick: _this.handleClick.bind(_this, time),
            className: _this.liClasses(time),
            ref: function (li) {
              if (time === timeToFocus) {
                _this.centerLi = li;
              }
            },
            onKeyDown: function (event) {
              _this.handleOnKeyDown(event, time);
            },
            tabIndex: time === timeToFocus ? 0 : -1,
            role: "option",
            "aria-selected": _this.isSelectedTime(time) ? "true" : undefined,
            "aria-disabled": _this.isDisabledTime(time) ? "true" : undefined,
          },
          formatDate(time, format, _this.props.locale),
        );
      });
    };
    _this.renderTimeCaption = function () {
      if (_this.props.showTimeCaption === false) {
        return React.createElement(React.Fragment, null);
      }
      return React.createElement(
        "div",
        {
          className:
            "react-datepicker__header react-datepicker__header--time ".concat(
              _this.props.showTimeSelectOnly
                ? "react-datepicker__header--time--only"
                : "",
            ),
          ref: function (header) {
            _this.header = header;
          },
        },
        React.createElement(
          "div",
          { className: "react-datepicker-time__header" },
          _this.props.timeCaption,
        ),
      );
    };
    return _this;
  }
  Object.defineProperty(Time, "defaultProps", {
    get: function () {
      return {
        intervals: 30,
        todayButton: null,
        timeCaption: "Time",
        showTimeCaption: true,
      };
    },
    enumerable: false,
    configurable: true,
  });
  Time.prototype.componentDidMount = function () {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.scrollToTheSelectedTime();
    this.observeDatePickerHeightChanges();
  };
  Time.prototype.componentWillUnmount = function () {
    var _a;
    (_a = this.resizeObserver) === null || _a === void 0
      ? void 0
      : _a.disconnect();
  };
  Time.prototype.observeDatePickerHeightChanges = function () {
    var _this = this;
    var monthRef = this.props.monthRef;
    this.updateContainerHeight();
    if (monthRef) {
      this.resizeObserver = new ResizeObserver(function () {
        _this.updateContainerHeight();
      });
      this.resizeObserver.observe(monthRef);
    }
  };
  Time.prototype.updateContainerHeight = function () {
    if (this.props.monthRef && this.header) {
      this.setState({
        height: this.props.monthRef.clientHeight - this.header.clientHeight,
      });
    }
  };
  Time.prototype.render = function () {
    var _this = this;
    var _a;
    var height = this.state.height;
    return React.createElement(
      "div",
      {
        className: "react-datepicker__time-container ".concat(
          (
            (_a = this.props.todayButton) !== null && _a !== void 0
              ? _a
              : Time.defaultProps.todayButton
          )
            ? "react-datepicker__time-container--with-today-button"
            : "",
        ),
      },
      this.renderTimeCaption(),
      React.createElement(
        "div",
        { className: "react-datepicker__time" },
        React.createElement(
          "div",
          { className: "react-datepicker__time-box" },
          React.createElement(
            "ul",
            {
              className: "react-datepicker__time-list",
              ref: function (list) {
                _this.list = list;
              },
              style: height ? { height: height } : {},
              role: "listbox",
              "aria-label": this.props.timeCaption,
            },
            this.renderTimes(),
          ),
        ),
      ),
    );
  };
  Time.calcCenterPosition = function (listHeight, centerLiRef) {
    return (
      centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2)
    );
  };
  return Time;
})(Component);

var VERTICAL_NAVIGATION_OFFSET = 3;
/**
 * `Year` is a component that represents a year in a date picker.
 *
 * @class
 * @param {YearProps} props - The properties that define the `Year` component.
 * @property {VoidFunction} [props.clearSelectingDate] - Function to clear the selected date.
 * @property {Date} [props.date] - The currently selected date.
 * @property {boolean} [props.disabledKeyboardNavigation] - If true, keyboard navigation is disabled.
 * @property {Date} [props.endDate] - The end date in a range selection.
 * @property {(date: Date) => void} props.onDayClick - Function to handle day click events.
 * @property {Date} props.preSelection - The date that is currently in focus.
 * @property {(date: Date) => void} props.setPreSelection - Function to set the pre-selected date.
 * @property {{ [key: string]: any }} props.selected - The selected date(s).
 * @property {boolean} props.inline - If true, the date picker is displayed inline.
 * @property {Date} props.maxDate - The maximum selectable date.
 * @property {Date} props.minDate - The minimum selectable date.
 * @property {boolean} props.usePointerEvent - If true, pointer events are used instead of mouse events.
 * @property {(date: Date) => void} props.onYearMouseEnter - Function to handle mouse enter events on a year.
 * @property {(date: Date) => void} props.onYearMouseLeave - Function to handle mouse leave events on a year.
 */
var Year = /** @class */ (function (_super) {
  __extends(Year, _super);
  function Year(props) {
    var _this = _super.call(this, props) || this;
    _this.YEAR_REFS = __spreadArray(
      [],
      Array(_this.props.yearItemNumber),
      true,
    ).map(function () {
      return createRef();
    });
    _this.isDisabled = function (date) {
      return isDayDisabled(date, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.isExcluded = function (date) {
      return isDayExcluded(date, {
        excludeDates: _this.props.excludeDates,
      });
    };
    _this.selectingDate = function () {
      var _a;
      return (_a = _this.props.selectingDate) !== null && _a !== void 0
        ? _a
        : _this.props.preSelection;
    };
    _this.updateFocusOnPaginate = function (refIndex) {
      var waitForReRender = function () {
        var _a, _b;
        (_b =
          (_a = _this.YEAR_REFS[refIndex]) === null || _a === void 0
            ? void 0
            : _a.current) === null || _b === void 0
          ? void 0
          : _b.focus();
      };
      window.requestAnimationFrame(waitForReRender);
    };
    _this.handleYearClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    };
    _this.handleYearNavigation = function (newYear, newDate) {
      var _a, _b, _c, _d;
      var _e = _this.props,
        date = _e.date,
        yearItemNumber = _e.yearItemNumber;
      if (date === undefined || yearItemNumber === undefined) {
        return;
      }
      var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
      if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) {
        return;
      }
      (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
        ? void 0
        : _b.call(_a, newDate);
      if (newYear - startPeriod < 0) {
        _this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
      } else if (newYear - startPeriod >= yearItemNumber) {
        _this.updateFocusOnPaginate(
          Math.abs(yearItemNumber - (newYear - startPeriod)),
        );
      } else
        (_d =
          (_c = _this.YEAR_REFS[newYear - startPeriod]) === null ||
          _c === void 0
            ? void 0
            : _c.current) === null || _d === void 0
          ? void 0
          : _d.focus();
    };
    _this.isSameDay = function (y, other) {
      return isSameDay(y, other);
    };
    _this.isCurrentYear = function (y) {
      return y === getYear(newDate());
    };
    _this.isRangeStart = function (y) {
      return (
        _this.props.startDate &&
        _this.props.endDate &&
        isSameYear(setYear(newDate(), y), _this.props.startDate)
      );
    };
    _this.isRangeEnd = function (y) {
      return (
        _this.props.startDate &&
        _this.props.endDate &&
        isSameYear(setYear(newDate(), y), _this.props.endDate)
      );
    };
    _this.isInRange = function (y) {
      return isYearInRange(y, _this.props.startDate, _this.props.endDate);
    };
    _this.isInSelectingRange = function (y) {
      var _a = _this.props,
        selectsStart = _a.selectsStart,
        selectsEnd = _a.selectsEnd,
        selectsRange = _a.selectsRange,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (
        !(selectsStart || selectsEnd || selectsRange) ||
        !_this.selectingDate()
      ) {
        return false;
      }
      if (selectsStart && endDate) {
        return isYearInRange(y, _this.selectingDate(), endDate);
      }
      if (selectsEnd && startDate) {
        return isYearInRange(y, startDate, _this.selectingDate());
      }
      if (selectsRange && startDate && !endDate) {
        return isYearInRange(y, startDate, _this.selectingDate());
      }
      return false;
    };
    _this.isSelectingRangeStart = function (y) {
      var _a;
      if (!_this.isInSelectingRange(y)) {
        return false;
      }
      var _b = _this.props,
        startDate = _b.startDate,
        selectsStart = _b.selectsStart;
      var _year = setYear(newDate(), y);
      if (selectsStart) {
        return isSameYear(
          _year,
          (_a = _this.selectingDate()) !== null && _a !== void 0 ? _a : null,
        );
      }
      return isSameYear(
        _year,
        startDate !== null && startDate !== void 0 ? startDate : null,
      );
    };
    _this.isSelectingRangeEnd = function (y) {
      var _a;
      if (!_this.isInSelectingRange(y)) {
        return false;
      }
      var _b = _this.props,
        endDate = _b.endDate,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange;
      var _year = setYear(newDate(), y);
      if (selectsEnd || selectsRange) {
        return isSameYear(
          _year,
          (_a = _this.selectingDate()) !== null && _a !== void 0 ? _a : null,
        );
      }
      return isSameYear(
        _year,
        endDate !== null && endDate !== void 0 ? endDate : null,
      );
    };
    _this.isKeyboardSelected = function (y) {
      if (
        _this.props.date === undefined ||
        _this.props.selected == null ||
        _this.props.preSelection == null
      ) {
        return;
      }
      var _a = _this.props,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        excludeDates = _a.excludeDates,
        includeDates = _a.includeDates,
        filterDate = _a.filterDate;
      var date = getStartOfYear(setYear(_this.props.date, y));
      var isDisabled =
        (minDate || maxDate || excludeDates || includeDates || filterDate) &&
        isYearDisabled(y, _this.props);
      return (
        !_this.props.disabledKeyboardNavigation &&
        !_this.props.inline &&
        !isSameDay(date, getStartOfYear(_this.props.selected)) &&
        isSameDay(date, getStartOfYear(_this.props.preSelection)) &&
        !isDisabled
      );
    };
    _this.isSelectedYear = function (year) {
      var _a = _this.props,
        selectsMultiple = _a.selectsMultiple,
        selected = _a.selected,
        selectedDates = _a.selectedDates;
      if (selectsMultiple) {
        return selectedDates === null || selectedDates === void 0
          ? void 0
          : selectedDates.some(function (date) {
              return year === getYear(date);
            });
      }
      return !selected || year === getYear(selected);
    };
    _this.onYearClick = function (event, y) {
      var date = _this.props.date;
      if (date === undefined) {
        return;
      }
      _this.handleYearClick(getStartOfYear(setYear(date, y)), event);
    };
    _this.onYearKeyDown = function (event, y) {
      var _a, _b;
      var key = event.key;
      var _c = _this.props,
        date = _c.date,
        yearItemNumber = _c.yearItemNumber,
        handleOnKeyDown = _c.handleOnKeyDown;
      if (key !== KeyType.Tab) {
        // preventDefault on tab event blocks focus change
        event.preventDefault();
      }
      if (!_this.props.disabledKeyboardNavigation) {
        switch (key) {
          case KeyType.Enter:
            if (_this.props.selected == null) {
              break;
            }
            _this.onYearClick(event, y);
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
              ? void 0
              : _b.call(_a, _this.props.selected);
            break;
          case KeyType.ArrowRight:
            if (_this.props.preSelection == null) {
              break;
            }
            _this.handleYearNavigation(
              y + 1,
              addYears(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowLeft:
            if (_this.props.preSelection == null) {
              break;
            }
            _this.handleYearNavigation(
              y - 1,
              subYears(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowUp: {
            if (
              date === undefined ||
              yearItemNumber === undefined ||
              _this.props.preSelection == null
            ) {
              break;
            }
            var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
            var offset = VERTICAL_NAVIGATION_OFFSET;
            var newYear = y - offset;
            if (newYear < startPeriod) {
              var leftOverOffset = yearItemNumber % offset;
              if (y >= startPeriod && y < startPeriod + leftOverOffset) {
                offset = leftOverOffset;
              } else {
                offset += leftOverOffset;
              }
              newYear = y - offset;
            }
            _this.handleYearNavigation(
              newYear,
              subYears(_this.props.preSelection, offset),
            );
            break;
          }
          case KeyType.ArrowDown: {
            if (
              date === undefined ||
              yearItemNumber === undefined ||
              _this.props.preSelection == null
            ) {
              break;
            }
            var endPeriod = getYearsPeriod(date, yearItemNumber).endPeriod;
            var offset = VERTICAL_NAVIGATION_OFFSET;
            var newYear = y + offset;
            if (newYear > endPeriod) {
              var leftOverOffset = yearItemNumber % offset;
              if (y <= endPeriod && y > endPeriod - leftOverOffset) {
                offset = leftOverOffset;
              } else {
                offset += leftOverOffset;
              }
              newYear = y + offset;
            }
            _this.handleYearNavigation(
              newYear,
              addYears(_this.props.preSelection, offset),
            );
            break;
          }
        }
      }
      handleOnKeyDown && handleOnKeyDown(event);
    };
    _this.getYearClassNames = function (y) {
      var _a = _this.props,
        date = _a.date,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        excludeDates = _a.excludeDates,
        includeDates = _a.includeDates,
        filterDate = _a.filterDate,
        yearClassName = _a.yearClassName;
      return clsx(
        "react-datepicker__year-text",
        "react-datepicker__year-".concat(y),
        date
          ? yearClassName === null || yearClassName === void 0
            ? void 0
            : yearClassName(setYear(date, y))
          : undefined,
        {
          "react-datepicker__year-text--selected": _this.isSelectedYear(y),
          "react-datepicker__year-text--disabled":
            (minDate ||
              maxDate ||
              excludeDates ||
              includeDates ||
              filterDate) &&
            isYearDisabled(y, _this.props),
          "react-datepicker__year-text--keyboard-selected":
            _this.isKeyboardSelected(y),
          "react-datepicker__year-text--range-start": _this.isRangeStart(y),
          "react-datepicker__year-text--range-end": _this.isRangeEnd(y),
          "react-datepicker__year-text--in-range": _this.isInRange(y),
          "react-datepicker__year-text--in-selecting-range":
            _this.isInSelectingRange(y),
          "react-datepicker__year-text--selecting-range-start":
            _this.isSelectingRangeStart(y),
          "react-datepicker__year-text--selecting-range-end":
            _this.isSelectingRangeEnd(y),
          "react-datepicker__year-text--today": _this.isCurrentYear(y),
        },
      );
    };
    _this.getYearTabIndex = function (y) {
      if (
        _this.props.disabledKeyboardNavigation ||
        _this.props.preSelection == null
      ) {
        return "-1";
      }
      var preSelected = getYear(_this.props.preSelection);
      var isPreSelectedYearDisabled = isYearDisabled(y, _this.props);
      return y === preSelected && !isPreSelectedYearDisabled ? "0" : "-1";
    };
    _this.getYearContent = function (y) {
      return _this.props.renderYearContent
        ? _this.props.renderYearContent(y)
        : y;
    };
    return _this;
  }
  Year.prototype.render = function () {
    var _this = this;
    var yearsList = [];
    var _a = this.props,
      date = _a.date,
      yearItemNumber = _a.yearItemNumber,
      onYearMouseEnter = _a.onYearMouseEnter,
      onYearMouseLeave = _a.onYearMouseLeave;
    if (date === undefined) {
      return null;
    }
    var _b = getYearsPeriod(date, yearItemNumber),
      startPeriod = _b.startPeriod,
      endPeriod = _b.endPeriod;
    var _loop_1 = function (y) {
      yearsList.push(
        React.createElement(
          "div",
          {
            ref: this_1.YEAR_REFS[y - startPeriod],
            onClick: function (event) {
              _this.onYearClick(event, y);
            },
            onKeyDown: function (event) {
              if (isSpaceKeyDown(event)) {
                event.preventDefault();
                event.key = KeyType.Enter;
              }
              _this.onYearKeyDown(event, y);
            },
            tabIndex: Number(this_1.getYearTabIndex(y)),
            className: this_1.getYearClassNames(y),
            onMouseEnter: !this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseEnter(event, y);
                }
              : undefined,
            onPointerEnter: this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseEnter(event, y);
                }
              : undefined,
            onMouseLeave: !this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseLeave(event, y);
                }
              : undefined,
            onPointerLeave: this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseLeave(event, y);
                }
              : undefined,
            key: y,
            "aria-current": this_1.isCurrentYear(y) ? "date" : undefined,
          },
          this_1.getYearContent(y),
        ),
      );
    };
    var this_1 = this;
    for (var y = startPeriod; y <= endPeriod; y++) {
      _loop_1(y);
    }
    return React.createElement(
      "div",
      { className: "react-datepicker__year" },
      React.createElement(
        "div",
        {
          className: "react-datepicker__year-wrapper",
          onMouseLeave: !this.props.usePointerEvent
            ? this.props.clearSelectingDate
            : undefined,
          onPointerLeave: this.props.usePointerEvent
            ? this.props.clearSelectingDate
            : undefined,
        },
        yearsList,
      ),
    );
  };
  return Year;
})(Component);

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;
    if (minDate) {
      isInRange = getYear(minDate) <= newYear;
    }
    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
    }
    if (isInRange) {
      list.push(newYear);
    }
  }
  return list;
}
var YearDropdownOptions = /** @class */ (function (_super) {
  __extends(YearDropdownOptions, _super);
  function YearDropdownOptions(props) {
    var _this = _super.call(this, props) || this;
    _this.renderOptions = function () {
      var selectedYear = _this.props.year;
      var options = _this.state.yearsList.map(function (year) {
        return React.createElement(
          "div",
          {
            className:
              selectedYear === year
                ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                : "react-datepicker__year-option",
            key: year,
            onClick: _this.onChange.bind(_this, year),
            "aria-selected": selectedYear === year ? "true" : undefined,
          },
          selectedYear === year
            ? React.createElement(
                "span",
                { className: "react-datepicker__year-option--selected" },
                "\u2713",
              )
            : "",
          year,
        );
      });
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : null;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : null;
      if (
        !maxYear ||
        !_this.state.yearsList.find(function (year) {
          return year === maxYear;
        })
      ) {
        options.unshift(
          React.createElement(
            "div",
            {
              className: "react-datepicker__year-option",
              key: "upcoming",
              onClick: _this.incrementYears,
            },
            React.createElement("a", {
              className:
                "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming",
            }),
          ),
        );
      }
      if (
        !minYear ||
        !_this.state.yearsList.find(function (year) {
          return year === minYear;
        })
      ) {
        options.push(
          React.createElement(
            "div",
            {
              className: "react-datepicker__year-option",
              key: "previous",
              onClick: _this.decrementYears,
            },
            React.createElement("a", {
              className:
                "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous",
            }),
          ),
        );
      }
      return options;
    };
    _this.onChange = function (year) {
      _this.props.onChange(year);
    };
    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };
    _this.shiftYears = function (amount) {
      var years = _this.state.yearsList.map(function (year) {
        return year + amount;
      });
      _this.setState({
        yearsList: years,
      });
    };
    _this.incrementYears = function () {
      return _this.shiftYears(1);
    };
    _this.decrementYears = function () {
      return _this.shiftYears(-1);
    };
    var yearDropdownItemNumber = props.yearDropdownItemNumber,
      scrollableYearDropdown = props.scrollableYearDropdown;
    var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
    _this.state = {
      yearsList: generateYears(
        _this.props.year,
        noOfYear,
        _this.props.minDate,
        _this.props.maxDate,
      ),
    };
    _this.dropdownRef = createRef();
    return _this;
  }
  YearDropdownOptions.prototype.componentDidMount = function () {
    var dropdownCurrent = this.dropdownRef.current;
    if (dropdownCurrent) {
      // Get array from HTMLCollection
      var dropdownCurrentChildren = dropdownCurrent.children
        ? Array.from(dropdownCurrent.children)
        : null;
      var selectedYearOptionEl = dropdownCurrentChildren
        ? dropdownCurrentChildren.find(function (childEl) {
            return childEl.ariaSelected;
          })
        : null;
      dropdownCurrent.scrollTop =
        selectedYearOptionEl && selectedYearOptionEl instanceof HTMLElement
          ? selectedYearOptionEl.offsetTop +
            (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) /
              2
          : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
    }
  };
  YearDropdownOptions.prototype.render = function () {
    var dropdownClass = clsx({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable":
        this.props.scrollableYearDropdown,
    });
    return React.createElement(
      ClickOutsideWrapper,
      {
        className: dropdownClass,
        containerRef: this.dropdownRef,
        onClickOutside: this.handleClickOutside,
      },
      this.renderOptions(),
    );
  };
  return YearDropdownOptions;
})(Component);

var YearDropdown = /** @class */ (function (_super) {
  __extends(YearDropdown, _super);
  function YearDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function () {
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : 1900;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : 2100;
      var options = [];
      for (var i = minYear; i <= maxYear; i++) {
        options.push(React.createElement("option", { key: i, value: i }, i));
      }
      return options;
    };
    _this.onSelectChange = function (event) {
      _this.onChange(parseInt(event.target.value));
    };
    _this.renderSelectMode = function () {
      return React.createElement(
        "select",
        {
          value: _this.props.year,
          className: "react-datepicker__year-select",
          onChange: _this.onSelectChange,
        },
        _this.renderSelectOptions(),
      );
    };
    _this.renderReadView = function (visible) {
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__year-read-view",
          onClick: function (event) {
            return _this.toggleDropdown(event);
          },
        },
        React.createElement("span", {
          className: "react-datepicker__year-read-view--down-arrow",
        }),
        React.createElement(
          "span",
          { className: "react-datepicker__year-read-view--selected-year" },
          _this.props.year,
        ),
      );
    };
    _this.renderDropdown = function () {
      return React.createElement(
        YearDropdownOptions,
        _assign({ key: "dropdown" }, _this.props, {
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
        }),
      );
    };
    _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    };
    _this.onChange = function (year) {
      _this.toggleDropdown();
      if (year === _this.props.year) return;
      _this.props.onChange(year);
    };
    _this.toggleDropdown = function (event) {
      _this.setState(
        {
          dropdownVisible: !_this.state.dropdownVisible,
        },
        function () {
          if (_this.props.adjustDateOnChange) {
            _this.handleYearChange(_this.props.date, event);
          }
        },
      );
    };
    _this.handleYearChange = function (date, event) {
      var _a;
      (_a = _this.onSelect) === null || _a === void 0
        ? void 0
        : _a.call(_this, date, event);
      _this.setOpen();
    };
    _this.onSelect = function (date, event) {
      var _a, _b;
      (_b = (_a = _this.props).onSelect) === null || _b === void 0
        ? void 0
        : _b.call(_a, date, event);
    };
    _this.setOpen = function () {
      var _a, _b;
      (_b = (_a = _this.props).setOpen) === null || _b === void 0
        ? void 0
        : _b.call(_a, true);
    };
    return _this;
  }
  YearDropdown.prototype.render = function () {
    var renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }
    return React.createElement(
      "div",
      {
        className:
          "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(
            this.props.dropdownMode,
          ),
      },
      renderedDropdown,
    );
  };
  return YearDropdown;
})(Component);

var DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select",
];
var isDropdownSelect = function (element) {
  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};
var Calendar = /** @class */ (function (_super) {
  __extends(Calendar, _super);
  function Calendar(props) {
    var _this = _super.call(this, props) || this;
    _this.monthContainer = undefined;
    _this.handleClickOutside = function (event) {
      _this.props.onClickOutside(event);
    };
    _this.setClickOutsideRef = function () {
      return _this.containerRef.current;
    };
    _this.handleDropdownFocus = function (event) {
      var _a, _b;
      if (isDropdownSelect(event.target)) {
        (_b = (_a = _this.props).onDropdownFocus) === null || _b === void 0
          ? void 0
          : _b.call(_a, event);
      }
    };
    _this.getDateInView = function () {
      var _a = _this.props,
        preSelection = _a.preSelection,
        selected = _a.selected,
        openToDate = _a.openToDate;
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var current = newDate();
      var initialDate = openToDate || selected || preSelection;
      if (initialDate) {
        return initialDate;
      } else {
        if (minDate && isBefore(current, minDate)) {
          return minDate;
        } else if (maxDate && isAfter(current, maxDate)) {
          return maxDate;
        }
      }
      return current;
    };
    _this.increaseMonth = function () {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: addMonths(date, 1),
          };
        },
        function () {
          return _this.handleMonthChange(_this.state.date);
        },
      );
    };
    _this.decreaseMonth = function () {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: subMonths(date, 1),
          };
        },
        function () {
          return _this.handleMonthChange(_this.state.date);
        },
      );
    };
    _this.handleDayClick = function (day, event, monthSelectedIn) {
      _this.props.onSelect(day, event, monthSelectedIn);
      _this.props.setPreSelection && _this.props.setPreSelection(day);
    };
    _this.handleDayMouseEnter = function (day) {
      _this.setState({ selectingDate: day });
      _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
    };
    _this.handleMonthMouseLeave = function () {
      _this.setState({ selectingDate: undefined });
      _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
    };
    _this.handleYearMouseEnter = function (event, year) {
      _this.setState({ selectingDate: setYear(newDate(), year) });
      !!_this.props.onYearMouseEnter &&
        _this.props.onYearMouseEnter(event, year);
    };
    _this.handleYearMouseLeave = function (event, year) {
      !!_this.props.onYearMouseLeave &&
        _this.props.onYearMouseLeave(event, year);
    };
    _this.handleYearChange = function (date) {
      var _a, _b, _c, _d;
      (_b = (_a = _this.props).onYearChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, date);
      _this.setState({ isRenderAriaLiveMessage: true });
      if (_this.props.adjustDateOnChange) {
        _this.props.onSelect(date);
        (_d = (_c = _this.props).setOpen) === null || _d === void 0
          ? void 0
          : _d.call(_c, true);
      }
      _this.props.setPreSelection && _this.props.setPreSelection(date);
    };
    _this.getEnabledPreSelectionDateForMonth = function (date) {
      if (!isDayDisabled(date, _this.props)) {
        return date;
      }
      var startOfMonth = getStartOfMonth(date);
      var endOfMonth = getEndOfMonth(date);
      var totalDays = differenceInDays(endOfMonth, startOfMonth);
      var preSelectedDate = null;
      for (var dayIdx = 0; dayIdx <= totalDays; dayIdx++) {
        var processingDate = addDays(startOfMonth, dayIdx);
        if (!isDayDisabled(processingDate, _this.props)) {
          preSelectedDate = processingDate;
          break;
        }
      }
      return preSelectedDate;
    };
    _this.handleMonthChange = function (date) {
      var _a, _b, _c;
      var enabledPreSelectionDate =
        (_a = _this.getEnabledPreSelectionDateForMonth(date)) !== null &&
        _a !== void 0
          ? _a
          : date;
      _this.handleCustomMonthChange(enabledPreSelectionDate);
      if (_this.props.adjustDateOnChange) {
        _this.props.onSelect(enabledPreSelectionDate);
        (_c = (_b = _this.props).setOpen) === null || _c === void 0
          ? void 0
          : _c.call(_b, true);
      }
      _this.props.setPreSelection &&
        _this.props.setPreSelection(enabledPreSelectionDate);
    };
    _this.handleCustomMonthChange = function (date) {
      var _a, _b;
      (_b = (_a = _this.props).onMonthChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, date);
      _this.setState({ isRenderAriaLiveMessage: true });
    };
    _this.handleMonthYearChange = function (date) {
      _this.handleYearChange(date);
      _this.handleMonthChange(date);
    };
    _this.changeYear = function (year) {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: setYear(date, Number(year)),
          };
        },
        function () {
          return _this.handleYearChange(_this.state.date);
        },
      );
    };
    _this.changeMonth = function (month) {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: setMonth(date, Number(month)),
          };
        },
        function () {
          return _this.handleMonthChange(_this.state.date);
        },
      );
    };
    _this.changeMonthYear = function (monthYear) {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: setYear(
              setMonth(date, getMonth(monthYear)),
              getYear(monthYear),
            ),
          };
        },
        function () {
          return _this.handleMonthYearChange(_this.state.date);
        },
      );
    };
    _this.header = function (date) {
      if (date === void 0) {
        date = _this.state.date;
      }
      var startOfWeek = getStartOfWeek(
        date,
        _this.props.locale,
        _this.props.calendarStartDay,
      );
      var dayNames = [];
      if (_this.props.showWeekNumbers) {
        dayNames.push(
          React.createElement(
            "div",
            { key: "W", className: "react-datepicker__day-name" },
            _this.props.weekLabel || "#",
          ),
        );
      }
      return dayNames.concat(
        [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = addDays(startOfWeek, offset);
          var weekDayName = _this.formatWeekday(day, _this.props.locale);
          var weekDayClassName = _this.props.weekDayClassName
            ? _this.props.weekDayClassName(day)
            : undefined;
          return React.createElement(
            "div",
            {
              key: offset,
              "aria-label": formatDate(day, "EEEE", _this.props.locale),
              className: clsx("react-datepicker__day-name", weekDayClassName),
            },
            weekDayName,
          );
        }),
      );
    };
    _this.formatWeekday = function (day, locale) {
      if (_this.props.formatWeekDay) {
        return getFormattedWeekdayInLocale(
          day,
          _this.props.formatWeekDay,
          locale,
        );
      }
      return _this.props.useWeekdaysShort
        ? getWeekdayShortInLocale(day, locale)
        : getWeekdayMinInLocale(day, locale);
    };
    _this.decreaseYear = function () {
      _this.setState(
        function (_a) {
          var _b;
          var date = _a.date;
          return {
            date: subYears(
              date,
              _this.props.showYearPicker
                ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0
                  ? _b
                  : Calendar.defaultProps.yearItemNumber
                : 1,
            ),
          };
        },
        function () {
          return _this.handleYearChange(_this.state.date);
        },
      );
    };
    _this.clearSelectingDate = function () {
      _this.setState({ selectingDate: undefined });
    };
    _this.renderPreviousButton = function () {
      var _a, _b, _c;
      if (_this.props.renderCustomHeader) {
        return;
      }
      var monthsShown =
        (_a = _this.props.monthsShown) !== null && _a !== void 0
          ? _a
          : Calendar.defaultProps.monthsShown;
      var monthsToSubtract = _this.props.showPreviousMonths
        ? monthsShown - 1
        : 0;
      var monthSelectedIn =
        (_b = _this.props.monthSelectedIn) !== null && _b !== void 0
          ? _b
          : monthsToSubtract;
      var fromMonthDate = subMonths(_this.state.date, monthSelectedIn);
      var allPrevDaysDisabled;
      switch (true) {
        case _this.props.showMonthYearPicker:
          allPrevDaysDisabled = yearDisabledBefore(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showYearPicker:
          allPrevDaysDisabled = yearsDisabledBefore(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showQuarterYearPicker:
          allPrevDaysDisabled = quarterDisabledBefore(
            _this.state.date,
            _this.props,
          );
          break;
        default:
          allPrevDaysDisabled = monthDisabledBefore(fromMonthDate, _this.props);
          break;
      }
      if (
        (!((_c = _this.props.forceShowMonthNavigation) !== null && _c !== void 0
          ? _c
          : Calendar.defaultProps.forceShowMonthNavigation) &&
          !_this.props.showDisabledMonthNavigation &&
          allPrevDaysDisabled) ||
        _this.props.showTimeSelectOnly
      ) {
        return;
      }
      var iconClasses = [
        "react-datepicker__navigation-icon",
        "react-datepicker__navigation-icon--previous",
      ];
      var classes = [
        "react-datepicker__navigation",
        "react-datepicker__navigation--previous",
      ];
      var clickHandler = _this.decreaseMonth;
      if (
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker
      ) {
        clickHandler = _this.decreaseYear;
      }
      if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--previous--disabled");
        clickHandler = undefined;
      }
      var isForYear =
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker;
      var _d = _this.props,
        _e = _d.previousMonthButtonLabel,
        previousMonthButtonLabel =
          _e === void 0 ? Calendar.defaultProps.previousMonthButtonLabel : _e,
        _f = _d.previousYearButtonLabel,
        previousYearButtonLabel =
          _f === void 0 ? Calendar.defaultProps.previousYearButtonLabel : _f;
      var _g = _this.props,
        _h = _g.previousMonthAriaLabel,
        previousMonthAriaLabel =
          _h === void 0
            ? typeof previousMonthButtonLabel === "string"
              ? previousMonthButtonLabel
              : "Previous Month"
            : _h,
        _j = _g.previousYearAriaLabel,
        previousYearAriaLabel =
          _j === void 0
            ? typeof previousYearButtonLabel === "string"
              ? previousYearButtonLabel
              : "Previous Year"
            : _j;
      return React.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear
            ? previousYearAriaLabel
            : previousMonthAriaLabel,
        },
        React.createElement(
          "span",
          { className: iconClasses.join(" ") },
          isForYear ? previousYearButtonLabel : previousMonthButtonLabel,
        ),
      );
    };
    _this.increaseYear = function () {
      _this.setState(
        function (_a) {
          var _b;
          var date = _a.date;
          return {
            date: addYears(
              date,
              _this.props.showYearPicker
                ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0
                  ? _b
                  : Calendar.defaultProps.yearItemNumber
                : 1,
            ),
          };
        },
        function () {
          return _this.handleYearChange(_this.state.date);
        },
      );
    };
    _this.renderNextButton = function () {
      var _a;
      if (_this.props.renderCustomHeader) {
        return;
      }
      var allNextDaysDisabled;
      switch (true) {
        case _this.props.showMonthYearPicker:
          allNextDaysDisabled = yearDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showYearPicker:
          allNextDaysDisabled = yearsDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showQuarterYearPicker:
          allNextDaysDisabled = quarterDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
        default:
          allNextDaysDisabled = monthDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
      }
      if (
        (!((_a = _this.props.forceShowMonthNavigation) !== null && _a !== void 0
          ? _a
          : Calendar.defaultProps.forceShowMonthNavigation) &&
          !_this.props.showDisabledMonthNavigation &&
          allNextDaysDisabled) ||
        _this.props.showTimeSelectOnly
      ) {
        return;
      }
      var classes = [
        "react-datepicker__navigation",
        "react-datepicker__navigation--next",
      ];
      var iconClasses = [
        "react-datepicker__navigation-icon",
        "react-datepicker__navigation-icon--next",
      ];
      if (_this.props.showTimeSelect) {
        classes.push("react-datepicker__navigation--next--with-time");
      }
      if (_this.props.todayButton) {
        classes.push("react-datepicker__navigation--next--with-today-button");
      }
      var clickHandler = _this.increaseMonth;
      if (
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker
      ) {
        clickHandler = _this.increaseYear;
      }
      if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--next--disabled");
        clickHandler = undefined;
      }
      var isForYear =
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker;
      var _b = _this.props,
        _c = _b.nextMonthButtonLabel,
        nextMonthButtonLabel =
          _c === void 0 ? Calendar.defaultProps.nextMonthButtonLabel : _c,
        _d = _b.nextYearButtonLabel,
        nextYearButtonLabel =
          _d === void 0 ? Calendar.defaultProps.nextYearButtonLabel : _d;
      var _e = _this.props,
        _f = _e.nextMonthAriaLabel,
        nextMonthAriaLabel =
          _f === void 0
            ? typeof nextMonthButtonLabel === "string"
              ? nextMonthButtonLabel
              : "Next Month"
            : _f,
        _g = _e.nextYearAriaLabel,
        nextYearAriaLabel =
          _g === void 0
            ? typeof nextYearButtonLabel === "string"
              ? nextYearButtonLabel
              : "Next Year"
            : _g;
      return React.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel,
        },
        React.createElement(
          "span",
          { className: iconClasses.join(" ") },
          isForYear ? nextYearButtonLabel : nextMonthButtonLabel,
        ),
      );
    };
    _this.renderCurrentMonth = function (date) {
      if (date === void 0) {
        date = _this.state.date;
      }
      var classes = ["react-datepicker__current-month"];
      if (_this.props.showYearDropdown) {
        classes.push("react-datepicker__current-month--hasYearDropdown");
      }
      if (_this.props.showMonthDropdown) {
        classes.push("react-datepicker__current-month--hasMonthDropdown");
      }
      if (_this.props.showMonthYearDropdown) {
        classes.push("react-datepicker__current-month--hasMonthYearDropdown");
      }
      return React.createElement(
        "h2",
        { className: classes.join(" ") },
        formatDate(date, _this.props.dateFormat, _this.props.locale),
      );
    };
    _this.renderYearDropdown = function (overrideHide) {
      if (overrideHide === void 0) {
        overrideHide = false;
      }
      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }
      return React.createElement(
        YearDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          date: _this.state.date,
          onChange: _this.changeYear,
          year: getYear(_this.state.date),
        }),
      );
    };
    _this.renderMonthDropdown = function (overrideHide) {
      if (overrideHide === void 0) {
        overrideHide = false;
      }
      if (!_this.props.showMonthDropdown || overrideHide) {
        return;
      }
      return React.createElement(
        MonthDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          month: getMonth(_this.state.date),
          onChange: _this.changeMonth,
        }),
      );
    };
    _this.renderMonthYearDropdown = function (overrideHide) {
      if (overrideHide === void 0) {
        overrideHide = false;
      }
      if (!_this.props.showMonthYearDropdown || overrideHide) {
        return;
      }
      return React.createElement(
        MonthYearDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          date: _this.state.date,
          onChange: _this.changeMonthYear,
        }),
      );
    };
    _this.handleTodayButtonClick = function (event) {
      _this.props.onSelect(getStartOfToday(), event);
      _this.props.setPreSelection &&
        _this.props.setPreSelection(getStartOfToday());
    };
    _this.renderTodayButton = function () {
      if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
        return;
      }
      return React.createElement(
        "div",
        {
          className: "react-datepicker__today-button",
          onClick: _this.handleTodayButtonClick,
        },
        _this.props.todayButton,
      );
    };
    _this.renderDefaultHeader = function (_a) {
      var monthDate = _a.monthDate,
        i = _a.i;
      return React.createElement(
        "div",
        {
          className: "react-datepicker__header ".concat(
            _this.props.showTimeSelect
              ? "react-datepicker__header--has-time-select"
              : "",
          ),
        },
        _this.renderCurrentMonth(monthDate),
        React.createElement(
          "div",
          {
            className:
              "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(
                _this.props.dropdownMode,
              ),
            onFocus: _this.handleDropdownFocus,
          },
          _this.renderMonthDropdown(i !== 0),
          _this.renderMonthYearDropdown(i !== 0),
          _this.renderYearDropdown(i !== 0),
        ),
        React.createElement(
          "div",
          { className: "react-datepicker__day-names" },
          _this.header(monthDate),
        ),
      );
    };
    _this.renderCustomHeader = function (headerArgs) {
      var _a, _b;
      var monthDate = headerArgs.monthDate,
        i = headerArgs.i;
      if (
        (_this.props.showTimeSelect && !_this.state.monthContainer) ||
        _this.props.showTimeSelectOnly
      ) {
        return null;
      }
      var prevMonthButtonDisabled = monthDisabledBefore(
        _this.state.date,
        _this.props,
      );
      var nextMonthButtonDisabled = monthDisabledAfter(
        _this.state.date,
        _this.props,
      );
      var prevYearButtonDisabled = yearDisabledBefore(
        _this.state.date,
        _this.props,
      );
      var nextYearButtonDisabled = yearDisabledAfter(
        _this.state.date,
        _this.props,
      );
      var showDayNames =
        !_this.props.showMonthYearPicker &&
        !_this.props.showQuarterYearPicker &&
        !_this.props.showYearPicker;
      return React.createElement(
        "div",
        {
          className:
            "react-datepicker__header react-datepicker__header--custom",
          onFocus: _this.props.onDropdownFocus,
        },
        (_b = (_a = _this.props).renderCustomHeader) === null || _b === void 0
          ? void 0
          : _b.call(
              _a,
              _assign(_assign({}, _this.state), {
                customHeaderCount: i,
                monthDate: monthDate,
                changeMonth: _this.changeMonth,
                changeYear: _this.changeYear,
                decreaseMonth: _this.decreaseMonth,
                increaseMonth: _this.increaseMonth,
                decreaseYear: _this.decreaseYear,
                increaseYear: _this.increaseYear,
                prevMonthButtonDisabled: prevMonthButtonDisabled,
                nextMonthButtonDisabled: nextMonthButtonDisabled,
                prevYearButtonDisabled: prevYearButtonDisabled,
                nextYearButtonDisabled: nextYearButtonDisabled,
              }),
            ),
        showDayNames &&
          React.createElement(
            "div",
            { className: "react-datepicker__day-names" },
            _this.header(monthDate),
          ),
      );
    };
    _this.renderYearHeader = function (_a) {
      var monthDate = _a.monthDate;
      var _b = _this.props,
        showYearPicker = _b.showYearPicker,
        _c = _b.yearItemNumber,
        yearItemNumber =
          _c === void 0 ? Calendar.defaultProps.yearItemNumber : _c;
      var _d = getYearsPeriod(monthDate, yearItemNumber),
        startPeriod = _d.startPeriod,
        endPeriod = _d.endPeriod;
      return React.createElement(
        "div",
        { className: "react-datepicker__header react-datepicker-year-header" },
        showYearPicker
          ? "".concat(startPeriod, " - ").concat(endPeriod)
          : getYear(monthDate),
      );
    };
    _this.renderHeader = function (_a) {
      var monthDate = _a.monthDate,
        _b = _a.i,
        i = _b === void 0 ? 0 : _b;
      var headerArgs = { monthDate: monthDate, i: i };
      switch (true) {
        case _this.props.renderCustomHeader !== undefined:
          return _this.renderCustomHeader(headerArgs);
        case _this.props.showMonthYearPicker ||
          _this.props.showQuarterYearPicker ||
          _this.props.showYearPicker:
          return _this.renderYearHeader(headerArgs);
        default:
          return _this.renderDefaultHeader(headerArgs);
      }
    };
    _this.renderMonths = function () {
      var _a, _b;
      if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
        return;
      }
      var monthList = [];
      var monthsShown =
        (_a = _this.props.monthsShown) !== null && _a !== void 0
          ? _a
          : Calendar.defaultProps.monthsShown;
      var monthsToSubtract = _this.props.showPreviousMonths
        ? monthsShown - 1
        : 0;
      var fromMonthDate =
        _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
          ? addYears(_this.state.date, monthsToSubtract)
          : subMonths(_this.state.date, monthsToSubtract);
      var monthSelectedIn =
        (_b = _this.props.monthSelectedIn) !== null && _b !== void 0
          ? _b
          : monthsToSubtract;
      for (var i = 0; i < monthsShown; ++i) {
        var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
        var monthDate =
          _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
            ? addYears(fromMonthDate, monthsToAdd)
            : addMonths(fromMonthDate, monthsToAdd);
        var monthKey = "month-".concat(i);
        var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
        var monthShowsDuplicateDaysStart = i > 0;
        monthList.push(
          React.createElement(
            "div",
            {
              key: monthKey,
              ref: function (div) {
                _this.monthContainer =
                  div !== null && div !== void 0 ? div : undefined;
              },
              className: "react-datepicker__month-container",
            },
            _this.renderHeader({ monthDate: monthDate, i: i }),
            React.createElement(
              Month,
              _assign({}, Calendar.defaultProps, _this.props, {
                containerRef: _this.containerRef,
                ariaLabelPrefix: _this.props.monthAriaLabelPrefix,
                day: monthDate,
                onDayClick: _this.handleDayClick,
                handleOnKeyDown: _this.props.handleOnDayKeyDown,
                handleOnMonthKeyDown: _this.props.handleOnKeyDown,
                onDayMouseEnter: _this.handleDayMouseEnter,
                onMouseLeave: _this.handleMonthMouseLeave,
                orderInDisplay: i,
                selectingDate: _this.state.selectingDate,
                monthShowsDuplicateDaysEnd: monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart: monthShowsDuplicateDaysStart,
              }),
            ),
          ),
        );
      }
      return monthList;
    };
    _this.renderYears = function () {
      if (_this.props.showTimeSelectOnly) {
        return;
      }
      if (_this.props.showYearPicker) {
        return React.createElement(
          "div",
          { className: "react-datepicker__year--container" },
          _this.renderHeader({ monthDate: _this.state.date }),
          React.createElement(
            Year,
            _assign({}, Calendar.defaultProps, _this.props, {
              selectingDate: _this.state.selectingDate,
              date: _this.state.date,
              onDayClick: _this.handleDayClick,
              clearSelectingDate: _this.clearSelectingDate,
              onYearMouseEnter: _this.handleYearMouseEnter,
              onYearMouseLeave: _this.handleYearMouseLeave,
            }),
          ),
        );
      }
      return;
    };
    _this.renderTimeSection = function () {
      if (
        _this.props.showTimeSelect &&
        (_this.state.monthContainer || _this.props.showTimeSelectOnly)
      ) {
        return React.createElement(
          Time,
          _assign({}, Calendar.defaultProps, _this.props, {
            onChange: _this.props.onTimeChange,
            format: _this.props.timeFormat,
            intervals: _this.props.timeIntervals,
            monthRef: _this.state.monthContainer,
          }),
        );
      }
      return;
    };
    _this.renderInputTimeSection = function () {
      var time = _this.props.selected
        ? new Date(_this.props.selected)
        : undefined;
      var timeValid = time && isValid(time) && Boolean(_this.props.selected);
      var timeString = timeValid
        ? ""
            .concat(addZero(time.getHours()), ":")
            .concat(addZero(time.getMinutes()))
        : "";
      if (_this.props.showTimeInput) {
        return React.createElement(
          InputTime,
          _assign({}, Calendar.defaultProps, _this.props, {
            date: time,
            timeString: timeString,
            onChange: _this.props.onTimeChange,
          }),
        );
      }
      return;
    };
    _this.renderAriaLiveRegion = function () {
      var _a;
      var _b = getYearsPeriod(
          _this.state.date,
          (_a = _this.props.yearItemNumber) !== null && _a !== void 0
            ? _a
            : Calendar.defaultProps.yearItemNumber,
        ),
        startPeriod = _b.startPeriod,
        endPeriod = _b.endPeriod;
      var ariaLiveMessage;
      if (_this.props.showYearPicker) {
        ariaLiveMessage = "".concat(startPeriod, " - ").concat(endPeriod);
      } else if (
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker
      ) {
        ariaLiveMessage = getYear(_this.state.date);
      } else {
        ariaLiveMessage = ""
          .concat(
            getMonthInLocale(getMonth(_this.state.date), _this.props.locale),
            " ",
          )
          .concat(getYear(_this.state.date));
      }
      return React.createElement(
        "span",
        {
          role: "alert",
          "aria-live": "polite",
          className: "react-datepicker__aria-live",
        },
        _this.state.isRenderAriaLiveMessage && ariaLiveMessage,
      );
    };
    _this.renderChildren = function () {
      if (_this.props.children) {
        return React.createElement(
          "div",
          { className: "react-datepicker__children-container" },
          _this.props.children,
        );
      }
      return;
    };
    _this.containerRef = createRef();
    _this.state = {
      date: _this.getDateInView(),
      selectingDate: undefined,
      monthContainer: undefined,
      isRenderAriaLiveMessage: false,
    };
    return _this;
  }
  Object.defineProperty(Calendar, "defaultProps", {
    get: function () {
      return {
        monthsShown: 1,
        forceShowMonthNavigation: false,
        timeCaption: "Time",
        previousYearButtonLabel: "Previous Year",
        nextYearButtonLabel: "Next Year",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next Month",
        yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
      };
    },
    enumerable: false,
    configurable: true,
  });
  Calendar.prototype.componentDidMount = function () {
    var _this = this;
    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = (function () {
        _this.setState({ monthContainer: _this.monthContainer });
      })();
    }
  };
  Calendar.prototype.componentDidUpdate = function (prevProps) {
    var _this = this;
    if (
      this.props.preSelection &&
      (!isSameDay(this.props.preSelection, prevProps.preSelection) ||
        this.props.monthSelectedIn !== prevProps.monthSelectedIn)
    ) {
      var hasMonthChanged_1 = !isSameMonth(
        this.state.date,
        this.props.preSelection,
      );
      this.setState(
        {
          date: this.props.preSelection,
        },
        function () {
          return (
            hasMonthChanged_1 && _this.handleCustomMonthChange(_this.state.date)
          );
        },
      );
    } else if (
      this.props.openToDate &&
      !isSameDay(this.props.openToDate, prevProps.openToDate)
    ) {
      this.setState({
        date: this.props.openToDate,
      });
    }
  };
  Calendar.prototype.render = function () {
    var Container = this.props.container || CalendarContainer;
    return React.createElement(
      ClickOutsideWrapper,
      {
        onClickOutside: this.handleClickOutside,
        style: { display: "contents" },
        ignoreClass: this.props.outsideClickIgnoreClass,
      },
      React.createElement(
        "div",
        { style: { display: "contents" }, ref: this.containerRef },
        React.createElement(
          Container,
          {
            className: clsx("react-datepicker", this.props.className, {
              "react-datepicker--time-only": this.props.showTimeSelectOnly,
            }),
            showTime: this.props.showTimeSelect || this.props.showTimeInput,
            showTimeSelectOnly: this.props.showTimeSelectOnly,
          },
          this.renderAriaLiveRegion(),
          this.renderPreviousButton(),
          this.renderNextButton(),
          this.renderMonths(),
          this.renderYears(),
          this.renderTodayButton(),
          this.renderTimeSection(),
          this.renderInputTimeSection(),
          this.renderChildren(),
        ),
      ),
    );
  };
  return Calendar;
})(Component);

/**
 * `CalendarIcon` is a React component that renders an icon for a calendar.
 * The icon can be a string representing a CSS class, a React node, or a default SVG icon.
 *
 * @component
 * @prop  icon - The icon to be displayed. This can be a string representing a CSS class or a React node.
 * @prop  className - An optional string representing additional CSS classes to be applied to the icon.
 * @prop  onClick - An optional function to be called when the icon is clicked.
 *
 * @example
 * // To use a CSS class as the icon
 * <CalendarIcon icon="my-icon-class" onClick={myClickHandler} />
 *
 * @example
 * // To use a React node as the icon
 * <CalendarIcon icon={<MyIconComponent />} onClick={myClickHandler} />
 *
 * @returns  The `CalendarIcon` component.
 */
var CalendarIcon = function (_a) {
  var icon = _a.icon,
    _b = _a.className,
    className = _b === void 0 ? "" : _b,
    onClick = _a.onClick;
  var defaultClass = "react-datepicker__calendar-icon";
  if (typeof icon === "string") {
    return React.createElement("i", {
      className: ""
        .concat(defaultClass, " ")
        .concat(icon, " ")
        .concat(className),
      "aria-hidden": "true",
      onClick: onClick,
    });
  }
  if (React.isValidElement(icon)) {
    // Because we are checking that typeof icon is string first, we can safely cast icon as React.ReactElement on types level and code level
    var iconElement_1 = icon;
    return React.cloneElement(iconElement_1, {
      className: ""
        .concat(iconElement_1.props.className || "", " ")
        .concat(defaultClass, " ")
        .concat(className),
      onClick: function (event) {
        if (typeof iconElement_1.props.onClick === "function") {
          iconElement_1.props.onClick(event);
        }
        if (typeof onClick === "function") {
          onClick(event);
        }
      },
    });
  }
  // Default SVG Icon
  return React.createElement(
    "svg",
    {
      className: "".concat(defaultClass, " ").concat(className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      onClick: onClick,
    },
    React.createElement("path", {
      d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z",
    }),
  );
};

/**
 * `Portal` is a React component that allows you to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @class
 * @param {PortalProps} props - The properties that define the `Portal` component.
 * @property {React.ReactNode} props.children - The children to be rendered into the `Portal`.
 * @property {string} props.portalId - The id of the DOM node into which the `Portal` will render.
 * @property {ShadowRoot} [props.portalHost] - The DOM node to host the `Portal`.
 */
var Portal = /** @class */ (function (_super) {
  __extends(Portal, _super);
  function Portal(props) {
    var _this = _super.call(this, props) || this;
    _this.portalRoot = null;
    _this.el = document.createElement("div");
    return _this;
  }
  Portal.prototype.componentDidMount = function () {
    this.portalRoot = (this.props.portalHost || document).getElementById(
      this.props.portalId,
    );
    if (!this.portalRoot) {
      this.portalRoot = document.createElement("div");
      this.portalRoot.setAttribute("id", this.props.portalId);
      (this.props.portalHost || document.body).appendChild(this.portalRoot);
    }
    this.portalRoot.appendChild(this.el);
  };
  Portal.prototype.componentWillUnmount = function () {
    if (this.portalRoot) {
      this.portalRoot.removeChild(this.el);
    }
  };
  Portal.prototype.render = function () {
    return ReactDOM.createPortal(this.props.children, this.el);
  };
  return Portal;
})(Component);

var focusableElementsSelector =
  "[tabindex], a, button, input, select, textarea";
var focusableFilter = function (node) {
  if (node instanceof HTMLAnchorElement) {
    return node.tabIndex !== -1;
  }
  return !node.disabled && node.tabIndex !== -1;
};
/**
 * `TabLoop` is a React component that manages tabbing behavior for its children.
 *
 * TabLoop prevents the user from tabbing outside of the popper
 * It creates a tabindex loop so that "Tab" on the last element will focus the first element
 * and "Shift Tab" on the first element will focus the last element
 *
 * @component
 * @example
 * <TabLoop enableTabLoop={true}>
 *   <ChildComponent />
 * </TabLoop>
 *
 * @param props - The properties that define the `TabLoop` component.
 * @param props.children - The child components.
 * @param props.enableTabLoop - Whether to enable the tab loop.
 *
 * @returns The `TabLoop` component.
 */
var TabLoop = /** @class */ (function (_super) {
  __extends(TabLoop, _super);
  function TabLoop(props) {
    var _this = _super.call(this, props) || this;
    /**
     * `getTabChildren` is a method of the `TabLoop` class that retrieves all tabbable children of the component.
     *
     * This method uses the `tabbable` library to find all tabbable elements within the `TabLoop` component.
     * It then filters out any elements that are not visible.
     *
     * @returns An array of all tabbable and visible children of the `TabLoop` component.
     */
    _this.getTabChildren = function () {
      var _a;
      return Array.prototype.slice
        .call(
          (_a = _this.tabLoopRef.current) === null || _a === void 0
            ? void 0
            : _a.querySelectorAll(focusableElementsSelector),
          1,
          -1,
        )
        .filter(focusableFilter);
    };
    _this.handleFocusStart = function () {
      var tabChildren = _this.getTabChildren();
      tabChildren &&
        tabChildren.length > 1 &&
        tabChildren[tabChildren.length - 1].focus();
    };
    _this.handleFocusEnd = function () {
      var tabChildren = _this.getTabChildren();
      tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
    };
    _this.tabLoopRef = createRef();
    return _this;
  }
  TabLoop.prototype.render = function () {
    var _a;
    if (
      !((_a = this.props.enableTabLoop) !== null && _a !== void 0
        ? _a
        : TabLoop.defaultProps.enableTabLoop)
    ) {
      return this.props.children;
    }
    return React.createElement(
      "div",
      { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
      React.createElement("div", {
        className: "react-datepicker__tab-loop__start",
        tabIndex: 0,
        onFocus: this.handleFocusStart,
      }),
      this.props.children,
      React.createElement("div", {
        className: "react-datepicker__tab-loop__end",
        tabIndex: 0,
        onFocus: this.handleFocusEnd,
      }),
    );
  };
  TabLoop.defaultProps = {
    enableTabLoop: true,
  };
  return TabLoop;
})(Component);

/**
 * `withFloating` is a higher-order component that adds floating behavior to a component.
 *
 * @param Component - The component to enhance.
 *
 * @example
 * const FloatingComponent = withFloating(MyComponent);
 * <FloatingComponent popperModifiers={[]} popperProps={{}} hidePopper={true} />
 *
 * @param popperModifiers - The modifiers to use for the popper.
 * @param popperProps - The props to pass to the popper.
 * @param hidePopper - Whether to hide the popper.
 * @param popperPlacement - The placement of the popper.
 *
 * @returns A new component with floating behavior.
 */
function withFloating(Component) {
  var WithFloating = function (props) {
    var _a;
    var hidePopper =
      typeof props.hidePopper === "boolean" ? props.hidePopper : true;
    var arrowRef = useRef(null);
    var floatingProps = useFloating(
      _assign(
        {
          open: !hidePopper,
          whileElementsMounted: autoUpdate,
          placement: props.popperPlacement,
          middleware: __spreadArray(
            [flip({ padding: 15 }), offset(10), arrow({ element: arrowRef })],
            (_a = props.popperModifiers) !== null && _a !== void 0 ? _a : [],
            true,
          ),
        },
        props.popperProps,
      ),
    );
    var componentProps = _assign(_assign({}, props), {
      hidePopper: hidePopper,
      popperProps: _assign(_assign({}, floatingProps), { arrowRef: arrowRef }),
    });
    return React.createElement(Component, _assign({}, componentProps));
  };
  return WithFloating;
}

// Exported for testing purposes
var PopperComponent = /** @class */ (function (_super) {
  __extends(PopperComponent, _super);
  function PopperComponent() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Object.defineProperty(PopperComponent, "defaultProps", {
    get: function () {
      return {
        hidePopper: true,
      };
    },
    enumerable: false,
    configurable: true,
  });
  PopperComponent.prototype.render = function () {
    var _a = this.props,
      className = _a.className,
      wrapperClassName = _a.wrapperClassName,
      _b = _a.hidePopper,
      hidePopper = _b === void 0 ? PopperComponent.defaultProps.hidePopper : _b,
      popperComponent = _a.popperComponent,
      targetComponent = _a.targetComponent,
      enableTabLoop = _a.enableTabLoop,
      popperOnKeyDown = _a.popperOnKeyDown,
      portalId = _a.portalId,
      portalHost = _a.portalHost,
      popperProps = _a.popperProps,
      showArrow = _a.showArrow;
    var popper = undefined;
    if (!hidePopper) {
      var classes = clsx("react-datepicker-popper", className);
      popper = React.createElement(
        TabLoop,
        { enableTabLoop: enableTabLoop },
        React.createElement(
          "div",
          {
            ref: popperProps.refs.setFloating,
            style: popperProps.floatingStyles,
            className: classes,
            "data-placement": popperProps.placement,
            onKeyDown: popperOnKeyDown,
          },
          popperComponent,
          showArrow &&
            React.createElement(FloatingArrow, {
              ref: popperProps.arrowRef,
              context: popperProps.context,
              fill: "currentColor",
              strokeWidth: 1,
              height: 8,
              width: 16,
              style: { transform: "translateY(-1px)" },
              className: "react-datepicker__triangle",
            }),
        ),
      );
    }
    if (this.props.popperContainer) {
      popper = createElement(this.props.popperContainer, {}, popper);
    }
    if (portalId && !hidePopper) {
      popper = React.createElement(
        Portal,
        { portalId: portalId, portalHost: portalHost },
        popper,
      );
    }
    var wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "div",
        { ref: popperProps.refs.setReference, className: wrapperClasses },
        targetComponent,
      ),
      popper,
    );
  };
  return PopperComponent;
})(Component);
var PopperComponent$1 = withFloating(PopperComponent);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return (
      getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2)
    );
  }
  return date1 !== date2;
}
/**
 * General datepicker component.
 */
var INPUT_ERR_1 = "Date input not valid.";
var DatePicker = /** @class */ (function (_super) {
  __extends(DatePicker, _super);
  function DatePicker(props) {
    var _this = _super.call(this, props) || this;
    _this.calendar = null;
    _this.input = null;
    _this.getPreSelection = function () {
      return _this.props.openToDate
        ? _this.props.openToDate
        : _this.props.selectsEnd && _this.props.startDate
          ? _this.props.startDate
          : _this.props.selectsStart && _this.props.endDate
            ? _this.props.endDate
            : newDate();
    };
    // Convert the date from string format to standard Date format
    _this.modifyHolidays = function () {
      var _a;
      return (_a = _this.props.holidays) === null || _a === void 0
        ? void 0
        : _a.reduce(function (accumulator, holiday) {
            var date = new Date(holiday.date);
            if (!isValid(date)) {
              return accumulator;
            }
            return __spreadArray(
              __spreadArray([], accumulator, true),
              [_assign(_assign({}, holiday), { date: date })],
              false,
            );
          }, []);
    };
    _this.calcInitialState = function () {
      var _a;
      var defaultPreSelection = _this.getPreSelection();
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var boundedPreSelection =
        minDate && isBefore(defaultPreSelection, getStartOfDay(minDate))
          ? minDate
          : maxDate && isAfter(defaultPreSelection, getEndOfDay(maxDate))
            ? maxDate
            : defaultPreSelection;
      return {
        open: _this.props.startOpen || false,
        preventFocus: false,
        inputValue: null,
        preSelection:
          (_a = _this.props.selectsRange
            ? _this.props.startDate
            : _this.props.selected) !== null && _a !== void 0
            ? _a
            : boundedPreSelection,
        // transforming highlighted days (perhaps nested array)
        // to flat Map for faster access in day.jsx
        highlightDates: getHighLightDaysMap(_this.props.highlightDates),
        focused: false,
        // used to focus day in inline version after month has changed, but not on
        // initial render
        shouldFocusDayInline: false,
        isRenderAriaLiveMessage: false,
        wasHidden: false,
      };
    };
    _this.resetHiddenStatus = function () {
      _this.setState(_assign(_assign({}, _this.state), { wasHidden: false }));
    };
    _this.setHiddenStatus = function () {
      _this.setState(_assign(_assign({}, _this.state), { wasHidden: true }));
    };
    _this.setHiddenStateOnVisibilityHidden = function () {
      if (document.visibilityState !== "hidden") {
        return;
      }
      _this.setHiddenStatus();
    };
    _this.clearPreventFocusTimeout = function () {
      if (_this.preventFocusTimeout) {
        clearTimeout(_this.preventFocusTimeout);
      }
    };
    _this.setFocus = function () {
      var _a, _b;
      (_b =
        (_a = _this.input) === null || _a === void 0 ? void 0 : _a.focus) ===
        null || _b === void 0
        ? void 0
        : _b.call(_a, { preventScroll: true });
    };
    _this.setBlur = function () {
      var _a, _b;
      (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a.blur) ===
        null || _b === void 0
        ? void 0
        : _b.call(_a);
      _this.cancelFocusInput();
    };
    _this.deferBlur = function () {
      requestAnimationFrame(function () {
        _this.setBlur();
      });
    };
    _this.setOpen = function (open, skipSetBlur) {
      if (skipSetBlur === void 0) {
        skipSetBlur = false;
      }
      _this.setState(
        {
          open: open,
          preSelection:
            open && _this.state.open
              ? _this.state.preSelection
              : _this.calcInitialState().preSelection,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE,
        },
        function () {
          if (!open) {
            _this.setState(
              function (prev) {
                return {
                  focused: skipSetBlur ? prev.focused : false,
                };
              },
              function () {
                !skipSetBlur && _this.deferBlur();
                _this.setState({ inputValue: null });
              },
            );
          }
        },
      );
    };
    _this.inputOk = function () {
      return isDate(_this.state.preSelection);
    };
    _this.isCalendarOpen = function () {
      return _this.props.open === undefined
        ? _this.state.open && !_this.props.disabled && !_this.props.readOnly
        : _this.props.open;
    };
    _this.handleFocus = function (event) {
      var _a, _b;
      var isAutoReFocus = _this.state.wasHidden;
      var isOpenAllowed = isAutoReFocus ? _this.state.open : true;
      if (isAutoReFocus) {
        _this.resetHiddenStatus();
      }
      if (!_this.state.preventFocus) {
        (_b = (_a = _this.props).onFocus) === null || _b === void 0
          ? void 0
          : _b.call(_a, event);
        if (
          isOpenAllowed &&
          !_this.props.preventOpenOnFocus &&
          !_this.props.readOnly
        ) {
          _this.setOpen(true);
        }
      }
      _this.setState({ focused: true });
    };
    _this.sendFocusBackToInput = function () {
      // Clear previous timeout if it exists
      if (_this.preventFocusTimeout) {
        _this.clearPreventFocusTimeout();
      }
      // close the popper and refocus the input
      // stop the input from auto opening onFocus
      // setFocus to the input
      _this.setState({ preventFocus: true }, function () {
        _this.preventFocusTimeout = setTimeout(function () {
          _this.setFocus();
          _this.setState({ preventFocus: false });
        });
      });
    };
    _this.cancelFocusInput = function () {
      clearTimeout(_this.inputFocusTimeout);
      _this.inputFocusTimeout = undefined;
    };
    _this.deferFocusInput = function () {
      _this.cancelFocusInput();
      _this.inputFocusTimeout = setTimeout(function () {
        return _this.setFocus();
      }, 1);
    };
    _this.handleDropdownFocus = function () {
      _this.cancelFocusInput();
    };
    _this.handleBlur = function (event) {
      var _a, _b;
      if (
        !_this.state.open ||
        _this.props.withPortal ||
        _this.props.showTimeInput
      ) {
        (_b = (_a = _this.props).onBlur) === null || _b === void 0
          ? void 0
          : _b.call(_a, event);
      }
      if (_this.state.open && _this.props.open === false) {
        _this.setOpen(false);
      }
      _this.setState({ focused: false });
    };
    _this.handleCalendarClickOutside = function (event) {
      var _a, _b;
      if (!_this.props.inline) {
        _this.setOpen(false);
      }
      (_b = (_a = _this.props).onClickOutside) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
      if (_this.props.withPortal) {
        event.preventDefault();
      }
    };
    // handleChange is called when user types in the textbox
    _this.handleChange = function () {
      var _a, _b, _c, _d, _e;
      var allArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        allArgs[_i] = arguments[_i];
      }
      var event = allArgs[0];
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw.apply(_this, allArgs);
        if (
          !event ||
          typeof event.isDefaultPrevented !== "function" ||
          event.isDefaultPrevented()
        ) {
          return;
        }
      }
      _this.setState({
        inputValue:
          (event === null || event === void 0
            ? void 0
            : event.target) instanceof HTMLInputElement
            ? event.target.value
            : null,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT,
      });
      var _f = _this.props,
        selectsRange = _f.selectsRange,
        startDate = _f.startDate,
        endDate = _f.endDate;
      var dateFormat =
        (_a = _this.props.dateFormat) !== null && _a !== void 0
          ? _a
          : DatePicker.defaultProps.dateFormat;
      var strictParsing =
        (_b = _this.props.strictParsing) !== null && _b !== void 0
          ? _b
          : DatePicker.defaultProps.strictParsing;
      var value =
        (event === null || event === void 0 ? void 0 : event.target) instanceof
        HTMLInputElement
          ? event.target.value
          : "";
      if (selectsRange) {
        var _g = value.split("-", 2).map(function (val) {
            return val.trim();
          }),
          valueStart = _g[0],
          valueEnd = _g[1];
        var startDateNew = parseDate(
          valueStart !== null && valueStart !== void 0 ? valueStart : "",
          dateFormat,
          _this.props.locale,
          strictParsing,
        );
        var endDateNew = parseDate(
          valueEnd !== null && valueEnd !== void 0 ? valueEnd : "",
          dateFormat,
          _this.props.locale,
          strictParsing,
        );
        var startChanged =
          (startDate === null || startDate === void 0
            ? void 0
            : startDate.getTime()) !==
          (startDateNew === null || startDateNew === void 0
            ? void 0
            : startDateNew.getTime());
        var endChanged =
          (endDate === null || endDate === void 0
            ? void 0
            : endDate.getTime()) !==
          (endDateNew === null || endDateNew === void 0
            ? void 0
            : endDateNew.getTime());
        if (!startChanged && !endChanged) {
          return;
        }
        if (startDateNew && isDayDisabled(startDateNew, _this.props)) {
          return;
        }
        if (endDateNew && isDayDisabled(endDateNew, _this.props)) {
          return;
        }
        (_d = (_c = _this.props).onChange) === null || _d === void 0
          ? void 0
          : _d.call(_c, [startDateNew, endDateNew], event);
      } else {
        // not selectsRange
        var date = parseDate(
          value,
          dateFormat,
          _this.props.locale,
          strictParsing,
          (_e = _this.props.selected) !== null && _e !== void 0
            ? _e
            : undefined,
        );
        // Update selection if either (1) date was successfully parsed, or (2) input field is empty
        if (date || !value) {
          _this.setSelected(date, event, true);
        }
      }
    };
    _this.handleSelect = function (date, event, monthSelectedIn) {
      if (_this.props.shouldCloseOnSelect && !_this.props.showTimeSelect) {
        // Preventing onFocus event to fix issue
        // https://github.com/Hacker0x01/react-datepicker/issues/628
        _this.sendFocusBackToInput();
      }
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw(event);
      }
      _this.setSelected(date, event, false, monthSelectedIn);
      if (_this.props.showDateSelect) {
        _this.setState({ isRenderAriaLiveMessage: true });
      }
      if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
        _this.setPreSelection(date);
      } else if (!_this.props.inline) {
        if (!_this.props.selectsRange) {
          _this.setOpen(false);
        }
        var _a = _this.props,
          startDate = _a.startDate,
          endDate = _a.endDate;
        if (
          startDate &&
          !endDate &&
          (_this.props.swapRange || !isDateBefore(date, startDate))
        ) {
          _this.setOpen(false);
        }
      }
    };
    // setSelected is called either from handleChange (user typed date into textbox and it was parsed) or handleSelect (user selected date from calendar using mouse or keyboard)
    _this.setSelected = function (date, event, keepInput, monthSelectedIn) {
      var _a, _b;
      var changedDate = date;
      // Early return if selected year/month/day is disabled
      if (_this.props.showYearPicker) {
        if (
          changedDate !== null &&
          isYearDisabled(getYear(changedDate), _this.props)
        ) {
          return;
        }
      } else if (_this.props.showMonthYearPicker) {
        if (changedDate !== null && isMonthDisabled(changedDate, _this.props)) {
          return;
        }
      } else {
        if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
          return;
        }
      }
      var _c = _this.props,
        onChange = _c.onChange,
        selectsRange = _c.selectsRange,
        startDate = _c.startDate,
        endDate = _c.endDate,
        selectsMultiple = _c.selectsMultiple,
        selectedDates = _c.selectedDates,
        minTime = _c.minTime,
        swapRange = _c.swapRange;
      if (
        !isEqual(_this.props.selected, changedDate) ||
        _this.props.allowSameDay ||
        selectsRange ||
        selectsMultiple
      ) {
        if (changedDate !== null) {
          // Preserve previously selected time if only date is currently being changed
          if (
            _this.props.selected &&
            (!keepInput ||
              (!_this.props.showTimeSelect &&
                !_this.props.showTimeSelectOnly &&
                !_this.props.showTimeInput))
          ) {
            changedDate = setTime(changedDate, {
              hour: getHours(_this.props.selected),
              minute: getMinutes(_this.props.selected),
              second: getSeconds(_this.props.selected),
            });
          }
          // If minTime is present then set the time to minTime
          if (
            !keepInput &&
            (_this.props.showTimeSelect || _this.props.showTimeSelectOnly)
          ) {
            if (minTime) {
              changedDate = setTime(changedDate, {
                hour: minTime.getHours(),
                minute: minTime.getMinutes(),
                second: minTime.getSeconds(),
              });
            }
          }
          if (!_this.props.inline) {
            _this.setState({
              preSelection: changedDate,
            });
          }
          if (!_this.props.focusSelectedMonth) {
            _this.setState({ monthSelectedIn: monthSelectedIn });
          }
        }
        if (selectsRange) {
          var noRanges = !startDate && !endDate;
          var hasStartRange = startDate && !endDate;
          var isRangeFilled = startDate && endDate;
          if (noRanges) {
            onChange === null || onChange === void 0
              ? void 0
              : onChange([changedDate, null], event);
          } else if (hasStartRange) {
            if (changedDate === null) {
              onChange === null || onChange === void 0
                ? void 0
                : onChange([null, null], event);
            } else if (isDateBefore(changedDate, startDate)) {
              if (swapRange) {
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange([changedDate, startDate], event);
              } else {
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange([changedDate, null], event);
              }
            } else {
              onChange === null || onChange === void 0
                ? void 0
                : onChange([startDate, changedDate], event);
            }
          }
          if (isRangeFilled) {
            onChange === null || onChange === void 0
              ? void 0
              : onChange([changedDate, null], event);
          }
        } else if (selectsMultiple) {
          if (changedDate !== null) {
            if (
              !(selectedDates === null || selectedDates === void 0
                ? void 0
                : selectedDates.length)
            ) {
              onChange === null || onChange === void 0
                ? void 0
                : onChange([changedDate], event);
            } else {
              var isChangedDateAlreadySelected = selectedDates.some(
                function (selectedDate) {
                  return isSameDay(selectedDate, changedDate);
                },
              );
              if (isChangedDateAlreadySelected) {
                var nextDates = selectedDates.filter(function (selectedDate) {
                  return !isSameDay(selectedDate, changedDate);
                });
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange(nextDates, event);
              } else {
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange(
                      __spreadArray(
                        __spreadArray([], selectedDates, true),
                        [changedDate],
                        false,
                      ),
                      event,
                    );
              }
            }
          }
        } else {
          onChange === null || onChange === void 0
            ? void 0
            : onChange(changedDate, event);
        }
      }
      if (!keepInput) {
        (_b = (_a = _this.props).onSelect) === null || _b === void 0
          ? void 0
          : _b.call(_a, changedDate, event);
        _this.setState({ inputValue: null });
      }
    };
    // When checking preSelection via min/maxDate, times need to be manipulated via getStartOfDay/getEndOfDay
    _this.setPreSelection = function (date) {
      var hasMinDate = isDate(_this.props.minDate);
      var hasMaxDate = isDate(_this.props.maxDate);
      var isValidDateSelection = true;
      if (date) {
        var dateStartOfDay = getStartOfDay(date);
        if (hasMinDate && hasMaxDate) {
          // isDayInRange uses getStartOfDay internally, so not necessary to manipulate times here
          isValidDateSelection = isDayInRange(
            date,
            _this.props.minDate,
            _this.props.maxDate,
          );
        } else if (hasMinDate) {
          var minDateStartOfDay = getStartOfDay(_this.props.minDate);
          isValidDateSelection =
            isAfter(date, minDateStartOfDay) ||
            isEqual(dateStartOfDay, minDateStartOfDay);
        } else if (hasMaxDate) {
          var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
          isValidDateSelection =
            isBefore(date, maxDateEndOfDay) ||
            isEqual(dateStartOfDay, maxDateEndOfDay);
        }
      }
      if (isValidDateSelection) {
        _this.setState({
          preSelection: date,
        });
      }
    };
    _this.toggleCalendar = function () {
      _this.setOpen(!_this.state.open);
    };
    _this.handleTimeChange = function (time) {
      var _a, _b;
      if (_this.props.selectsRange || _this.props.selectsMultiple) {
        return;
      }
      var selected = _this.props.selected
        ? _this.props.selected
        : _this.getPreSelection();
      var changedDate = _this.props.selected
        ? time
        : setTime(selected, {
            hour: getHours(time),
            minute: getMinutes(time),
          });
      _this.setState({
        preSelection: changedDate,
      });
      (_b = (_a = _this.props).onChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, changedDate);
      if (_this.props.shouldCloseOnSelect && !_this.props.showTimeInput) {
        _this.sendFocusBackToInput();
        _this.setOpen(false);
      }
      if (_this.props.showTimeInput) {
        _this.setOpen(true);
      }
      if (_this.props.showTimeSelectOnly || _this.props.showTimeSelect) {
        _this.setState({ isRenderAriaLiveMessage: true });
      }
      _this.setState({ inputValue: null });
    };
    _this.onInputClick = function () {
      var _a, _b;
      if (!_this.props.disabled && !_this.props.readOnly) {
        _this.setOpen(true);
      }
      (_b = (_a = _this.props).onInputClick) === null || _b === void 0
        ? void 0
        : _b.call(_a);
    };
    _this.onInputKeyDown = function (event) {
      var _a, _b, _c, _d, _e, _f;
      (_b = (_a = _this.props).onKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
      var eventKey = event.key;
      if (
        !_this.state.open &&
        !_this.props.inline &&
        !_this.props.preventOpenOnFocus
      ) {
        if (
          eventKey === KeyType.ArrowDown ||
          eventKey === KeyType.ArrowUp ||
          eventKey === KeyType.Enter
        ) {
          (_c = _this.onInputClick) === null || _c === void 0
            ? void 0
            : _c.call(_this);
        }
        return;
      }
      // if calendar is open, these keys will focus the selected item
      if (_this.state.open) {
        if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp) {
          event.preventDefault();
          var selectorString = _this.props.showTimeSelectOnly
            ? ".react-datepicker__time-list-item[tabindex='0']"
            : _this.props.showWeekPicker && _this.props.showWeekNumbers
              ? '.react-datepicker__week-number[tabindex="0"]'
              : _this.props.showFullMonthYearPicker ||
                  _this.props.showMonthYearPicker
                ? '.react-datepicker__month-text[tabindex="0"]'
                : '.react-datepicker__day[tabindex="0"]';
          var selectedItem =
            ((_d = _this.calendar) === null || _d === void 0
              ? void 0
              : _d.containerRef.current) instanceof Element &&
            _this.calendar.containerRef.current.querySelector(selectorString);
          selectedItem instanceof HTMLElement &&
            selectedItem.focus({ preventScroll: true });
          return;
        }
        var copy = newDate(_this.state.preSelection);
        if (eventKey === KeyType.Enter) {
          event.preventDefault();
          event.target.blur();
          if (
            _this.inputOk() &&
            _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE
          ) {
            _this.handleSelect(copy, event);
            !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
          } else {
            _this.setOpen(false);
          }
        } else if (eventKey === KeyType.Escape) {
          event.preventDefault();
          event.target.blur();
          _this.sendFocusBackToInput();
          _this.setOpen(false);
        } else if (eventKey === KeyType.Tab) {
          _this.setOpen(false);
        }
        if (!_this.inputOk()) {
          (_f = (_e = _this.props).onInputError) === null || _f === void 0
            ? void 0
            : _f.call(_e, { code: 1, msg: INPUT_ERR_1 });
        }
      }
    };
    _this.onPortalKeyDown = function (event) {
      var eventKey = event.key;
      if (eventKey === KeyType.Escape) {
        event.preventDefault();
        _this.setState(
          {
            preventFocus: true,
          },
          function () {
            _this.setOpen(false);
            setTimeout(function () {
              _this.setFocus();
              _this.setState({ preventFocus: false });
            });
          },
        );
      }
    };
    // keyDown events passed down to day.jsx
    _this.onDayKeyDown = function (event) {
      var _a, _b, _c, _d, _e, _f;
      var _g = _this.props,
        minDate = _g.minDate,
        maxDate = _g.maxDate,
        disabledKeyboardNavigation = _g.disabledKeyboardNavigation,
        showWeekPicker = _g.showWeekPicker,
        shouldCloseOnSelect = _g.shouldCloseOnSelect,
        locale = _g.locale,
        calendarStartDay = _g.calendarStartDay,
        adjustDateOnChange = _g.adjustDateOnChange,
        inline = _g.inline;
      (_b = (_a = _this.props).onKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
      if (disabledKeyboardNavigation) return;
      var eventKey = event.key;
      var isShiftKeyActive = event.shiftKey;
      var copy = newDate(_this.state.preSelection);
      var calculateNewDate = function (eventKey, date) {
        var newCalculatedDate = date;
        switch (eventKey) {
          case KeyType.ArrowRight:
            newCalculatedDate = showWeekPicker
              ? addWeeks(date, 1)
              : addDays(date, 1);
            break;
          case KeyType.ArrowLeft:
            newCalculatedDate = showWeekPicker
              ? subWeeks(date, 1)
              : subDays(date, 1);
            break;
          case KeyType.ArrowUp:
            newCalculatedDate = subWeeks(date, 1);
            break;
          case KeyType.ArrowDown:
            newCalculatedDate = addWeeks(date, 1);
            break;
          case KeyType.PageUp:
            newCalculatedDate = isShiftKeyActive
              ? subYears(date, 1)
              : subMonths(date, 1);
            break;
          case KeyType.PageDown:
            newCalculatedDate = isShiftKeyActive
              ? addYears(date, 1)
              : addMonths(date, 1);
            break;
          case KeyType.Home:
            newCalculatedDate = getStartOfWeek(date, locale, calendarStartDay);
            break;
          case KeyType.End:
            newCalculatedDate = getEndOfWeek(date);
            break;
        }
        return newCalculatedDate;
      };
      var getNewDate = function (eventKey, date) {
        var MAX_ITERATIONS = 40;
        var eventKeyCopy = eventKey;
        var validDateFound = false;
        var iterations = 0;
        var newSelection = calculateNewDate(eventKey, date);
        while (!validDateFound) {
          if (iterations >= MAX_ITERATIONS) {
            newSelection = date;
            break;
          }
          // if minDate exists and the new selection is before the min date, get the nearest date that isn't disabled
          if (minDate && newSelection < minDate) {
            eventKeyCopy = KeyType.ArrowRight;
            newSelection = isDayDisabled(minDate, _this.props)
              ? calculateNewDate(eventKeyCopy, newSelection)
              : minDate;
          }
          // if maxDate exists and the new selection is after the max date, get the nearest date that isn't disabled
          if (maxDate && newSelection > maxDate) {
            eventKeyCopy = KeyType.ArrowLeft;
            newSelection = isDayDisabled(maxDate, _this.props)
              ? calculateNewDate(eventKeyCopy, newSelection)
              : maxDate;
          }
          if (isDayDisabled(newSelection, _this.props)) {
            // if PageUp and Home is pressed to a disabled date, it will try to find the next available date after
            if (
              eventKeyCopy === KeyType.PageUp ||
              eventKeyCopy === KeyType.Home
            ) {
              eventKeyCopy = KeyType.ArrowRight;
            }
            // if PageDown and End is pressed to a disabled date, it will try to find the next available date before
            if (
              eventKeyCopy === KeyType.PageDown ||
              eventKeyCopy === KeyType.End
            ) {
              eventKeyCopy = KeyType.ArrowLeft;
            }
            newSelection = calculateNewDate(eventKeyCopy, newSelection);
          } else {
            validDateFound = true;
          }
          iterations++;
        }
        return newSelection;
      };
      if (eventKey === KeyType.Enter) {
        event.preventDefault();
        _this.handleSelect(copy, event);
        !shouldCloseOnSelect && _this.setPreSelection(copy);
        return;
      } else if (eventKey === KeyType.Escape) {
        event.preventDefault();
        _this.setOpen(false);
        if (!_this.inputOk()) {
          (_d = (_c = _this.props).onInputError) === null || _d === void 0
            ? void 0
            : _d.call(_c, { code: 1, msg: INPUT_ERR_1 });
        }
        return;
      }
      var newSelection = null;
      switch (eventKey) {
        case KeyType.ArrowLeft:
        case KeyType.ArrowRight:
        case KeyType.ArrowUp:
        case KeyType.ArrowDown:
        case KeyType.PageUp:
        case KeyType.PageDown:
        case KeyType.Home:
        case KeyType.End:
          newSelection = getNewDate(eventKey, copy);
          break;
      }
      if (!newSelection) {
        (_f = (_e = _this.props).onInputError) === null || _f === void 0
          ? void 0
          : _f.call(_e, { code: 1, msg: INPUT_ERR_1 });
        return;
      }
      event.preventDefault();
      _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
      if (adjustDateOnChange) {
        _this.setSelected(newSelection);
      }
      _this.setPreSelection(newSelection);
      // need to figure out whether month has changed to focus day in inline version
      if (inline) {
        var prevMonth = getMonth(copy);
        var newMonth = getMonth(newSelection);
        var prevYear = getYear(copy);
        var newYear = getYear(newSelection);
        if (prevMonth !== newMonth || prevYear !== newYear) {
          // month has changed
          _this.setState({ shouldFocusDayInline: true });
        } else {
          // month hasn't changed
          _this.setState({ shouldFocusDayInline: false });
        }
      }
    };
    // handle generic key down events in the popper that do not adjust or select dates
    // ex: while focusing prev and next month buttons
    _this.onPopperKeyDown = function (event) {
      var eventKey = event.key;
      if (eventKey === KeyType.Escape) {
        event.preventDefault();
        _this.sendFocusBackToInput();
      }
    };
    _this.onClearClick = function (event) {
      if (event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
      _this.sendFocusBackToInput();
      var _a = _this.props,
        selectsRange = _a.selectsRange,
        onChange = _a.onChange;
      if (selectsRange) {
        onChange === null || onChange === void 0
          ? void 0
          : onChange([null, null], event);
      } else {
        onChange === null || onChange === void 0
          ? void 0
          : onChange(null, event);
      }
      _this.setState({ inputValue: null });
    };
    _this.clear = function () {
      _this.onClearClick();
    };
    _this.onScroll = function (event) {
      if (
        typeof _this.props.closeOnScroll === "boolean" &&
        _this.props.closeOnScroll
      ) {
        if (
          event.target === document ||
          event.target === document.documentElement ||
          event.target === document.body
        ) {
          _this.setOpen(false);
        }
      } else if (typeof _this.props.closeOnScroll === "function") {
        if (_this.props.closeOnScroll(event)) {
          _this.setOpen(false);
        }
      }
    };
    _this.renderCalendar = function () {
      var _a, _b;
      if (!_this.props.inline && !_this.isCalendarOpen()) {
        return null;
      }
      return React.createElement(
        Calendar,
        _assign(
          {
            showMonthYearDropdown: undefined,
            ref: function (elem) {
              _this.calendar = elem;
            },
          },
          _this.props,
          _this.state,
          {
            setOpen: _this.setOpen,
            dateFormat:
              (_a = _this.props.dateFormatCalendar) !== null && _a !== void 0
                ? _a
                : DatePicker.defaultProps.dateFormatCalendar,
            onSelect: _this.handleSelect,
            onClickOutside: _this.handleCalendarClickOutside,
            holidays: getHolidaysMap(_this.modifyHolidays()),
            outsideClickIgnoreClass: outsideClickIgnoreClass,
            onDropdownFocus: _this.handleDropdownFocus,
            onTimeChange: _this.handleTimeChange,
            className: _this.props.calendarClassName,
            container: _this.props.calendarContainer,
            handleOnKeyDown: _this.props.onKeyDown,
            handleOnDayKeyDown: _this.onDayKeyDown,
            setPreSelection: _this.setPreSelection,
            dropdownMode:
              (_b = _this.props.dropdownMode) !== null && _b !== void 0
                ? _b
                : DatePicker.defaultProps.dropdownMode,
          },
        ),
        _this.props.children,
      );
    };
    _this.renderAriaLiveRegion = function () {
      var _a = _this.props,
        _b = _a.dateFormat,
        dateFormat = _b === void 0 ? DatePicker.defaultProps.dateFormat : _b,
        locale = _a.locale;
      var isContainsTime =
        _this.props.showTimeInput || _this.props.showTimeSelect;
      var longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
      var ariaLiveMessage;
      if (_this.props.selectsRange) {
        ariaLiveMessage = "Selected start date: "
          .concat(
            safeDateFormat(_this.props.startDate, {
              dateFormat: longDateFormat,
              locale: locale,
            }),
            ". ",
          )
          .concat(
            _this.props.endDate
              ? "End date: " +
                  safeDateFormat(_this.props.endDate, {
                    dateFormat: longDateFormat,
                    locale: locale,
                  })
              : "",
          );
      } else {
        if (_this.props.showTimeSelectOnly) {
          ariaLiveMessage = "Selected time: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: dateFormat,
              locale: locale,
            }),
          );
        } else if (_this.props.showYearPicker) {
          ariaLiveMessage = "Selected year: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy",
              locale: locale,
            }),
          );
        } else if (_this.props.showMonthYearPicker) {
          ariaLiveMessage = "Selected month: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: "MMMM yyyy",
              locale: locale,
            }),
          );
        } else if (_this.props.showQuarterYearPicker) {
          ariaLiveMessage = "Selected quarter: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy, QQQ",
              locale: locale,
            }),
          );
        } else {
          ariaLiveMessage = "Selected date: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: longDateFormat,
              locale: locale,
            }),
          );
        }
      }
      return React.createElement(
        "span",
        {
          role: "alert",
          "aria-live": "polite",
          className: "react-datepicker__aria-live",
        },
        ariaLiveMessage,
      );
    };
    _this.renderDateInput = function () {
      var _a, _b;
      var _c;
      var className = clsx(
        _this.props.className,
        ((_a = {}), (_a[outsideClickIgnoreClass] = _this.state.open), _a),
      );
      var customInput =
        _this.props.customInput ||
        React.createElement("input", { type: "text" });
      var customInputRef = _this.props.customInputRef || "ref";
      var _d = _this.props,
        _e = _d.dateFormat,
        dateFormat = _e === void 0 ? DatePicker.defaultProps.dateFormat : _e,
        locale = _d.locale;
      var inputValue =
        typeof _this.props.value === "string"
          ? _this.props.value
          : typeof _this.state.inputValue === "string"
            ? _this.state.inputValue
            : _this.props.selectsRange
              ? safeDateRangeFormat(
                  _this.props.startDate,
                  _this.props.endDate,
                  {
                    dateFormat: dateFormat,
                    locale: locale,
                  },
                )
              : _this.props.selectsMultiple
                ? safeMultipleDatesFormat(
                    (_c = _this.props.selectedDates) !== null && _c !== void 0
                      ? _c
                      : [],
                    {
                      dateFormat: dateFormat,
                      locale: locale,
                    },
                  )
                : safeDateFormat(_this.props.selected, {
                    dateFormat: dateFormat,
                    locale: locale,
                  });
      return cloneElement(
        customInput,
        ((_b = {}),
        (_b[customInputRef] = function (input) {
          _this.input = input;
        }),
        (_b.value = inputValue),
        (_b.onBlur = _this.handleBlur),
        (_b.onChange = _this.handleChange),
        (_b.onClick = _this.onInputClick),
        (_b.onFocus = _this.handleFocus),
        (_b.onKeyDown = _this.onInputKeyDown),
        (_b.id = _this.props.id),
        (_b.name = _this.props.name),
        (_b.form = _this.props.form),
        (_b.autoFocus = _this.props.autoFocus),
        (_b.placeholder = _this.props.placeholderText),
        (_b.disabled = _this.props.disabled),
        (_b.autoComplete = _this.props.autoComplete),
        (_b.className = clsx(customInput.props.className, className)),
        (_b.title = _this.props.title),
        (_b.readOnly = _this.props.readOnly),
        (_b.required = _this.props.required),
        (_b.tabIndex = _this.props.tabIndex),
        (_b["aria-describedby"] = _this.props.ariaDescribedBy),
        (_b["aria-invalid"] = _this.props.ariaInvalid),
        (_b["aria-labelledby"] = _this.props.ariaLabelledBy),
        (_b["aria-required"] = _this.props.ariaRequired),
        _b),
      );
    };
    _this.renderClearButton = function () {
      var _a = _this.props,
        isClearable = _a.isClearable,
        disabled = _a.disabled,
        selected = _a.selected,
        startDate = _a.startDate,
        endDate = _a.endDate,
        clearButtonTitle = _a.clearButtonTitle,
        _b = _a.clearButtonClassName,
        clearButtonClassName = _b === void 0 ? "" : _b,
        _c = _a.ariaLabelClose,
        ariaLabelClose = _c === void 0 ? "Close" : _c,
        selectedDates = _a.selectedDates;
      if (
        isClearable &&
        (selected != null ||
          startDate != null ||
          endDate != null ||
          (selectedDates === null || selectedDates === void 0
            ? void 0
            : selectedDates.length))
      ) {
        return React.createElement("button", {
          type: "button",
          className: clsx(
            "react-datepicker__close-icon",
            clearButtonClassName,
            { "react-datepicker__close-icon--disabled": disabled },
          ),
          disabled: disabled,
          "aria-label": ariaLabelClose,
          onClick: _this.onClearClick,
          title: clearButtonTitle,
          tabIndex: -1,
        });
      } else {
        return null;
      }
    };
    _this.state = _this.calcInitialState();
    _this.preventFocusTimeout = undefined;
    return _this;
  }
  Object.defineProperty(DatePicker, "defaultProps", {
    get: function () {
      return {
        allowSameDay: false,
        dateFormat: "MM/dd/yyyy",
        dateFormatCalendar: "LLLL yyyy",
        disabled: false,
        disabledKeyboardNavigation: false,
        dropdownMode: "scroll",
        preventOpenOnFocus: false,
        monthsShown: 1,
        readOnly: false,
        withPortal: false,
        selectsDisabledDaysInRange: false,
        shouldCloseOnSelect: true,
        showTimeSelect: false,
        showTimeInput: false,
        showPreviousMonths: false,
        showMonthYearPicker: false,
        showFullMonthYearPicker: false,
        showTwoColumnMonthYearPicker: false,
        showFourColumnMonthYearPicker: false,
        showYearPicker: false,
        showQuarterYearPicker: false,
        showWeekPicker: false,
        strictParsing: false,
        swapRange: false,
        timeIntervals: 30,
        timeCaption: "Time",
        previousMonthAriaLabel: "Previous Month",
        previousMonthButtonLabel: "Previous Month",
        nextMonthAriaLabel: "Next Month",
        nextMonthButtonLabel: "Next Month",
        previousYearAriaLabel: "Previous Year",
        previousYearButtonLabel: "Previous Year",
        nextYearAriaLabel: "Next Year",
        nextYearButtonLabel: "Next Year",
        timeInputLabel: "Time",
        enableTabLoop: true,
        yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
        focusSelectedMonth: false,
        showPopperArrow: true,
        excludeScrollbar: true,
        customTimeInput: null,
        calendarStartDay: undefined,
        toggleCalendarOnIconClick: false,
        usePointerEvent: false,
      };
    },
    enumerable: false,
    configurable: true,
  });
  DatePicker.prototype.componentDidMount = function () {
    window.addEventListener("scroll", this.onScroll, true);
    document.addEventListener(
      "visibilitychange",
      this.setHiddenStateOnVisibilityHidden,
    );
  };
  DatePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
    var _a, _b, _c, _d;
    if (
      prevProps.inline &&
      hasPreSelectionChanged(prevProps.selected, this.props.selected)
    ) {
      this.setPreSelection(this.props.selected);
    }
    if (
      this.state.monthSelectedIn !== undefined &&
      prevProps.monthsShown !== this.props.monthsShown
    ) {
      this.setState({ monthSelectedIn: 0 });
    }
    if (prevProps.highlightDates !== this.props.highlightDates) {
      this.setState({
        highlightDates: getHighLightDaysMap(this.props.highlightDates),
      });
    }
    if (
      !prevState.focused &&
      !isEqual(prevProps.selected, this.props.selected)
    ) {
      this.setState({ inputValue: null });
    }
    if (prevState.open !== this.state.open) {
      if (prevState.open === false && this.state.open === true) {
        (_b = (_a = this.props).onCalendarOpen) === null || _b === void 0
          ? void 0
          : _b.call(_a);
      }
      if (prevState.open === true && this.state.open === false) {
        (_d = (_c = this.props).onCalendarClose) === null || _d === void 0
          ? void 0
          : _d.call(_c);
      }
    }
  };
  DatePicker.prototype.componentWillUnmount = function () {
    this.clearPreventFocusTimeout();
    window.removeEventListener("scroll", this.onScroll, true);
    document.removeEventListener(
      "visibilitychange",
      this.setHiddenStateOnVisibilityHidden,
    );
  };
  DatePicker.prototype.renderInputContainer = function () {
    var _a = this.props,
      showIcon = _a.showIcon,
      icon = _a.icon,
      calendarIconClassname = _a.calendarIconClassname,
      calendarIconClassName = _a.calendarIconClassName,
      toggleCalendarOnIconClick = _a.toggleCalendarOnIconClick;
    var open = this.state.open;
    if (calendarIconClassname) {
      console.warn(
        "calendarIconClassname props is deprecated. should use calendarIconClassName props.",
      );
    }
    return React.createElement(
      "div",
      {
        className: "react-datepicker__input-container".concat(
          showIcon ? " react-datepicker__view-calendar-icon" : "",
        ),
      },
      showIcon &&
        React.createElement(
          CalendarIcon,
          _assign(
            {
              icon: icon,
              className: clsx(
                calendarIconClassName,
                !calendarIconClassName && calendarIconClassname,
                open && "react-datepicker-ignore-onclickoutside",
              ),
            },
            toggleCalendarOnIconClick
              ? {
                  onClick: this.toggleCalendar,
                }
              : null,
          ),
        ),
      this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(),
      this.renderDateInput(),
      this.renderClearButton(),
    );
  };
  DatePicker.prototype.render = function () {
    var calendar = this.renderCalendar();
    if (this.props.inline) return calendar;
    if (this.props.withPortal) {
      var portalContainer = this.state.open
        ? React.createElement(
            TabLoop,
            { enableTabLoop: this.props.enableTabLoop },
            React.createElement(
              "div",
              {
                className: "react-datepicker__portal",
                tabIndex: -1,
                onKeyDown: this.onPortalKeyDown,
              },
              calendar,
            ),
          )
        : null;
      if (this.state.open && this.props.portalId) {
        portalContainer = React.createElement(
          Portal,
          _assign({ portalId: this.props.portalId }, this.props),
          portalContainer,
        );
      }
      return React.createElement(
        "div",
        null,
        this.renderInputContainer(),
        portalContainer,
      );
    }
    return React.createElement(
      PopperComponent$1,
      _assign({}, this.props, {
        className: this.props.popperClassName,
        hidePopper: !this.isCalendarOpen(),
        targetComponent: this.renderInputContainer(),
        popperComponent: calendar,
        popperOnKeyDown: this.onPopperKeyDown,
        showArrow: this.props.showPopperArrow,
      }),
    );
  };
  return DatePicker;
})(Component);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

export {
  CalendarContainer,
  DatePicker as default,
  getDefaultLocale,
  registerLocale,
  setDefaultLocale,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uL3NyYy9jbGlja19vdXRzaWRlX3dyYXBwZXIudHN4IiwiLi4vc3JjL2RhdGVfdXRpbHMudHMiLCIuLi9zcmMvaW5wdXRfdGltZS50c3giLCIuLi9zcmMvZGF5LnRzeCIsIi4uL3NyYy93ZWVrX251bWJlci50c3giLCIuLi9zcmMvd2Vlay50c3giLCIuLi9zcmMvbW9udGgudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL3RpbWUudHN4IiwiLi4vc3JjL3llYXIudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvY2FsZW5kYXIudHN4IiwiLi4vc3JjL2NhbGVuZGFyX2ljb24udHN4IiwiLi4vc3JjL3BvcnRhbC50c3giLCIuLi9zcmMvdGFiX2xvb3AudHN4IiwiLi4vc3JjL3dpdGhfZmxvYXRpbmcudHN4IiwiLi4vc3JjL3BvcHBlcl9jb21wb25lbnQudHN4IiwiLi4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19hc3NpZ24iLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXBwbHkiLCJfX3NwcmVhZEFycmF5IiwidG8iLCJmcm9tIiwicGFjayIsImwiLCJhciIsInNsaWNlIiwiY29uY2F0IiwiU3VwcHJlc3NlZEVycm9yIiwiZXJyb3IiLCJzdXBwcmVzc2VkIiwibWVzc2FnZSIsImUiLCJFcnJvciIsIm5hbWUiLCJpc1ZhbGlkRGF0ZSIsImRmSXNTYW1lWWVhciIsImRmSXNTYW1lTW9udGgiLCJkZklzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZURheSIsImRmSXNFcXVhbCIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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
