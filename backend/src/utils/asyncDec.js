// Decorator for async functions to catch errors without using try catch
function asyncDec(fn){
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}

module.exports = asyncDec;
