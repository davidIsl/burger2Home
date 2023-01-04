<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mt-2(md='18')
      h3.p-1.text-secondary.title-line {{ $t('pages.basket.title1') }}
    //- b-col.mt-2(md='6')
    //-   h3.p-1.text-secondary.title-line {{ $t('pages.basket.title2') }}
  b-row
    b-col.mt-3(md='18')
      .p-3.content
        b-table(
          hover
          borderless
          responsive
          head-row-variant='darkRed'
          table-variant='secondary'
          :items='basket'
          :fields='fieldsBasket'
        )
          //- template(#head(x)='data')
          //-   b-form-checkbox#checkbox-header(name='checkbox-header')
          //- template(#cell(x)='data')
          //-   b-form-checkbox(v-model='itemSelected')
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
import { Basket, Product } from '@/utils/utils';

@Component({
  components: {},
})
export default class extends Vue {
  filters: boolean = false;
  filterSearch: string = '';

  currentBasket: Basket | null = null;
  products: Product[] | null = null;

  fieldsBasket = [
    {
      key: 'image',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'totalPrice',
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

  // allergens: Allergens[] = [
  //   {
  //     name: 'Gluten',
  //   },
  //   {
  //     name: 'Oeufs',
  //   },
  //   {
  //     name: 'Poissons',
  //   },
  //   {
  //     name: 'Soja',
  //   },
  //   {
  //     name: 'Arachides',
  //   },
  // ];

  // products: Product[] = [
  //   {
  //     name: 'Le classico',
  //     image: '/img/produits/classico.jpg',
  //     description:
  //       'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 10.5,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Smokey Bacon',
  //     image: '/img/produits/smokey-bacon.jpg',
  //     description:
  //       'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 11,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Habibi',
  //     image: '../../img/produits/habibi.jpg',
  //     description:
  //       "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
  //     price: 11.5,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Double Decker',
  //     image: '../../img/produits/double-dekker.jpg',
  //     description:
  //       'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 13,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'El Sombrero',
  //     image: '../../img/produits/el-sombrero.jpg',
  //     description:
  //       'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
  //     price: 12,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Le classico',
  //     image: '../../img/produits/classico.jpg',
  //     description:
  //       'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 10.5,
  //     allergens: [this.allergens[0], this.allergens[5], this.allergens[2]],
  //   },
  //   {
  //     name: 'Smokey Bacon',
  //     image: '/img/produits/smokey-bacon.jpg',
  //     description:
  //       'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 11,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Habibi',
  //     image: '../../img/produits/habibi.jpg',
  //     description:
  //       "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
  //     price: 11.5,
  //     allergens: [this.allergens[0], this.allergens[3], this.allergens[2]],
  //   },
  //   {
  //     name: 'Double Decker',
  //     image: '../../img/produits/double-dekker.jpg',
  //     description:
  //       'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 13,
  //     allergens: [this.allergens[0], this.allergens[3]],
  //   },
  //   {
  //     name: 'El Sombrero',
  //     image: '../../img/produits/el-sombrero.jpg',
  //     description:
  //       'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
  //     price: 12,
  //     allergens: [this.allergens[0], this.allergens[1], this.allergens[2]],
  //   },
  // ];

  // basket: Basket[] = [
  //   {
  //     products: this.products[0],
  //     image: this.products[0].image,
  //     name: this.products[0].name,
  //     quantity: 2,
  //     totalPrice: this.products[0].price,
  //   },
  //   {
  //     products: this.products[1],
  //     image: this.products[1].image,
  //     name: this.products[1].name,
  //     quantity: 2,
  //     totalPrice: this.products[1].price,
  //   },
  //   {
  //     products: this.products[2],
  //     image: this.products[2].image,
  //     name: this.products[2].name,
  //     quantity: 1,
  //     totalPrice: this.products[2].price,
  //   },
  //   {
  //     products: this.products[4],
  //     image: this.products[4].image,
  //     name: this.products[4].name,
  //     quantity: 3,
  //     totalPrice: this.products[4].price,
  //   },
  //   {
  //     products: this.products[3],
  //     image: this.products[3].image,
  //     name: this.products[3].name,
  //     quantity: 1,
  //     totalPrice: this.products[3].price,
  //   },
  // ];

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped lang="scss"></style>
