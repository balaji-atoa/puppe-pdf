const test = require('tape')
const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const pdfParse = require('pdf-parse')

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
