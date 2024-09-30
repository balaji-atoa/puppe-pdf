const DEFAULT_PDF_OPTIONS = {
  waitForFonts: true,
  tagged: true
}
const DEFAULT_LAUNCH_OPTIONS = {
  headless: 'shell', // using shell mode as it is the fastest
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']
}
const DEFAULT_JAVASCRIPT_SETTING = true
const TEST_URL_TO_EXPORT = 'https://pptr.dev/guides/what-is-puppeteer'
module.exports = { DEFAULT_PDF_OPTIONS, DEFAULT_LAUNCH_OPTIONS, DEFAULT_JAVASCRIPT_SETTING, TEST_URL_TO_EXPORT }
