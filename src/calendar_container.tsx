import React, { type HTMLAttributes } from "react";

export interface CalendarContainerProps
  extends React.PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  showTimeSelectOnly?: boolean;
  showTime?: boolean;
}

const CalendarContainer: React.FC<CalendarContainerProps> = function ({
  showTimeSelectOnly = false,
  showTime = false,
  className,
  children,
}: CalendarContainerProps) {
  const ariaLabel = showTimeSelectOnly
    ? "Choose Time"
    : `Choose Date${showTime ? " and Time" : ""}`;

  return (
    <div className={className} aria-label={ariaLabel}>
      {children}
    </div>
  );
};

export default CalendarContainer;
