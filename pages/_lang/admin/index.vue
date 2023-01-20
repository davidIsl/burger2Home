<template lang="pug">
b-container.p-4.bg-gray(fluid)
  // ADMIN 
  .p-2(
    v-if='this.$store.state.users.currentUser !== null && this.$store.state.users.currentUser.role.name === "admin"'
  )
    b-row
      b-col.pb-3.text-md-left(
        offset-lg='2'
        sm='16'
        :lg='14'
        xl='16'
      )
        h2.text-secondary {{ $t('pages.admin.title1') }}
      b-col.pb-3.text-center(sm='8' lg='6' xl='4')
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.admin.button1') }}
    b-row
      b-col(
        offset-sm='16'
        offset-xl='18'
        sm='8'
        lg='6'
        xl='4'
      )
        b-button.mb-3.button.w-100(
          :to='`/${$i18n.locale}/admin/ingredientsAdd/`'
        ) {{ $t('pages.admin.button3') }}
        b-button.mb-3.button.w-100(:to='`/${$i18n.locale}/admin/familyAdd/`') {{ $t('pages.admin.button4') }}
        b-button.mb-3.button.w-100(
          :to='`/${$i18n.locale}/admin/allergensAdd/`'
        ) {{ $t('pages.admin.button5') }}
    b-row
      b-col(offset-lg='2' lg='14' xl='16')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder1")'
          @input='handleSearchFilterProducts(filterSearch)'
        )
      b-col.mt-3(offset-lg='2' lg='20')
        .p-3.content.text-secondary
          .m-3
            b-table(
              hover
              borderless
              responsive
              head-row-variant='darkRed'
              table-variant='gray'
              :current-page='currentPage'
              :perPage='perPage'
              :items='products'
              :fields='fields'
              :totalProducts='totalProducts'
            )
              template(#head(image)='data')
                p {{ $t('pages.admin.products.table.image') }}
              template(#head(name)='data')
                p {{ $t('pages.admin.products.table.name') }}
              template(#head(description)='data')
                p {{ $t('pages.admin.products.table.description') }}
              template(#head(currentPrice)='data')
                p {{ $t('pages.admin.products.table.price') }}
              template(#head(details)='data')
                p {{ $t('pages.admin.products.table.details') }}
              template(#head(onMenu)='data')
                p {{ $t('pages.admin.products.table.statut') }}
              template(#cell(onMenu)='data')
                b-form-checkbox(switch v-model='data.item.onMenu')
              template(#cell(image)='data')
                b-img(:src='getLink(data.item.id)' width='50' height='50')
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetails(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPage'
              :total-rows='totalProducts'
              :per-page='perPage'
              align='right'
            )
  // ADMIN ROLES
  .p-2(
    v-if='this.$store.state.users.currentUser !== null && this.$store.state.users.currentUser.role.name === "admin"'
  )
    b-row
      b-col.pb-3.text-md-left(offset-lg='2' sm='16' lg='14')
        h2.text-secondary {{ $t('pages.admin.title7') }}
    b-row
      b-col(offset-lg='2' sm='16' lg='14')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder4")'
          @input='handleSearchFilterUsers(filterSearch)'
        )
    b-row
      b-col.mt-3(offset-lg='2' lg='20')
        .p-3.content.text-secondary
          .m-3
            b-table(
              hover
              borderless
              responsive
              head-row-variant='darkRed'
              table-variant='gray'
              :current-page='currentPageUsers'
              :perPage='perPageUsers'
              :items='users'
              :fields='fieldsUsers'
              :totalProducts='totalUsers'
            )
              template(#head(id)='data')
                p {{ $t('pages.admin.users.table.id') }}
              template(#head(lastname)='data')
                p {{ $t('pages.admin.users.table.lastname') }}
              template(#head(firstname)='data')
                p {{ $t('pages.admin.users.table.firstname') }}
              template(#head(username)='data')
                p {{ $t('pages.admin.users.table.username') }}
              template(#head(role.name)='data')
                p {{ $t('pages.admin.users.table.role') }}
              template(#head(details)='data')
                p {{ $t('pages.admin.users.table.details') }}
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "pencil-alt"]'
                  @click='openDetailsUser(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPageUsers'
              :total-rows='totalUsers'
              :per-page='perPageUsers'
              align='right'
            )
  // MARKETING
  .p-2(
    v-if='this.$store.state.users.currentUser !== null && this.$store.state.users.currentUser.role.name === "marketing"'
  )
    b-row
      b-col.pb-3.text-md-left(offset-lg='2' sm='16' lg='14')
        h2.text-secondary {{ $t('pages.admin.title2') }}
    b-row
      b-col(offset-lg='2' sm='16' lg='16')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder2")'
          @input='handleSearchFilterPromo(filterSearch)'
        )
      b-col.mt-3.mt-sm-0(sm='8' lg='4')
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/promosAdd/`') {{ $t('pages.admin.button2') }}
    b-row
      b-col.mt-3(offset-lg='2' lg='20')
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              :perPage='perPagePromos'
              head-row-variant='darkRed'
              table-variant='gray'
              :items='promos'
              :fields='fieldsPromo'
              :current-page='currentPagePromos'
            )
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetailsPromo(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPagePromos'
              :total-rows='totalPromos'
              :per-page='perPagePromos'
              align='right'
            )
  // STOCK
  .p-2(
    v-if='this.$store.state.users.currentUser !== null && this.$store.state.users.currentUser.role.name === "stock"'
  )
    b-row
      b-col.pb-3.text-md-left(offset-lg='2' sm='16' lg='14')
        h2.text-secondary {{ $t('pages.admin.title3') }}
    b-row
      b-col(offset-lg='2' sm='16' lg='14')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder3")'
          @input='handleSearchFilter(filterSearch)'
        )

    b-row
      b-col.mt-3(offset-lg='2' lg='20')
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              :perPage='perPageStocks'
              head-row-variant='darkRed'
              table-variant='gray'
              :items='stocks'
              :fields='fieldsStock'
              :current-page='currentPageStocks'
            )
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "pencil-alt"]'
                  @click='openDetailsStock(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPageStocks'
              :total-rows='totalStocks'
              :per-page='perPageStocks'
              align='right'
            )
  b-row.mt-3(align-h='center')
    b-col.m-2(cols='20')
      .p-5.content(v-if='submitProductAdd !== submitProductAddType.NONE')
        alert(
          :show='submitProductAdd === submitProductAddType.ERROR || submitProductAdd === submitProductAddType.SUCCESS'
          :variant='submitProductAdd === submitProductAddType.ERROR ? "error" : "success"'
          :icon='submitProductAdd === submitProductAddType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
        )
          h6.m-0.mb-2.text-center {{ errorMsg }}
  // MODAL DETAILS PRODUCT
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-if='viewDetails'
    v-model='viewDetails'
    right
  )
    template(#modal-title)
      b-container
        b-img(
          thumbnail
          body-bg-variant='darkRed'
          :src='getLink(currentProduct.id)'
        ) 
    template(#modal-footer)
      b-button.mx-auto.w-48.button(@click='viewDetails = false') {{ $t('pages.admin.button7') }}
      b-button.mx-auto.w-48.button(
        @click='goToUrl(`/${$i18n.locale}/admin/productsEdit/`)'
      ) {{ $t('pages.admin.button6') }}
    div
      h4.text-secondary.text-center.title {{ currentProduct.name }}
      .text-modal 
        p {{ currentProduct.description }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.title4') }}
      .text-modal
        span {{ currentProduct.currentPrice }}€
    .border-top.pb-3
      h6.pt-3.text-secondary.title {{ $t('pages.admin.title5') }}
      .pl-3.text-modal(
        v-for='(ingredient, index) in currentProduct.ingredients'
        :key='index'
      )
        li
          ul.m-0.p-0 {{ ingredient }}
    .border-top
      h6.pt-3.text-secondary.title {{ $t('pages.admin.title6') }}
      .pl-3.text-modal(
        v-for='(allergen, index) in currentProduct.allergens'
        :key='index'
      )
        li
          ul.m-0.p-0 {{ allergen }}
  // MODAL DETAILS USERS ROLES
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-if='viewDetailsUser'
    v-model='viewDetailsUser'
    right
  )
    template(#modal-title)
      h4.pb-3.text-secondary.text-center.title {{ $t('pages.admin.users.modal.title1') }}
    template(#modal-footer)
      b-button.mx-auto.button.w-48(@click='viewDetailsUser = false') {{ $t('pages.admin.users.modal.button1') }}
      b-button.mx-auto.button.w-48(@click='updateRole') {{ $t('pages.admin.users.modal.button2') }}

    h6.pt-3.title.text-secondary {{ $t('pages.admin.users.modal.title2') }}
    .text-modal
      p {{ currentUser.lastname }} {{ currentUser.firstname }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.users.modal.title3') }}
      .text-modal
        p.text-modal {{ currentUser.email }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.users.modal.title4') }}
      .text-modal
        p.text-modal {{ currentUser.role.name }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.users.modal.title5') }}
      .text-modal
        b-form-select#role.input-form(
          v-model='$v.newRole.$model'
          :class='{ "is-invalid": $v.newRole.$error, "is-valid": !$v.newRole.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder1")'
          :options='roles'
          @blur='$v.newRole.$touch()'
        )
  // MODAL DETAILS PROMO
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-if='viewDetailsPromo'
    v-model='viewDetailsPromo'
    right
  )
    template(#modal-title)
      h4.pb-3.text-secondary.text-center.title {{ $t('pages.admin.promos.modal.title1') }}
      b-img(thumbnail body-bg-variant='darkRed' src='/img/promos.png')
    template(#modal-footer)
      b-button.mx-auto.button.w-48(@click='viewDetailsPromo = false') {{ $t('pages.admin.promos.modal.button1') }}
      b-button.mx-auto.button.w-48(
        @click='goToUrl(`/${$i18n.locale}/admin/promosAdd/`)'
      ) {{ $t('pages.admin.promos.modal.button2') }}
    div
      h6.text-secondary.title {{ $t('pages.admin.promos.modal.title2') }}
      .pt-2.text-modal 
        p.text-modal {{ currentPromo.description }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.promos.modal.title3') }}
      .text-modal
        p {{ currentPromo.amount + ' %' }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.promos.modal.title4') }}
      .text-modal
        p.text-modal {{ currentPromo.startDate }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.promos.modal.title5') }}
      .text-modal
        p.text-modal {{ currentPromo.endDate }}
  // MODAL EDITING STOCK
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-model='editingStock'
    right
  )
    template(#modal-title)
      h4.text-secondary.text-center {{ $t('pages.admin.stock.modal.title1') }}
    template(#modal-footer)
      b-button.button.mx-auto.w-48(@click='cancelAlert = true') {{ $t('pages.admin.stock.modal.button1') }}
      b-button.button.mx-auto.w-48(@click='updateStock') {{ $t('pages.admin.stock.modal.button2') }}
    b-container
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.stock.modal.label1")'
        label-for='name'
      )
        b-form-input#name.input-form(
          v-model='$v.name.$model'
          :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
          :placeholder='$t("pages.admin.stock.modal.placeholder1")'
          type='text'
          name='name'
          @blur='$v.name.$touch()'
        )
        .input-error(v-if='$v.name.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.stock.modal.label2")'
        label-for='quantity'
      )
        b-form-input#quantity.input-form(
          v-model='quantity'
          readonly
          type='text'
          name='quantity'
        )
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.stock.modal.label3")'
        label-for='newQuantity'
      )
        b-form-input#newQuantity.input-form(
          v-model='$v.newQuantity.$model'
          :class='{ "is-invalid": $v.newQuantity.$error, "is-valid": !$v.newQuantity.$invalid }'
          :placeholder='$t("pages.admin.stock.modal.placeholder2")'
          type='number'
          name='newQuantity'
          @blur='$v.newQuantity.$touch()'
        )
        .input-error(v-if='$v.newQuantity.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
  // CANCEL MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-model='cancelAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.stock.alert.title1') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.stock.alert.text1') }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='stopUpdate') {{ $t('pages.admin.stock.alert.button1') }}
      b-button.w-48(variant='primary' @click='cancelAlert = false') {{ $t('pages.admin.stock.alert.button2') }}
  // ERROR UPDATE MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-model='errorAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.stock.alert.title2') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ errorMsg }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='errorAlert = false') {{ $t('pages.admin.stock.alert.button3') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import filters from '@/components/global/filters.vue';
import alert from '@/components/global/alert.vue';
import {
  Product,
  Allergens,
  Promo,
  Stock,
  submitProductAddType,
  UserCurrent,
  SelectOption,
  Role,
} from '@/utils/utils';
import { API } from '@/utils/javaBack';

@Component({
  components: {
    alert,
    filters,
  },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) newQuantity: number = 0;
  @Validate({ required }) newRole: string = '';
  quantity: number = 0;

  filters: boolean = false;
  filterSearch: string = '';
  viewDetails: boolean = false;
  viewDetailsPromo: boolean = false;
  viewDetailsUser: boolean = false;
  editingStock: boolean = false;
  cancelAlert: boolean = false;
  errorAlert: boolean = false;

  perPage: number = 8;
  perPagePromos: number = 8;
  perPageStocks: number = 8;
  perPageUsers: number = 8;
  currentPage: number = 1;
  currentPagePromos: number = 1;
  currentPageStocks: number = 1;
  currentPageUsers: number = 1;
  totalProducts: number = 0;
  totalPromos: number = 0;
  totalStocks: number = 0;
  totalUsers: number = 0;

  allergens: Allergens[] = [];
  products: Product[] = [];
  promos: Promo[] = [];
  stocks: Stock[] = [];
  users: UserCurrent[] = [];
  roles: SelectOption[] = [];
  currentProduct: Product | null = null;
  currentPromo: Promo | null = null;
  currentStock: Stock | null = null;
  currentUser: UserCurrent | null = null;
  currentStockId: number = 0;
  currentIngredientId: number = 0;

  filterStocks: Stock[] = [];
  filterProducts: Product[] = [];
  filterUsers: UserCurrent[] = [];
  filterPromos: Promo[] = [];

  errorMsg: string = '';
  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  fields = [
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
      key: 'currentPrice',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
    {
      key: 'onMenu',
      sortable: false,
    },
  ];

  fieldsPromo = [
    {
      key: 'description',
      sortable: false,
    },
    {
      key: 'amount',
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

  fieldsStock = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'ingredientId',
      sortable: true,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'creationDate',
      sortable: false,
    },
    {
      key: 'amount',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
  ];

  fieldsUsers = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'lastname',
      sortable: true,
    },
    {
      key: 'firstname',
      sortable: true,
    },
    {
      key: 'username',
      sortable: false,
    },
    {
      key: 'role.name',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
  ];

  beforeMounted() {
    if (!this.$store.state.users.currentUser) {
      return this.$router.push(`/${this.$i18n.locale}/error`);
    }
  }

  mounted() {
    if (this.$store.state.users.currentUser.role.name === 'customer') {
      return this.$router.push(`/${this.$i18n.locale}/error`);
    }
    this.updateData();
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  updateData() {
    this.getBurgers();
    this.getPromos();
    this.getIngredients();
    this.getUsers();
  }

  stopUpdate() {
    this.cancelAlert = false;
    this.editingStock = false;
    this.$v.$reset();
  }

  async getBurgers() {
    const response = await API.productList();

    if (response.status !== 200) {
      return null;
    }
    this.products = response.data;
    this.totalProducts = response.data.length;
    this.filterProducts = this.products;
  }

  async getPromos() {
    const response = await API.getPromoList();

    if (response.status !== 200) {
      return;
    }

    const responsePromo = await API.getPromoTranslationList();
    if (responsePromo.status !== 200) {
      return;
    }
    const promoTab: any = responsePromo.data;

    console.log('RESPONSEPROMO', promoTab);
    this.promos = responsePromo.data;
    this.totalPromos = this.promos.length;

    for (let i = 0; i < responsePromo.data.length; i++) {
      for (let j = 0; j < response.data.length; j++) {
        if (response.data[j].id === responsePromo.data[i].promotionId) {
          this.promos[i].amount = response.data[j].amount;
          this.promos[i].startDate = response.data[j].startDate;
          this.promos[i].endDate = response.data[j].endDate;
        }
      }
    }
    this.filterPromos = this.promos;
  }

  async getIngredients() {
    const response = await API.getAllStocks();

    if (response.status !== 200) {
      return;
    }
    this.stocks = response.data;

    const tempTab = await Promise.all(
      response.data.map((item) =>
        API.getIngredientsTranslationByIdAndLang(
          item.ingredientId,
          this.$i18n.locale
        )
      )
    );

    for (const stock of this.stocks) {
      for (const temp of tempTab) {
        if (stock.ingredientId === temp.data[0].ingredientId) {
          stock.name = temp.data[0].name;
        }
      }
    }
    this.filterStocks = this.stocks;
    this.totalStocks = this.stocks.length;
  }

  async getUsers() {
    const response = await API.getUsersList();

    if (response.status !== 200) {
      return;
    }

    this.users = response.data;
    this.filterUsers = this.users;
    this.totalUsers = response.data.length;
  }

  async getRoles() {
    const response = await API.getRoles();

    if (response.status !== 200) {
      return;
    }

    this.roles = response.data.map((role) => ({
      value: role.id,
      text: role.name,
    }));
  }

  openDetails(product: Product) {
    this.viewDetails = true;
    this.currentProduct = product;
  }

  openDetailsPromo(promo: Promo) {
    this.viewDetailsPromo = true;
    this.currentPromo = promo;
  }

  openDetailsStock(stock: Stock) {
    this.editingStock = true;
    this.currentStock = stock;

    this.currentStockId = this.currentStock.id;
    this.currentIngredientId = this.currentStock.ingredientId;
    this.name = this.currentStock.name;
    this.quantity = this.currentStock.amount;
  }

  openDetailsUser(user: UserCurrent) {
    this.viewDetailsUser = true;
    this.currentUser = user;
    this.getRoles();
  }

  handleChangePage(e: number) {
    this.currentPage = e;
  }

  handleChangePagePromos(e: number) {
    this.currentPagePromos = e;
  }

  handleChangePageStocks(e: number) {
    this.currentPageStocks = e;
  }

  goToUrl(url: string) {
    this.$router.push(url);
  }

  async updateStock() {
    this.$v.$touch();

    if (this.$v.$invalid) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.stock.errors.fields');
    }
    const responseUpdate = await API.updateStock(
      this.currentStockId,
      this.currentIngredientId,
      this.newQuantity,
      this.currentStock?.creationDate as string
    );

    if (this.newQuantity < 0) {
      this.errorAlert = true;
      this.errorMsg = this.$tc('pages.admin.stock.alert.errors.quantity');
      return;
    }

    if (responseUpdate.status !== 200) {
      return;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.stock.success.update');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.editingStock = false;
    this.getIngredients();
  }

  async updateRole() {
    this.$v.newRole.$touch();

    if (this.$v.newRole.$invalid) {
      return;
    }

    const responseRole = await API.getRoleById(parseInt(this.newRole));

    if (responseRole.status !== 200) {
      return;
    }

    const role: Role = {
      id: responseRole.data.id,
      name: responseRole.data.name,
    };

    const responseUpdate = await API.updateUser(
      (this.currentUser as UserCurrent).id,
      (this.currentUser as UserCurrent).email,
      (this.currentUser as UserCurrent).firstname,
      (this.currentUser as UserCurrent).lastname,
      (this.currentUser as UserCurrent).imageURL,
      (this.currentUser as UserCurrent).password,
      (this.currentUser as UserCurrent).status,
      (this.currentUser as UserCurrent).username,
      role
    );

    if (responseUpdate.status !== 200) {
      return;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.users.success.update');
    this.viewDetailsUser = false;
    this.getUsers();
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.newRole = '';
    this.$v.$reset();
  }

  handleSearchFilter(str: string) {
    const searchTab = (this.filterStocks as Stock[]).filter((item) => {
      return item.name.toLowerCase().includes(str.toLowerCase());
    });

    this.stocks = searchTab;
  }

  handleSearchFilterProducts(str: string) {
    const searchTab = (this.filterProducts as Product[]).filter((item) => {
      return item.name.toLowerCase().includes(str.toLowerCase());
    });

    this.products = searchTab;
  }

  handleSearchFilterUsers(str: string) {
    const searchTab = (this.filterUsers as UserCurrent[]).filter((item) => {
      return item.lastname.toLowerCase().includes(str.toLowerCase());
    });

    this.users = searchTab;
  }

  handleSearchFilterPromo(str: string) {
    const searchTab = (this.filterPromos as Promo[]).filter((item) => {
      return item.description.toLowerCase().includes(str.toLowerCase());
    });

    this.promos = searchTab;
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
}
</style>
