<template lang="pug">
.text-secondary.filters.p-3
  h3.title {{ $t('pages.filters.title1') }}
  div
    div(v-for='(filter, index) in currentFilters')
      b-form-checkbox(
        v-model='checked'
        @change='selectFilters(filter.productFamilyId)'
      ) {{ filter.name }}
        //- b-badge.ml-2.bg-darkRed {{  }}
      //- font-awesome-icon.mr-3.mt-1.ml-1(:icon='["fa", "tag"]')
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { API } from '@/utils/javaBack';
import { Filter } from '@/utils/utils';

@Component({})
export default class extends Vue {
  // @Prop() filters!: Families[];
  @Prop() type!: number;

  checked: boolean = false;

  currentFilters: Filter[] = [];
  // selectedFilters: Families[] = [];

  mounted() {
    this.filtersList();
  }
  /*
   * Filters List
   */

  async filtersList() {
    const response = await API.familiesListByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.currentFilters = response.data.map((item) => ({
      id: item.productFamilyId,
      name: item.name,
      productFamilyId: item.productFamilyId,
    }));
    console.log('FiltersCurrent', this.currentFilters);
  }

  async selectFilters(familyId: number) {
    if (this.checked) {
      const response = await API.getProductsSumByLangAndFamilies(
        this.$i18n.locale,
        this.type,
        familyId
      );

      if (response.status !== 200) {
        return null;
      }
      console.log('FAMILY ID', familyId);

      // this.filters = response.data;
      // console.log('Filters', this.filters);

      this.$emit('change', response.data);
    } else {
      const response = await API.productAvailableListByLang(
        this.$i18n.locale,
        1
      );

      if (response.status !== 200) {
        return null;
      }

      this.$emit('change', response.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  background-image: url('@/assets/img/chalkboard.jpg');
  border-radius: 15px !important;
  border: 1px solid var(--primary);
}
</style>
