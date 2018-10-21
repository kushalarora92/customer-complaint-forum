const complaintService = require('./complaint.service');

const routes = (router, prefix) => {
    
    router.post(`/${prefix}/create`, create);
    router.post(`/${prefix}/updateStatusById/:id`, updateStatusById);

    router.get(`/${prefix}/getAllComplaints`, getAll);
    router.get(`/${prefix}/getComplaintsByUserId/:id`, getComplaintsByUser);

    router.post(`/${prefix}/addComment`, addComment);
    router.get(`/${prefix}/getComplaintsByUserIdWithComments/:id`, getComplaintWithComments);
    router.get(`/${prefix}/getComplaintDetailsById/:id`, getComplaintDetailsById);

    function create(req, res, next) {
        complaintService.create(req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }

    function updateStatusById(req, res, next) {
        console.log(req.params.id, req.body);
        complaintService.updateStatus(req.params.id, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }

    function getAll(req, res, next) {
        complaintService.getAll()
            .then(complaints => res.json(complaints))
            .catch(err => next(err));
    }

    function addComment(req, res, next) {
        complaintService.addComment(req.body.complaint_id, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }

    function getComplaintsByUser(req, res, next) {
        complaintService.getComplaintsByUser(req.params.id)
            .then(complaints => res.json(complaints))
            .catch(err => next(err));
    }

    function getComplaintWithComments(req, res, next) {
        complaintService.getComplaintWithComments(req.params.id)
            .then(complaints => res.json(complaints))
            .catch(err => next(err));
    }

    function getComplaintDetailsById(req, res, next) {
        complaintService.getComplaintDetailsById(req.params.id)
            .then(complaint => res.json(complaint))
            .catch(err => next(err));
    }
}

module.exports = routes;