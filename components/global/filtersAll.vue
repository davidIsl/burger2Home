<template lang="pug">
.text-secondary.filters.p-3
  h3.title {{ $t('pages.filters.title1') }}
  div
    div(v-for='(filter, index) in currentFilters')
      b-form-checkbox(
        v-model='checked'
        @change='selectFilters(filter.productFamilyId)'
      ) {{ filter.name }}
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { API } from '@/utils/javaBack';
import { Families } from '@/utils/utils';

@Component({})
export default class extends Vue {
  @Prop() filters!: Families[];

  checked: boolean = false;

  currentFilters: Families[] = [];

  mounted() {
    this.currentFilters = this.filters;
  }

  async selectFilters(familyId: number) {
    if (this.checked) {
      const response = await API.getProductListByFamily(
        this.$i18n.locale,
        familyId
      );

      if (response.status !== 200) {
        return null;
      }
      console.log('FAMILY ID', familyId);

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
