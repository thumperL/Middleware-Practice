const process = require('process');

function getDateTimeString() {
  const currentTimestamp = new Date();
  const year = `${currentTimestamp.getFullYear()}`;
  const month = `${currentTimestamp.getMonth() + 1}`.padStart(2, '0');
  const date = `${currentTimestamp.getDate()}`.padStart(2, '0');

  const hour = `${currentTimestamp.getHours() + 1}`.padStart(2, '0');
  const minute = `${currentTimestamp.getMinutes() + 1}`.padStart(2, '0');
  const second = `${currentTimestamp.getSeconds()}`.padStart(2, '0');

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

function getRequestString(req, res, next) {
  return `${req.method} from ${req.originalUrl}`;
}

function getDurationInMillisecondsString(diff) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;

  return `${((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toLocaleString()} ms`;
}

const logBenchmark = async (req, res, next) => {
  // Due to having html from send, the browser is somehow asking for favico...
  if (req.originalUrl !== '/favicon.ico') {
    // Get process start time
    const start = process.hrtime();

    // Capture response on close to client
    res.on('close', () => {
      const diff = process.hrtime(start);
      console.log(`${getDateTimeString()} | ${getRequestString(req)} | total time: ${getDurationInMillisecondsString(diff)}`);
    });
  }
  next();
};

module.exports = { logBenchmark };
