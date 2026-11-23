import { format } from "date-fns";

/**
 * Formats a date as it is written in the content (UTC), so the pre-rendered HTML
 * and the browser show the same day whatever the visitor's time zone.
 */
const dateFormat = (date: Date | string, pattern: string = "dd MMM, yyyy"): string => {
  const d = new Date(date);
  const utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes());
  return format(utc, pattern);
};

export default dateFormat;
