const express = require('express')
const server = express()
const puppePdf = require('../src/index')

server.get('/', async (_, res) => {
  const pdfBuffer = await puppePdf.forgePDF('https://pptr.dev/guides/what-is-puppeteer')
  res.header('Content-Type', 'application/pdf')
  res.status(200).send(pdfBuffer)
})

server.listen(3000, () => {
  console.log('Server initialized')
})
