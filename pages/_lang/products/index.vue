<template lang="pug">
b-container.bg-gray(fluid)
  b-row
    b-col.p-5
      h2.p-3.text-primary.text-center.content {{ $t('pages.products.title1') }}
  b-row.p-5
    //- b-col.content.p-3(md='4')
    //-   div {{ $t('pages.products.filters1') }}
    //-     span.d-block {{ $t('pages.products.filters2') }}
    //-     span.d-block {{ $t('pages.products.filters3') }}
    //-     span.d-block {{ $t('pages.products.filters4') }}
    //-     span.d-block {{ $t('pages.products.filters5') }}
    b-col
      b-container.p-5.content
        b-row
          b-col(v-for='(product, index) in products' :key='index')
            b-card.m-3.p-2.text-center.card(
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
              b-button.button(@click='openDetails') {{ $t('pages.products.button2') }}
      //- dataTable(
      //-   perPage='8'
      //-   paginationAlign='right'
      //-   :paginationPills='true'
      //-   :fields='fieldList'
      //-   :items='itemList'
      //- )
    //- b-col(md='4')
    //-   b-button.rounded-pill.w-100(variant='primary') Ajouter Panier
  modal(v-if='viewDetails')
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import dataTable from '@/components/dataTable.vue';

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

interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
}

@Component({
  components: { dataTable },
})
export default class extends Vue {
  viewDetails: boolean = false;

  products: Product[] = [
    {
      name: 'Le classico',
      image: '../../img/produits/classico.jpg',
      description:
        'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 10.5,
    },
    {
      name: 'Smokey Bacon',
      image: '../../img/produits/smokey-bacon.jpg',
      description:
        'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 11,
    },
    {
      name: 'Habibi',
      image: '../../img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
    },
    {
      name: 'Double Decker',
      image: '../../img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
    },
    {
      name: 'El Sombrero',
      image: '../../img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
    },
    {
      name: 'Le classico',
      image: '../../img/produits/classico.jpg',
      description:
        'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 10.5,
    },
    {
      name: 'Smokey Bacon',
      image: '../../img/produits/smokey-bacon.jpg',
      description:
        'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 11,
    },
    {
      name: 'Habibi',
      image: '../../img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
    },
    {
      name: 'Double Decker',
      image: '../../img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
    },
    {
      name: 'El Sombrero',
      image: '../../img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
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

  openDetails() {
    this.viewDetails = true;
    console.log('MODAL');
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
</style>
