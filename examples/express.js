const express = require('express')
const fs = require('node:fs')
const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const path = require('node:path')
const server = express()
const customFontsHtml = fs.readFileSync(path.join(__dirname, 'customFontsHtml.html'), {
  encoding: 'utf8'
})

server.get('/stream', async (_, res) => {
  // pipe pdf stream to response
  const pdfStream = await puppePdf.forgePDF({
    url: TEST_URL_TO_EXPORT,
    stream: true
  })
  res.header('Content-Type', 'application/pdf')
  res.status(200)
  pdfStream.pipe(res)
})

server.get('/buffer', async (_, res) => {
  // attach pdf to response
  const pdf = await puppePdf.forgePDF(TEST_URL_TO_EXPORT)
  res.header('Content-Type', 'application/pdf')
  res.status(200).send(pdf)
})

server.get('/custom-font', async (_, res) => {
  const pdf = await puppePdf.forgePDF({
    html: customFontsHtml,
    stream: true
  })
  res.header('Content-Type', 'application/pdf')
  res.status(200)
  pdf.pipe(res)
})

server.get('/', async (_, res) => {
  res.send('I\'m Up!')
})

server.listen(3000, () => {
  console.log('Server initialized')
})
