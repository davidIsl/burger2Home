<template lang="pug">
.text-secondary.filters.p-3
  h3.font-weight-bold {{ $t('pages.filters.title1') }}
  div
    div
      p Beef
      p Chicken
      p Fish
      p Spicy
      //- font-awesome-icon.mr-3.mt-1.ml-1(:icon='["fa", "tag"]')
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.filters {
  background-image: url('@/assets/img/chalkboard.jpg');
  border-radius: 15px !important;
}
</style>
