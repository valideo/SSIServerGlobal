//Imports 
var models    = require('../models');
var asyncLib  = require('async');

// Constants
const ITEMS_LIMIT   = 50;
//Routes

module.exports = {
    create: function(req, res) {

            // Params
        var ref    = req.body.ref;
        var brand  = req.body.brand;
        var modelName = req.params.type;
        
        var modelSelected;

        if (ref == null || brand == null || modelName == null || ref == "" || brand == "" || modelName == "" ) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }

        if(modelName == "Do")
            modelSelected = models.Do;
        else if(modelName == "Df")
            modelSelected = models.Df;
        else if(modelName == "Dl")
            modelSelected = models.Dl;
        else if(modelName == "Dm")
            modelSelected = models.Dm;
        else if(modelName == "Dmc")
            modelSelected = models.Dmc;
        else if(modelName == "Dpa")
            modelSelected = models.Dpa;
        else if(modelName == "Dts")
            modelSelected = models.Dts;
        else if(modelName == "Dtv")
            modelSelected = models.Dtv;


          asyncLib.waterfall([
            function(done) {
              modelSelected.findOne({
                attributes: ['refName'],
                where: { refName: ref}
              })
              .then(function(refFound) {
                done(null, refFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify brand' });
              });
            },
            function(refFound, done) {
              if (!refFound) {
                done(null, refFound);
              } else {
                return res.status(409).json({ 'error': 'component already exist' });
              }
            },
            function(refFound, done) {
              var newRef = modelSelected.create({
                refName: ref,
                idBrand : brand
              })
              .then(function(newRef) {
                done(newRef);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': err });
              });
            }
          ], function(newRef) {
            if (newRef) {
              return res.status(201).json({
                'id': newRef.id
              });
            } else {
              return res.status(500).json({ 'error': err });
            }
          });
      },listComponents: function(req, res) {

        var idBrand  = req.params.id;
        var modelName = req.params.type;
        
        var modelSelected;

        if (idBrand == null || modelName == null || idBrand == "" || modelName == "" ) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }
        if(modelName == "Do")
            modelSelected = models.Do;
        else if(modelName == "Df")
            modelSelected = models.Df;
        else if(modelName == "Dl")
            modelSelected = models.Dl;
        else if(modelName == "Dm")
            modelSelected = models.Dm;
        else if(modelName == "Dmc")
            modelSelected = models.Dmc;
        else if(modelName == "Dpa")
            modelSelected = models.Dpa;
        else if(modelName == "Dts")
            modelSelected = models.Dts;
        else if(modelName == "Dtv")
            modelSelected = models.Dtv;


            modelSelected.findAll({
            attributes: ['id', 'refName'],
            order: ['refName'],
            where: {idBrand : idBrand }
          }).then(function(components) {
            if (components) {
            res.status(200).json(components);
            } else {
            res.status(404).json({ "error": "no components found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },
    getComponent: function(req, res) {
      // Getting auth header

      var idComponent  = req.params.id;
      var modelName = req.params.type;
        
        var modelSelected;

        if (idComponent == null || modelName == null || idComponent == "" || modelName == "" ) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }
        if(modelName == "Do")
            modelSelected = models.Do;
        else if(modelName == "Df")
            modelSelected = models.Df;
        else if(modelName == "Dl")
            modelSelected = models.Dl;
        else if(modelName == "Dm")
            modelSelected = models.Dm;
        else if(modelName == "Dmc")
            modelSelected = models.Dmc;
        else if(modelName == "Dpa")
            modelSelected = models.Dpa;
        else if(modelName == "Dts")
            modelSelected = models.Dts;
        else if(modelName == "Dtv")
            modelSelected = models.Dtv;
  
      modelSelected.findOne({
        attributes: ['idBrand', 'refName'],
        where: { id: idComponent }
      }).then(function(component) {
        if (component) {
          res.status(201).json(component);
        } else {
          res.status(404).json({ 'error': 'component not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': err});
      });
    },
    delComponent: function(req, res) {
      // Getting auth header

      var idComponent  = req.params.id;
      var modelName = req.params.type;
        
        var modelSelected;

        if (idComponent == null || modelName == null || idComponent == "" || modelName == "" ) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }
        if(modelName == "Do")
            modelSelected = models.Do;
        else if(modelName == "Df")
            modelSelected = models.Df;
        else if(modelName == "Dl")
            modelSelected = models.Dl;
        else if(modelName == "Dm")
            modelSelected = models.Dm;
        else if(modelName == "Dmc")
            modelSelected = models.Dmc;
        else if(modelName == "Dpa")
            modelSelected = models.Dpa;
        else if(modelName == "Dts")
            modelSelected = models.Dts;
        else if(modelName == "Dtv")
            modelSelected = models.Dtv;
  
      modelSelected.destroy({
        where: { id: idComponent }
      }).then(function(component) {
        if (component) {
          res.status(201).json(component);
        } else {
          res.status(404).json({ 'error': 'component not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'Impossible de supprimer'});
      });
    }
  }