const dbModels = require('../../db/models');
const { default: Gigachat } = require('gigachat');
require('dotenv').config();

class PlacesService {
  #db;

  #accessToken;

  #giga;

  constructor(db) {
    this.#db = db;
    this.#giga = new Gigachat({
      credentials: process.env.GIGACHAT_AUTH_KEY,
      model: 'GigaChat',
    });
  }

  async getGigaResponseText(place) {
    const resp = await this.#giga.chat({
      messages: [
        {
          role: 'system',
          content:
            'Ты должен сказать какой-то факт о месте, которое я пришлю до 140 символов. Факт должен быть актуальным и полезным для туриста.',
        },
        {
          role: 'user',
          content: `Какой совет ты мне даш, если я хочу поехать в ${place.name} (геолокация ${place.geo})`,
        },
      ],
    });
    return resp.choices[0]?.message.content;
  }

  async getAllPlaces() {
    const places = await this.#db.Place.findAll();
    return places;
  }

  async getPlaceById(id) {
    return this.#db.Place.findOne({ where: { id } });
  }

  async getPlacesByUserId(userId) {
    const places = await this.#db.Place.findAll({
      where: { userId },
      include: { model: this.#db.User, as: 'user' },
    });
    return places.toSorted((a, b) => a.order - b.order);
  }

  async addPlace(place) {
    const allPlaces = await this.#db.Place.findAll();
    const orders = allPlaces.map((p) => p.order);
    const maxOrder = Math.max(...orders);
    return this.#db.Place.create({ ...place, order: maxOrder + 1 });
  }

  async getUsers() {
    const users = await this.#db.User.findAll({
      include: { model: this.#db.Place, as: 'places' },
    });
    return users.map((user) => ({
      ...user.get(),
      places: user.places.toSorted((a, b) => a.order - b.order),
    }));
  }

  async deletePlace(id) {
    const targetPlace = await this.#db.Place.findOne({ where: { id } });
    await this.#db.Place.destroy({ where: { id } });
    const allPlaces = await this.#db.Place.findAll({ order: [['order', 'ASC']] });
    for (const place of allPlaces) {
      if (place.order > targetPlace.order) {
        place.order--;
        await place.save();
      }
    }
    return this.#db.Place.findAll();
  }
}

const placesService = new PlacesService(dbModels);

module.exports = placesService;
