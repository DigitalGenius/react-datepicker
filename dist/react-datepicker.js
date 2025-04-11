/*!
  react-datepicker v8.3.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(
        exports,
        require("clsx"),
        require("react"),
        require("date-fns"),
        require("@floating-ui/react"),
        require("react-dom"),
      )
    : typeof define === "function" && define.amd
      ? define(
          [
            "exports",
            "clsx",
            "react",
            "date-fns",
            "@floating-ui/react",
            "react-dom",
          ],
          factory,
        )
      : ((global =
          typeof globalThis !== "undefined" ? globalThis : global || self),
        factory(
          (global.DatePicker = {}),
          global.clsx,
          global.React,
          global.dateFns,
          global.FloatingUIReact,
          global.ReactDOM,
        ));
})(this, function (exports, clsx, React, dateFns, react, ReactDOM) {
  "use strict";

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
      typeof value === "string"
        ? dateFns.parseISO(value)
        : dateFns.toDate(value);
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
    return (
      dateFns.isValid(date) && !dateFns.isBefore(date, new Date("1/1/1800"))
    );
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
      return scope.__localeData__
        ? scope.__localeData__[localeSpec]
        : undefined;
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
              (_a = excludeDate.date) !== null && _a !== void 0
                ? _a
                : new Date(),
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
      (maxDate && dateFns.differenceInCalendarDays(day, maxDate) > 0)) !==
      null && _b !== void 0
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
            dateFns.differenceInCalendarQuarters(includeDate, previousQuarter) >
            0
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
      (minDate &&
        dateFns.differenceInCalendarYears(minDate, previousYear) > 0) ||
      (includeDates &&
        includeDates.every(function (includeDate) {
          return (
            dateFns.differenceInCalendarYears(includeDate, previousYear) > 0
          );
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
          _this.props.preSelection &&
          _this.isDisabled(_this.props.preSelection);
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
        if (
          !document.activeElement ||
          document.activeElement === document.body
        ) {
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
        "react-datepicker__week-number--clickable":
          !!onClick && !isWeekDisabled,
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
                ariaLabelPrefixWhenEnabled:
                  _this.props.chooseDayAriaLabelPrefix,
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
                    : monthsGrid[monthsGrid.length - 1]) === null ||
                _b === void 0
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
              (_b = (_a = _this.props).setPreSelection) === null ||
              _b === void 0
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
          !(
            isPreSelectedMonthDisabled || _this.props.disabledKeyboardNavigation
          )
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
                  {
                    className: "react-datepicker__month-year-option--selected",
                  },
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
          _this.props.timeClassName
            ? _this.props.timeClassName(time)
            : undefined,
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
          (event.key === KeyType.ArrowDown ||
            event.key === KeyType.ArrowRight) &&
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
              (_b = (_a = _this.props).setPreSelection) === null ||
              _b === void 0
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
              var startPeriod = getYearsPeriod(
                date,
                yearItemNumber,
              ).startPeriod;
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
      var noOfYear =
        yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
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
              (selectedYearOptionEl.clientHeight -
                dropdownCurrent.clientHeight) /
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
        var fromMonthDate = dateFns.subMonths(
          _this.state.date,
          monthSelectedIn,
        );
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
            allPrevDaysDisabled = monthDisabledBefore(
              fromMonthDate,
              _this.props,
            );
            break;
        }
        if (
          (!((_c = _this.props.forceShowMonthNavigation) !== null &&
          _c !== void 0
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
          (!((_a = _this.props.forceShowMonthNavigation) !== null &&
          _a !== void 0
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
          {
            className: "react-datepicker__header react-datepicker-year-header",
          },
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
              hasMonthChanged_1 &&
              _this.handleCustomMonthChange(_this.state.date)
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
      return ReactDOM__default.default.createPortal(
        this.props.children,
        this.el,
      );
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
        popperProps: _assign(_assign({}, floatingProps), {
          arrowRef: arrowRef,
        }),
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
        hidePopper =
          _b === void 0 ? PopperComponent.defaultProps.hidePopper : _b,
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
          minDate &&
          dateFns.isBefore(defaultPreSelection, getStartOfDay(minDate))
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
        (_b =
          (_a = _this.input) === null || _a === void 0 ? void 0 : _a.blur) ===
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
          (event === null || event === void 0
            ? void 0
            : event.target) instanceof HTMLInputElement
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
          if (
            changedDate !== null &&
            isMonthDisabled(changedDate, _this.props)
          ) {
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
              newCalculatedDate = getStartOfWeek(
                date,
                locale,
                calendarStartDay,
              );
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

  Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIudHN4IiwiLi4vc3JjL2NsaWNrX291dHNpZGVfd3JhcHBlci50c3giLCIuLi9zcmMvZGF0ZV91dGlscy50cyIsIi4uL3NyYy9pbnB1dF90aW1lLnRzeCIsIi4uL3NyYy9kYXkudHN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLnRzeCIsIi4uL3NyYy93ZWVrLnRzeCIsIi4uL3NyYy9tb250aC50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24udHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvdGltZS50c3giLCIuLi9zcmMveWVhci50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9jYWxlbmRhci50c3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi50c3giLCIuLi9zcmMvcG9ydGFsLnRzeCIsIi4uL3NyYy90YWJfbG9vcC50c3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy50c3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC50c3giLCIuLi9zcmMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcclxuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcclxuICAgIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIHZhciBhciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XHJcbiAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBvd25LZXlzKG8pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XHJcbiAgICAgICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB2YXIgciwgcyA9IDA7XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcyB8PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19lc0RlY29yYXRlOiBfX2VzRGVjb3JhdGUsXHJcbiAgICBfX3J1bkluaXRpYWxpemVyczogX19ydW5Jbml0aWFsaXplcnMsXHJcbiAgICBfX3Byb3BLZXk6IF9fcHJvcEtleSxcclxuICAgIF9fc2V0RnVuY3Rpb25OYW1lOiBfX3NldEZ1bmN0aW9uTmFtZSxcclxuICAgIF9fbWV0YWRhdGE6IF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXI6IF9fYXdhaXRlcixcclxuICAgIF9fZ2VuZXJhdG9yOiBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZzogX19jcmVhdGVCaW5kaW5nLFxyXG4gICAgX19leHBvcnRTdGFyOiBfX2V4cG9ydFN0YXIsXHJcbiAgICBfX3ZhbHVlczogX192YWx1ZXMsXHJcbiAgICBfX3JlYWQ6IF9fcmVhZCxcclxuICAgIF9fc3ByZWFkOiBfX3NwcmVhZCxcclxuICAgIF9fc3ByZWFkQXJyYXlzOiBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXk6IF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0OiBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcjogX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3I6IF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzOiBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3Q6IF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxyXG4gICAgX19pbXBvcnRTdGFyOiBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQ6IF9faW1wb3J0RGVmYXVsdCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEluOiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXHJcbiAgICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZTogX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXHJcbiAgICBfX2Rpc3Bvc2VSZXNvdXJjZXM6IF9fZGlzcG9zZVJlc291cmNlcyxcclxuICAgIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uOiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcclxufTtcclxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl9fZXh0ZW5kcyIsIlR5cGVFcnJvciIsIlN0cmluZyIsIl9fIiwiY29uc3RydWN0b3IiLCJjcmVhdGUiLCJfX2Fzc2lnbiIsImFzc2lnbiIsInQiLCJzIiwiaSIsIm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcHBseSIsIl9fc3ByZWFkQXJyYXkiLCJ0byIsImZyb20iLCJwYWNrIiwibCIsImFyIiwic2xpY2UiLCJjb25jYXQiLCJTdXBwcmVzc2VkRXJyb3IiLCJlcnJvciIsInN1cHByZXNzZWQiLCJtZXNzYWdlIiwiZSIsIkVycm9yIiwibmFtZSIsIlJlYWN0IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJwYXJzZUlTTyIsInRvRGF0ZSIsInBhcnNlIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRJU09XZWVrIiwic3RhcnRPZkRheSIsInN0YXJ0T2ZXZWVrIiwic3RhcnRPZk1vbnRoIiwic3RhcnRPZlllYXIiLCJzdGFydE9mUXVhcnRlciIsImVuZE9mRGF5IiwiZW5kT2ZXZWVrIiwiZW5kT2ZNb250aCIsImRmSXNTYW1lWWVhciIsImRmSXNTYW1lTW9udGgiLCJkZklzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZURheSIsImRmSXNFcXVhbCIsImlzV2l0aGluSW50ZXJ2YWwiLCJzZXRNb250aCIsInNldFF1YXJ0ZXIiLCJnZXRZZWFyIiwiZ2V0TW9udGgiLCJlbmRPZlllYXIiLCJnZXRRdWFydGVyIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiYWRkTW9udGhzIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwiYWRkUXVhcnRlcnMiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJhZGRZZWFycyIsIm1pbiIsIm1heCIsImlzRGF0ZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJpc0FmdGVyIiwiY2xvbmVFbGVtZW50IiwiQ29tcG9uZW50IiwiY3JlYXRlUmVmIiwiZ2V0RGF5IiwiY2xzeCIsImdldERhdGUiLCJhZGREYXlzIiwiYWRkV2Vla3MiLCJnZXRUaW1lIiwic2V0WWVhciIsImRpZmZlcmVuY2VJbkRheXMiLCJSZWFjdERPTSIsInVzZUZsb2F0aW5nIiwiYXV0b1VwZGF0ZSIsImZsaXAiLCJvZmZzZXQiLCJhcnJvdyIsIkZsb2F0aW5nQXJyb3ciLCJjcmVhdGVFbGVtZW50Iiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiUG9wcGVyQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQUE7SUFDQTtBQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7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QUFJLENBQUMsS0FBSyxDQUFDLE1BQU07SUFBRSxZQUFBLE9BQU8sUUFBUTtJQUV0QyxRQUFBLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUNuQzFELHNCQUFDLENBQUEsYUFBQSxDQUFBLE9BQU8sSUFBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUE7b0JBQzlDQSxzQkFDRSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUMsMEJBQTBCLEVBQ3BDLFFBQVEsRUFBRSxFQUFFLEVBQ1osU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBRTlCLEVBQUEsUUFBUSxDQUNMLENBQ0UsSUFDUixJQUFJO0lBRVIsWUFBQSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUMxQyxlQUFlLElBQ2JBLHNCQUFDLENBQUEsYUFBQSxDQUFBLE1BQU0sWUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUEsRUFBTSxJQUFJLENBQUMsS0FBSyxHQUNsRCxlQUFlLENBQ1QsQ0FDVjs7SUFHSCxZQUFBLFFBQ0VBLHNCQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBO29CQUNHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDM0IsZUFBZSxDQUNaOztZQUlWLFFBQ0VBLHFDQUFDMkUsaUJBQWUsRUFBQW5HLE9BQUEsQ0FBQSxFQUFBLEVBQ1YsSUFBSSxDQUFDLEtBQUssRUFDZCxFQUFBLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFDckMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUNsQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQzVDLGVBQWUsRUFBRSxRQUFRLEVBQ3pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQ3JDLENBQUEsQ0FBQTtTQUVMO1FBQ0gsT0FBQyxVQUFBO0lBQUQsQ0F2dUNBLENBQXdDK0UsZUFBUyxDQXV1Q2hEO0lBRUQsSUFBTSwwQkFBMEIsR0FBRyxPQUFPO0lBQzFDLElBQU0sNkJBQTZCLEdBQUcsVUFBVTs7Ozs7Ozs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
