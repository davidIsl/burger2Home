<template lang="pug">
b-container.bg-gray(fluid)
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        :md='filters ? "18" : "16"'
      )
        h2.text-secondary {{ $t('pages.products.title1') }}
  b-row
    b-col(:offset-lg='filters ? "0" : "2"' :md='filters ? "18" : "16"')
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.placeholder1")'
      )
    b-col.mt-3.mt-md-0(md='6')
      b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.products.filters') }}
  b-row
    b-col.p-3(v-if='filters' lg='4')
      filters
    b-col.mt-3.mt-lg-0(:offset-lg='filters ? "0" : "2"' lg='20')
      .m-3.p-5.content.mx-auto
        b-row
          b-col(v-for='(product, index) in products' :key='index')
            b-card.m-3.p-2.text-center.card.mx-auto(
              :title='product.name'
              :img-src='product.image'
              img-alt='Image'
              img-top
              tag='article'
              text-variant='secondary'
              bg-variant='gray'
            )
              b-card-text.text-muted.text-center {{ product.description }}
              //- b-button-group
              b-button.mr-2.button {{ $t('pages.products.button1') }}
              b-button.button(@click='openDetails(product)') {{ $t('pages.products.button2') }}
  b-modal(v-if='viewDetails' v-model='viewDetails' centered)
    template(#modal-title)
      b-container
        b-img(
          thumbnail
          body-bg-variant='darkRed'
          src='/img/produits/smokey-bacon.jpg'
        ) 
    template(#modal-footer)
      div
        font-awesome-icon(:icon='["fas", "fa-minus"]')
      b-button.button {{ $t('pages.products.button1') }}
    b-container
      h4.text-secondary.text-center {{ currentProduct.name }}
      p.text-modal {{ currentProduct.description }}
    .border-top
      h6.pt-3.text-secondary Allergens
      .pl-3.text-modal(
        v-for='(allergen, index) in currentProduct.allergens'
        :key='index'
      )
        li
          ul.m-0.p-0 {{ allergen.name }}
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import filters from '@/components/global/filters.vue';

export interface Field {
  key: string;
  sortable: boolean;
}

export interface Item {
  id: number;
  product_name: string;
  price: number;
  description: string;
}

interface Allergens {
  name: string;
}

interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
  allergens: Allergens[];
}

@Component({
  components: { filters },
})
export default class extends Vue {
  viewDetails: boolean = false;
  filters: boolean = false;
  filterSearch: string = '';

  currentProduct: Product = {
    name: '',
    image: '',
    description: '',
    price: 0,
    allergens: [{ name: '' }],
  };

  allergens: Allergens[] = [
    {
      name: 'Gluten',
    },
    {
      name: 'Oeufs',
    },
    {
      name: 'Poissons',
    },
    {
      name: 'Soja',
    },
    {
      name: 'Arachides',
    },
  ];

  products: Product[] = [
    {
      name: 'Le classico',
      image: '../../img/produits/classico.jpg',
      description:
        'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 10.5,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Smokey Bacon',
      image: '../../img/produits/smokey-bacon.jpg',
      description:
        'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 11,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Habibi',
      image: '../../img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Double Decker',
      image: '../../img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'El Sombrero',
      image: '../../img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Le classico',
      image: '../../img/produits/classico.jpg',
      description:
        'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 10.5,
      allergens: [this.allergens[0], this.allergens[5], this.allergens[2]],
    },
    {
      name: 'Smokey Bacon',
      image: '../../img/produits/smokey-bacon.jpg',
      description:
        'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 11,
      allergens: [this.allergens[0], this.allergens[1], this.allergens[5]],
    },
    {
      name: 'Habibi',
      image: '../../img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
      allergens: [this.allergens[0], this.allergens[3], this.allergens[2]],
    },
    {
      name: 'Double Decker',
      image: '../../img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
      allergens: [this.allergens[0], this.allergens[3]],
    },
    {
      name: 'El Sombrero',
      image: '../../img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
      allergens: [this.allergens[0], this.allergens[1], this.allergens[2]],
    },
  ];

  fieldList: Field[] = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'product_name',
      sortable: true,
    },
    {
      key: 'price',
      sortable: true,
    },
    {
      key: 'description',
      sortable: true,
    },
  ];

  itemList: Item[] = [
    {
      id: 1,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 2,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 3,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 4,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 5,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 6,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 7,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 8,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 9,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 10,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 11,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
    {
      id: 12,
      product_name: 'Le Classico',
      price: 12.5,
      description: 'Viande de boeuf hachée',
    },
  ];

  openDetails(product: any) {
    this.viewDetails = true;
    this.currentProduct = product;
    console.log('MODAL', product);
    console.log('viewDetails', this.viewDetails);
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 20em;
  height: 40em;
  font-size: 0.8em;
  text-shadow: 1px 1px 1px var(--darkRed);
  border: 1px var(--primary) solid;
}

.title {
  background-image: url('/img/chalkboard.jpg');
}

.button {
  font-size: 0.9em;
}

.text-modal {
  text-shadow: 1px 1px 1px var(--darkRed);
}
</style>
