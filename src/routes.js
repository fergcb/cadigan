import express from 'express'
import draw from './functions/draw.js'

const router = express.Router()

/**
 * Generate a 64x64 favicon using the placeholder generator
 */
router.get('/favicon.ico', (req, res) => {
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
router.get(/^(?:\/(\d+(?:x\d+)?))?(?:\/((?:[^/\\]+)))?(?:\/((?:[0-9A-Z]{3}){1,2}))?(?:\/((?:[0-9A-Z]{3}){1,2}))?\/?$/i, (req, res) => {

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

export default router