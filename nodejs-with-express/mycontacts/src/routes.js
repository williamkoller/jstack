const { Router } = require('express');
const contactController = require('./app/controllers/ContactController');

const router = Router();

router.get('/', contactController.index);

module.exports = router;
