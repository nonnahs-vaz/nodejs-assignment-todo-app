// wrap controller in a try-catch block and forward exception if any
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};