const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const opts = {
  url: TEST_URL_TO_EXPORT
};

(async () => {
  console.log(await puppePdf.convertUrlToPdf(opts))
})()
