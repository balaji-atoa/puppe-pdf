'use strict'
const puppeteer = require('puppeteer')
const fs = require('node:fs')

const DEFAULT_WIDTH = 1920
const DEFAULT_HEIGHT = 1080

async function convertWebsiteToPdf (opts) {
  let invoked = false
  let page
  let browser
  try {
    if (typeof opts === 'string') {
      opts = Object.assign({
        url: opts
      }, {})
    }
    if (typeof opts !== 'object') throw new Error('Options should be an object or string')

    browser = await puppeteer.launch({
      headless: 'shell', // using shell mode as it is the fastest
      slowMo: opts?.slowMo
    })
    page = await browser.newPage()
    invoked = true

    let viewportOpts = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    }

    if (opts?.viewPort && typeof opts.viewPort === 'object' && opts.viewPort?.height && opts.viewPort?.width) {
      viewportOpts = opts.viewPort
    }
    await page.setViewport(viewportOpts)

    // if user agent is not set, it'll be slow.
    await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3851.0 Safari/537.36')

    page.on('pageerror', (err) => {
      if (opts?.failOnPageError && typeof opts.failOnPageError === 'boolean' && opts.failOnPageError) {
        throw new Error(err)
      }
      console.log(`Page Error! \n ${err}`)
    })

    if (!opts?.url) throw new Error('provide a valid URL to visit on puppeteer')
    if (opts?.goToOptions && typeof opts.goToOptions !== 'object') throw new Error('provide valid goToOptions for puppeteer')

    await page.goto(opts.url, opts.goToOptions || {})
    await page.waitForNetworkIdle({
      idleTime: 1
    })

    if (opts?.selectorToWait && typeof opts.selectorToWait === 'string' && opts?.waitForSelectorOpts && typeof opts.waitForSelectorOpts === 'object') {
      await page.waitForSelector(opts.selectorToWait, opts.waitForSelectorOpts)
    }
    let pdf
    if (opts?.pdfOpts && typeof opts.pdfOpts === 'object') { pdf = await page.pdf(opts.pdfOpts) } else { pdf = await page.pdf() }

    if (opts?.saveToFile && typeof opts.saveToFile === 'boolean') { fs.writeFileSync(`${process.cwd()}/${Date.now()}-puppe-pdf-export.pdf`, Buffer.from(pdf.buffer)) }

    return Buffer.from(pdf.buffer)
  } finally {
    if (invoked) {
      await page.close()
      await browser.close()
    }
  }
}

// const res = (async () => {console.log(await convertWebsiteToPdf({
//   url: 'https://github.com/balaji-atoa/hyperid/blob/master/index.d.ts'
// }))})()

// const res = (async () => {console.log(await convertWebsiteToPdf(
// 'https://github.com/balaji-atoa/hyperid/blob/master/index.d.ts'
// ))})()

// async function convertHTMLToPdf (opts) {}
module.exports = convertWebsiteToPdf
