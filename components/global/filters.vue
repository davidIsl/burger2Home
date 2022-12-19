<template lang="pug">
.text-secondary.filters.p-3
  h3.title {{ $t('pages.filters.title1') }}
  div
    div(v-for='(filter, index) in currentFilters')
      b-form-checkbox(@change='selectFilters(filter.productFamilyId)') {{ filter.name }}
        //- b-badge.ml-2.bg-darkRed {{  }}
      //- font-awesome-icon.mr-3.mt-1.ml-1(:icon='["fa", "tag"]')
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { API } from '@/utils/javaBack';
import { Filters, Product } from '@/utils/utils';

@Component({})
export default class extends Vue {
  @Prop() filters!: Product[];
  // @Prop() numberFilterProduct!: number;

  currentFilters: Filters | null = null;

  mounted() {
    this.filtersList();
  }
  /*
   * Filters List
   */

  async filtersList() {
    const response = await API.filters();

    if (response.status !== 200) {
      return null;
    }

    this.currentFilters = response.data;
    console.log('FiltersCurrent', this.currentFilters);
  }

  async selectFilters(id: number) {
    const response = await API.getProductsByFamily(id);

    if (response.status !== 200) {
      return null;
    }
    // this.filters = response.data;
    // console.log('Filters', this.filters);

    this.$emit('change', response.data);
  }
}
</script>

<style lang="scss" scoped>
.filters {
  background-image: url('@/assets/img/chalkboard.jpg');
  border-radius: 15px !important;
}
</style>
