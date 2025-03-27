const placesRouter = require('express').Router();
const placesController = require('../controllers/placesController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

placesRouter
  .route('/')
  .get(placesController.getAllPlaces)
  .post(verifyAccessToken, placesController.addPlace);

placesRouter.route('/:id').delete(verifyAccessToken, placesController.deletePlace);
placesRouter.get('/:id/info', verifyAccessToken, placesController.gigaPlaceInfo);

placesRouter.route('/users/:userId').get(placesController.getPlacesByUserId);
placesRouter.route('/users/').get(placesController.getUsers);

module.exports = placesRouter;
