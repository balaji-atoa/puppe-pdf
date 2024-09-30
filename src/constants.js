const DEFAULT_PDF_OPTIONS = {
  waitForFonts: true,
  tagged: true
}
const DEFAULT_LAUNCH_OPTIONS = {
  headless: 'shell', // using shell mode as it is the fastest
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-extensions',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--disable-notifications',
    '--disable-geolocation',
    '--single-process',
    '--disable-dev-shm-usage',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-default-apps',
    '--disable-crash-reporter',
    '--disable-software-rasterizer',
    '--metrics-recording-only',
    '--enable-fast-unload',
    '--disable-print-preview',
    '--disable-breakpad',
    '--disable-software-video-decoders'
  ] // use chat-gpt to decode the args
}
const TEST_URL_TO_EXPORT = 'https://pptr.dev/guides/what-is-puppeteer'
module.exports = { DEFAULT_PDF_OPTIONS, DEFAULT_LAUNCH_OPTIONS, TEST_URL_TO_EXPORT }
