# Cadigan

Cadigan is a web API that serves placeholder .PNG images for designing and prototyping web applications.

## Features
- Fast placeholder PNG images
- Custom size, colour and placeholder text
### Upcoming Features
- Custom font size and family
- New background shapes, such as ellipses and rounded rectangles
- A choice of image formats (JPEG, GIF, SVG)

## Getting Started
If you are using a public instance of Cadigan, jump straight to step 3, [Using Cadigan](#3-using-cadigan).
### 1. Prerequisites
- `Node.js` - Version 10.x or higher
- `Git`

### 2. Installation
- Clone this repository using Git
- Start the server with `npm start`
- Verify that the server is running with the message `Listening on <port>.`

### 3. Using Cadigan
Wherever you need an image, and can include one by URL (such as an HTML `img` tag or CSS `url(...)`), you can point to Cadigan to use a custom placeholder image.

The image URI consists of the domain name, followed by any of the following parameters. Any parameter may be omitted, but each must be specified in the correct order.

- **size** - If a square image is required, a single integer should be passed between, `30` and `512`, specifying the side length, in pixels, of the square. For a rectangular image, two integers within the same range should be provided, separated by the letter 'x', e.g. `128x256`, indicating the width and height of the image in pixels. Defaults to `128x128`.
- **text** - An arbitrary string of text to render in the image. If the text is too long to fit in the image, it will wrap on to a new line. Defults to `placeholder`.
- **background colour** - A solid colour to fill the background of the image. A hexidecimal RGB colour code, either 3 or 6 hex digits. Defaults to `#969696`.
- **text colour** - The colour of the text of the image. A hexidecimal RGB colour code, either 3 or 6 hex digits. Defaults to 30% opacity black, darkening the background colour.

#### Examples
- `/`

![/](http://cadigan.fergcb.uk/)

- `/64`

![/64](http://cadigan.fergcb.uk/64)

- `/128x64/Example/`

![/128x64/Example/](http://cadigan.fergcb.uk/128x64/Example/)

- `/64/Hello,%20World!/f000`

![/64/Hello,%20World!/f00](http://cadigan.fergcb.uk/64/Hello,%20World!/f00)

- `/FB/5af2db/286`

![/FB/5af2db/286](http://cadigan.fergcb.uk/FB/5af2db/286)


## Technologies
- [Node.js](https://nodejs.org/en/) (JavaScript runtime)
- [Express](https://expressjs.com) (Web framework)
- [node-canvas](https://www.npmjs.com/package/canvas) (Canvas Web API for Node.js)

## Contributors
- Fergus Bentley <fergusbentley@gmail.com> (fergcb.uk)

## License
Cadigan is licensed under the GNU Lesser General Purpose License 3.0. See [LICENSE](./LICENSE) for more information.
