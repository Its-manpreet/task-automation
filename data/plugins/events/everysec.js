const emmiter = require('node:events')
const cron = require('node-cron')

const event = new emmiter()

cron.schedule('* * * * * *', () => {
    event.emit('run')
  });

module.exports = event

