//Imports 
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

          asyncLib.waterfall([
            function(done) {
              models.SsiMarque.findOne({
                attributes: ['brandName'],
                where: { brandName: name}
              })
              .then(function(brandFound) {
                done(null, brandFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify brand' });
              });
            },
            function(brandFound, done) {
              if (!brandFound) {
                done(null, brandFound);
              } else {
                return res.status(409).json({ 'error': 'client already exist' });
              }
            },
            function(brandFound, done) {
              var newSite = models.SsiMarque.create({
                brandName: name
              })
              .then(function(newBrand) {
                done(newBrand);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add client' });
              });
            }
          ], function(newBrand) {
            if (newBrand) {
              return res.status(201).json({
                'id': newBrand.id
              });
            } else {
              return res.status(500).json({ 'error': 'cannot add site' });
            }
          });
      },listBrands: function(req, res) {
        models.SsiMarque.findAll({
            attributes: ['id', 'brandName'],
            order: ['brandName']
          }).then(function(brands) {
            if (brands) {
            res.status(200).json(brands);
            } else {
            res.status(404).json({ "error": "no brands found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },
    getBrand: function(req, res) {
      // Getting auth header

      var brandId  = req.params.id;
  
      models.SsiMarque.findOne({
        attributes: ['brandName'],
        where: { id: brandId }
      }).then(function(site) {
        if (site) {
          res.status(201).json(site);
        } else {
          res.status(404).json({ 'error': 'brand not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch brand' });
      });
    },
    delBrand: function(req, res) {
      // Getting auth header

      var brandId  = req.params.id;
  
      models.SsiMarque.destroy({
        where: { id: brandId }
      }).then(function(site) {
        if (site) {
          res.status(201).json(site);
        } else {
          res.status(404).json({ 'error': 'brand not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'Impossible de supprimer' });
      });
    }
  }