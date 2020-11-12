const { Router } = require('express');
const StringComponent = require('../String');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of String objects
 * @name /v1/String
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', StringComponent.findAll);

/**
 * Route serving a String
 * @name /v1/string/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', StringComponent.findById);

/**
 * Route serving a longest word by string id
 * @name /v1/string/:id/longestWord
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id/longestWorld', StringComponent.findLongestWord);

/**
 * Route serving a new String
 * @name /v1/string
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', StringComponent.create);



module.exports = router;
