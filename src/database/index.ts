import axios from 'axios';

import config from '@config/index';

const database = axios.create({
  baseURL: config.SERVER_URL + '/api',
});

export default database;
