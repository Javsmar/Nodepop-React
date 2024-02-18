import client from "../../../api/client";

export async function getLatestProducts(filters) {
  try {
    const response = await client.get('/api/v1/adverts', {
      params: filters
    });
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
