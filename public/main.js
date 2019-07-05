const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('connect')
})

socket.on('temp', data => {
  app.temperature = data
})

var app = new Vue({
  el: '#app',
  data: {
    temperature: 10
  }
})

function getData() {
  return app.temperature
}

Plotly.plot('chart', [
  {
    y: [getData()],
    x: [new Date()],
    type: 'line'
  }
])

var cnt = 0

setInterval(function() {
  Plotly.extendTraces('chart', { y: [[getData()]], x:[[new Date()]] }, [0])
  cnt++
  if (cnt > 500) {
    Plotly.relayout('chart', {
      xaxis: {
        range: [cnt - 500, cnt]
      }
    })
  }
}, 1000)
