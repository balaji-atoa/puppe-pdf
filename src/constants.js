const DEFAULT_WIDTH = 1920
const DEFAULT_HEIGHT = 1080
const DEFAULT_PDF_OPTIONS = {
  waitForFonts: true,
  tagged: true
}
const DEFAULT_LAUNCH_OPTIONS = {
  headless: 'shell' // using shell mode as it is the fastest
}
const DEFAULT_JAVASCRIPT_SETTING = true
const TEST_URL_TO_EXPORT = 'https://pptr.dev/guides/what-is-puppeteer'
module.exports = { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_PDF_OPTIONS, DEFAULT_LAUNCH_OPTIONS, DEFAULT_JAVASCRIPT_SETTING, TEST_URL_TO_EXPORT }
