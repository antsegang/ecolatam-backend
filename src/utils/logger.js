const levels = ["error", "warn", "info", "debug"];
const level = process.env.LOG_LEVEL || "info";

function shouldLog(messageLevel) {
  return levels.indexOf(messageLevel) <= levels.indexOf(level);
}

export default {
  error: (...args) => {
    if (shouldLog("error")) console.error(...args);
  },
  warn: (...args) => {
    if (shouldLog("warn")) console.warn(...args);
  },
  info: (...args) => {
    if (shouldLog("info")) console.info(...args);
  },
  debug: (...args) => {
    if (shouldLog("debug")) console.log(...args);
  },
};
