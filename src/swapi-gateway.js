import axios from 'axios';

const SWAPI_API_ROOT = 'https://swapi.co/api';

export const PEOPLE_TYPE = 'people';
export const PLANETS_TYPE = 'planets';

export const getResidentFullName = async (url) => {
  const { data = {} } = await axios.get(url);
  const { name = '' } = data;
  return name;
}

export default async (type) => {
  let url = `${SWAPI_API_ROOT}/${type}`;
  const responseData = [];
  while (url) {
    const { data } = await axios.get(url);
    const { next, results = [] } = data || {};
    responseData.splice(responseData.length, 0, ...results);
    url = next;
  }
  return responseData;
};
