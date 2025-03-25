const placesService = require('../services/placesService');

class PlacesController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getAllPlaces = async (req, res) => {
    try {
      const places = await this.#service.getAllPlaces();
      res.status(200).json(places);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Возникла ошибка получения мест' });
    }
  };

  getPlacesByUserId = async (req, res) => {
    try {
      const places = await this.#service.getPlacesByUserId(req.params.userId);
      res.status(200).json(places);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
        text: 'Возникла ошибка получения мест по userId',
      });
    }
  };

  addPlace = async (req, res) => {
    try {
      const place = await this.#service.addPlace({
        ...req.body,
        userId: res.locals.user.id,
      });
      res.status(201).json(place);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Возникла ошибка добавления места' });
    }
  };

  deletePlace = async (req, res) => {
    try {
      await this.#service.deletePlace(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Возникла ошибка удаления места' });
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await this.#service.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          message: error.message,
          text: 'Возникла ошибка получения пользователей',
        });
    }
  };

  gigaPlaceInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const place = await placesService.getPlaceById(id);
      const text = await placesService.getGigaResponseText(place);
      res.json({ text });
    } catch (error) {
      console.log(error);
      res.status(500).json({ text: 'Ошибка' });
    }
  }
}

const placesController = new PlacesController(placesService);

module.exports = placesController;
