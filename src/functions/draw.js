import nodeCanvas from 'canvas'
import wrapText from './wrapText.js'

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
export default function draw(width, height, text, bgColor, textColor) {

    // Default values if not specified in URI
    text = text || 'placeholder'
    bgColor = bgColor ? '#' + bgColor : 'rgba(150, 150, 150, 1)'
    textColor = textColor ? '#' + textColor : 'rgba(0, 0, 0, 0.5)'

    // Constrain dimensions
    width = width < 32 ? 32 : (width > 512 ? 512 : width)
    height = height < 32 ? 32 : (height > 512 ? 512 : height)

    // Init Canvas
    const { Canvas } = nodeCanvas,
          canvas = new Canvas(width, height),
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