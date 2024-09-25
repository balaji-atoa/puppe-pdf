const express = require('express')
const puppePdf = require('../src/index')
const { TEST_URL_TO_EXPORT } = require('../src/constants')
const server = express()

server.get('/stream', async (_, res) => {
  // pipe pdf stream to response
  const pdfStream = await puppePdf.convertUrlToPdf({
    url: TEST_URL_TO_EXPORT,
    stream: true
  })
  res.header('Content-Type', 'application/pdf')
  res.status(200)
  pdfStream.pipe(res)
})

server.get('/buffer', async (_, res) => {
  // attach pdf to response
  const pdf = await puppePdf.convertUrlToPdf(TEST_URL_TO_EXPORT)
  res.header('Content-Type', 'application/pdf')
  res.status(200).send(pdf)
})

server.get('/', async (_, res) => {
  res.send('I\'m Up!')
})

server.listen(3000, () => {
  console.log('Server initialized')
})
