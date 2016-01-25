/*
 * GET /users -> index
 * POST /users -> create
 * GET /users/:id -> show
 * PUT /users/:id -> update
 * DELETE /users/:id -> destroy
*/
 
'use strict';
 
var _ = require('lodash');
var User = require('./user-model');
 
// Get list of users
exports.index = function (req, res) {
   User.find(function (err, users) {
     if (err) { return handleError(res, err); }
     return res.status(200).json(users);
   });
};
            
// Get a single user by id
exports.show = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
	if (!user) { return res.sendStatus(404); }
        return res.json(user);
     });
};
                         
// Creates a new user
exports.create = function (req, res) {
    User.create(req.body, function(err, user) {
        if (err) { return handleError(res, err); }
        return res.status(201).json(user);
    });
};
                                          
// Updates an existing user
exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    User.findById(req.params.id, function (err, user) {
         if (err) { return handleError(res, err); }
         if (!user) { return res.sendStatus(404); }
         var updated = _.merge(user, req.body);
         updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(user);
         });
    });
};
                                       
// Deletes a user
exports.destroy = function (req, res) {
    User.findById(req.params.id, function (err, user) {
         if (err) { return handleError(res, err); }
         if (!user) { return res.sendStatus(404); }
         user.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.sendStatus(204);
         });
    });
};
                                                                                                                  
function handleError(res, err) {
    return res.status(500).send(err);
}

