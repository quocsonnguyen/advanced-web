const express = require('express');
const router = express.Router();

const NotificationModel = require('../models/notification')

/* ROUTE */
router.get('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    
    let notis = await NotificationModel.find({}).lean()
    res.end(JSON.stringify(notis))
});

router.post('/', function(req, res) {
    let today  = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hour = String(today.getHours()).padStart(2, '0');
    let minute = String(today.getMinutes()).padStart(2, '0')
    let createdTime = dd + '/' + mm + '/' + yyyy + ', ' + hour + ':' + minute;

    let noti = {
        faculty: req.body.faculty,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        createdTime: createdTime
    }
    
    NotificationModel.create(noti, function(err) {
        if (err) {
            console.log(err);
        }
    })
    res.end()
});

module.exports = router;
