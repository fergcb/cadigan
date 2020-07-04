/**
 * Take a string, and wrap it (on space characters) such that each line's width, when drawn in the canvas, is less than the maxWidth
 * 
 * @param {string} text The text to wrap
 * @param {RenderingContext} ctx The context of the canvas the text will be drawn in (font must be configured before calling wrapText)
 * @param {number} maxWidth The maximum allowed width, in pixels, of a line of text
 */
export default function wrapText(text, ctx, maxWidth) {
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