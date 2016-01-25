/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */


'use strict';

var User = require('../api/user/user-model');

User.find({}).remove(function() {
  User.create(
    {email : 'Banana@test.com'},
    {email : 'Clementine@test.com'},
    {email : 'Kiwi@test.com'},
    {email : 'Melon@test.com'},
    {email : 'Plum@test.com'},
    {email : 'Watermelon@test.com'},
    function () {
        console.log('>> Finished populating users');
    });
});
