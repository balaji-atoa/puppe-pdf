'use strict'
const puppeteer = require('puppeteer')
const fs = require('node:fs')
const stream = require('node:stream')

const { DEFAULT_PDF_OPTIONS, DEFAULT_LAUNCH_OPTIONS } = require('./constants')

class PuppePdf {
  static async forgePDF (opts) {
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
      if (opts?.disableJavascript && typeof opts.disableJavascript !== 'boolean') throw new Error('disableJavascript should be a boolean')
      if (opts?.disableJavascript) { await page.setJavaScriptEnabled(false) }
      // if user agent is not set, it'll be slow.
      await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3851.0 Safari/537.36')

      page.on('pageerror', (err) => {
        console.log(`Page Error => ${err}`)
      })

      if (!opts?.url && !opts?.html) throw new Error('provide a valid URL or HTML to visit on puppeteer')
      if (opts?.url && opts?.goToOptions && typeof opts.goToOptions !== 'object') throw new Error('provide valid goToOptions for puppeteer')

      if (opts?.url) { await page.goto(opts.url, opts.goToOptions || {}) } else if (opts?.html && typeof opts.html === 'string') { await page.setContent(opts.html) } else { throw new Error('no valid URL or HTML provided') }

      await page.waitForNetworkIdle()

      if (opts?.waitForSelector && typeof opts.waitForSelector !== 'string') throw new Error('waitForSelector should be a string')
      if (opts?.waitForSelectorOpts && typeof opts.waitForSelectorOpts !== 'object') throw new Error('waitForSelectorOpts should be a string')
      if (typeof opts?.waitForSelector === 'undefined' && opts?.waitForSelectorOpts) throw new Error('WaitForSelector options provided without a selector')
      if (opts?.waitForSelector && opts?.waitForSelectorOpts) {
        await page.waitForSelector(opts.waitForSelector, opts.waitForSelectorOpts)
      } else if (opts?.waitForSelector) {
        await page.waitForSelector(opts?.waitForSelector)
      }

      let pdf
      if (opts?.pdfOpts && typeof opts.pdfOpts !== 'object') throw new Error('pdfOpts should be an object')
      if (opts?.pdfOpts) { pdf = await page.pdf(opts.pdfOpts) } else { pdf = await page.pdf(DEFAULT_PDF_OPTIONS) }

      if (opts?.saveToFile && typeof opts?.saveToFile !== 'boolean') throw new Error('saveToFile should be a boolean')
      if (opts?.saveToFile && typeof opts.saveToFile === 'boolean' && opts.saveToFile) { fs.writeFileSync(`${process.cwd()}/${Date.now()}-puppe-pdf-export.pdf`, Buffer.from(pdf.buffer)) }

      if (opts?.raw && typeof opts?.raw !== 'boolean') throw new Error("'raw' should be a boolean")
      if (opts?.raw && typeof opts.raw === 'boolean' && opts.raw) {
        return pdf
      }

      if (opts?.stream && typeof opts?.stream !== 'boolean') throw new Error("'stream' should be a boolean")
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
    } catch (err) {
      if (err.message === 'Protocol error (Page.navigate): Cannot navigate to invalid URL') throw new Error('please provide a valid URL in options')
      throw err
    } finally {
      // to prevent memory leak
      if (invoked) {
        await page.close()
        await browser.close()
      }
    }
  }
}

module.exports = PuppePdf
