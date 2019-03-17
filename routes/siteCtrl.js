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
        var idClient    = req.body.idClient;
        var address    = req.body.address;
        var city    = req.body.city;
        var zipCode    = req.body.zipCode;
        var name    = req.body.name;
        var category    = req.body.category;
        var type    = req.body.type;
        var respName    = req.body.respName;
        var respFonc    = req.body.respFonc;
        var respTel    = req.body.respTel;
        var respEmail    = req.body.respEmail;
        var nContrat    = req.body.nContrat;

        if (name == null || idClient == null || nContrat == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }

        if (name.length <= 2) {
            return res.status(400).json({ 'error': 'wrong name (must be length 4+)' });
          }

          asyncLib.waterfall([
            function(done) {
              models.Site.findOne({
                attributes: ['name', 'idClient'],
                where: { name: name, idClient: idClient }
              })
              .then(function(siteFound) {
                done(null, siteFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify client' });
              });
            },
            function(siteFound, done) {
              if (!siteFound) {
                done(null, siteFound);
              } else {
                return res.status(409).json({ 'error': 'client already exist' });
              }
            },
            function(siteFound, done) {
              var newSite = models.Site.create({
                name: name,
                idClient : idClient,
                address  : address,
                city : city,
                zipCode : zipCode,
                category : category,
                type : type,
                respName: respName,
                respFonc : respFonc,
                respTel : respTel,
                respEmail : respEmail,
                nContrat : nContrat
              })
              .then(function(newSite) {
                done(newSite);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add client' });
              });
            }
          ], function(newSite) {
            if (newSite) {
              return res.status(201).json({
                'siteId': newSite.id
              });
            } else {
              return res.status(500).json({ 'error': 'cannot add site' });
            }
          });
      },listSites: function(req, res) {

        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        var idClient  = req.params.id;
    
        if (userId < 0)
          return res.status(400).json({ 'error': 'wrong token' });

        models.Site.findAll({
            attributes: ['id', 'name'],
            where: { idClient: idClient }
          }).then(function(sites) {
            if (sites) {
            res.status(200).json(sites);
            } else {
            res.status(404).json({ "error": "no sites found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },
    getSite: function(req, res) {
      // Getting auth header
      var headerAuth  = req.headers['authorization'];
      var userId      = jwtUtils.getUserId(headerAuth);

      var siteId  = req.params.id;
  
      if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token' });
  
      models.Site.findOne({
        attributes: ['idClient', 'address', 'city', 'zipCode', 'name', 'category', 'type', 'respName', 'respFonc', 'respTel', 'respEmail', 'nContrat', 'updatedAt'],
        where: { id: siteId }
      }).then(function(site) {
        if (site) {
          res.status(201).json(site);
        } else {
          res.status(404).json({ 'error': 'site not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch site' });
      });
    }
  }