'use strict'
const puppeteer = require('puppeteer')
const fs = require('node:fs')
const stream = require('node:stream')

const { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_PDF_OPTIONS, DEFAULT_LAUNCH_OPTIONS } = require('./constants')

class PuppePdf {
  static async convertUrlToPdf (opts) {
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

      // invoke on demand
      if (opts?.launchOpts && typeof launchOpts === 'object') {
        browser = await puppeteer.launch({
          ...DEFAULT_LAUNCH_OPTIONS, ...opts.launchOpts
        })
      } else { browser = await puppeteer.launch(DEFAULT_LAUNCH_OPTIONS) }

      page = await browser.newPage()
      invoked = true

      let viewportOpts = {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
      }

      if (opts?.viewPort && typeof opts.viewPort === 'object' && opts.viewPort?.height && opts.viewPort?.width) {
        // only if height and width is passed, we will use it else use default viewport
        viewportOpts = opts.viewPort
      }
      await page.setViewport(viewportOpts)
      if (opts?.disableJavascript && typeof opts.disableJavascript === 'boolean' && opts.disableJavascript) { await page.setJavaScriptEnabled(false) } else { await page.setJavaScriptEnabled(true) }
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
      await page.waitForNetworkIdle()

      if (opts?.selectorToWait && typeof opts.selectorToWait !== 'string') throw new Error('selectorToWait should be a string')
      if (opts?.waitForSelectorOpts && typeof opts.waitForSelectorOpts !== 'object') throw new Error('waitForSelectorOpts should be a string')
      if (opts?.selectorToWait && opts?.waitForSelectorOpts) {
        await page.waitForSelector(opts.selectorToWait, opts.waitForSelectorOpts)
      } else if (opts?.selectorToWait) {
        await page.waitForSelector(opts?.selectorToWait)
      }

      let pdf
      if (opts?.pdfOpts && typeof opts.pdfOpts !== 'object') throw new Error('pdfOpts should be an object')
      if (opts?.pdfOpts) { pdf = await page.pdf(opts.pdfOpts) } else { pdf = await page.pdf(DEFAULT_PDF_OPTIONS) }

      if (opts?.saveToFile && typeof opts.saveToFile === 'boolean' && opts.saveToFile) { fs.writeFileSync(`${process.cwd()}/${Date.now()}-puppe-pdf-export.pdf`, Buffer.from(pdf.buffer)) }

      if (opts?.raw && typeof opts.raw === 'boolean' && opts.raw) {
        return pdf
      }

      if (opts?.stream && typeof opts.stream === 'boolean' && opts.stream) {
        return new stream.Readable({
          read () {
            this.push(pdf)
            this.push(null) // null to denote end of stream.
          }
        })
      }
      // default return value is a buffer
      return Buffer.from(pdf.buffer)
    } finally {
      if (invoked) {
        await page.close()
        await browser.close()
      }
    }
  }
}

module.exports = PuppePdf
