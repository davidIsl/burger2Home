<template lang="pug">
b-container.bg-gray(fluid)
  b-row
    b-col
      h3.w-100.mx-auto.mt-3.p-3.text-secondary.text-center.border.content {{ $t('pages.products.burgers.title1') }}

  b-row.py-3
    b-col.p-3(lg='4')
      //- div {{ $t('pages.products.filters1') }}
      //-   span.d-block {{ $t('pages.products.filters2') }}
      //-   span.d-block {{ $t('pages.products.filters3') }}
      //-   span.d-block {{ $t('pages.products.filters4') }}
      //-   span.d-block {{ $t('pages.products.filters5') }}
      filters
    b-col.bg-success(lg='20')
      b-container.m-3.p-5.content.mx-auto
        b-row
          b-col.w-100(v-for='(product, index) in products' :key='index')
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
              b-card-footer
                b-button.mr-2.w-100.button {{ $t('pages.products.button1') }}
                b-button.mt-2.w-100.button(@click='openDetails(product)') {{ $t('pages.products.button2') }}
      b-container
        b-row
          b-col.w-100(v-for='(product, index) in productsTest' :key='index')
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
              b-card-footer
                b-button.mr-2.w-100.button {{ $t('pages.products.button1') }}
                b-button.mt-2.w-100.button(@click='openDetails(product)') {{ $t('pages.products.button2') }}
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    cancel-variant='secondary'
    v-if='viewDetails'
    v-model='viewDetails'
    centered
  )
    template(#modal-title)
      b-container
        b-img(thumbnail :src='currentProduct.image') 
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
import { API } from '@/utils/javaBack';

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
      image: '/img/produits/classico.jpg',
      description:
        'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 10.5,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Smokey Bacon',
      image: '/img/produits/smokey-bacon.jpg',
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
      image: '/img/produits/smokey-bacon.jpg',
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

  productsTest: Product[] = [];

  mounted() {
    this.getBurgers();
  }

  async getBurgers() {
    const response = await API.burgerList();

    if (response.status !== 200) {
      return null;
    }
    this.productsTest = response.data;
  }

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
  width: 250px;
  height: 550px;
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