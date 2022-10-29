<template lang="pug">
b-container
  b-row
    b-col.py-3.text-center
      h2.mb-5.underline-title {{ $t('pages.account.showDelivery.title') }}
      b-row
        b-col.mb-3(v-for='(data, index) in deliveryList' :key='index' md='12')
          b-card(
            border-variant='secondary'
            footer-border-variant='secondary'
            footer-text-variant='dark'
            text-variant='dark'
          )
            b-card-text.align-items-center
              .default-address.bg-primary.text-light(v-if='data.default') {{ $t('pages.account.showDelivery.defaultLabel') }}
              .default-address.bg-secondary(v-if='!data.default')
                a.text-light(href='#') {{ $t('pages.account.showDelivery.changeDefaultLabel') }}
              .mt-3
                .text-center {{ data.address }} {{ data.addressNumber }}
                  span.ml-1(v-if='data.addressBox') - {{ data.addressBox }}
                  | ,
                .text-center {{ data.zipCode }} {{ data.town }},
                  span.ml-1(v-if='data.country === "BE"') {{ $t('country.belgium') }}
                  span.ml-1(v-if='data.country === "FR"') {{ $t('country.france') }}
                  span.ml-1(v-if='data.country === "NL"') {{ $t('country.netherlands') }}
                  span.ml-1(v-if='data.country === "DE"') {{ $t('country.germany') }}
                  span.ml-1(v-if='data.country === "ES"') {{ $t('country.spain') }}
                  span.ml-1(v-if='data.country === "IT"') {{ $t('country.italy') }}
            template(#footer)
              .text-right.w-100
                b-button(
                  variant='primary'
                  size='sm'
                  @click='changeChild("update-delivery", data.id)'
                ) {{ $t('pages.account.showDelivery.buttonEdit') }}
                  font-awesome-icon.ml-2(icon='edit')
                b-button.ml-2(
                  variant='danger'
                  size='sm'
                  @click='alertConfirmDelete'
                )
                  font-awesome-icon(icon='trash')
      b-row
        b-col
          b-button.mt-1(
            variant='primary'
            block
            @click='changeChild("add-delivery")'
          ) {{ $t('pages.account.showDelivery.buttonAdd') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

export interface Delivery {
  default: boolean;
  id: string;
  address: string;
  addressNumber: number;
  addressBox?: string;
  zipCode: string;
  town: string;
  country: string;
}

@Component({
  components: {},
})
export default class extends Vue {
  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }

  deliveryList: Delivery[] = [
    {
      default: true,
      id: '1',
      address: 'Rue sur les cours',
      addressNumber: 7,
      addressBox: 'a',
      zipCode: '4052',
      town: 'BEAUFAYS',
      country: 'BE',
    },
    {
      default: false,
      id: '2',
      address: 'Boulebard Frère-Orbant',
      addressNumber: 18,
      addressBox: 'b',
      zipCode: '4000',
      town: 'PARIS',
      country: 'FR',
    },
  ];

  alertConfirmDelete() {
    this.$swal({
      title: this.$tc('swal.confirmDelete.title'),
      text: this.$tc('swal.confirmDelete.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7479f3',
      cancelButtonColor: '#6c757d',
      confirmButtonText: this.$tc('swal.confirmDelete.confirButton'),
      cancelButtonText: this.$tc('swal.confirmDelete.cancelButton'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.$swal(
          this.$tc('swal.confirmDelete.nextTitle'),
          this.$tc('swal.confirmDelete.nextText'),
          'success'
        );
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.default-address {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 0px 3px 0px 3px;
}

.card-footer {
  padding: 8.5px;
}
</style>
