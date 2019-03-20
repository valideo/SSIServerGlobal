var express      = require('express');
var brandsCtrl    = require('./routes/brandsCtrl');
var modelesCtrl    = require('./routes/modelesCtrl');

// Router
exports.router = (function() {
    var apiRouter = express.Router();
  
    // Brand routes
    apiRouter.route('/brand/new/').post(brandsCtrl.create);
    apiRouter.route('/brand/:id/').get(brandsCtrl.getBrand);
    apiRouter.route('/brand/:id/').delete(brandsCtrl.delBrand);
    apiRouter.route('/brands/').get(brandsCtrl.listBrands);

    //Modeles routes
    apiRouter.route('/modele/new/').post(modelesCtrl.create);
    apiRouter.route('/modeles/:id/').get(modelesCtrl.listModeles);
    apiRouter.route('/modele/:id/').get(modelesCtrl.getModele);
    apiRouter.route('/modele/:id/').delete(modelesCtrl.delModele);


    //Components routes

  
    return apiRouter;
  })();