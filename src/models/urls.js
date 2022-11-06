const mongoose = require('../config/db');
const shortID = require('shortid')

const UrlSchema = new mongoose.Schema({
   full: {
    type: String,
    require: true
   } ,
   short: {
    type: String,
    require:true,
    default: shortID.generate,
    unique: true
   },
   clicks: {
    type: Number,
    require: true,
    default: 0
   }
})

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;