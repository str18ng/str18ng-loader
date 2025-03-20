#!/usr/bin/env node
const downloadAndUnpack = require('./str18ng');

const parseArgs = (args) => {
    const options = {}
    args.forEach((arg) => {
        if (arg.startsWith('--')) {
            const key = arg.slice(2)
            options[key] = true
        } else {
            const lastKey = Object.keys(options).pop()
            if (lastKey) options[lastKey] = arg
        }
    })
    return options
}

const options = parseArgs(process.argv.slice(2))

;['format', 'output'].forEach((option) => {
    if (!options[option]) {
        console.error(`Missing required argument: --${option}`)
        process.exit(1)
    }
})

downloadAndUnpack(options).catch(error => console.error('Error in download and unpack:', error));

