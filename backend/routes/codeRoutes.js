const express = require('express');
const { analyzeCode } = require('../controllers/codeController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');


const router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.post('/analyze', authMiddleware, upload.single('file'), analyzeCode);

module.exports = router;

