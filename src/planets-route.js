import express from 'express';
import getData, { PLANETS_TYPE, getResidentFullName } from './swapi-gateway';

const router = express.Router();

// sort -> 'name', 'height', or 'mass', default to no sorting
router.get('/', async (req, res) => {
  try {
    const { query: { sortBy } } = req;
    const planets = await getData(PLANETS_TYPE) || [];
    for (let planetIndex in planets) {
      const planet = planets[planetIndex] || {};
      const { residents = [] } = planet;
      for (let residentIndex in residents) {
        const residentDataUrl = residents[residentIndex];
        planet.residents[residentIndex] = await getResidentFullName(residentDataUrl);
      }
    }
    res.json(planets);
  } catch(e) {
    res.sendStatus(500);
  }
});

export default router;
