/*!
  react-datepicker v8.3.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var clsx = require("clsx");
var React = require("react");
var dateFns = require("date-fns");
var react = require("@floating-ui/react");
var ReactDOM = require("react-dom");

function _interopDefaultCompat(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultCompat(React);
var ReactDOM__default = /*#__PURE__*/ _interopDefaultCompat(ReactDOM);

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
  return React__default.default.createElement(
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
  var ref = React.useRef(null);
  var onClickOutsideRef = React.useRef(onClickOutside);
  onClickOutsideRef.current = onClickOutside;
  var handleClickOutside = React.useCallback(
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
  React.useEffect(
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
  return React__default.default.createElement(
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
  var d =
    typeof value === "string" ? dateFns.parseISO(value) : dateFns.toDate(value);
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
    var parsedDate = dateFns.parse(value, format_1, refDate, {
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
  return dateFns.isValid(date) && !dateFns.isBefore(date, new Date("1/1/1800"));
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
    return dateFns.format(date, formatStr, {
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
  return dateFns.format(date, formatStr, {
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
  return dateFns.setHours(
    dateFns.setMinutes(dateFns.setSeconds(date, second), minute),
    hour,
  );
}
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
function getWeek(date) {
  return dateFns.getISOWeek(date);
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
  return dateFns.startOfDay(date);
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
  return dateFns.startOfWeek(date, {
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
  return dateFns.startOfMonth(date);
}
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
function getStartOfYear(date) {
  return dateFns.startOfYear(date);
}
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
function getStartOfQuarter(date) {
  return dateFns.startOfQuarter(date);
}
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
function getStartOfToday() {
  return dateFns.startOfDay(newDate());
}
// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
function getEndOfDay(date) {
  return dateFns.endOfDay(date);
}
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
function getEndOfWeek(date) {
  return dateFns.endOfWeek(date);
}
/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
function getEndOfMonth(date) {
  return dateFns.endOfMonth(date);
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
    return dateFns.isSameYear(date1, date2);
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
    return dateFns.isSameMonth(date1, date2);
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
    return dateFns.isSameQuarter(date1, date2);
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
    return dateFns.isSameDay(date1, date2);
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
    return dateFns.isEqual(date1, date2);
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
  var start = dateFns.startOfDay(startDate);
  var end = dateFns.endOfDay(endDate);
  try {
    valid = dateFns.isWithinInterval(day, { start: start, end: end });
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
  return formatDate(dateFns.setMonth(newDate(), month), "LLLL", locale);
}
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
function getMonthShortInLocale(month, locale) {
  return formatDate(dateFns.setMonth(newDate(), month), "LLL", locale);
}
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(dateFns.setQuarter(newDate(), quarter), "QQQ", locale);
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
        return dateFns.isWithinInterval(day, { start: start, end: end });
      })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameDay(day, includeDate);
      })) ||
    (includeDateIntervals &&
      !includeDateIntervals.some(function (_a) {
        var start = _a.start,
          end = _a.end;
        return dateFns.isWithinInterval(day, { start: start, end: end });
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
      return dateFns.isWithinInterval(day, { start: start, end: end });
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
      minDate: minDate ? dateFns.startOfMonth(minDate) : undefined,
      maxDate: maxDate ? dateFns.endOfMonth(maxDate) : undefined,
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
  var startDateYear = dateFns.getYear(startDate);
  var startDateMonth = dateFns.getMonth(startDate);
  var endDateYear = dateFns.getYear(endDate);
  var endDateMonth = dateFns.getMonth(endDate);
  var dayYear = dateFns.getYear(day);
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
  if (!dateFns.isValid(start) || !dateFns.isValid(end)) return false;
  var startYear = dateFns.getYear(start);
  var endYear = dateFns.getYear(end);
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
      minDate: minDate ? dateFns.startOfYear(minDate) : undefined,
      maxDate: maxDate ? dateFns.endOfYear(maxDate) : undefined,
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
  var startDateYear = dateFns.getYear(startDate);
  var startDateQuarter = dateFns.getQuarter(startDate);
  var endDateYear = dateFns.getYear(endDate);
  var endDateQuarter = dateFns.getQuarter(endDate);
  var dayYear = dateFns.getYear(day);
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
    (minDate && dateFns.differenceInCalendarDays(day, minDate) < 0) ||
    (maxDate && dateFns.differenceInCalendarDays(day, maxDate) > 0)) !== null &&
    _b !== void 0
    ? _b
    : false;
}
function isTimeInList(time, times) {
  return times.some(function (listTime) {
    return (
      dateFns.getHours(listTime) === dateFns.getHours(time) &&
      dateFns.getMinutes(listTime) === dateFns.getMinutes(time) &&
      dateFns.getSeconds(listTime) === dateFns.getSeconds(time)
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
  baseTime = dateFns.setHours(baseTime, dateFns.getHours(time));
  baseTime = dateFns.setMinutes(baseTime, dateFns.getMinutes(time));
  baseTime = dateFns.setSeconds(baseTime, dateFns.getSeconds(time));
  var min = newDate();
  min = dateFns.setHours(min, dateFns.getHours(minTime));
  min = dateFns.setMinutes(min, dateFns.getMinutes(minTime));
  min = dateFns.setSeconds(min, dateFns.getSeconds(minTime));
  var max = newDate();
  max = dateFns.setHours(max, dateFns.getHours(maxTime));
  max = dateFns.setMinutes(max, dateFns.getMinutes(maxTime));
  max = dateFns.setSeconds(max, dateFns.getSeconds(maxTime));
  var valid;
  try {
    valid = !dateFns.isWithinInterval(baseTime, { start: min, end: max });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function monthDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var previousMonth = dateFns.subMonths(day, 1);
  return (
    (minDate &&
      dateFns.differenceInCalendarMonths(minDate, previousMonth) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return (
          dateFns.differenceInCalendarMonths(includeDate, previousMonth) > 0
        );
      })) ||
    false
  );
}
function monthDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var nextMonth = dateFns.addMonths(day, 1);
  return (
    (maxDate && dateFns.differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return dateFns.differenceInCalendarMonths(nextMonth, includeDate) > 0;
      })) ||
    false
  );
}
function quarterDisabledBefore(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var firstDateOfYear = dateFns.startOfYear(date);
  var previousQuarter = dateFns.subQuarters(firstDateOfYear, 1);
  return (
    (minDate &&
      dateFns.differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return (
          dateFns.differenceInCalendarQuarters(includeDate, previousQuarter) > 0
        );
      })) ||
    false
  );
}
function quarterDisabledAfter(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var lastDateOfYear = dateFns.endOfYear(date);
  var nextQuarter = dateFns.addQuarters(lastDateOfYear, 1);
  return (
    (maxDate &&
      dateFns.differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return (
          dateFns.differenceInCalendarQuarters(nextQuarter, includeDate) > 0
        );
      })) ||
    false
  );
}
function yearDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var previousYear = dateFns.subYears(day, 1);
  return (
    (minDate && dateFns.differenceInCalendarYears(minDate, previousYear) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return dateFns.differenceInCalendarYears(includeDate, previousYear) > 0;
      })) ||
    false
  );
}
function yearsDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    _c = _b.yearItemNumber,
    yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var previousYear = getStartOfYear(dateFns.subYears(day, yearItemNumber));
  var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
  var minDateYear = minDate && dateFns.getYear(minDate);
  return (minDateYear && minDateYear > endPeriod) || false;
}
function yearDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var nextYear = dateFns.addYears(day, 1);
  return (
    (maxDate && dateFns.differenceInCalendarYears(nextYear, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return dateFns.differenceInCalendarYears(nextYear, includeDate) > 0;
      })) ||
    false
  );
}
function yearsDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    _c = _b.yearItemNumber,
    yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var nextYear = dateFns.addYears(day, yearItemNumber);
  var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
  var maxDateYear = maxDate && dateFns.getYear(maxDate);
  return (maxDateYear && maxDateYear < startPeriod) || false;
}
function getEffectiveMinDate(_a) {
  var minDate = _a.minDate,
    includeDates = _a.includeDates;
  if (includeDates && minDate) {
    var minDates = includeDates.filter(function (includeDate) {
      return dateFns.differenceInCalendarDays(includeDate, minDate) >= 0;
    });
    return dateFns.min(minDates);
  } else if (includeDates) {
    return dateFns.min(includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_a) {
  var maxDate = _a.maxDate,
    includeDates = _a.includeDates;
  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function (includeDate) {
      return dateFns.differenceInCalendarDays(includeDate, maxDate) <= 0;
    });
    return dateFns.max(maxDates);
  } else if (includeDates) {
    return dateFns.max(includeDates);
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
    if (dateFns.isDate(obj)) {
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
    if (!dateFns.isDate(dateObj)) {
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
      injectedTime = dateFns.addHours(
        injectedTime,
        dateFns.getHours(injectedTimeValue),
      );
      injectedTime = dateFns.addMinutes(
        injectedTime,
        dateFns.getMinutes(injectedTimeValue),
      );
      injectedTime = dateFns.addSeconds(
        injectedTime,
        dateFns.getSeconds(injectedTimeValue),
      );
    }
    var nextTime = dateFns.addMinutes(
      startOfDay,
      (currentMultiplier + 1) * intervals,
    );
    if (
      dateFns.isAfter(injectedTime, currentTime) &&
      dateFns.isBefore(injectedTime, nextTime) &&
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
  var endPeriod =
    Math.ceil(dateFns.getYear(date) / yearItemNumber) * yearItemNumber;
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
  return dateFns.toDate(d.getTime() - seconds * 1000 - milliseconds);
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
  if (!dateFns.isDate(date)) {
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
  if (!dateFns.isDate(date) || !dateFns.isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }
  var midnightDate = getMidnightDate(date);
  var midnightDateToCompare = getMidnightDate(dateToCompare);
  return dateFns.isBefore(midnightDate, midnightDateToCompare);
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
    _this.inputRef = React__default.default.createRef();
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
        return React.cloneElement(customTimeInput, {
          date: date,
          value: time,
          onChange: _this.onTimeChange,
        });
      }
      return React__default.default.createElement("input", {
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
    return React__default.default.createElement(
      "div",
      { className: "react-datepicker__input-time-container" },
      React__default.default.createElement(
        "div",
        { className: "react-datepicker-time__caption" },
        this.props.timeInputLabel,
      ),
      React__default.default.createElement(
        "div",
        { className: "react-datepicker-time__input-container" },
        React__default.default.createElement(
          "div",
          { className: "react-datepicker-time__input" },
          this.renderTimeInput(),
        ),
      ),
    );
  };
  return InputTime;
})(React.Component);

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
    _this.dayEl = React.createRef();
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
        (dateFns.isBefore(selectingDate, endDate) ||
          isEqual(selectingDate, endDate))
      ) {
        return isDayInRange(day, selectingDate, endDate);
      }
      if (
        selectsEnd &&
        startDate &&
        !endDate &&
        (dateFns.isAfter(selectingDate, startDate) ||
          isEqual(selectingDate, startDate))
      ) {
        return isDayInRange(day, startDate, selectingDate);
      }
      if (
        selectsRange &&
        startDate &&
        !endDate &&
        (dateFns.isAfter(selectingDate, startDate) ||
          isEqual(selectingDate, startDate))
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
      var weekday = dateFns.getDay(_this.props.day);
      return weekday === 0 || weekday === 6;
    };
    _this.isAfterMonth = function () {
      return (
        _this.props.month !== undefined &&
        (_this.props.month + 1) % 12 === dateFns.getMonth(_this.props.day)
      );
    };
    _this.isBeforeMonth = function () {
      return (
        _this.props.month !== undefined &&
        (dateFns.getMonth(_this.props.day) + 1) % 12 === _this.props.month
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
      return clsx.clsx(
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
            dateFns.getDate(_this.props.day),
            _this.props.day,
          )
        : dateFns.getDate(_this.props.day);
    };
    _this.render = function () {
      return (
        // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
        React__default.default.createElement(
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
            React__default.default.createElement(
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
})(React.Component);

var WeekNumber = /** @class */ (function (_super) {
  __extends(WeekNumber, _super);
  function WeekNumber() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.weekNumberEl = React.createRef();
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
    return React__default.default.createElement(
      "div",
      {
        ref: this.weekNumberEl,
        className: clsx.clsx(weekNumberClasses),
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
})(React.Component);

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
      var endOfWeek = dateFns.addDays(startOfWeek, 6);
      var processingDate = new Date(startOfWeek);
      while (processingDate <= endOfWeek) {
        if (!_this.isDisabled(processingDate)) return false;
        processingDate = dateFns.addDays(processingDate, 1);
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
          React__default.default.createElement(
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
          var day = dateFns.addDays(startOfWeek, offset);
          return React__default.default.createElement(
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
    return React__default.default.createElement(
      "div",
      { className: clsx.clsx(weekNumberClasses) },
      this.renderDays(),
    );
  };
  return Week;
})(React.Component);

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
      return React.createRef();
    });
    _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function () {
      return React.createRef();
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
      return isSameMonth(dateFns.setMonth(day, m), startDate);
    };
    _this.isRangeStartQuarter = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(dateFns.setQuarter(day, q), startDate);
    };
    _this.isRangeEndMonth = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameMonth(dateFns.setMonth(day, m), endDate);
    };
    _this.isRangeEndQuarter = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(dateFns.setQuarter(day, q), endDate);
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
      var _month = dateFns.setMonth(day, m);
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
      var _month = dateFns.setMonth(day, m);
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
      var endOfWeek = dateFns.addDays(startOfWeek, 6);
      return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
    };
    _this.isCurrentMonth = function (day, m) {
      return (
        dateFns.getYear(day) === dateFns.getYear(newDate()) &&
        m === dateFns.getMonth(newDate())
      );
    };
    _this.isCurrentQuarter = function (day, q) {
      return (
        dateFns.getYear(day) === dateFns.getYear(newDate()) &&
        q === dateFns.getQuarter(newDate())
      );
    };
    _this.isSelectedMonth = function (day, m, selected) {
      return (
        dateFns.getMonth(selected) === m &&
        dateFns.getYear(day) === dateFns.getYear(selected)
      );
    };
    _this.isSelectMonthInList = function (day, m, selectedDates) {
      return selectedDates.some(function (selectedDate) {
        return _this.isSelectedMonth(day, m, selectedDate);
      });
    };
    _this.isSelectedQuarter = function (day, q, selected) {
      return (
        dateFns.getQuarter(day) === q &&
        dateFns.getYear(day) === dateFns.getYear(selected)
      );
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
          React__default.default.createElement(
            Week,
            _assign({}, _this.props, {
              ariaLabelPrefix: _this.props.weekAriaLabelPrefix,
              key: i,
              day: currentWeekStart,
              month: dateFns.getMonth(_this.props.day),
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
        currentWeekStart = dateFns.addWeeks(currentWeekStart, 1);
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
            newCalculatedDate = dateFns.addMonths(
              date,
              MONTH_NAVIGATION_HORIZONTAL_OFFSET,
            );
            newCalculatedMonth =
              month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
            break;
          case KeyType.ArrowLeft:
            newCalculatedDate = dateFns.subMonths(
              date,
              MONTH_NAVIGATION_HORIZONTAL_OFFSET,
            );
            newCalculatedMonth =
              month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
            break;
          case KeyType.ArrowUp:
            newCalculatedDate = dateFns.subMonths(date, verticalOffset);
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
            newCalculatedDate = dateFns.addMonths(date, verticalOffset);
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
      var labelDate = dateFns.setQuarter(_this.props.day, q);
      if (isQuarterDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayClick(getStartOfQuarter(labelDate), event);
    };
    _this.onQuarterMouseEnter = function (q) {
      var labelDate = dateFns.setQuarter(_this.props.day, q);
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
              dateFns.addQuarters(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowLeft:
            if (!_this.props.preSelection) {
              break;
            }
            _this.handleQuarterNavigation(
              quarter === 1 ? 4 : quarter - 1,
              dateFns.subQuarters(_this.props.preSelection, 1),
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
      var labelDate = dateFns.setMonth(day, month);
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
        ? monthClassName(dateFns.setMonth(day, m))
        : undefined;
      var selection = _this.getSelection();
      return clsx.clsx(
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
      var preSelectedMonth = dateFns.getMonth(_this.props.preSelection);
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
      var preSelectedQuarter = dateFns.getQuarter(_this.props.preSelection);
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
      var labelDate = dateFns.setMonth(day, month);
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
        isQuarterDisabled(dateFns.setQuarter(day, q), _this.props);
      return clsx.clsx(
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
            return React__default.default.createElement(
              "div",
              { className: "react-datepicker__month-wrapper", key: i },
              month.map(function (m, j) {
                return React__default.default.createElement(
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
      return React__default.default.createElement(
        "div",
        { className: "react-datepicker__quarter-wrapper" },
        quarters.map(function (q, j) {
          return React__default.default.createElement(
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
      return clsx.clsx(
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
    return React__default.default.createElement(
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
})(React.Component);

var MonthDropdownOptions = /** @class */ (function (_super) {
  __extends(MonthDropdownOptions, _super);
  function MonthDropdownOptions() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.isSelectedMonth = function (i) {
      return _this.props.month === i;
    };
    _this.renderOptions = function () {
      return _this.props.monthNames.map(function (month, i) {
        return React__default.default.createElement(
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
            ? React__default.default.createElement(
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
    return React__default.default.createElement(
      ClickOutsideWrapper,
      {
        className: "react-datepicker__month-dropdown",
        onClickOutside: this.handleClickOutside,
      },
      this.renderOptions(),
    );
  };
  return MonthDropdownOptions;
})(React.Component);

var MonthDropdown = /** @class */ (function (_super) {
  __extends(MonthDropdown, _super);
  function MonthDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function (monthNames) {
      return monthNames.map(function (m, i) {
        return React__default.default.createElement(
          "option",
          { key: m, value: i },
          m,
        );
      });
    };
    _this.renderSelectMode = function (monthNames) {
      return React__default.default.createElement(
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
      return React__default.default.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-read-view",
          onClick: _this.toggleDropdown,
        },
        React__default.default.createElement("span", {
          className: "react-datepicker__month-read-view--down-arrow",
        }),
        React__default.default.createElement(
          "span",
          { className: "react-datepicker__month-read-view--selected-month" },
          monthNames[_this.props.month],
        ),
      );
    };
    _this.renderDropdown = function (monthNames) {
      return React__default.default.createElement(
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
    return React__default.default.createElement(
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
})(React.Component);

function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);
  while (!dateFns.isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = dateFns.addMonths(currDate, 1);
  }
  return list;
}
var MonthYearDropdownOptions = /** @class */ (function (_super) {
  __extends(MonthYearDropdownOptions, _super);
  function MonthYearDropdownOptions(props) {
    var _this = _super.call(this, props) || this;
    _this.renderOptions = function () {
      return _this.state.monthYearsList.map(function (monthYear) {
        var monthYearPoint = dateFns.getTime(monthYear);
        var isSameMonthYear =
          isSameYear(_this.props.date, monthYear) &&
          isSameMonth(_this.props.date, monthYear);
        return React__default.default.createElement(
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
            ? React__default.default.createElement(
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
    var dropdownClass = clsx.clsx({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable":
        this.props.scrollableMonthYearDropdown,
    });
    return React__default.default.createElement(
      ClickOutsideWrapper,
      { className: dropdownClass, onClickOutside: this.handleClickOutside },
      this.renderOptions(),
    );
  };
  return MonthYearDropdownOptions;
})(React.Component);

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
      while (!dateFns.isAfter(currDate, lastDate)) {
        var timePoint = dateFns.getTime(currDate);
        options.push(
          React__default.default.createElement(
            "option",
            { key: timePoint, value: timePoint },
            formatDate(currDate, _this.props.dateFormat, _this.props.locale),
          ),
        );
        currDate = dateFns.addMonths(currDate, 1);
      }
      return options;
    };
    _this.onSelectChange = function (event) {
      _this.onChange(parseInt(event.target.value));
    };
    _this.renderSelectMode = function () {
      return React__default.default.createElement(
        "select",
        {
          value: dateFns.getTime(getStartOfMonth(_this.props.date)),
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
      return React__default.default.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-year-read-view",
          onClick: _this.toggleDropdown,
        },
        React__default.default.createElement("span", {
          className: "react-datepicker__month-year-read-view--down-arrow",
        }),
        React__default.default.createElement(
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
      return React__default.default.createElement(
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
    return React__default.default.createElement(
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
})(React.Component);

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
        (dateFns.getHours(time) * 3600 +
          dateFns.getMinutes(time) * 60 +
          dateFns.getSeconds(time)) %
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
        var currentTime = dateFns.addMinutes(base, i * intervals);
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
        return React__default.default.createElement(
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
        return React__default.default.createElement(
          React__default.default.Fragment,
          null,
        );
      }
      return React__default.default.createElement(
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
        React__default.default.createElement(
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
    return React__default.default.createElement(
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
      React__default.default.createElement(
        "div",
        { className: "react-datepicker__time" },
        React__default.default.createElement(
          "div",
          { className: "react-datepicker__time-box" },
          React__default.default.createElement(
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
})(React.Component);

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
      return React.createRef();
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
      return y === dateFns.getYear(newDate());
    };
    _this.isRangeStart = function (y) {
      return (
        _this.props.startDate &&
        _this.props.endDate &&
        isSameYear(dateFns.setYear(newDate(), y), _this.props.startDate)
      );
    };
    _this.isRangeEnd = function (y) {
      return (
        _this.props.startDate &&
        _this.props.endDate &&
        isSameYear(dateFns.setYear(newDate(), y), _this.props.endDate)
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
      var _year = dateFns.setYear(newDate(), y);
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
      var _year = dateFns.setYear(newDate(), y);
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
      var date = getStartOfYear(dateFns.setYear(_this.props.date, y));
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
              return year === dateFns.getYear(date);
            });
      }
      return !selected || year === dateFns.getYear(selected);
    };
    _this.onYearClick = function (event, y) {
      var date = _this.props.date;
      if (date === undefined) {
        return;
      }
      _this.handleYearClick(getStartOfYear(dateFns.setYear(date, y)), event);
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
              dateFns.addYears(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowLeft:
            if (_this.props.preSelection == null) {
              break;
            }
            _this.handleYearNavigation(
              y - 1,
              dateFns.subYears(_this.props.preSelection, 1),
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
              dateFns.subYears(_this.props.preSelection, offset),
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
              dateFns.addYears(_this.props.preSelection, offset),
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
      return clsx.clsx(
        "react-datepicker__year-text",
        "react-datepicker__year-".concat(y),
        date
          ? yearClassName === null || yearClassName === void 0
            ? void 0
            : yearClassName(dateFns.setYear(date, y))
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
      var preSelected = dateFns.getYear(_this.props.preSelection);
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
        React__default.default.createElement(
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
    return React__default.default.createElement(
      "div",
      { className: "react-datepicker__year" },
      React__default.default.createElement(
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
})(React.Component);

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;
    if (minDate) {
      isInRange = dateFns.getYear(minDate) <= newYear;
    }
    if (maxDate && isInRange) {
      isInRange = dateFns.getYear(maxDate) >= newYear;
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
        return React__default.default.createElement(
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
            ? React__default.default.createElement(
                "span",
                { className: "react-datepicker__year-option--selected" },
                "\u2713",
              )
            : "",
          year,
        );
      });
      var minYear = _this.props.minDate
        ? dateFns.getYear(_this.props.minDate)
        : null;
      var maxYear = _this.props.maxDate
        ? dateFns.getYear(_this.props.maxDate)
        : null;
      if (
        !maxYear ||
        !_this.state.yearsList.find(function (year) {
          return year === maxYear;
        })
      ) {
        options.unshift(
          React__default.default.createElement(
            "div",
            {
              className: "react-datepicker__year-option",
              key: "upcoming",
              onClick: _this.incrementYears,
            },
            React__default.default.createElement("a", {
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
          React__default.default.createElement(
            "div",
            {
              className: "react-datepicker__year-option",
              key: "previous",
              onClick: _this.decrementYears,
            },
            React__default.default.createElement("a", {
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
    _this.dropdownRef = React.createRef();
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
    var dropdownClass = clsx.clsx({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable":
        this.props.scrollableYearDropdown,
    });
    return React__default.default.createElement(
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
})(React.Component);

var YearDropdown = /** @class */ (function (_super) {
  __extends(YearDropdown, _super);
  function YearDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function () {
      var minYear = _this.props.minDate
        ? dateFns.getYear(_this.props.minDate)
        : 1900;
      var maxYear = _this.props.maxDate
        ? dateFns.getYear(_this.props.maxDate)
        : 2100;
      var options = [];
      for (var i = minYear; i <= maxYear; i++) {
        options.push(
          React__default.default.createElement(
            "option",
            { key: i, value: i },
            i,
          ),
        );
      }
      return options;
    };
    _this.onSelectChange = function (event) {
      _this.onChange(parseInt(event.target.value));
    };
    _this.renderSelectMode = function () {
      return React__default.default.createElement(
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
      return React__default.default.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__year-read-view",
          onClick: function (event) {
            return _this.toggleDropdown(event);
          },
        },
        React__default.default.createElement("span", {
          className: "react-datepicker__year-read-view--down-arrow",
        }),
        React__default.default.createElement(
          "span",
          { className: "react-datepicker__year-read-view--selected-year" },
          _this.props.year,
        ),
      );
    };
    _this.renderDropdown = function () {
      return React__default.default.createElement(
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
    return React__default.default.createElement(
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
})(React.Component);

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
        if (minDate && dateFns.isBefore(current, minDate)) {
          return minDate;
        } else if (maxDate && dateFns.isAfter(current, maxDate)) {
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
            date: dateFns.addMonths(date, 1),
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
            date: dateFns.subMonths(date, 1),
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
      _this.setState({ selectingDate: dateFns.setYear(newDate(), year) });
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
      var totalDays = dateFns.differenceInDays(endOfMonth, startOfMonth);
      var preSelectedDate = null;
      for (var dayIdx = 0; dayIdx <= totalDays; dayIdx++) {
        var processingDate = dateFns.addDays(startOfMonth, dayIdx);
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
            date: dateFns.setYear(date, Number(year)),
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
            date: dateFns.setMonth(date, Number(month)),
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
            date: dateFns.setYear(
              dateFns.setMonth(date, dateFns.getMonth(monthYear)),
              dateFns.getYear(monthYear),
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
          React__default.default.createElement(
            "div",
            { key: "W", className: "react-datepicker__day-name" },
            _this.props.weekLabel || "#",
          ),
        );
      }
      return dayNames.concat(
        [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = dateFns.addDays(startOfWeek, offset);
          var weekDayName = _this.formatWeekday(day, _this.props.locale);
          var weekDayClassName = _this.props.weekDayClassName
            ? _this.props.weekDayClassName(day)
            : undefined;
          return React__default.default.createElement(
            "div",
            {
              key: offset,
              "aria-label": formatDate(day, "EEEE", _this.props.locale),
              className: clsx.clsx(
                "react-datepicker__day-name",
                weekDayClassName,
              ),
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
            date: dateFns.subYears(
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
      var fromMonthDate = dateFns.subMonths(_this.state.date, monthSelectedIn);
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
      return React__default.default.createElement(
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
        React__default.default.createElement(
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
            date: dateFns.addYears(
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
      return React__default.default.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel,
        },
        React__default.default.createElement(
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
      return React__default.default.createElement(
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
      return React__default.default.createElement(
        YearDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          date: _this.state.date,
          onChange: _this.changeYear,
          year: dateFns.getYear(_this.state.date),
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
      return React__default.default.createElement(
        MonthDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          month: dateFns.getMonth(_this.state.date),
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
      return React__default.default.createElement(
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
      return React__default.default.createElement(
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
      return React__default.default.createElement(
        "div",
        {
          className: "react-datepicker__header ".concat(
            _this.props.showTimeSelect
              ? "react-datepicker__header--has-time-select"
              : "",
          ),
        },
        _this.renderCurrentMonth(monthDate),
        React__default.default.createElement(
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
        React__default.default.createElement(
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
      return React__default.default.createElement(
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
          React__default.default.createElement(
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
      return React__default.default.createElement(
        "div",
        { className: "react-datepicker__header react-datepicker-year-header" },
        showYearPicker
          ? "".concat(startPeriod, " - ").concat(endPeriod)
          : dateFns.getYear(monthDate),
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
          ? dateFns.addYears(_this.state.date, monthsToSubtract)
          : dateFns.subMonths(_this.state.date, monthsToSubtract);
      var monthSelectedIn =
        (_b = _this.props.monthSelectedIn) !== null && _b !== void 0
          ? _b
          : monthsToSubtract;
      for (var i = 0; i < monthsShown; ++i) {
        var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
        var monthDate =
          _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
            ? dateFns.addYears(fromMonthDate, monthsToAdd)
            : dateFns.addMonths(fromMonthDate, monthsToAdd);
        var monthKey = "month-".concat(i);
        var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
        var monthShowsDuplicateDaysStart = i > 0;
        monthList.push(
          React__default.default.createElement(
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
            React__default.default.createElement(
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
        return React__default.default.createElement(
          "div",
          { className: "react-datepicker__year--container" },
          _this.renderHeader({ monthDate: _this.state.date }),
          React__default.default.createElement(
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
        return React__default.default.createElement(
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
        return React__default.default.createElement(
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
        ariaLiveMessage = dateFns.getYear(_this.state.date);
      } else {
        ariaLiveMessage = ""
          .concat(
            getMonthInLocale(
              dateFns.getMonth(_this.state.date),
              _this.props.locale,
            ),
            " ",
          )
          .concat(dateFns.getYear(_this.state.date));
      }
      return React__default.default.createElement(
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
        return React__default.default.createElement(
          "div",
          { className: "react-datepicker__children-container" },
          _this.props.children,
        );
      }
      return;
    };
    _this.containerRef = React.createRef();
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
    return React__default.default.createElement(
      ClickOutsideWrapper,
      {
        onClickOutside: this.handleClickOutside,
        style: { display: "contents" },
        ignoreClass: this.props.outsideClickIgnoreClass,
      },
      React__default.default.createElement(
        "div",
        { style: { display: "contents" }, ref: this.containerRef },
        React__default.default.createElement(
          Container,
          {
            className: clsx.clsx("react-datepicker", this.props.className, {
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
})(React.Component);

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
    return React__default.default.createElement("i", {
      className: ""
        .concat(defaultClass, " ")
        .concat(icon, " ")
        .concat(className),
      "aria-hidden": "true",
      onClick: onClick,
    });
  }
  if (React__default.default.isValidElement(icon)) {
    // Because we are checking that typeof icon is string first, we can safely cast icon as React.ReactElement on types level and code level
    var iconElement_1 = icon;
    return React__default.default.cloneElement(iconElement_1, {
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
  return React__default.default.createElement(
    "svg",
    {
      className: "".concat(defaultClass, " ").concat(className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      onClick: onClick,
    },
    React__default.default.createElement("path", {
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
    return ReactDOM__default.default.createPortal(this.props.children, this.el);
  };
  return Portal;
})(React.Component);

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
    _this.tabLoopRef = React.createRef();
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
    return React__default.default.createElement(
      "div",
      { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
      React__default.default.createElement("div", {
        className: "react-datepicker__tab-loop__start",
        tabIndex: 0,
        onFocus: this.handleFocusStart,
      }),
      this.props.children,
      React__default.default.createElement("div", {
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
})(React.Component);

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
    var arrowRef = React.useRef(null);
    var floatingProps = react.useFloating(
      _assign(
        {
          open: !hidePopper,
          whileElementsMounted: react.autoUpdate,
          placement: props.popperPlacement,
          middleware: __spreadArray(
            [
              react.flip({ padding: 15 }),
              react.offset(10),
              react.arrow({ element: arrowRef }),
            ],
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
    return React__default.default.createElement(
      Component,
      _assign({}, componentProps),
    );
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
      var classes = clsx.clsx("react-datepicker-popper", className);
      popper = React__default.default.createElement(
        TabLoop,
        { enableTabLoop: enableTabLoop },
        React__default.default.createElement(
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
            React__default.default.createElement(react.FloatingArrow, {
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
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }
    if (portalId && !hidePopper) {
      popper = React__default.default.createElement(
        Portal,
        { portalId: portalId, portalHost: portalHost },
        popper,
      );
    }
    var wrapperClasses = clsx.clsx(
      "react-datepicker-wrapper",
      wrapperClassName,
    );
    return React__default.default.createElement(
      React__default.default.Fragment,
      null,
      React__default.default.createElement(
        "div",
        { ref: popperProps.refs.setReference, className: wrapperClasses },
        targetComponent,
      ),
      popper,
    );
  };
  return PopperComponent;
})(React.Component);
var PopperComponent$1 = withFloating(PopperComponent);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return (
      dateFns.getMonth(date1) !== dateFns.getMonth(date2) ||
      dateFns.getYear(date1) !== dateFns.getYear(date2)
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
        minDate && dateFns.isBefore(defaultPreSelection, getStartOfDay(minDate))
          ? minDate
          : maxDate &&
              dateFns.isAfter(defaultPreSelection, getEndOfDay(maxDate))
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
      return dateFns.isDate(_this.state.preSelection);
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
          isYearDisabled(dateFns.getYear(changedDate), _this.props)
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
              hour: dateFns.getHours(_this.props.selected),
              minute: dateFns.getMinutes(_this.props.selected),
              second: dateFns.getSeconds(_this.props.selected),
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
      var hasMinDate = dateFns.isDate(_this.props.minDate);
      var hasMaxDate = dateFns.isDate(_this.props.maxDate);
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
            dateFns.isAfter(date, minDateStartOfDay) ||
            isEqual(dateStartOfDay, minDateStartOfDay);
        } else if (hasMaxDate) {
          var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
          isValidDateSelection =
            dateFns.isBefore(date, maxDateEndOfDay) ||
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
            hour: dateFns.getHours(time),
            minute: dateFns.getMinutes(time),
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
              ? dateFns.addWeeks(date, 1)
              : dateFns.addDays(date, 1);
            break;
          case KeyType.ArrowLeft:
            newCalculatedDate = showWeekPicker
              ? dateFns.subWeeks(date, 1)
              : dateFns.subDays(date, 1);
            break;
          case KeyType.ArrowUp:
            newCalculatedDate = dateFns.subWeeks(date, 1);
            break;
          case KeyType.ArrowDown:
            newCalculatedDate = dateFns.addWeeks(date, 1);
            break;
          case KeyType.PageUp:
            newCalculatedDate = isShiftKeyActive
              ? dateFns.subYears(date, 1)
              : dateFns.subMonths(date, 1);
            break;
          case KeyType.PageDown:
            newCalculatedDate = isShiftKeyActive
              ? dateFns.addYears(date, 1)
              : dateFns.addMonths(date, 1);
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
        var prevMonth = dateFns.getMonth(copy);
        var newMonth = dateFns.getMonth(newSelection);
        var prevYear = dateFns.getYear(copy);
        var newYear = dateFns.getYear(newSelection);
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
      return React__default.default.createElement(
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
      return React__default.default.createElement(
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
      var className = clsx.clsx(
        _this.props.className,
        ((_a = {}), (_a[outsideClickIgnoreClass] = _this.state.open), _a),
      );
      var customInput =
        _this.props.customInput ||
        React__default.default.createElement("input", { type: "text" });
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
      return React.cloneElement(
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
        (_b.className = clsx.clsx(customInput.props.className, className)),
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
        return React__default.default.createElement("button", {
          type: "button",
          className: clsx.clsx(
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
    return React__default.default.createElement(
      "div",
      {
        className: "react-datepicker__input-container".concat(
          showIcon ? " react-datepicker__view-calendar-icon" : "",
        ),
      },
      showIcon &&
        React__default.default.createElement(
          CalendarIcon,
          _assign(
            {
              icon: icon,
              className: clsx.clsx(
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
        ? React__default.default.createElement(
            TabLoop,
            { enableTabLoop: this.props.enableTabLoop },
            React__default.default.createElement(
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
        portalContainer = React__default.default.createElement(
          Portal,
          _assign({ portalId: this.props.portalId }, this.props),
          portalContainer,
        );
      }
      return React__default.default.createElement(
        "div",
        null,
        this.renderInputContainer(),
        portalContainer,
      );
    }
    return React__default.default.createElement(
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
})(React.Component);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

exports.CalendarContainer = CalendarContainer;
exports.default = DatePicker;
exports.getDefaultLocale = getDefaultLocale;
exports.registerLocale = registerLocale;
exports.setDefaultLocale = setDefaultLocale;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uL3NyYy9jbGlja19vdXRzaWRlX3dyYXBwZXIudHN4IiwiLi4vc3JjL2RhdGVfdXRpbHMudHMiLCIuLi9zcmMvaW5wdXRfdGltZS50c3giLCIuLi9zcmMvZGF5LnRzeCIsIi4uL3NyYy93ZWVrX251bWJlci50c3giLCIuLi9zcmMvd2Vlay50c3giLCIuLi9zcmMvbW9udGgudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL3RpbWUudHN4IiwiLi4vc3JjL3llYXIudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvY2FsZW5kYXIudHN4IiwiLi4vc3JjL2NhbGVuZGFyX2ljb24udHN4IiwiLi4vc3JjL3BvcnRhbC50c3giLCIuLi9zcmMvdGFiX2xvb3AudHN4IiwiLi4vc3JjL3dpdGhfZmxvYXRpbmcudHN4IiwiLi4vc3JjL3BvcHBlcl9jb21wb25lbnQudHN4IiwiLi4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19hc3NpZ24iLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXBwbHkiLCJfX3NwcmVhZEFycmF5IiwidG8iLCJmcm9tIiwicGFjayIsImwiLCJhciIsInNsaWNlIiwiY29uY2F0IiwiU3VwcHJlc3NlZEVycm9yIiwiZXJyb3IiLCJzdXBwcmVzc2VkIiwibWVzc2FnZSIsImUiLCJFcnJvciIsIm5hbWUiLCJSZWFjdCIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwicGFyc2VJU08iLCJ0b0RhdGUiLCJwYXJzZSIsImlzVmFsaWREYXRlIiwiaXNCZWZvcmUiLCJmb3JtYXQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0SVNPV2VlayIsInN0YXJ0T2ZEYXkiLCJzdGFydE9mV2VlayIsInN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZZZWFyIiwic3RhcnRPZlF1YXJ0ZXIiLCJlbmRPZkRheSIsImVuZE9mV2VlayIsImVuZE9mTW9udGgiLCJkZklzU2FtZVllYXIiLCJkZklzU2FtZU1vbnRoIiwiZGZJc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVEYXkiLCJkZklzRXF1YWwiLCJpc1dpdGhpbkludGVydmFsIiwic2V0TW9udGgiLCJzZXRRdWFydGVyIiwiZ2V0WWVhciIsImdldE1vbnRoIiwiZW5kT2ZZZWFyIiwiZ2V0UXVhcnRlciIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImFkZE1vbnRocyIsInN1YlF1YXJ0ZXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyIsImFkZFF1YXJ0ZXJzIiwic3ViWWVhcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIiwiYWRkWWVhcnMiLCJtaW4iLCJtYXgiLCJpc0RhdGUiLCJhZGRIb3VycyIsImFkZE1pbnV0ZXMiLCJhZGRTZWNvbmRzIiwiaXNBZnRlciIsImNsb25lRWxlbWVudCIsIkNvbXBvbmVudCIsImNyZWF0ZVJlZiIsImdldERheSIsImNsc3giLCJnZXREYXRlIiwiYWRkRGF5cyIsImFkZFdlZWtzIiwiZ2V0VGltZSIsInNldFllYXIiLCJkaWZmZXJlbmNlSW5EYXlzIiwiUmVhY3RET00iLCJ1c2VGbG9hdGluZyIsImF1dG9VcGRhdGUiLCJmbGlwIiwib2Zmc2V0IiwiYXJyb3ciLCJGbG9hdGluZ0Fycm93IiwiY3JlYXRlRWxlbWVudCIsInN1YldlZWtzIiwic3ViRGF5cyIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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SyxHQUFFLFVBQVU7Z0JBQ2pCLEVBQU0sQ0FBQSxNQUFBLEdBQUUsS0FBSSxDQUFDLFVBQVU7Z0JBQ3ZCLEVBQVEsQ0FBQSxRQUFBLEdBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQzNCLEVBQU8sQ0FBQSxPQUFBLEdBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQzFCLEVBQU8sQ0FBQSxPQUFBLEdBQUUsS0FBSSxDQUFDLFdBQVc7Z0JBQ3pCLEVBQVMsQ0FBQSxTQUFBLEdBQUUsS0FBSSxDQUFDLGNBQWM7QUFDOUIsZ0JBQUEsRUFBQSxDQUFBLEVBQUUsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDakIsZ0JBQUEsRUFBQSxDQUFBLElBQUksR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7QUFDckIsZ0JBQUEsRUFBQSxDQUFBLElBQUksR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7QUFDckIsZ0JBQUEsRUFBQSxDQUFBLFNBQVMsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDL0IsZ0JBQUEsRUFBQSxDQUFBLFdBQVcsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDdkMsZ0JBQUEsRUFBQSxDQUFBLFFBQVEsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsZ0JBQUEsRUFBQSxDQUFBLFlBQVksR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7Z0JBQ3JDLEVBQVMsQ0FBQSxTQUFBLEdBQUVJLFNBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7QUFDdkQsZ0JBQUEsRUFBQSxDQUFBLEtBQUssR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDdkIsZ0JBQUEsRUFBQSxDQUFBLFFBQVEsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsZ0JBQUEsRUFBQSxDQUFBLFFBQVEsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsZ0JBQUEsRUFBQSxDQUFBLFFBQVEsR0FB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
