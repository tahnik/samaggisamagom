var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');
var sharp = require('sharp');

router.get('/*', function(req, res) {
    var fileUrl = path.join('.', req.originalUrl);
    console.log(fileUrl);
    fs.readFile(fileUrl, function (err, data) {
        if (err) {
            return console.error(err);
        }else {
            sharp(data)
            .extract({ left: 200, top: 100, width: 800, height: 600 })
            .resize(800, 600)
            .toBuffer(function(err, buffer) {
                // output.jpg is a 300 pixels wide and 200 pixels high image
                // containing a scaled and cropped version of input.jpg
                return res.send(buffer);
            });
        }
    });
})

module.exports = router;
