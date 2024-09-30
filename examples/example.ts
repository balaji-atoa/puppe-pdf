import * as PuppePdf from "../src/index";

const options = {
  url: "https://pptr.dev/guides/what-is-puppeteer",
  pdfOpts: {
    format: 'A4',
  },
  stream: true
}

async function wrapper() {
  const pdf = await PuppePdf.forgePDF(options)
  console.log(pdf) // logs the pdf as stream
}

wrapper()