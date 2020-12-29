const logRequest = async (req, res, next) => {
  if (req.url === '/favicon.ico') {
    // Due to having html from send, the browser is somehow asking for favico...
    next();
  } else {
    const currentTimeStamp = new Date();
    const year = `${currentTimeStamp.getFullYear()}`;
    const month = `${currentTimeStamp.getMonth() + 1}`.padStart(2, '0');
    const date = `${currentTimeStamp.getDate()}`.padStart(2, '0');

    const hour = `${currentTimeStamp.getHours() + 1}`.padStart(2, '0');
    const minute = `${currentTimeStamp.getMinutes() + 1}`.padStart(2, '0');
    const second = `${currentTimeStamp.getSeconds()}`.padStart(2, '0');

    // Output to log
    console.log(`${year}-${month}-${date} ${hour}:${minute}:${second} | ${req.method} from ${req.url}`);
    next();
  }
};
module.exports = { logRequest };
