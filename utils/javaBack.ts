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
  Promo,
  Stock,
  UserCurrent,
  Address,
  BasketLine,
  Role,
  FamilyType,
  Order,
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
        // withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return { data, status };
  }

  private static async update(
    endpoint: string,
    body?: any
  ): Promise<APIResponse> {
    const { data, status } = await this.axios.put(
      config.api_url + endpoint,
      {
        ...body,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
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

  /********************
   * PRODUCT ENDPOINT *
   *                  *
   *******************/

  static productList(): Promise<APIDataResponse<Product>> {
    return this.get(`/products/summaries`);
  }

  /**
   * PRODUCT SUMMARY BY LANG
   * @param lang
   * @returns PRODUCT SUMMARY BY LANG
   */

  static getProductSummaryByLang(
    lang: string
  ): Promise<APIDataResponse<Product>> {
    return this.get(`/products/summaries?language=${lang.toUpperCase()}`);
  }

  /**
   * PRODUCT SUMMARY BY LANG AND ID
   * @param lang
   * @param id
   * @returns PRODUCT SUMMARY BY ID AND LANG
   */

  static getProductSumByLangAndId(
    lang: string,
    id: number
  ): Promise<APIResponse> {
    return this.get(`/products/summaries/${id}?language=${lang.toUpperCase()}`);
  }

  /**
   * PRODUCT SUMMARY AVAILABLE BY LANG
   * @param lang
   * @returns PRODUCT SUMMARY
   */

  static productAvailableListByLang(
    lang: string,
    type: number
  ): Promise<APIDataResponse<Product>> {
    return this.get(
      `/products/summaries?language=${lang.toUpperCase()}&availableProductsOnly=true&mustBeOnMenu=true&type=${type}`
    );
  }

  /**
   * PRODUCT SUMMARY ALL TRANSLATION BY ID
   * @param id
   * @returns PRODUCT SUMMARY
   */

  static getProductSummaryById(id: number): Promise<APIResponse> {
    return this.get(`/products/summaries/${id}`);
  }

  /**
   * GET ALL PRODUCT TRANSLATION BY ID
   * @param id
   * @returns PRODUCT TRANSLATION []
   */

  static getProductTranslationById(
    id: number
  ): Promise<APIDataResponse<Product>> {
    return this.get(`/products/${id}/translations`);
  }

  /**
   * GET PRODUCTS BY ID
   * @param id
   * @returns PRODUCTS
   */

  static getProductById(id: number): Promise<APIResponse> {
    return this.get(`/products/${id}`);
  }

  /*
   * ENDPOINT GET PRODUCT IMAGE
   */

  static getImages(productId: number): Promise<APIResponse> {
    return this.get(`/products/${productId}/image`);
  }

  /**
   * UPDATE PRODUCT
   * @param id
   * @param imageName
   * @param ingredients
   * @param productFamilies
   * @param onMenu
   * @returns UPDATED PRODUCTS
   */

  static updateProducts(
    id: number,
    imageName: string,
    ingredients: Ingredients[],
    productFamilies: Families[],
    onMenu: boolean
  ): Promise<APIResponse> {
    return this.update(`/products`, {
      id,
      imageName,
      ingredients,
      productFamilies,
      onMenu,
    });
  }

  /**
   * UPDATE PRODUCT TRANSLATION
   * @param id
   * @param description
   * @param name
   * @param language
   * @param productId
   * @returns UPDATED PRODUCT TRANSLATION
   */

  static updateProductTranslation(
    id: number,
    description: string,
    name: string,
    language: Language,
    productId: number
  ): Promise<APIResponse> {
    return this.update(`/products/translations`, {
      id,
      description,
      name,
      language,
      productId,
    });
  }

  /************************
   * ENDPOINT FAMILY TYPE *
   *                      *
   ***********************/

  static getTypesList(): Promise<APIDataResponse<FamilyType>> {
    return this.get(`/types/translations`);
  }

  /**
   * ENDPOINT FAMILY
   */

  /*
   * ENDPOINT PRODUCTS FAMILY (FILTERS)
   */

  static familiesListByLang(lang: string): Promise<APIDataResponse<Families>> {
    return this.get(
      `/products/families/translations?language=${lang.toUpperCase()}`
    );
  }

  static getProductsByFamily(id: number): Promise<APIDataResponse<Product>> {
    return this.get(`/products/${id}/families`);
  }

  /**
   * GET FAMILY BY ID
   * @param id
   * @returns FAMILY
   */

  static getFamilyById(id: number): Promise<APIResponse> {
    return this.get(`/products/families/${id}`);
  }

  /**
   * GET ALL FAMILY TRANSLATION
   * @returns Family TRANSLATION []
   */

  static familyList(): Promise<APIDataResponse<Families>> {
    return this.get(`/products/families/translations`);
  }

  /**
   * GET FAMILY TRANSLATION BY ID
   * @param id
   * @returns FAMILY TRANSLATION[]
   */

  static getFamilyTranslationById(
    id: number
  ): Promise<APIDataResponse<Families>> {
    return this.get(`/products/families/${id}/translations`);
  }

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
   * @returns Family Translation
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

  /**
   * UPDATE FAMILY TRANSLATION
   * @param id
   * @param productFamilyId
   * @param language
   * @param description
   * @param name
   * @returns FAMILY TRANSLATION UPDATED
   */

  static updateFamilyTranslation(
    id: number,
    productFamilyId: number,
    language: Language,
    description: string,
    name: string
  ): Promise<APIResponse> {
    return this.update(`/products/families/translations`, {
      id,
      productFamilyId,
      language,
      description,
      name,
    });
  }

  /**
   * DELETE FAMILY
   * @param id
   * @returns FAMILY DELETED WITH STATUS
   */

  static deleteFamily(id: number): Promise<APIResponse> {
    return this.del(`/products/families/${id}`);
  }

  /**
   * CREATE A NEW PRODUCT
   * @param ingredients
   * @param productFamilies
   * @param typeId
   * @param imageName
   * @param onMenu
   * @returns PRODUCTS CREATED
   */

  static addProducts(
    ingredients: Ingredients[],
    productFamilies: Families[],
    typeId: number,
    onMenu: boolean
  ): Promise<APIResponse> {
    return this.post('/products', {
      ingredients,
      productFamilies,
      typeId,
      onMenu,
    });
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

  /************************
   * ENDPOINT INGREDIENTS *
   *                      *
   ***********************/

  /**
   * GET INGREDIENTS LIST
   * @returns LIST INGREDIENTS
   */

  static getIngredientsList(): Promise<APIDataResponse<Ingredients>> {
    return this.get(`/ingredients`);
  }

  /**
   * INGREDIENTS LIST TRANSLATION
   * @returns LIST INGREDIENTS TRANSLATION
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
   * GET INGREDIENTS TRANSLATION BY ID AND BY LANG
   * @param ingredientId
   * @param lang
   * @returns INGREDIENT TRANSLATION
   */

  static getIngredientsTranslationByIdAndLang(
    ingredientId: number,
    lang: string
  ): Promise<APIResponse> {
    return this.get(
      `/ingredients/${ingredientId}/translations?language=${lang.toUpperCase()}`
    );
  }

  /**
   * CREATE A NEW INGREDIENTS
   * @param allergens
   * @returns INGREDIENTS CREATED
   */

  static addIngredient(allergens: Allergens[]): Promise<APIResponse> {
    return this.post(`/ingredients`, { allergens });
  }

  /**
   * CREATE A NEW INGREDIENT TRANSLATION
   * @param name
   * @param language
   * @param ingredientId
   * @returns INGREDIENTS TRANSLATION CREATED
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
   * ENDPOINT SET STOCK FOR INGREDIENTS
   * @param ingredientId
   * @param amount
   * @param creationDate
   * @returns
   */

  static addStockIngredients(
    ingredientId: number,
    amount: number,
    creationDate: string
  ): Promise<APIResponse> {
    return this.post(`/stocks`, { ingredientId, amount, creationDate });
  }

  /**
   * UPDATE INGREDIENTS
   * @param allergens
   * @returns Ingredients Updated
   */

  static updateIngredient(
    id: number,
    allergens: Allergens[]
  ): Promise<APIResponse> {
    return this.update(`/ingredients`, { id, allergens });
  }

  /**
   * UPDATE INGREDIENTS TRANSLATION
   * @param id
   * @param name
   * @param language
   * @param ingredientId
   * @returns updated Ingredients Translation
   */

  static updateIngredientTranslation(
    id: number,
    name: string,
    language: Language,
    ingredientId: number
  ): Promise<APIResponse> {
    return this.update(`/ingredients/translations`, {
      id,
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

  /******************
   * STOCK ENDPOINT *
   *                *
   *****************/

  /**
   * GET ALL STOCKS
   * @returns STOCK LIST
   */

  static getAllStocks(): Promise<APIDataResponse<Stock>> {
    return this.get(`/stocks`);
  }

  /**
   * GET STOCK BY INGREDIENTS
   * @param id
   * @returns STOCK
   */

  static getStocks(id: number): Promise<APIDataResponse<Stock>> {
    return this.get(`/ingredients/${id}/stocks`);
  }

  /**
   * UPDATE STOCK INGREDIENTS
   * @param id
   * @param ingredientId
   * @param amount
   * @param creationDate
   * @returns STOCK UPDATED
   */

  static updateStock(
    id: number,
    ingredientId: number,
    amount: number,
    creationDate: string
  ): Promise<APIResponse> {
    return this.update(`/stocks`, { id, ingredientId, amount, creationDate });
  }

  /**********************
   * ENDPOINT ALLERGENS *
   *                    *
   *********************/

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
   * UPDATE ALLERGEN TRANSLATION
   * @param id
   * @param name
   * @param language
   * @param allergenId
   * @returns ALLERGEN TRANSLATION UPDATED
   */

  static updateAllergenTranslation(
    id: number,
    name: string,
    language: Language,
    allergenId: number
  ): Promise<APIResponse> {
    return this.update(`/allergens/translations`, {
      id,
      name,
      language,
      allergenId,
    });
  }

  /**
   * DELETE ALLERGENS WITH TRANSLATION
   * @param id
   * @returns
   */

  static deleteAllergen(id: number): Promise<APIResponse> {
    return this.del(`/allergens/${id}`);
  }

  /******************
   * ENDPOINT PROMO *
   *                *
   *****************/

  /**
   * Get PROMO
   * @returns ALL Promo
   */

  static getPromoList(): Promise<APIDataResponse<Promo>> {
    return this.get(`/promotions`);
  }

  static getPromoById(id: number): Promise<APIResponse> {
    return this.get(`/promotions/${id}`);
  }
  /**
   * GET PROMO TRANSLATION
   * @returns All Promo Translation
   */

  static getPromoTranslationList(): Promise<APIDataResponse<Promo>> {
    return this.get(`/promotions/translations`);
  }

  /**
   * GET PROMO TRANSLATION BY LANG
   * @param lang
   * @returns PROMO TRANSLATION
   */

  static getPromoTranslationListByLang(lang: string) {
    return this.get(`/promotions/translations?language=${lang.toUpperCase()}`);
  }

  static getPromoTranslationByPromoId(id: number) {
    return this.get(`/promotions/${id}/translations`);
  }

  /**
   * CREATE A NEW PROMOTION
   * @param amount
   * @param creationDate
   * @param startDate
   * @param endDate
   * @param products
   * @returns CREATED PROMOTION
   */

  static addPromo(
    amount: number,
    creationDate: string,
    startDate: string,
    endDate: string,
    products: Product[]
  ): Promise<APIResponse> {
    return this.post(`/promotions`, {
      amount,
      creationDate,
      startDate,
      endDate,
      products,
    });
  }

  /**
   * CREATE PROMOTION TRANSLATION
   * @param description
   * @param promotionId
   * @param language
   * @returns CEATED PROMOTION TRANSLATION
   */

  static addPromoTranslation(
    description: string,
    promotionId: number,
    language: Language
  ): Promise<APIResponse> {
    return this.post(`/promotions/translations`, {
      description,
      promotionId,
      language,
    });
  }

  /**
   * UPDATE A PROMOTION
   * @param id
   * @param amount
   * @param creationDate
   * @param startDate
   * @param endDate
   * @param product
   * @returns PROMOTION UPDATED
   */

  static updatePromo(
    id: number,
    amount: number,
    creationDate: string,
    startDate: string,
    endDate: string,
    product: Product[]
  ): Promise<APIResponse> {
    return this.update(`/promotions`, {
      id,
      amount,
      creationDate,
      startDate,
      endDate,
      product,
    });
  }

  /**
   * UPDATE PROMOTION TRANSLATION
   * @param id
   * @param description
   * @param promotionId
   * @param language
   * @returns UPDATED PROMOTION TRANSLATION
   */

  static updatePromoTranslation(
    id: number,
    description: string,
    promotionId: number,
    language: Language
  ): Promise<APIResponse> {
    return this.update(`/promotions/translations`, {
      id,
      description,
      promotionId,
      language,
    });
  }

  /******************
   * USERS ENDPOINT *
   *                *
   *****************/

  /**
   * GET ALL USERS
   * @returns LIST USERS
   */

  static getUsersList(): Promise<APIDataResponse<UserCurrent>> {
    return this.get(`/users`);
  }

  /**
   * GET USER BY ID
   * @param userId
   * @returns USER
   */

  static getUserById(userId: number): Promise<APIResponse> {
    return this.get(`/users/${userId}`);
  }

  /**
   * CREATE A NEW USER
   * @param email
   * @param firstname
   * @param lastname
   * @param password
   * @param username
   * @returns CREATED USER
   */

  static addUser(
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    username: string
  ): Promise<APIResponse> {
    return this.post(`/users`, {
      email,
      firstname,
      lastname,
      password,
      username,
    });
  }

  /**
   * UPDATE A USER
   * @param id
   * @param email
   * @param firstName
   * @param lastname
   * @param imageUrl
   * @param password
   * @param status
   * @param username
   * @param role
   * @returns USER UPDATED
   */

  static updateUser(
    id: number,
    email: string,
    firstname: string,
    lastname: string,
    imageURL: string,
    password: string,
    status: string,
    username: string,
    role: Role
  ): Promise<APIResponse> {
    return this.update(`/users`, {
      id,
      email,
      firstname,
      lastname,
      imageURL,
      password,
      status,
      username,
      role,
    });
  }

  /******************
   * ENDPOINT ROLES *
   *                *
   *****************/

  /**
   * GET ALL ROLES
   * @returns ROLE LIST
   */

  static getRoles(): Promise<APIDataResponse<Role>> {
    return this.get(`/roles`);
  }

  /**
   * GET ROLE BY ID
   * @param roleId
   * @returns ROLE
   */

  static getRoleById(roleId: number) {
    return this.get(`/roles/${roleId}`);
  }

  /***********************
   * ENDPOINT ADDRESSES  *
   *                     *
   **********************/

  /**
   * GET ADDRESS BY ID
   * @param addressId
   * @returns ADDRESS
   */

  static getAddressById(addressId: number): Promise<APIResponse> {
    return this.get(`/addresses/${addressId}`);
  }

  /**
   * GET ADDRESS BY USER ID
   * @param userId
   * @returns ADDRESS LIST
   */

  static getAddressByUser(userId: number): Promise<APIDataResponse<Address>> {
    return this.get(`/users/${userId}/addresses`);
  }

  /********************
   * ENDPOINT BASKET  *
   *                  *
   *******************/

  /**
   * GET BASKET BY ID
   * @param basketId
   * @returns BASKET
   */

  static getBasketById(basketId: number): Promise<APIResponse> {
    return this.get(`/baskets/${basketId}`);
  }

  /**
   * UPDATE A BASKET
   * @param id
   * @param lastUpdate
   * @param userId
   * @param basketLines
   * @returns UPDATED BASKET
   */

  static updateBasket(
    id: number,
    lastUpdate: string,
    userId: number
  ): Promise<APIResponse> {
    return this.update(`/baskets`, { id, lastUpdate, userId });
  }

  /**
   * GET BASKET BY USER ID
   * @param userId
   * @returns BASKET
   */

  static getBasketByUserId(userId: number): Promise<APIResponse> {
    return this.get(`/users/${userId}/basket`);
  }

  /************************
   * ENDPOINT BASKETLINE  *
   *                      *
   ***********************/

  /**
   * GET BASKETLINES BY BASKET ID
   * @param basketId
   * @returns LIST BASKETLINE
   */
  static getBasketLinesByBasketId(
    basketId: number
  ): Promise<APIDataResponse<BasketLine>> {
    return this.get(`/baskets/${basketId}/basketLines`);
  }

  /**
   * ADD BASKETLINE
   * @param basketId
   * @param productId
   * @param amount
   * @returns CREATED BASKETLINE
   */

  static addBasketLine(
    basketId: number,
    productId: number,
    amount: number
  ): Promise<APIResponse> {
    return this.post(`/basketLines`, { basketId, productId, amount });
  }

  /**
   * UPDATE BASKET LINE
   * @param basketLineId
   * @param basketId
   * @param productId
   * @param amount
   * @returns BASKET LINE UPDATED
   */

  static updateBasketLine(
    basketLineId: number,
    basketId: number,
    productId: number,
    amount: number
  ) {
    return this.update(`/basketLines`, {
      basketLineId,
      basketId,
      productId,
      amount,
    });
  }

  /**
   * DELETE BASKETLINE
   * @param basketLineId
   * @returns DELETED BASKETLINE
   */

  static removeBasketLine(basketLineId: number): Promise<APIResponse> {
    return this.del(`/basketLines/${basketLineId}`);
  }

  /******************
   * ENDPOINT ORDER *
   *                *
   *****************/

  /**
   * GET ALL ORDERS BY USER ID
   * @param userId
   * @returns ORDERS LIST
   */

  static getAllOrdersByUserId(userId: number): Promise<APIDataResponse<Order>> {
    return this.get(`/users/${userId}/orders`);
  }

  /**
   * ADD A NEW ORDER
   * @param basketId
   * @param addressId
   * @returns ORDER CREATED
   */

  static addOrder(basketId: number, addressId: number): Promise<APIResponse> {
    return this.get(
      `/orders/create-order?addressIdentifier=${addressId}&basketIdentifier=${basketId}`
    );
  }

  /**
   * GET STRIPE PAYMENT METHOD
   * @returns PAYMENT METHOD
   */

  static getStripePaymentMethod(): Promise<APIResponse> {
    return this.get(`/orders/stripe/create-payment-method`);
  }

  /**
   * CONFIRM PAYMENT
   * @param orderId
   * @param paymentMethod
   * @returns
   */

  static confirmPayment(
    orderId: number,
    paymentMethod: string
  ): Promise<APIResponse> {
    return this.get(
      `/orders/confirm-order?orderIdentifier=${orderId}&paymentMethodIdentifier=${paymentMethod}`
    );
  }

  /**
   * CONFIRM SHIPMENT
   * @param orderId
   * @returns
   */

  static confirmShipment(orderId: number) {
    return this.get(`/orders/confirm-delivery?orderIdentifier=${orderId}`);
  }

  // static getClientSecret(order)
}
