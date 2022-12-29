import { NuxtAxiosInstance } from '@nuxtjs/axios';
// import Vue from 'vue';
import {
  APIDataResponse,
  APIResponse,
  Ingredients,
  Families,
  Product,
  Language,
  Price,
  Allergens,
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

  private static async del(endpoint: string): Promise<APIResponse> {
    const { data, status } = await this.axios.delete(
      config.api_url + endpoint,
      {
        withCredentials: true,
        // validateStatus: () => true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return { data, status };
  }

  /**
   * ENDPOINT LANGUAGES
   */
  /**
   * GET LANGUAGES
   */

  static languagesList(): Promise<APIDataResponse<Language>> {
    return this.get('/languages');
  }

  /**
   * GET LANGUAGE BY ID
   * @param languageId
   * @returns Language
   */

  static getLanguageById(id: number): Promise<APIResponse> {
    return this.get(`/languages/${id}`);
  }

  // PRODUCT ENDPOINT

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

  static familiesList(lang: string): Promise<APIDataResponse<Families>> {
    return this.get(
      `/products/families/translations?language=${lang.toUpperCase()}`
    );
  }

  static getProductsByFamily(id: number): Promise<APIDataResponse<Product>> {
    return this.get(`/products/${id}/families`);
  }

  // static getFamilyById(id: number): Promise<APIResponse> {
  //   return this.get(`/products/families/${id}`);
  // }

  /**
   * ENDPOINT FAMILY CRUD
   */
  /**
   * CREATE FAMILY
   * @returns family
   */

  static addFamily(): Promise<APIResponse> {
    return this.post(`/products/families`);
  }

  /**
   * CREATE FAMILY TRANSLATION
   * @param productFamilyId
   * @param language
   * @param description
   * @param name
   * @returns Faimily Translation
   */

  static addFamilyTranslation(
    productFamilyId: number,
    language: Language,
    description: string,
    name: string
  ): Promise<APIResponse> {
    return this.post(`/products/families/translations`, {
      productFamilyId,
      language,
      description,
      name,
    });
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

  /**
   * ENDPOINT CREATE TRANSLATION FOR A PRODUCT
   */
  static addProductsTranslation(
    description: string,
    name: string,
    language: Language,
    productId: number
  ): Promise<APIResponse> {
    return this.post('/products/translations', {
      description,
      name,
      language,
      productId,
    });
  }

  /**
   * ENDPOINT SET PRODUCT PRICE
   */
  static setProductPrice(
    productId: number,
    amount: Price
  ): Promise<APIResponse> {
    return this.post(`/products/${productId}/prices/current`, amount);
  }

  /**
   *
   * ENDPOINT UPLOAD PRODUCT IMAGE
   */

  static uploadImage(
    productId: number,
    imageName: FormData
  ): Promise<APIResponse> {
    return this.postFormData(`/products/${productId}/image`, { imageName });
  }

  /**
   * INGREDIENTS LIST TRANSLATION
   * @returns LIST INGREDIENTS
   */

  static ingredientsList(): Promise<APIDataResponse<Ingredients>> {
    return this.get(`/ingredients/translations`);
  }

  /**
   * INGREDIENTS LIST BY LANGUAGE
   * @param lang
   * @returns List Ingredients
   */

  static ingredientsListByLang(
    lang: string
  ): Promise<APIDataResponse<Ingredients>> {
    return this.get(`/ingredients/translations?language=${lang.toUpperCase()}`);
  }

  /**
   * GET INGREDIENTS BY ID
   * @param id
   * @returns INGREDIENTS
   */

  static getIngredientsById(id: number): Promise<APIResponse> {
    return this.get(`/ingredients/${id}`);
  }

  /**
   * GET INGREDIENTS TRANSLATION BY ID
   * @param id
   * @returns INGREDIENTS TRANSLATION
   */

  static getIngredientsTranslationById(
    id: number
  ): Promise<APIDataResponse<Ingredients>> {
    return this.get(`/ingredients/${id}/translations`);
  }

  /**
   * ENDPOINT CREATE INGREDIENTS
   */

  static addIngredient(allergens: Allergens[]): Promise<APIResponse> {
    return this.post(`/ingredients`, { allergens });
  }

  /**
   * ENDPOINT CREATE INGREDIENTS TRANSLATION
   */

  static addIngredientTranslation(
    name: string,
    language: Language,
    ingredientId: number
  ): Promise<APIResponse> {
    return this.post(`/ingredients/translations`, {
      name,
      language,
      ingredientId,
    });
  }

  /**
   * DELETE INGREDIENTS WITH TRANSLATION
   * @param id
   * @returns
   */

  static deleteIngredients(id: number): Promise<APIResponse> {
    return this.del(`/ingredients/${id}`);
  }

  /**
   * ENDPOINT ALLERGENS
   */

  /**
   * ALLERGENS LIST
   * @returns All Allergens Translation
   */

  static allergensList(): Promise<APIDataResponse<Allergens>> {
    return this.get(`/allergens/translations`);
  }

  /**
   * ALLERGENS LIST BY LANG
   * @param lang
   * @returns LIST ALLERGENS
   */
  static allergensListByLang(
    lang: string
  ): Promise<APIDataResponse<Allergens>> {
    return this.get(`/allergens/translations?language=${lang.toUpperCase()}`);
  }

  /**
   * GET ALLERGEN BY ID
   * @param id
   * @returns Allergen
   */

  static getAllergenById(id: number): Promise<APIResponse> {
    return this.get(`/allergens/${id}`);
  }

  /**
   * GET ALLERGENS TRANSLATION BY ID
   * @param id
   * @returns Allergens WITH ALL TRANSLATAION
   */

  static getAllergensTranslationById(
    id: number
  ): Promise<APIDataResponse<Allergens>> {
    return this.get(`/allergens/${id}/translations`);
  }
  /**
   * CREATE ALLERGEN
   * @returns Allergen
   */

  static addAllergen(): Promise<APIResponse> {
    return this.post(`/allergens`);
  }

  /**
   * CREATE ALLERGENS TRANSLATION
   * @param name
   * @param language
   * @param allergenId
   * @returns Allergens Translation
   */
  static addAllergenTranslation(
    name: string,
    language: Language,
    allergenId: number
  ): Promise<APIResponse> {
    return this.post(`/allergens/translations`, { name, language, allergenId });
  }

  /**
   * DELETE ALLERGENS WITH TRANSLATION
   * @param id
   * @returns
   */

  static deleteAllergen(id: number): Promise<APIResponse> {
    return this.del(`/allergens/${id}`);
  }
}
