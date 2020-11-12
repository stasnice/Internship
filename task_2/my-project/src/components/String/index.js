const UserService = require('./service');
const StringValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const stringArray = [];

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        return res.status(200).json({
            data: stringArray,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = StringValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        return res.status(200).json({
            data: stringArray.find(el => Number(el.stringId) === Number(req.params.id)),
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function findLongestWord (req, res, next) {
    try {
        const { error } = StringValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const currentStringObject = stringArray.find((el) => Number(el.stringId) === Number(req.params.id))

        return res.status(200).json({
            data: longestWordFromString(currentStringObject.text)
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param currentString
 * @returns {string}
 */
function longestWordFromString(currentString) {
    const words = currentString.split(' ');

    let longestWord = '';
    for (let i = 0; i < words.length; i++){
        if (words[i].length > longestWord.length)
            longestWord = words[i];
    }

    return longestWord;
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = StringValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const stringId = Date.now();
        stringArray.push(
            {
                stringId,
                text: req.body.new_string,
            }
        )

        return res.status(200).json({
            data: stringId,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}



module.exports = {
    findAll,
    findById,
    create,
    findLongestWord,
};
