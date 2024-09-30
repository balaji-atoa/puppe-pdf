const test = require('tape')
const fs = require('node:fs')
const path = require('node:path')
const pdfParse = require('pdf-parse')
const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const baseHtml = fs.readFileSync(path.join(__dirname, 'html', 'base.html'), 'utf8')

// testcase - 1
test('directly passing string to forgePdf should convert the website2pdf', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF(TEST_URL_TO_EXPORT)
  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'What is Puppeteer? | Puppeteer')
  t.equal(parsed.info.Creator, 'Chromium')
})

// testcase - 2
test('provide only url', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF({
    url: TEST_URL_TO_EXPORT
  })
  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'What is Puppeteer? | Puppeteer')
  t.equal(parsed.info.Creator, 'Chromium')
})

// testcase - 3
test('provide a html', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF({
    html: baseHtml
  })

  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'Puppe Pdf > Test Base functionality')
  t.ok(parsed.text.includes('welcome to PuppePdf'))
})

// testcase - 4
test('dont provide url or html should throw error', async (t) => {
  t.plan(1)

  try {
    await puppePdf.forgePDF()
    t.fail('did not work as expected')
  } catch (error) {
    error.message.match(/Options should be an object or string/) ? t.pass('throws as expected') : t.fail('did not work as expected. Check error message')
  }
})

// testcase - 5
test('provide an invalid url should fail with user friendly error message', async (t) => {
  t.plan(1)

  try {
    await puppePdf.forgePDF('some-invalid-url')
  } catch (err) {
    err.message.match(/please provide a valid URL in options/) ? t.pass('throws an user friendly exception') : t.fail('doesn\'t work as expected')
  }
})

// testcase - 6
test('if both url and html is passed, then the url should take the precedence', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF({
    url: TEST_URL_TO_EXPORT,
    html: baseHtml
  })
  const parsed = await pdfParse(pdf)

  t.equal(parsed.info.Title, 'What is Puppeteer? | Puppeteer')
  t.equal(parsed.info.Creator, 'Chromium')
})
