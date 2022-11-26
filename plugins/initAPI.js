import { API } from '@/utils/javaBack';

// INIT AXIOS VARIABLES

export default ({ $axios }) => {
  API.initialize($axios);
};
