express = require 'express'
connect = require 'connect'
fs = require 'fs'
app = express.createServer()

app.set 'views', __dirname
app.set 'view engine', 'haml'
app.use connect.staticProvider(__dirname + '/static')

names = ['Luis', 'Fernando', 'Jorge', 'Roberto', 'Alejandro']

messages = []
fs.readFile('commit_messages.txt', (err, data)->
    for line in String(data).split('\n')
        messages.push line
)

randline = () ->
    return messages[Math.floor(messages.length*Math.random())]

randname = () ->
    return names[Math.floor(names.length*Math.random())]

app.get('/', (req, res)->
    line = randline().replace("XNAMEX", randname())
    res.render('index', {layout: false, locals : {message : line}})
)

app.get('/index.txt', (req, res)->
    line = randline().replace("XNAMEX", randname())
    res.send(line)
)

app.listen 8000
