//Imports 
var models    = require('../models');
var asyncLib  = require('async');

// Constants
const ITEMS_LIMIT   = 50;
//Routes

module.exports = {
    create: function(req, res) {

            // Params
        var brand    = req.body.brand;
        var refName    = req.body.refName;
        var listModules    = req.body.listModules;
        var listDm    = req.body.listDm;
        var listDo    = req.body.listDo;
        var listDts    = req.body.listDts;
        var listDtv    = req.body.listDtv;
        var listDmc    = req.body.listDmc;
        var listDf    = req.body.listDf;
        var listDpa    = req.body.listDpa;
        var listDl    = req.body.listDl;

        if (brand == null || refName == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }

          asyncLib.waterfall([
            function(done) {
              models.SsiModele.findOne({
                attributes: ['refName'],
                where: { refName: refName}
              })
              .then(function(ModeleFound) {
                done(null, ModeleFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify modele' });
              });
            },
            function(ModeleFound, done) {
              if (!ModeleFound) {
                done(null, ModeleFound);
              } else {
                return res.status(409).json({ 'error': 'modele already exist' });
              }
            },
            function(ModeleFound, done) {
              var newModele = models.SsiModele.create({
                idBrand: brand,
                refName: refName,
                listModules: listModules,
                listDm: listDm,
                listDo: listDo,
                listDts: listDts,
                listDtv: listDtv,
                listDmc: listDmc,
                listDf: listDf,
                listDpa: listDpa,
                listDl: listDl
              })
              .then(function(newModele) {
                done(newModele);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add modele' });
              });
            }
          ], function(newModele) {
            if (newModele) {
              return res.status(201).json({
                'id': newModele.id
              });
            } else {
              return res.status(500).json({ 'error': 'cannot add site' });
            }
          });
      },listModeles: function(req, res) {

        var idBrand  = req.params.id;

        models.SsiModele.findAll({
            attributes: ['id', 'refName', 'listModules', 'listDm', 'listDo', 'listDts', 'listDtv', 'listDmc', 'listDf', 'listDpa', 'listDl'],
            order: ['refName'],
            where: {idBrand : idBrand }
          }).then(function(modeles) {
            if (modeles) {
            res.status(200).json(modeles);
            } else {
            res.status(404).json({ "error": "no modeles found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },
    getModele: function(req, res) {
      // Getting auth header

      var idModele  = req.params.id;
  
      models.SsiModele.findOne({
        attributes: ['idBrand', 'refName', 'listModules', 'listDm', 'listDo', 'listDts', 'listDtv', 'listDmc', 'listDf', 'listDpa', 'listDl'],
        where: { id: idModele }
      }).then(function(modele) {
        if (modele) {
          res.status(201).json(modele);
        } else {
          res.status(404).json({ 'error': 'modele not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': err});
      });
    },
    delModele: function(req, res) {
      // Getting auth header

      var idModele  = req.params.id;
  
      models.SsiModele.destroy({
        where: { id: idModele }
      }).then(function(modele) {
        if (modele) {
          res.status(201).json(modele);
        } else {
          res.status(404).json({ 'error': 'modele not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'impossible de supprimer'});
      });
    }
  }