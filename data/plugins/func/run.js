const {exec} = require('node:child_process')
module.exports.run = function(args){
    exec(args)
}