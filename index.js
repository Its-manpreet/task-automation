//Import the libraries
const fs = require('node:fs')
const emmiter = require('node:events')
const readline = require('node:readline')
//declare emmiter for letting scripts know when event occured
const run = new emmiter()
//get the files of the folders
const eventsdir = fs.readdirSync('./data/plugins/events')
const funcdir = fs.readdirSync('./data/plugins/func')
const scriptdir = fs.readdirSync('./data/scripts')
//load events
eventsdir.forEach((eventfile) => {
    //only files with .js
    if(eventfile.endsWith('.js')){
        const event = require(`./data/plugins/events/${eventfile}`)
        //when event runs emit the event name
        event.on('run', () => {
            run.emit(eventfile.slice(0,eventfile.length - 3))
        })
    }
})
//check scripts
scriptdir.forEach((scriptfile) => {
    //only files with .tas
    if(scriptfile.endsWith('.tas')){
        const scriptfilepath = `./data/scripts/${scriptfile}`
        //get lines
        lines = getlines(scriptfilepath)
        //on event specified in line 1
        run.on(lines[0],() =>{
            console.log('working')
        })
        }
})


//load functions
funcdir.forEach((funcfile) => {
    if(funcfile.endsWith('.js')){
        const func = require(`./data/plugins/func/${funcfile}`)
        run.on('run',() => {
            // func('hi')
        })
    }
})
//functions
//get lines from a file
function getlines(path) {
    const fileContent = fs.readFileSync(path, 'utf-8');
    const lines = fileContent.split('\r\n');
    return lines
}
   