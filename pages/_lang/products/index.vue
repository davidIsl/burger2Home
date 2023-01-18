<template lang="pug">
b-container.bg-gray(fluid)
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        md='24'
        :lg='filters ? "24" : "20"'
      )
        h2.pb-2.text-secondary.title-line {{ $t('pages.products.title1') }}
    b-row
      b-col(
        :offset-lg='filters ? "0" : "2"'
        :md='filters ? "18" : "16"'
        sm='16'
      )
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder1")'
          @input='handleSearchFilter'
        )
      b-col.mt-3.mt-sm-0(
        :md='filters ? "6" : "8"'
        :lg='filters ? "6" : "4"'
        sm='8'
      )
        b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters(:type='type' @change='handleChangeFilter')
      b-col.mt-3.mt-lg-0(:offset-lg='filters ? "0" : "2"' lg='20')
        .m-3.p-sm-5.content.mx-auto
          b-row
            b-col.w-100(v-for='(product, index) in products' :key='index')
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
                    b-badge(
                      v-if='product.currentDiscount !== null'
                      variant='darkRed'
                    ) {{ product.currentDiscount }}%
                    b-badge(
                      v-if='product.currentDiscount === null'
                      variant='darkRed'
                    ) 0%
                b-card-text.text-muted.text-center.text-card {{ product.description }}
                b-card-footer
                  b-button.mr-2.w-48.button.justify-content-between(
                    @click='addToBasket({ id: product.id, quantity: quantity })'
                  ) {{ $t('pages.products.button1') }}
                  b-button.w-48.button(@click='openDetails(product)') {{ $t('pages.products.button2') }}
  // MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    cancel-variant='secondary'
    v-if='viewDetails'
    v-model='viewDetails'
  )
    template(#modal-title)
      b-container
        b-img(thumbnail :src='getLink(currentProduct.id)') 
    template(#modal-footer)
      b-button.button(@click='decrementQuantity')
        font-awesome-icon(:icon='["fa", "minus"]')
      p.d-inline.my-3 {{ quantity }}
      b-button.button(@click='incrementQuantity')
        font-awesome-icon(:icon='["fa", "plus"]')
      b-button.button(
        @click='addToBasket({ id: currentProduct.id, quantity: quantity })'
      ) {{ $t('pages.products.button1') }}
    b-container
      h4.text-secondary.text-center {{ currentProduct.name }}
      p.text-modal {{ currentProduct.description }}
    .border-top
      b-row
        b-col
          h6.pt-3.text-secondary {{ $t('pages.products.modal.title1') }}
          span.text-modal {{ currentProduct.actualPrice }} €
        b-col(v-if='currentProduct.currentDiscount > 0')
          h6.pt-3.text-secondary {{ $t('pages.products.modal.title3') }}
          span.text-modal.crossed-text {{ currentProduct.currentPrice }} €
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
import { Product } from '~/utils/utils';
import { API } from '~/utils/javaBack';

// export interface Field {
//   key: string;
//   sortable: boolean;
// }

// export interface Item {
//   id: number;
//   product_name: string;
//   price: number;
//   description: string;
// }

// interface Allergens {
//   name: string;
// }

// interface Product {
//   name: string;
//   image: string;
//   description: string;
//   price: number;
//   allergens: Allergens[];
// }

@Component({
  components: { filters },
})
export default class extends Vue {
  viewDetails: boolean = false;
  filters: boolean = false;
  filterSearch: string = '';

  quantity: number = 1;

  filterProducts: Product[] = [];
  currentProduct: Product[] = [];
  products: Product[] = [];

  mounted() {
    this.updateData();
  }

  updateData() {
    this.getProducts();
  }

  async getProducts() {
    const response = await API.getAllProductAvailable(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.products = response.data;
    this.filterProducts = response.data;
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  openDetails(product: any) {
    this.viewDetails = true;
    this.currentProduct = product;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  addToBasket({ id, quantity }: { id: number; quantity: number }) {
    // const response = await API.upda
    console.log('Quantity', this.quantity);
    console.log('Amount', this.$store.state.baskets.amountToAdd);

    this.$store.dispatch('baskets/addProduct', {
      id,
      quantity,
    });
    this.$store.dispatch(
      'baskets/saveBasket',
      this.$store.state.users.currentUser.id
    );
    this.viewDetails = false;
  }

  handleChangeFilter(event: Product[]) {
    this.products = event;
  }

  handleSearchFilter(str: string) {
    // const tabTemp = this.products;
    console.log('FILTER', this.filterSearch);
    console.log('STR', str);

    const searchTab = (this.filterProducts as Product[]).filter((item) => {
      return item.name.toLowerCase().includes(str.toLowerCase());
    });

    console.log('SERARCH FILTER', searchTab);
    this.products = searchTab;
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
