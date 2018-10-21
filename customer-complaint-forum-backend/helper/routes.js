const express = require('express'),
    router = express.Router(),

    // user Routes
    userPrefix = 'user',
    userRoutes = require('../components/user/user.controller')(router, userPrefix),

    // complaint Routes
    complaintPrefix = 'complaint',
    complaintRoutes = require('../components/complaint/complaint.controller')(router, complaintPrefix);

module.exports = router;