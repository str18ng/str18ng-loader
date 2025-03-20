const downloadAndUnpack = require('./str18ng');

const parseArgs = (args) => {
    const options = {};
    args.forEach((arg) => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');
            options[key] = value !== undefined ? value : true;
        }
    });

    options.token = options.token || process.env.STR18NG_ACCESS_TOKEN;
    return options;
}

const command = process.argv[2];

if (command === 'download') {
    const options = parseArgs(process.argv.slice(3));

    ['format', 'output'].forEach((option) => {
        if (!options[option]) {
            console.error(`Missing required argument: --${option}`);
            process.exit(1);
        }
    });


    downloadAndUnpack(options).catch(error => console.error('Error in download and unpack:', error));
} else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}

downloadAndUnpack(options).catch(error => console.error('Error in download and unpack:', error));