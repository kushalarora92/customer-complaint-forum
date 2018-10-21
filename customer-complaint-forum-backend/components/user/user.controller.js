const userService = require('./user.service');

const routes = (router, prefix) => {
    
    router.post(`/${prefix}/authenticate`, authenticate);
    router.post(`/${prefix}/register`, register);
    router.get(`/${prefix}/:id`, getById);

    function authenticate(req, res, next) {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    }
    
    function register(req, res, next) {
        userService.create(req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
    
    function getById(req, res, next) {
        userService.getById(req.params.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }
}

module.exports = routes;