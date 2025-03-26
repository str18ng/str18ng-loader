require('dotenv').config();
const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')

const unzipFile = (zipFilePath, outputDir) => {
    fs.mkdirSync(outputDir, { recursive: true })
    exec(`unzip -o ${zipFilePath} -d ${outputDir}`, (error, stdout, stderr) => {
        if (error) return console.error(`Error unzipping: ${error.message}`)
        if (stderr) return console.error(`Unzip stderr: ${stderr}`)
        console.log(`Files unzipped to ${outputDir}: ${stdout}`)
        fs.unlink(zipFilePath, (err) =>
            err
                ? console.error('Error deleting ZIP:', err)
                : console.log('ZIP deleted.')
        )
    })
}


const downloadAndUnpack = async ({ format, output, token }) => {

    try {
        fs.mkdirSync(output, { recursive: true })
        const response = await fetch('https://str18ng.com/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: token ?? process.env.STR18NG_ACCESS_TOKEN,
                format
            })
        })

        if (!response.ok)
            return console.error(`Failed to download. Status: ${response.status}`)

        const zipFilePath = path.join(output, 'str18ng.zip')
        const buffer = Buffer.from(await response.arrayBuffer())
        fs.writeFile(zipFilePath, buffer, (err) => {
            if (err) return console.error('Error writing file:', err)
            console.log(`Download completed. ZIP saved as ${zipFilePath}`)
            unzipFile(zipFilePath, output)
        })
    } catch (error) {
        console.error('Error downloading:', error)
    }
}


module.exports = downloadAndUnpack
