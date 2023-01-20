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
          @input='handleSearchFilter(filterSearch)'
        )
      b-col.mt-3.mt-sm-0(
        :md='filters ? "6" : "8"'
        :lg='filters ? "6" : "4"'
        sm='8'
      )
        b-button.button.w-100(variant='secondary' @click='getFamily') {{ $t('pages.filters.button1') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters(
          :filters='filtersFamily'
          :type='type'
          @change='handleChangeFilter'
        )
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
import { API } from '@/utils/javaBack';
import { Families, Product } from '@/utils/utils';

@Component({
  components: { filters },
})
export default class extends Vue {
  viewDetails: boolean = false;
  filters: boolean = false;
  filterSearch: string = '';

  type: number = 1;
  quantity: number = 1;

  products: Product[] | null = null;
  filtersFamily: Families[] = [];
  filterProducts: Product[] = [];
  currentProduct: Product | null = null;
  familiesId: Families[] = [];

  mounted() {
    // this.getBurgers();
    this.updateData();
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async getFamily() {
    this.filters = !this.filters;
    this.filtersFamily = [];

    const productId: any = (this.products as Product[]).map((item) => ({
      productId: item.id,
    }));

    for (const item of productId) {
      const responseFamilies = API.getFamiliesByProductId(item.productId);

      if ((await responseFamilies).status !== 200) {
        return null;
      }

      for (const line of (await responseFamilies).data) {
        // if (this.familiesId.length === 0) {
        this.familiesId.push(line);
        // }
      }
    }
    const filterFam: Families[] = [];

    this.familiesId.forEach((item) => {
      if (!filterFam.find((cur) => cur.id === item.id)) {
        filterFam.push(item);
      }
    });

    const tempTab = await Promise.all(
      filterFam.map((fam) =>
        API.getFamilyTranslationByIdAndLang(this.$i18n.locale, fam.id)
      )
    );

    tempTab.forEach((cur) => this.filtersFamily.push(cur.data[0]));
  }

  updateData() {
    this.getBurgers();
  }

  async getBurgers() {
    const response = await API.productAvailableListByLang(this.$i18n.locale, 1);

    if (response.status !== 200) {
      return null;
    }
    this.products = response.data;
    this.filterProducts = response.data;
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
    this.$store.dispatch('baskets/addProduct', {
      id,
      quantity,
    });
    if (this.$store.state.users.currentUser) {
      this.$store.dispatch(
        'baskets/saveBasket',
        this.$store.state.users.currentUser.id
      );
    }
    this.viewDetails = false;
  }

  handleChangeFilter(event: Product[]) {
    this.products = event;
  }

  handleSearchFilter(str: string) {
    const searchTab = (this.filterProducts as Product[]).filter((item) => {
      return item.name.toLowerCase().includes(str.toLowerCase());
    });

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
</style>
