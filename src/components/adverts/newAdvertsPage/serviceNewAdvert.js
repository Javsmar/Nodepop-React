import client from "../../../api/client"


const advertsPath = '/api/v1/adverts';

export const createAdvert = newAdvert => {
  return client.post(advertsPath, newAdvert, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};