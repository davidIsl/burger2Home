<template lang="pug">
b-container.p-4.bg-gray(fluid)
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        :md='filters ? "18" : "16"'
      )
        h2.text-secondary {{ $t('pages.admin.title1') }}
      b-col.pb-3.text-center(md='6')
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.admin.button1') }}
    b-row
      b-col(:offset-lg='filters ? "0" : "2"' :md='filters ? "18" : "16"')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder1")'
        )
      b-col.mt-3.mt-md-0(md='6')
        b-button.button.w-100(variant='secondary' @click='filters = !filters') Show Filter
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters
      b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
        div(v-if='itemSelected')
          b-button(variant='outline-danger') Delete Product
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              table-variant='secondary'
              :items='products'
              :fields='fields'
            )
              template(#head(x)='data')
                b-form-checkbox#checkbox-header(
                  name='checkbox-header'
                  @change='selectItems($event)'
                )
              template(#cell(x)='data')
                b-form-checkbox(v-model='itemSelected')
              template(#cell(image)='data')
                b-img(:src='data.item.image' width='40' height='40')
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetails(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPage'
              :total-rows='totalRows'
              :per-page='perPage'
              aria-controls='my-table'
              align='right'
            )
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        :md='filters ? "18" : "16"'
      )
        h2.text-secondary {{ $t('pages.admin.title2') }}
      b-col.pb-3.text-center(md='6')
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/promoAdd/`') {{ $t('pages.admin.button2') }}
    b-row
      b-col(:offset-lg='filters ? "0" : "2"' :md='filters ? "18" : "16"')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder2")'
        )
      b-col.mt-3.mt-md-0(md='6')
        b-button.button.w-100(variant='secondary' @click='filters = !filters') Show Filter
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters
      b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              table-variant='secondary'
              :items='promos'
              :fields='fieldsPromo'
            )
              template(#head(x)='data')
                b-form-checkbox#checkbox-header(name='checkbox-header').
              template(#cell(x)='data')
                b-form-checkbox(:checked='selectedAllItems')
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetailsPromo(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPage'
              :total-rows='totalRows'
              :per-page='perPage'
              aria-controls='my-table'
              align='right'
            )
  b-modal(v-if='viewDetails' v-model='viewDetails' right)
    template(#modal-title)
      b-container
        b-img(thumbnail body-bg-variant='darkRed' :src='currentProduct.image') 
    template(#modal-footer)
      div
        font-awesome-icon(:icon='["fas", "minus"]')
      b-button.button {{ $t('pages.admin.button1') }}
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
  b-modal(v-if='viewDetailsPromo' v-model='viewDetailsPromo' right)
    template(#modal-title)
      h4.text-secondary.text-center {{ currentPromo.name }}
    template(#modal-footer)
      b-button.button {{ $t('pages.admin.button2') }}
    b-container
      p.text-modal {{ currentPromo.description }}
      p.text-modal {{ 'Reduction: ' + currentPromo.discount + ' %' }}
      p.text-modal {{ 'StartDate: ' + currentPromo.startDate }}
      p.text-modal {{ 'EndDAte: ' + currentPromo.endDate }}
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
// import { rolesType } from '@/utils/utils';
import filters from '@/components/global/filters.vue';
import { Product, Allergens, Promo } from '@/utils/utils';

@Component({
  components: {
    filters,
  },
})
export default class extends Vue {
  // user: rolesType = rolesType.ADMIN;
  // roleType = rolesType;
  // role = rolesType.NONE;
  filters: boolean = false;
  filterSearch: string = '';
  viewDetails: boolean = false;
  viewDetailsPromo: boolean = false;
  itemSelected: boolean = false;

  allergens: Allergens[] = [];
  currentProduct: Product = {
    name: '',
    image: '',
    description: '',
    price: 0,
    allergens: [{ name: '' }],
  };

  currentPromo: Promo | null = null;

  fields = [
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
      key: 'description',
      sortable: false,
    },
    {
      key: 'price',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
  ];

  fieldsPromo = [
    {
      key: 'x',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'description',
      sortable: false,
    },
    {
      key: 'discount',
      sortable: true,
    },
    {
      key: 'startDate',
      sortable: true,
    },
    {
      key: 'endDate',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
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
      image: '/img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Double Decker',
      image: '/img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'El Sombrero',
      image: '/img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
      allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
    },
    {
      name: 'Le classico',
      image: '/img/produits/classico.jpg',
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
      allergens: [this.allergens[0], this.allergens[1], this.allergens[5]],
    },
    {
      name: 'Habibi',
      image: '/img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
      allergens: [this.allergens[0], this.allergens[3], this.allergens[2]],
    },
    {
      name: 'Double Decker',
      image: '/img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
      allergens: [this.allergens[0], this.allergens[3]],
    },
    {
      name: 'El Sombrero',
      image: '/img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
      allergens: [this.allergens[0], this.allergens[1], this.allergens[2]],
    },
  ];

  promos: Promo[] = [
    {
      name: 'Super Promo Burger Epicé',
      description: 'Profitez de notre super promo sur les burgers épicés',
      discount: 10,
      startDate: new Date('2022-11-22'),
      endDate: new Date('2022-11-30'),
    },
    {
      name: 'Super Promo Burger Boeuf',
      description: 'Profitez de notre super promo sur les burgers boeuf',
      discount: 15,
      startDate: new Date('2022-11-29'),
      endDate: new Date('2022-12-5'),
    },
    {
      name: 'Super Promo Burger Poulet',
      description: 'Profitez de notre super promo sur les burgers de poulet',
      discount: 5,
      startDate: new Date('2022-11-25'),
      endDate: new Date('2022-12-2'),
    },
    {
      name: 'Super Promo Burger Epicé',
      description: 'Profitez de notre super promo sur les burgers épicés',
      discount: 10,
      startDate: new Date('2022-11-22'),
      endDate: new Date('2022-11-30'),
    },
  ];

  openDetails(product: Product) {
    this.viewDetails = true;
    this.currentProduct = product;
  }

  openDetailsPromo(promo: Promo) {
    this.viewDetailsPromo = true;
    this.currentPromo = promo;
  }

  selectItems(event: boolean) {
    if (!this.itemSelected) {
      this.itemSelected = event;
    }
    console.log('HELLO');
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.test {
  width: 90%;
  @include for-phone-only {
    width: 50%;
  }
  @include for-tablet-only {
    width: 40%;
  }
  @include for-md-desktop-only {
    width: 75%;
  }
  // @include for-xl-desktop-only {
  //   width: 50%;
  // }
}

// .input {
//   height: 40px !important;
// }
</style>
