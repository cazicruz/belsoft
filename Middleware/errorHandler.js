const { logEvents } = require('./logEvents');

const errorHandler =async (err, res) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    if (err.message) {
      //   // If the error has a message property, send it as the response
      return res.status(err.statusCode? err.statusCode : 500).json({
        statusCode: err.statusCode? err.statusCode : 500,
        message: err.message,
        status:err.status
           });
       } else {
      //   // If there's no message property, send a generic error response
        return res.status(500).json('Internal Server Error');
    }
}

module.exports = errorHandler;