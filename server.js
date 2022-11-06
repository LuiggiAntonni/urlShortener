const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const http = require('http')

const Url = require('./src/models/urls.js')

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/public/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')


// Routes
require('./src/controllers/shortUrlsController')(app)

app.get('/', async (req, res) => {
    const shortUrls = await Url.find()
    const payload = {
        shortUrls: shortUrls,
        name: "Shortener"
    }

    res.render('index', payload)
})

app.get('/:shortUrl', async (req, res) => {
    const url = req.params.shortUrl

    try {
        const shortUrl = await Url.findOne({
            short: url
        })

        shortUrl.clicks++;
        shortUrl.save();

        return res.redirect(shortUrl.full)
    } catch (error) {

        return res.sendStatus(404)
    }
    
})

server.listen(process.env.SERVER_PORT || 3000)