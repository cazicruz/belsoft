const { logEvents } = require('./logEvents');

const errorHandler = (err, res) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    if (err.message) {
      //   // If the error has a message property, send it as the response
      return res.status(err.status? err.status : 500).json({
        statusCode: err.status? err.status : 500,
        message: err.message,
           });
       } else {
      //   // If there's no message property, send a generic error response
        return res.status(500).json('Internal Server Error');
    }
}

module.exports = errorHandler;