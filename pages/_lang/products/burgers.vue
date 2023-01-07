<template lang="pug">
b-container.bg-gray(fluid)
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        md='24'
        :lg='filters ? "24" : "20"'
      )
        h2.pb-2.text-secondary.title-line {{ $t('pages.products.burgers.title1') }}
    b-row
      b-col(
        :offset-lg='filters ? "0" : "2"'
        :md='filters ? "18" : "16"'
        sm='16'
      )
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder1")'
        )
      b-col.mt-3.mt-sm-0(
        :md='filters ? "6" : "8"'
        :lg='filters ? "6" : "4"'
        sm='8'
      )
        b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters(:filters='products' @change='handleChangeFilter')
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
                b-button.mr-2.w-48.button.justify-content-between(
                  @click='product.productId'
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
      p.d-inline.my-3 {{ $store.state.baskets.amountToAdd }}
      b-button.button(@click='incrementQuantity')
        font-awesome-icon(:icon='["fa", "plus"]')
      b-button.button(@click='addToBasket(currentProduct.id)') {{ $t('pages.products.button1') }}
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
import { API } from '@/utils/javaBack';
import { Product } from '@/utils/utils';

@Component({
  components: { filters },
})
export default class extends Vue {
  viewDetails: boolean = false;
  filters: boolean = false;
  filterSearch: string = '';

  // numberToAdd: number = 0;

  products: Product[] | null = null;
  currentProduct: Product | null = null;

  mounted() {
    this.getBurgers();
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async getBurgers() {
    const response = await API.productAvailableListByLang(this.$i18n.locale, 1);

    if (response.status !== 200) {
      console.log('LOG ERROR');
      console.log('RESPONSE', response.data);

      return null;
    }
    this.products = response.data;
    console.log('PRODUCTS:', this.products);
    console.log('LOG SUCCESS');
    console.log('RESPONSE', response.data);
  }

  async getProductImage(productId: number) {
    const response = await API.getImages(productId);

    if (response.status !== 200) {
      return null;
    }

    return response.data.image;
  }

  openDetails(product: any) {
    this.viewDetails = true;
    this.currentProduct = product;
    console.log('MODAL', product);
    console.log('viewDetails', this.viewDetails);
  }

  decrementQuantity() {
    this.$store.commit('baskets/decrementAmountToAdd');
  }

  incrementQuantity() {
    this.$store.commit('baskets/incrementAmountToAdd');
  }

  addToBasket(id: number) {
    this.$store.dispatch('baskets/addProduct', id);
    this.viewDetails = false;
  }

  handleChangeFilter(event: Product[]) {
    this.products = event;
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
</style>
