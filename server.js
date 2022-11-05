const express = require('express')
const path =  require('path')

const app = express()

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


app.get('/', (req, res) => {
    res.render('views/index')
})

app.listen(process.env.SERVER_PORT  || 3000)