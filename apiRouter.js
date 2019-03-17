var express      = require('express');
var usersCtrl    = require('./routes/technicienCtrl');
var clientCtrl    = require('./routes/clientCtrl');
var siteCtrl    = require('./routes/siteCtrl');

// Router
exports.router = (function() {
    var apiRouter = express.Router();
  
    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

    // Client routes
    apiRouter.route('/client/new/').post(clientCtrl.create);
    apiRouter.route('/clients/').get(clientCtrl.listClients);
    apiRouter.route('/client/:id').get(clientCtrl.getClient);

    //Site routes
    apiRouter.route('/site/new/').post(siteCtrl.create);
    apiRouter.route('/sites/:id').get(siteCtrl.listSites);
    apiRouter.route('/site/:id').get(siteCtrl.getSite);

  
    return apiRouter;
  })();