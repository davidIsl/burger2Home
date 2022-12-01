<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mt-2(md='18')
      h3.p-1.text-secondary.title-line {{ $t('pages.basket.title1') }}
    //- b-col.mt-2(md='6')
    //-   h3.p-1.text-secondary.title-line {{ $t('pages.basket.title2') }}
  b-row
    b-col.mt-3(md='18')
      b-table(
        hover
        borderless
        responsive
        table-variant='secondary'
        :items='basket'
        :fields='fieldsBasket'
      )
        template(#head(x)='data')
          b-form-checkbox#checkbox-header(name='checkbox-header')
        template(#cell(x)='data')
          b-form-checkbox(v-model='itemSelected')
        template(#cell(image)='data')
          b-img(:src='data.item.image' width='40' height='40')
        template(#cell(trash)='data')
          font-awesome-icon(:icon='["fa", "trash"]')
      b-pagination(
        pills='pills'
        size='sm'
        v-model='currentPage'
        :total-rows='totalRows'
        :per-page='perPage'
        aria-controls='my-table'
        align='right'
      )
    b-col.mt-3(md='6')
      .py-2.content
        p.mb-1.pb-2.text-center.border-bottom Montant Total: 63€
        .p-3
          b-button.mb-2.w-100.button(@click='goToUrl()') {{ $t('pages.basket.button1') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/")'
          ) {{ $t('pages.basket.button2') }}
          b-button.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/register/")'
          ) {{ $t('pages.basket.button3') }}
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Basket } from '@/utils/utils';

@Component({
  components: {},
})
export default class extends Vue {
  filters: boolean = false;
  filterSearch: string = '';

  currentBasket: Basket | null = null;

  fieldsBasket = [
    {
      key: 'x',
      sortable: false,
    },
    {
      key: 'image',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'price',
      sortable: false,
    },
    {
      key: 'quantity',
      sortable: false,
    },
    {
      key: 'trash',
      sortable: false,
    },
  ];

  basket: Basket[] = [
    {
      image: '/img/produits/smokey-bacon.jpg',
      name: 'Smokey Bacon',
      price: 11,
      quantity: 2,
    },
    {
      image: '/img/produits/smokey-bacon.jpg',
      name: 'Smokey Bacon',
      price: 11,
      quantity: 2,
    },
    {
      image: '/img/produits/smokey-bacon.jpg',
      name: 'Smokey Bacon',
      price: 11,
      quantity: 2,
    },
    {
      image: '/img/produits/smokey-bacon.jpg',
      name: 'Smokey Bacon',
      price: 11,
      quantity: 2,
    },
  ];

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped lang="scss"></style>
