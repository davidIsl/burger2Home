import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Vue from 'vue';
import { APIResponse } from '@/utils/utils';
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
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        'x-antelopejs-namespace': config.datatable_namespace,
        'x-antelopejs-webauth':
          Vue.prototype.cookies.get('ANTELOPEJS_WEBAUTH') || '',
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
        lang: (body && body.lang) ?? Vue.prototype.i18n.locale,
      },
      {
        validateStatus: () => true,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'x-antelopejs-namespace': config.datatable_namespace,
          'x-antelopejs-webauth':
            Vue.prototype.cookies.get('ANTELOPEJS_WEBAUTH') || '',
        },
      }
    );
    return { data, status };
  }

  static burgerList(): Promise<APIResponse> {
    return this.get('/api/products/burgers');
  }
}