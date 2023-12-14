import axios from 'axios';
const constants = {
  URL: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  // https://rapidapi.com/googlecloud/api/google-translate1/
  API_KEY: 'SIGNUP TO RAPID API FOR KEY',
  SOURCE_LANG: 'en'
};

const getAllLanguages = () => {
  const URL = `${constants.URL}/languages`;
  const axiosRef = axios.get(URL);
  return axiosRef;
};
const buildPostPayload = (payload) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('q', payload.srcText);
  encodedParams.set('target', payload.targetLang);
  return encodedParams;
}
const postToTranslate = async (payload) => {
  const encodedParams = buildPostPayload(payload);
  encodedParams.set('source', constants.SOURCE_LANG);

  const response = await axios.post(constants.URL, encodedParams);
  return response.data;
}

export { getAllLanguages, postToTranslate };
