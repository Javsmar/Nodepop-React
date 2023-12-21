import client from "../../../api/client";

const productsUrl = "/api/v1/adverts";

export const getLatestProducts = () => {
  return client.get(productsUrl);
};
