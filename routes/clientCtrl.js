//Imports 

var bcrypt = require('bcrypt');
var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');
var asyncLib  = require('async');

// Constants
const ITEMS_LIMIT   = 50;
//Routes

module.exports = {
    create: function(req, res) {

            // Params
        var name    = req.body.name;

        if (name == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }

        if (name.length <= 2) {
            return res.status(400).json({ 'error': 'wrong name (must be length 4+)' });
          }

          asyncLib.waterfall([
            function(done) {
              models.Client.findOne({
                attributes: ['name'],
                where: { name: name }
              })
              .then(function(clientFound) {
                done(null, clientFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify client' });
              });
            },
            function(clientFound, done) {
              if (!clientFound) {
                done(null, clientFound);
              } else {
                return res.status(409).json({ 'error': 'client already exist' });
              }
            },
            function(clientFound, done) {
              var newClient = models.Client.create({
                name: name,
              })
              .then(function(newClient) {
                done(newClient);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add client' });
              });
            }
          ], function(newClient) {
            if (newClient) {
              return res.status(201).json({
                'clientId': newClient.id
              });
            } else {
              return res.status(500).json({ 'error': 'cannot add user' });
            }
          });
      },listClients: function(req, res) {
        var fields  = req.query.fields;
        var limit   = parseInt(req.query.limit);
        var offset  = parseInt(req.query.offset);
        var order   = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
    
        if (userId < 0)
          return res.status(400).json({ 'error': 'wrong token' });

        models.Client.findAll({
            order: [(order != null) ? order.split(':') : ['name', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : '',
            limit: (!isNaN(limit)) ? limit : 50,
            offset: (!isNaN(offset)) ? offset : 0
        }).then(function(clients) {
            if (clients) {
            res.status(200).json(clients);
            } else {
            res.status(404).json({ "error": "no clients found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },
    getClient: function(req, res) {
      // Getting auth header
      var headerAuth  = req.headers['authorization'];
      var userId      = jwtUtils.getUserId(headerAuth);

      var clientId  = req.params.id;
  
      if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token' });
  
      models.Client.findOne({
        attributes: ['name'],
        where: { id: clientId }
      }).then(function(client) {
        if (client) {
          res.status(201).json(client);
        } else {
          res.status(404).json({ 'error': 'client not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch client' });
      });
    }
  }