[![npm version](https://badge.fury.io/js/puppe-pdf.svg)](https://badge.fury.io/js/puppe-pdf)
[![Node version](https://img.shields.io/node/v/puppe-pdf.svg?style=flat)](https://nodejs.org/download/)
![GitHub CI](https://github.com/balaji-atoa/puppe-pdf/actions/workflows/run-tests.yaml/badge.svg)
[![HitCount](https://hits.dwyl.com/balaji-atoa/puppe-pdf.svg?style=flat-square&show=unique)](http://hits.dwyl.com/balaji-atoa/puppe-pdf)
# puppe-pdf

convert HTML or any website to pdf flawlessly in seconds! puppe-pdf includes built-in TypeScript support, with type definitions provided for all exports.


## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [API Reference](#api-reference)

- [Options](#options)

- [Troubleshooting](#troubleshooting)

- [Contributions](#contributions)

  

## Installation

To install the package, run the following command in your project directory:

`npm install puppe-pdf`

## Usage
Here is a **minimal express starter** for reference. Checkout [here](examples/example.ts) for a typescript example.
```
const express = require('express')
const server = express()
const puppePdf = require('../src/index')

server.get('/', async (_, res) => {
  const pdfBuffer = await puppePdf.forgePDF('https://pptr.dev/guides/what-is-puppeteer')
  res.header('Content-Type', 'application/pdf')
  res.status(200).send(pdfBuffer)
})

server.listen(3000, () => {
  console.log('Server initialized')
})
```
  
## API Reference

`forgePDF(otps:  Options  |  string):Promise<Buffer  |  Readable  |  Uint8Array>`

Generates a PDF from a URL or HTML string, providing several customization options for fine-tuning output.

### Parameters
-  `options` (Options | string): If a `string` is provided, it’s treated as a URL to be visited. Alternatively, an `Options` object can be passed to specify additional settings.

### Returns 
-   `Promise<Buffer | Readable | Uint8Array>`  
    Returns a `Promise` that resolves to the generated PDF in the specified format: a `Buffer`, a `Readable` stream, or a `Uint8Array`. The default output would be a `Buffer`. If `stream` in options is set to true, `Readable` stream will be returned. If `raw` is set to true, the raw `Uint8Array` from puppeteer is returned.

 
## Options

  
| Option                  | Type                      | Description                                                                                                                                           |
|-------------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`                   | `string`                  | The URL to visit for generating the PDF. Required if `html` is not provided.                                                                          |
| `html`                  | `string`                  | HTML content to render directly on the page, which is faster than loading a URL. Required if `url` is not provided.                                   |
| `launchOpts`            | [LaunchOptions](https://pptr.dev/api/puppeteer.launchoptions)           | Puppeteer’s launch options for customizing the browser instance (headless mode, executable path, etc.).                                               |
| `goToOptions`           | [GoToOptions](https://pptr.dev/api/puppeteer.gotooptions)             | Options to configure Puppeteer’s `page.goto()` method, like navigation timeout or waitUntil conditions.                                               |
| `waitForSelector`       | `string`                  | CSS selector for an element that must be visible before the PDF generation begins.                                                                    |
| `waitForSelectorOpts`   | [WaitForSelectorOptions](https://pptr.dev/api/puppeteer.waitforselectoroptions)  | Options for waiting on the selector, such as visibility conditions and timeout.                                                                       |
| `pdfOpts`               | [PDFOptions](https://pptr.dev/api/puppeteer.pdfoptions)              | Puppeteer’s PDF options, like page format, margins, and print background settings.                                                                    |
| `saveToFile`            | `boolean`                 | If `true`, saves the PDF to a file instead of returning it as a `Buffer`. Specify the file path in `pdfOpts`.                                         |
| `raw`                   | `boolean`                 | When `true`, returns the PDF in `Uint8Array` format for direct binary manipulation.                                                                   |
| `stream`                | `boolean`                 | If `true`, returns the PDF as a readable stream instead of a `Buffer`.                                                                                |
| `disableJavascript`     | `boolean`                 | If `true`, disables JavaScript execution on the page, useful for static content.                                                                      |
| `cookies`               | [CookieParam[]](https://pptr.dev/api/puppeteer.cookieparam)           | List of cookies to inject into the page for authentication or session management.                                                                     |



## Troubleshooting

  https://pptr.dev/guides/debugging

## Instructions to run docker in local

Setup docker desktop on local, run the below commands one by one.


`docker build -t puppeteer-app .`


`docker run -p 3000:3000 puppeteer-app`


## Contributions

Contributions are welcome! If you have ideas for new features, bug fixes, or general improvements, feel free to contribute to this project. Please follow these steps to ensure a smooth process:

  

- **Fork the repository**: Click on the "Fork" button at the top of the repository page to create your own fork.

- **Clone your fork**: Clone the forked repository to your local machine.

```
git clone https://github.com/your-username/puppe-pdf.git
```

-   **Make your changes**: Make changes directly in the `main` branch of your forked repository. Make sure to **add testcases**. 
-   **Test your changes**: Ensure your changes are thoroughly tested locally.
-   Push changes to your fork's main
 ``` 
 git add .
 git commit -m "short description of your change"
 git push origin main
 ```
 -   **Submit a Pull Request (PR)**: Go to the original repository and submit a pull request from your fork’s `main` branch to the original repository’s `main` branch.
## License

This project is licensed under the [MIT License](LICENSE).