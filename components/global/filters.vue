<template lang="pug">
.text-secondary.filters.p-3
  h3.font-weight-bold {{ $t('pages.filters.title1') }}
  div
    div(v-for='(filter, index) in filters')
      p {{ filter.name }}

      //- font-awesome-icon.mr-3.mt-1.ml-1(:icon='["fa", "tag"]')
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { API } from '@/utils/javaBack';
import { Filters } from '@/utils/utils';

@Component({})
export default class extends Vue {
  filters: Filters | null = null;

  mounted() {
    this.filtersList();
  }
  /*
   * Filters List
   */

  async filtersList() {
    const response = await API.filters();

    if (response.status !== 200) {
      return;
    }

    this.filters = response.data;
  }
}
</script>

<style lang="scss" scoped>
.filters {
  background-image: url('@/assets/img/chalkboard.jpg');
  border-radius: 15px !important;
}
</style>
