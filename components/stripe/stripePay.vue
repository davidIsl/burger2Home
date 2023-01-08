<template lang="pug">
b-container(fluid)
  b-row
    b-col
      StripeElement
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { StripeElements, StripeElement } from 'vue-stripe-elements-plus';

@Component({
  components: { StripeElements, StripeElement },
})
export default class StripePayments extends Vue {}
</script>
