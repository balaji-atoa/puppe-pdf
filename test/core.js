const test = require('tape')
const fs = require('node:fs')
const path = require('node:path')
const pdfParse = require('pdf-parse')
const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const baseHtml = fs.readFileSync(path.join(__dirname, 'html', 'base.html'), 'utf8')
const testJsHtml = fs.readFileSync(path.join(__dirname, 'html', 'testJs.html'), 'utf8')
const pageErrorHtml = fs.readFileSync(path.join(__dirname, 'html', 'errorJs.html'), 'utf8')

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
    t.fail('did not work as expected')
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

// testcase - 7
test('if disable javascript is invalid, throw an user friendly err', async (t) => {
  t.plan(1)

  try {
    await puppePdf.forgePDF({
      html: baseHtml,
      disableJavascript: 'some-invalid'
    })
    t.fail('did not work as expected')
  } catch (error) {
    error.message.match(/disableJavascript should be a boolean/) ? t.pass('thrown as expected') : t.fail("didn't work as expected")
  }
})

// testcase - 8
test('should disableJavascript if it is set to true', async (t) => {
  t.plan(2)

  const pdf = await puppePdf.forgePDF({
    html: testJsHtml,
    disableJavascript: true
  })
  const parsed = await pdfParse(pdf)

  t.ok(!parsed.text.includes('Puppe Pdf is the best'))
  t.equal(parsed.info.Title, 'Puppe Pdf > JS disabled')
})

// testcase - 9
test('default behaviour -> should log page error', async (t) => {
  t.plan(2)
  // Save the original console.log
  const originalLog = console.log

  // Create a mock console.log function
  const logOutput = []
  console.log = (message) => {
    logOutput.push(message)
  }

  // Call the code that uses console.log
  await puppePdf.forgePDF({
    html: pageErrorHtml
  })

  // Test if console.log was called with the expected message
  t.equal(logOutput.length, 1, 'console.log should be called once')
  t.equal(logOutput[0], 'Page Error => Error: Log this error to console')

  // Restore the original console.log
  console.log = originalLog

  t.end()
})

// to be written
test('if url exists and goTo opts not there it should work', async (t) => {

})

test('if url exists and goTo opts is there then it should take up the goTo opts', async (t) => {

})

test('if invalid goTo opts is provided, fail with a user-friendly err', async (t) => {

})

test('if invalid waitForSelector is provided, fail with a user-friendly err', async (t) => {})

test('if valid waitForSelector is provided, should work', async (t) => {})

test('if valid waitForSelectorOpts & selector is provided, should work', async (t) => {})

test('if no selector is provided and valid waitForSelector is provided, should throw user friendly err', async (t) => {})

test('if invalid pdfOpts is provided, should fail with user friendly err', async (t) => {})

test('if valid pdfOpts is provided, should work', async (t) => {})

test('if no pdfOpts is provided, should work by taking the default PDF opts', async (t) => {})

test('if saveToFile is provided, should save the PDF', async (t) => {})

test('if invalid saveToFile is passed, should throw user friendly err', async (t) => {})

test('if raw is passed, then return the raw Uint8Array', async (t) => {})
test('if invalid raw is passed, then should throw user friendly err', async (t) => {})

test('if stream is passed true, then return the ReadableStream', async (t) => {})
test('if invalid stream is passed, then should throw user friendly err', async (t) => {})

test('by default, forgePdf should return a buffer', async (t) => {})

test('check using all parameters', async (t) => {})

test('multipage pdf generation', async (t) => {})

test('external css', async (t) => {})
test('external js', async (t) => {})
test('file imports', async (t) => {})
