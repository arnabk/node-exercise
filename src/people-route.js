import express from 'express';
import getData, { PEOPLE_TYPE } from './swapi-gateway';
import isEmpty from 'lodash/isEmpty';
import lodashSortBy from 'lodash/sortBy';

const router = express.Router();
const supportSortingProperties = ['name', 'height', 'mass'];
const sortData = (sortBy, data = []) => lodashSortBy(data, s => {
  const { name, height, mass } = s;
  let resp = '';
  switch (sortBy) {
    case 'name':
      resp = name;
      break;
    case 'height':
      resp = parseFloat(height, 10) || 0;
      break;
    case 'mass':
      resp = parseFloat(mass, 10) || 0;
      break;
    default:
      return;
  }
  return resp;
});

// sort -> 'name', 'height', or 'mass', default to no sorting
router.get('/', async (req, res) => {
  try {
    const { query: { sortBy } } = req;
    const people = await getData(PEOPLE_TYPE);
    if (!isEmpty(sortBy) && supportSortingProperties.find(f => f === sortBy)) {
      res.json(sortData(sortBy, people));
    } else {
      res.json(people);
    }
  } catch(e) {
    res.sendStatus(500);
  }
});

export default router;
