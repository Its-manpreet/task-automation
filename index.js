//Import the libraries
const fs = require('node:fs')
const emmiter = require('node:events')
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
    //only files with .js
    if(scriptfile.endsWith('.js')){
        const scriptfilepath = `./data/scripts/${scriptfile}`
        //get lines
        const firstline = getlines(scriptfilepath)[0]
        //on event specified in line 1
        run.on(firstline,() =>{
            const fileContent = fs.readFileSync(scriptfilepath, 'utf-8');
            const lines = fileContent.substr(fileContent.indexOf('\r\n'),fileContent.length)
            //load functions
            funcdir.forEach((funcfile) => {
                if(funcfile.endsWith('.js')){
                    const funcpath = `./data/plugins/func/${funcfile}`
                    const funcname = funcfile.slice(0,funcfile.length - 3)
                    fs.writeFileSync(`temp/${scriptfile}`, `const {${funcname}} = require('${funcpath}')\n`, { flag: 'a' })
                }
            })
            fs.writeFileSync(`temp/${scriptfile}`, `${lines}\n`, { flag: 'a' })
            const script = fs.readFileSync(`temp/${scriptfile}`, 'utf-8')
            // console.log(script)
            try {
                eval(script)
            } catch (error) {
                console.log(error)
            }
            fs.unlinkSync(`temp/${scriptfile}`)
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