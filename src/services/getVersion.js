import * as c from '../constants';
import api from './axios';

export default async function getVersion(
  app,
  type
) {
  try {
    
    
    let path = `/api/v1/mobile-application/versions?application=${app}&type=${type}`;
    
    
    console.log("path",path);
    let res = await api.get(path, {
      withCredentials: true,
      credentials: 'include',
    });

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

function handler(err) {
  let error = err;

  if (err.response && err.response.data.hasOwnProperty('message'))
    error = err.response.data;
  else if (!err.hasOwnProperty('message')) error = err.toJSON();

  return new Error(error.message);
}
