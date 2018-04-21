
/* eslint no-console: 0*/
class Logger {
    constructor () {

    }

    error (...args) {
        console.error(...args)
    }

    log (...args) {
        console.log(...args)
    }

    info (...args) {
        console.info(...args)
    }
}

exports.Logger = Logger