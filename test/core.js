const test = require('tape')
const fs = require('node:fs')
const path = require('node:path')
const pdfParse = require('pdf-parse')
const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const baseHtml = fs.readFileSync(path.join(__dirname, 'html', 'base.html'), 'utf8')

test('directly passing string to forgePdf should convert the website2pdf', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF(TEST_URL_TO_EXPORT)
  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'What is Puppeteer? | Puppeteer')
  t.equal(parsed.info.Creator, 'Chromium')
})

test('provide only url', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF({
    url: TEST_URL_TO_EXPORT
  })
  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'What is Puppeteer? | Puppeteer')
  t.equal(parsed.info.Creator, 'Chromium')
})

test('provide a html', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF({
    html: baseHtml
  })

  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'Puppe Pdf > Test Base functionality')
  t.ok(parsed.text.includes('welcome to PuppePdf'))
})

test('dont provide url or html should throw error', async (t) => {
  t.plan(1)

  try {
    await puppePdf.forgePDF()
    t.fail('did not work as expected')
  } catch (error) {
    error.message.match(/Options should be an object or string/) ? t.pass('throws as expected') : t.fail('did not work as expected. Check error message')
  }
})
