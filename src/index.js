const express = require('express')
const { Canvas } = require('canvas')

/**
 * Create and return a Canvas object of specified dimensions, with a solid background and foreground text
 * 
 * @param {number} width     The width of the image in pixels
 * @param {number} height    The height of the image in pixels
 * @param {string?} text      The text to render on the image
 * @param {string?} bgColor   The background colour of the image
 * @param {string?} textColor The colour of the foreground text
 * @returns {Canvas} The resulting image as a Canvas object
 */
function draw(width, height, text, bgColor, textColor) {

    // Default values if not specified in URI
    text = text || 'placeholder'
    bgColor = bgColor ? '#' + bgColor : 'rgba(150, 150, 150, 1)'
    textColor = textColor ? '#' + textColor : 'rgba(0, 0, 0, 0.5)'

    // Constrain dimensions
    width = width < 32 ? 32 : (width > 512 ? 512 : width)
    height = height < 32 ? 32 : (height > 512 ? 512 : height)

    // Init Canvas
    const canvas = new Canvas(width, height),
          ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Text
    const fontSize = height * 0.15
    ctx.font = fontSize + 'px sans-serif'
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const lines = wrapText(text, ctx, canvas.width * 0.9)
    const textHeight = fontSize * (lines.length - 1)
    let x = canvas.width / 2,
        y = canvas.height / 2 - textHeight / 2
    for (let line of lines) {
        ctx.fillText(line, x, y)
        y += fontSize
    }

    return canvas
}


/**
 * Take a string, and wrap it (on space characters) such that each line's width, when drawn in the canvas, is less than the maxWidth
 * 
 * @param {string} text The text to wrap
 * @param {RenderingContext} ctx The context of the canvas the text will be drawn in (font must be configured before calling wrapText)
 * @param {number} maxWidth The maximum allowed width, in pixels, of a line of text
 */
function wrapText(text, ctx, maxWidth) {
    const lines = []
    const words = text.split(' ')

    let currentLine = ''
    for (let word of words) {
        let width = ctx.measureText(currentLine + ' ' + word).width
        if (width < maxWidth) {
            currentLine += ' ' + word
        } else {
            lines.push(currentLine.trim())
            currentLine = word
        }
    }
    lines.push(currentLine.trim())

    return lines.filter((l) => l.length > 0)
}



// Initialise the express application
const app = express()


/**
 * Generate a 64x64 favicon using the placeholder generator
 */
app.get('/favicon.ico', (req, res) => {
    draw(64, 64, 'PH', 'ff00ff', '000').pngStream().pipe(res)
})


/**
 * Request for a placeholder image.
 * 
 * URI: /:size?/:text?/:bgColor?/:textColor?
 * size: either a single integer indicating the size length of a square image,
 *       or two integers separated by an 'x', indicating the width and height of the image
 * text: an arbitrary string of text to draw on the image
 * bgColor: a 3- or 6-digit hex code indicating the colour of the image background
 * textColor: a 3- or 6-digit hex code indicating the colour of the image text
 * 
 * Examples:
 *   /256
 *   /100x200
 *   /512/Hello%20World!
 *   /300x100/Placeholder%20Text/ff00ff/990099
 */
app.get(/^(?:\/(\d+(?:x\d+)?))?(?:\/((?:[^/\\]+)))?(?:\/((?:[0-9A-Z]{3}){1,2}))?(?:\/((?:[0-9A-Z]{3}){1,2}))?\/?$/i, (req, res) => {

    let size = [128, 128] // Default to 128x128 square
    // If a size string is provided, parse it into a width and height
    if (req.params[0]) {
        const sizeStr = req.params[0]
        if (sizeStr.includes('x')) {
            size = sizeStr.split('x').map((x) => parseInt(x, 10))
        } else {
            const sideLength = parseInt(sizeStr, 10)
            size = [sideLength, sideLength]
        }
    }
    const [width, height] = size

    // Create the requested image
    const image = draw(width, height, req.params[1], req.params[2], req.params[3])
    // Serve the image
    res.setHeader('Content-Type', 'image/png')
    image.pngStream().pipe(res)

})


// Start the web server
const port = process.env.PORT || 80
app.listen(port, () => console.log(`Listening on ${port}`))
