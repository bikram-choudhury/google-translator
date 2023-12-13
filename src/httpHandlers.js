import axios from 'axios';
const constants = {
  URL: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
  // https://rapidapi.com/googlecloud/api/google-translate1/
  API_KEY: 'SIGNUP TO RAPID API FOR KEY',
};

const getAllLanguages = () => {
  const axiosRef = axios.get(constants.URL, {
    headers: {
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': constants.API_KEY,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
  });
  return axiosRef;
};

export { getAllLanguages };
