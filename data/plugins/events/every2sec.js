const emmiter = require('node:events')
const cron = require('node-cron')

const event = new emmiter()

cron.schedule('*/2 * * * * *', () => {
    event.emit('run')
  });

module.exports = event

