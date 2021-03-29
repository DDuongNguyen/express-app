const express = require('express')
const app = express()
const port = 3000
const { createLogger, format, transports } = require('winston');
var appRoot = require('app-root-path');
const timestamp = require('time-stamp');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/app.log` }),
  ],
});

module.exports = logger;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.log('info', `App is running on port: ${port}`);
  logger.info('Hello log with metas',{appFramework: 'express', log: 'winston', timeStamp:`${timestamp('YYYY/MM/DD:HH:mm:ss')}`});
  console.log(`Example app listening at http://localhost:${port}`)
})