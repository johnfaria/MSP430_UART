const express = require('express')
const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')

var port = new SerialPort('COM3', { baudRate: 9600 })
const parser = port.pipe(new ByteLength({ length: 2 }))

port.on('open', function() {
  console.log('Serial port COM3 opened')
})

parser.on('data', data => {
  // console.log(data.toString())
  io.emit('temp', data.toString())
})

app.use(express.static('public'))

http.listen(3000, () => {
  console.log('App listen on port 3000')
})
