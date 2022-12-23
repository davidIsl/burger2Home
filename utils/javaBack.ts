import { NuxtAxiosInstance } from '@nuxtjs/axios';
// import Vue from 'vue';
import {
  APIDataResponse,
  APIResponse,
  Ingredients,
  Families,
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
        // validateStatus: () => true,
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

  private static async postFormData(
    endpoint: string,
    body?: any
  ): Promise<APIResponse> {
    const { data, status } = await this.axios.post(
      config.api_url + endpoint,
      body,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
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
      `/products/summaries?language=${lang.toUpperCase()}&availableProductsOnly=true`
    );
  }

  /*
   * ENDPOINT GET PRODUCT IMAGE
   */

  static getImages(productId: number): Promise<APIResponse> {
    return this.get(`/products/${productId}/image`);
  }

  /*
   * ENDPOINT PRODUCTS FAMILY (FILTERS)
   */

  static filters(): Promise<APIResponse> {
    return this.get('/products/families/translations');
  }

  static getProductsByFamily(id: number): Promise<APIDataResponse<Product>> {
    return this.get(`/products/${id}/families`);
  }

  /*
   * ENDPOINT INGREDIENTS
   */

  static ingredientsList(lang: string): Promise<APIDataResponse<Ingredients>> {
    return this.get(`/ingredients/translations?language=${lang.toUpperCase()}`);
  }

  /*
   * CREATE PRODUCTS
   */

  static addProducts(
    ingredients: Ingredients[],
    productFamilies: Families[],
    onMenu: boolean
  ): Promise<APIResponse> {
    return this.post('/products', { ingredients, productFamilies, onMenu });
  }

  static addProductsTranslation(): Promise<APIResponse> {
    return this.get('/products/translations');
  }
  /**
   *
   * ENDPOINT UIPLOAD PRODUCT IMAGE
   */

  static uploadImage(
    productId: number,
    imageName: FormData
  ): Promise<APIResponse> {
    return this.postFormData(`/products/${productId}/image`, imageName);
  }
}
