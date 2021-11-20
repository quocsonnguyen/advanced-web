const express = require('express');
const router = express.Router();

router.get('/:imageName', function(req, res) {
    res.sendFile(req.params.imageName, { root : 'uploads' })
});

module.exports = router