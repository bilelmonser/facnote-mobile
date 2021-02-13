import * as c from '../constants';
import api from './axios';
import moment from 'moment';

export default async function getEnterprise(
  limit,
  page,
  dateDebut,
  dateFin,
  min,
  max,
  numero_compte_search,
) {
  try {
    let path = `${c.GETENTERPRISE}?limit=${limit}&page=${page}`;
    if (dateDebut != null)
      path = `${path}&date_debut=${moment(dateDebut).format('DD/MM/YYYY')}`;
    if (dateFin != null)
      path = `${path}&date_fin=${moment(dateFin).format('DD/MM/YYYY')}`;
    if (min != '') path = `${path}&min=${min}`;
    if (max != '') path = `${path}&max=${max}`;
    if (max != '') path = `${path}&max=${max}`;
    if (numero_compte_search != '')
      path = `${path}&numero_compte_search=${numero_compte_search}`;

    console.log(path);
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
