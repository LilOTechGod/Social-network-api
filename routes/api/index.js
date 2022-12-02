const router = require('express').Router();
const thoughtRoutes = require('./ThoughtRoutes');
const userRoutes= require('./UserRoutes');

router.use('./user', userRoutes);
router.use('./thought', thoughtRoutes);

module.exports = router;