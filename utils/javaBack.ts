import { NuxtAxiosInstance } from '@nuxtjs/axios';
// import Vue from 'vue';
import {
  APIDataResponse,
  APIResponse,
  Ingredients,
  Product,
} from '@/utils/utils';
const config =
  require('./../config.json')[process.env.NODE_ENV || 'development'];

export class API {
  static axios: NuxtAxiosInstance;

  static initialize(axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  private static async get(endpoint: string): Promise<APIResponse> {
    const { data, status } = await this.axios.get(config.api_url + endpoint, {
      withCredentials: true,
      // validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { data, status };
  }

  private static async post(
    endpoint: string,
    body?: any
  ): Promise<APIResponse> {
    const { data, status } = await this.axios.post(
      config.api_url + endpoint,
      {
        ...body,
        // lang: (body && body.lang) ?? Vue.prototype.i18n.locale,
      },
      {
        validateStatus: () => true,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // 'x-antelopejs-namespace': config.datatable_namespace,
          // 'x-antelopejs-webauth':
          //   Vue.prototype.cookies.get('ANTELOPEJS_WEBAUTH') || '',
        },
      }
    );
    return { data, status };
  }

  /*
   * ENDPOINT PRODUCT SUMMARY
   */
  static burgerList(lang: string): Promise<APIDataResponse<Product>> {
    return this.get(
      '/products/summaries?language=' +
        lang.toUpperCase() +
        '&availableProductsOnly=false'
    );
  }

  /*
   * ENDPOINT PRODUCTS FAMILY (FILTERS)
   */

  static filters(): Promise<APIResponse> {
    return this.get('/products/families/translations');
  }

  static getProductsByFamily(id: number): Promise<APIDataResponse<Product>> {
    return this.get('/products/families/' + id + '/products');
  }

  /*
   * ENDPOINT INGREDIENTS
   */

  static ingredientsList(): Promise<APIDataResponse<Ingredients>> {
    return this.get('/ingredients/translations');
  }

  /*
   * CREATE PRODUCTS
   */

  static addProducts(
    image: string,
    ingredients: number[],
    families: number[]
  ): Promise<APIResponse> {
    return this.post('/products', { image, ingredients, families });
  }

  static addProductsTranslation(): Promise<APIResponse> {
    return this.get('/products/translations');
  }
}
