<template lang="pug">
b-container.bg-gray(fluid)
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        md='24'
        :lg='filters ? "24" : "20"'
      )
        h2.pb-2.text-secondary.title-line {{ $t('pages.products.drinks.title1') }}
  b-row
    b-col(:offset-lg='filters ? "0" : "2"' :md='filters ? "18" : "16"' sm='16')
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.placeholder1")'
      )
    b-col.mt-3.mt-sm-0(
      :md='filters ? "6" : "8"'
      :lg='filters ? "6" : "4"'
      sm='8'
    )
      b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.products.filters') }}
  b-row
    b-col.p-3(v-if='filters' lg='4')
      filters
    b-col.mt-3.mt-lg-0(:offset-lg='filters ? "0" : "2"' lg='20')
      .m-3.p-sm-5.content.mx-auto
        b-row
          b-col(v-for='(product, index) in products' :key='index')
            b-card.m-3.p-2.text-center.card.mx-auto(
              :title='product.name'
              :img-src='getLink(product.id)'
              img-alt='Image'
              img-top
              img-height='220'
              tag='article'
              text-variant='secondary'
              bg-variant='gray'
            )
              b-card-header
                h6 {{ $t('pages.products.title2') }}:&nbsp;
                  b-badge(variant='darkRed') {{ product.currentDiscount }}%
              b-card-text.text-muted.text-center.text-card {{ product.description }}
              b-button.mr-2.w-48.button {{ $t('pages.products.button1') }}
              b-button.w-48.button(@click='openDetails(product)') {{ $t('pages.products.button2') }}
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-if='viewDetails'
    v-model='viewDetails'
    size='sm'
    centered
  )
    template(#modal-title)
      b-container
        b-img(thumbnail :src='getLink(currentProduct.id)') 
    template(#modal-footer)
      b-button.button(@click='decrementQuantity')
        font-awesome-icon(:icon='["fa", "minus"]')
      p.d-inline.my-3 {{ numberToAdd }}
      b-button.button(@click='incrementQuantity')
        font-awesome-icon(:icon='["fa", "plus"]')
      b-button.button {{ $t('pages.products.button1') }}
    b-container
      h4.text-secondary.text-center {{ currentProduct.name }}
      p.text-modal {{ currentProduct.description }}
    .border-top
      b-row
        b-col
          h6.pt-3.text-secondary {{ $t('pages.products.modal.title1') }}
          span.text-modal {{ currentProduct.actualPrice }} ???
        b-col(v-if='currentProduct.currentDiscount > 0')
          h6.pt-3.text-secondary Old Price
          span.text-modal.crossed-text {{ currentProduct.currentPrice }} ???
      h6.pt-3.text-secondary {{ $t('pages.products.modal.title2') }}
      .pl-3.text-modal(
        v-for='(allergen, index) in currentProduct.allergens'
        :key='index'
      )
        li
          ul.m-0.p-0 {{ allergen }}
      p.text-modal(v-if='currentProduct.allergens.length < 1') {{ $t('pages.products.modal.text1') }}
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import filters from '@/components/global/filters.vue';
import { API } from '@/utils/javaBack';
import { Product } from '@/utils/utils';

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

@Component({
  components: { filters },
})
export default class extends Vue {
  viewDetails: boolean = false;
  filters: boolean = false;
  filterSearch: string = '';

  numberToAdd: number = 0;

  currentProduct: Product | null = null;
  products: Product[] | null = null;

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
  //     image: '../../img/produits/classico.jpg',
  //     description:
  //       'Viande de Boeuf hach??e, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 10.5,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Smokey Bacon',
  //     image: '../../img/produits/smokey-bacon.jpg',
  //     description:
  //       'Viande de Boeuf hach??e, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 11,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Habibi',
  //     image: '../../img/produits/habibi.jpg',
  //     description:
  //       "Viande d'agneau hach??e, laitue iceberg, houmous, concombre marin??, sauce tomate ??pic??e",
  //     price: 11.5,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Double Decker',
  //     image: '../../img/produits/double-dekker.jpg',
  //     description:
  //       'Double Hamburger de viande de Boeuf hach??e, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 13,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'El Sombrero',
  //     image: '../../img/produits/el-sombrero.jpg',
  //     description:
  //       'Viande de poulet hach??e, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et cr??me aigre',
  //     price: 12,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Le classico',
  //     image: '../../img/produits/classico.jpg',
  //     description:
  //       'Viande de Boeuf hach??e, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 10.5,
  //     allergens: [this.allergens[0], this.allergens[5], this.allergens[2]],
  //   },
  //   {
  //     name: 'Smokey Bacon',
  //     image: '../../img/produits/smokey-bacon.jpg',
  //     description:
  //       'Viande de Boeuf hach??e, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 11,
  //     allergens: [this.allergens[0], this.allergens[1], this.allergens[5]],
  //   },
  //   {
  //     name: 'Habibi',
  //     image: '../../img/produits/habibi.jpg',
  //     description:
  //       "Viande d'agneau hach??e, laitue iceberg, houmous, concombre marin??, sauce tomate ??pic??e",
  //     price: 11.5,
  //     allergens: [this.allergens[0], this.allergens[3], this.allergens[2]],
  //   },
  //   {
  //     name: 'Double Decker',
  //     image: '../../img/produits/double-dekker.jpg',
  //     description:
  //       'Double Hamburger de viande de Boeuf hach??e, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 13,
  //     allergens: [this.allergens[0], this.allergens[3]],
  //   },
  //   {
  //     name: 'El Sombrero',
  //     image: '../../img/produits/el-sombrero.jpg',
  //     description:
  //       'Viande de poulet hach??e, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et cr??me aigre',
  //     price: 12,
  //     allergens: [this.allergens[0], this.allergens[1], this.allergens[2]],
  //   },
  // ];

  // fieldList: Field[] = [
  //   {
  //     key: 'id',
  //     sortable: true,
  //   },
  //   {
  //     key: 'product_name',
  //     sortable: true,
  //   },
  //   {
  //     key: 'price',
  //     sortable: true,
  //   },
  //   {
  //     key: 'description',
  //     sortable: true,
  //   },
  // ];

  // itemList: Item[] = [
  //   {
  //     id: 1,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 2,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 3,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 4,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 5,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 6,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 7,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 8,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 9,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 10,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 11,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  //   {
  //     id: 12,
  //     product_name: 'Le Classico',
  //     price: 12.5,
  //     description: 'Viande de boeuf hach??e',
  //   },
  // ];

  mounted() {
    this.getBurgers();
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async getBurgers() {
    const response = await API.productAvailableListByLang(this.$i18n.locale, 2);

    if (response.status !== 200) {
      console.log('LOG ERROR');
      console.log('RESPONSE', response.data);

      return null;
    }
    this.products = response.data;
    console.log('LOG SUCCESS');
    console.log('RESPONSE', response.data);
  }

  openDetails(product: any) {
    this.viewDetails = true;
    this.currentProduct = product;
    console.log('MODAL', product);
    console.log('viewDetails', this.viewDetails);
  }

  decrementQuantity() {
    if (this.numberToAdd === 0) {
      return;
    }
    this.numberToAdd--;
  }

  incrementQuantity() {
    this.numberToAdd++;
  }
}
</script>

<style lang="scss" scoped>
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
