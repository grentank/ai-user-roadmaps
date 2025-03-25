const placesRouter = require('express').Router();
const placesController = require('../controllers/placesController');

placesRouter
  .route('/')
  .get(placesController.getAllPlaces)
  .post(placesController.addPlace);

placesRouter.route('/:id').delete(placesController.deletePlace);
placesRouter.get('/:id/info', placesController.gigaPlaceInfo);

placesRouter.route('/users/:userId').get(placesController.getPlacesByUserId);
placesRouter.route('/users/').get(placesController.getUsers);

module.exports = placesRouter;
