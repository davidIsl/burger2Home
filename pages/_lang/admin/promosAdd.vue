<template lang="pug">
b-container.p-3.bg-gray(fluid)
  .p-2
    b-row
      b-col.pb-3.text-md-left(offset-lg='2' sm='16' lg='14')
        h2.text-secondary {{ $t('pages.admin.promos.add.title') }}
    b-row
      b-col(offset-lg='2' sm='24' lg='14')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder2")'
        )
      b-col.mt-3(offset-lg='2' lg='20')
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              :perPage='perPage'
              :current-page='currentPage'
              table-variant='secondary'
              :items='promos'
              :fields='fieldsPromo'
              @pageChange='handleChangePage'
            )
              template(#head(promotionId)='data')
                span {{ $t('pages.admin.promos.table.id') }}
              template(#head(language.name)='data')
                span {{ $t('pages.admin.promos.table.language') }}
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "pencil-alt"]'
                  @click='openDetailsPromo(data.item)'
                )
              template(#cell(stop)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "trash"]'
                  @click='handleDelete(data.item.promotionId)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPage'
              :total-rows='totalPromos'
              :per-page='perPage'
              @pageChange='handleChangePage'
              align='right'
            )
  b-row
    b-col(offset-lg='2')
      h3.p-3.text-secondary {{ $t('pages.admin.promos.add.title1') }}
  b-row
    b-col.mx-auto(lg='20')
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row
          b-col.pb-3
            .p-4.content
              b-row
                b-col.mx-auto(md='20' lg='12')
                  h5.text-secondary.title {{ $t('pages.admin.promos.add.title2') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.promos.add.label1")'
                    label-for='language1'
                  )
                    b-form-select#language1.input-form(
                      v-model='$v.language1.$model'
                      :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                      :placeholder='$t("pages.admin.promos.add.placeholder1")'
                      :options='langs'
                      @blur='$v.language1.$touch()'
                    )
                    .input-error(v-if='$v.language1.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.promos.add.label2")'
                    label-for='description'
                  )
                    b-form-textarea#description.input-area(
                      v-model='$v.description.$model'
                      :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                      :placeholder='$t("pages.admin.promos.add.placeholder2")'
                      name='description'
                      @blur='$v.description.$touch()'
                    )
                    .input-error(v-if='$v.description.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                b-col.mx-auto.pt-3.pt-lg-0(md='20' lg='12')
                  h5.text-secondary.title {{ $t('pages.admin.promos.add.title3') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.promos.add.label1")'
                    label-for='language2'
                  )
                    b-form-select#language2.input-form(
                      v-model='$v.language2.$model'
                      :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                      :placeholder='$t("pages.admin.promos.add.placeholder1")'
                      :options='langs'
                      @blur='$v.language2.$touch()'
                    )
                    .input-error(v-if='$v.language2.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.promos.add.label3")'
                    label-for='frenchDescription'
                  )
                    b-form-textarea#frenchDescription.input-area(
                      v-model='$v.frenchDescription.$model'
                      :class='{ "is-invalid": $v.frenchDescription.$error, "is-valid": !$v.frenchDescription.$invalid }'
                      :placeholder='$t("pages.admin.promos.add.placeholder3")'
                      name='frenchDescription'
                      @blur='$v.frenchDescription.$touch()'
                    )
                    .input-error(v-if='$v.frenchDescription.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
              b-row
                b-col.mx-auto(md='20' lg='12')
                  b-row
                    b-col
                      b-form-group.pt-3.text-primary(
                        :label='$t("pages.admin.promos.add.label4")'
                        label-for='amount'
                      )
                        b-form-input#amount.input-form(
                          v-model='$v.amount.$model'
                          :class='{ "is-invalid": $v.amount.$error, "is-valid": !$v.amount.$invalid }'
                          :placeholder='$t("pages.admin.promos.add.placeholder4")'
                          type='number'
                          step='0.5'
                          name='amount'
                          @blur='$v.amount.$touch()'
                        )
                        .input-error(v-if='$v.amount.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                  b-row
                    b-col
                      b-form-group.pt-3(
                        :label='$t("pages.admin.promos.add.label7")'
                        label-for='product'
                      )
                        multiselect#product(
                          v-model='$v.product.$model'
                          :options='products'
                          :multiple='true'
                          :placeholder='$t("pages.admin.promos.add.multiselect.placeholder1")'
                          :selectLabel='$t("pages.admin.promos.add.multiselect.label1")'
                          :selectedLabel='$t("pages.admin.promos.add.multiselect.label2")'
                          :deselectLabel='$t("pages.admin.promos.add.multiselect.label3")'
                          :searchable='true'
                          :class='{ "is-invalid": $v.product.$error }'
                          label='name'
                          track-by='name'
                          @blur='$v.product.$touch()'
                        )
                        .input-error(v-if='$v.product.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                b-col.mx-auto(md='20' lg='12')
                  b-form-group.pt-3(
                    :label='$t("pages.admin.promos.add.label5")'
                    label-for='startDate'
                  )
                    b-form-input#startDate.input-form(
                      v-model='$v.startDate.$model'
                      :class='{ "is-invalid": $v.startDate.$error, "is-valid": !$v.startDate.$invalid }'
                      :placeholder='$t("pages.admin.promos.add.placeholder5")'
                      type='datetime-local'
                      name='startDate'
                      @blur='$v.startDate.$touch()'
                    )
                    .input-error(v-if='$v.startDate.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.promos.add.label6")'
                    label-for='endDate'
                  )
                    b-form-input#endDate.input-form(
                      v-model='$v.endDate.$model'
                      :class='{ "is-invalid": $v.endDate.$error, "is-valid": !$v.endDate.$invalid }'
                      :placeholder='$t("pages.admin.promos.add.placeholder6")'
                      type='datetime-local'
                      name='endDate'
                      @blur='$v.endDate.$touch()'
                    )
                    .input-error(v-if='$v.endDate.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                //- .input-error.my-2(v-if='!image')
                //-   font-awesome-icon.mr-2(
                //-     :icon='["fa", "exclamation-triangle"]'
                //-   )
                //-   | {{ $t('pages.errors.required') }}
              b-row
                b-col.mx-auto(sm='12' lg='6')
                  .flex.text-center
                    b-button.mt-3.button.w-100(
                      variant='secondary'
                      @click='createPromo'
                    ) {{ $t('pages.admin.promos.add.button1') }}
              b-row.mt-5(align-h='center')
                b-col.p-2(xs='20' md='20' lg='24')
                  .p-0
                    alert(
                      :show='submitProductAdd === submitProductAddType.ERROR || submitProductAdd === submitProductAddType.SUCCESS'
                      :variant='submitProductAdd === submitProductAddType.ERROR ? "error" : "success"'
                      :icon='submitProductAdd === submitProductAddType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
                    )
                      h6.m-0.mb-2.text-center {{ errorMsg }}
  // DELETE MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-model='deleteAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.promos.alert.title1') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.promos.alert.text1') }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='stopPromo') {{ $t('pages.admin.promos.alert.button1') }}
      b-button.w-48(variant='primary' @click='deleteAlert = false') {{ $t('pages.admin.promos.alert.button2') }}
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
      div {{ $t('pages.admin.promos.alert.title2') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.promos.alert.text2') }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='stopUpdate') {{ $t('pages.admin.promos.alert.button3') }}
      b-button.w-48(variant='primary' @click='cancelAlert = false') {{ $t('pages.admin.promos.alert.button4') }}
  // ERROR UPDATE MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-model='errorUpdateAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.promos.alert.title3') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ errorMsg }}
    template(#modal-footer)
      //- b-button.w-48(variant='outline-danger' @click='stopEditing') {{ $t('pages.admin.promos.alert.button3') }}
      b-button.w-48(variant='outline-danger' @click='errorUpdateAlert = false') {{ $t('pages.admin.promos.alert.button5') }}
  // EDITING MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-model='editingPromo'
    size='lg'
    centered
  )
    template(#modal-title)
      h4.pb-3.text-secondary.text-center {{ $t('pages.admin.promos.edit.title1') }}
      .mx-auto
        b-img(
          thumbnail
          center
          fluid-grow
          src='/img/promos.png'
        )
    template(#modal-footer)
      b-button.mx-auto.button.w-48(@click='cancelAlert = true') {{ $t('pages.admin.promos.edit.button1') }}
      b-button.mx-auto.button.w-48(@click='updatePromo') {{ $t('pages.admin.promos.edit.button2') }}
    b-container
      h4.pb-1.title.text-secondary {{ $t('pages.admin.promos.edit.title2') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.promos.edit.label1")'
        label-for='editLanguage1'
      )
        b-form-select#editLanguage1.input-form(
          v-model='$v.editLanguage1.$model'
          :class='{ "is-invalid": $v.editLanguage1.$error, "is-valid": !$v.editLanguage1.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage1.$touch()'
        )
        .input-error(v-if='$v.editLanguage1.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.promos.edit.label2")'
        label-for='editDescription'
      )
        b-form-textarea#editDescription.input-area(
          v-model='$v.editDescription.$model'
          :class='{ "is-invalid": $v.editDescription.$error, "is-valid": !$v.editDescription.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder2")'
          type='text'
          name='editDescription'
          @blur='$v.editDescription.$touch()'
        )
        .input-error(v-if='$v.editDescription.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      h4.pb-1.title.text-secondary {{ $t('pages.admin.promos.edit.title3') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.promos.edit.label1")'
        label-for='editLanguage2'
      )
        b-form-select#editLanguage2.input-form(
          v-model='$v.editLanguage2.$model'
          :class='{ "is-invalid": $v.editLanguage2.$error, "is-valid": !$v.editLanguage2.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage2.$touch()'
        )
        .input-error(v-if='$v.editLanguage2.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.promos.edit.label3")'
        label-for='editFrenchDescription'
      )
        b-form-textarea#editFrenchDescription.input-area(
          v-model='$v.editFrenchDescription.$model'
          :class='{ "is-invalid": $v.editFrenchDescription.$error, "is-valid": !$v.editFrenchDescription.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder3")'
          type='text'
          name='editFrenchDescription'
          @blur='$v.editFrenchDescription.$touch()'
        )
        .input-error(v-if='$v.editFrenchDescription.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      h4.pb-1.title.text-secondary {{ $t('pages.admin.promos.edit.title4') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.promos.edit.label4")'
        label-for='editAmount'
      )
        b-form-input#editAmount.input-form(
          v-model='$v.editAmount.$model'
          :class='{ "is-invalid": $v.editAmount.$error, "is-valid": !$v.editAmount.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder4")'
          type='number'
          step='5'
          name='editAmount'
          @blur='$v.editAmount.$touch()'
        )
        .input-error(v-if='$v.editAmount.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3(
        :label='$t("pages.admin.promos.add.label7")'
        label-for='editProduct'
      )
        multiselect#editProduct(
          v-model='$v.editProduct.$model'
          :options='products'
          :multiple='true'
          :placeholder='$t("pages.admin.promos.add.multiselect.placeholder1")'
          :selectLabel='$t("pages.admin.promos.add.multiselect.label1")'
          :selectedLabel='$t("pages.admin.promos.add.multiselect.label2")'
          :deselectLabel='$t("pages.admin.promos.add.multiselect.label3")'
          :searchable='true'
          :class='{ "is-invalid": $v.editProduct.$error }'
          label='name'
          track-by='name'
          @blur='$v.editProduct.$touch()'
        )
        .input-error(v-if='$v.editProduct.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.m-0(
        :label='$t("pages.admin.promos.edit.label5")'
        label-for='editStartDate'
      )
        b-form-input#editStartDate.input-form(
          v-model='$v.editStartDate.$model'
          :class='{ "is-invalid": $v.editStartDate.$error, "is-valid": !$v.editStartDate.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder5")'
          type='datetime-local'
          name='editStartDate'
          @blur='$v.editStartDate.$touch()'
        )
        .input-error.my-2(v-if='$v.editStartDate.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.promos.edit.label6")'
        label-for='editEndDate'
      )
        b-form-input#editEndDate.input-form(
          v-model='$v.editEndDate.$model'
          :class='{ "is-invalid": $v.editEndDate.$error, "is-valid": !$v.editEndDate.$invalid }'
          :placeholder='$t("pages.admin.promos.edit.placeholder6")'
          type='datetime-local'
          name='editEndDate'
          @blur='$v.editEndDate.$touch()'
        )
        .input-error.my-2(v-if='$v.editEndDate.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';

import {
  formatDate,
  Product,
  Promo,
  SelectOption,
  submitProductAddType,
} from '~/utils/utils';
import { API } from '@/utils/javaBack';
import alert from '@/components/global/alert.vue';

@Component({
  components: { alert },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) language1: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) language2: string = '';
  @Validate({ required }) frenchDescription: string = '';
  @Validate({ required }) amount: number = 0;
  @Validate({ required }) product: Product[] = [];
  @Validate({ required }) startDate: Date | null = null;
  @Validate({ required }) endDate: Date | null = null;

  @Validate({ required }) editLanguage1: string = '';
  @Validate({ required }) editDescription: string = '';
  @Validate({ required }) editLanguage2: string = '';
  @Validate({ required }) editFrenchDescription: string = '';
  @Validate({ required }) editAmount: number = 0;
  @Validate({ required }) editProduct: Product[] = [];
  @Validate({ required }) editStartDate: Date | null = null;
  @Validate({ required }) editEndDate: Date | null = null;

  promos: Promo[] = [];
  products: Product[] = [];
  langs: SelectOption[] = [];

  currentPromo: Promo | null = null;
  currentEnTranslationId: number = 0;
  currentFrTranslationId: number = 0;
  creationDate: string = '';
  filterSearch: string = '';

  perPage: number = 8;
  currentPage: number = 1;
  totalPromos: number = 0;

  editingPromo: boolean = false;
  deleteAlert: boolean = false;
  errorUpdateAlert: boolean = false;
  cancelAlert: boolean = false;
  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;
  errorMsg: string = '';

  fieldsPromo = [
    {
      key: 'promotionId',
      sortable: true,
    },
    {
      key: 'description',
      sortable: true,
    },
    {
      key: 'language.name',
      sortable: true,
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
    {
      key: 'stop',
      sortable: false,
    },
  ];

  mounted() {
    if (this.$store.state.users.currentUser.role.name !== 'marketing') {
      return this.$router.push(`/${this.$i18n.locale}/error`);
    }

    this.updateData();
  }

  updateData() {
    this.getLanguages();
    this.getPromos();
    this.getProducts();
  }

  stopUpdate() {
    this.cancelAlert = false;
    this.editingPromo = false;
    // this.$v.editLanguage1.$reset();
    // this.$v.editAmount.$reset();
    this.$v.$reset();
    this.editProduct = [];
  }

  resetFields() {
    this.language1 = '';
    this.language2 = '';
    this.description = '';
    this.frenchDescription = '';
    this.amount = 0;
    this.startDate = null;
    this.endDate = null;
    this.product = [];
    this.$v.$reset();
  }

  async getLanguages() {
    const response = await API.languagesList();

    if (response.status !== 200) {
      return null;
    }

    this.langs = response.data.map((lang) => ({
      value: lang.id,
      text: lang.name,
    }));
    console.log('LANGUAGE:', this.langs);
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
    // const promoTab: any = responsePromo.data;

    this.promos = responsePromo.data;
    this.totalPromos = responsePromo.data.length;

    for (let i = 0; i < responsePromo.data.length; i++) {
      for (let j = 0; j < response.data.length; j++) {
        if (response.data[j].id === responsePromo.data[i].promotionId) {
          this.promos[i].amount = response.data[j].amount;
          this.promos[i].startDate = response.data[j].startDate;
          this.promos[i].endDate = response.data[j].endDate;
        }
      }
    }
  }

  async getPromoById(id: number) {
    const response = await API.getPromoById(id);

    if (response.status !== 200) {
      return;
    }
    // this.currentPromo = response.data;
    this.creationDate = response.data.creationDate;
    console.log('CREATION DATE GET BY ID', this.creationDate);
    this.editAmount = response.data.amount;
    this.editStartDate = response.data.startDate;
    this.editEndDate = response.data.endDate;

    for (let i = 0; i < response.data.products.length; i++) {
      const productId = response.data.products[i].id;
      console.log('ID', productId);

      if (this.$i18n.locale === 'en') {
        const responseProdSum = await API.getProductSumByLangAndId(
          this.$i18n.locale,
          productId
        );

        if (responseProdSum.status !== 200) {
          return;
        }

        this.editProduct.push(responseProdSum.data);
      }
      if (this.$i18n.locale === 'fr') {
        const responseProdSum = await API.getProductSumByLangAndId(
          this.$i18n.locale,
          productId
        );

        if (responseProdSum.status !== 200) {
          return;
        }

        this.editProduct.push(responseProdSum.data);
      }
    }
    console.log('PROMO PRODUCT', response.data);
  }

  async getPromoTranslationById(id: number) {
    const response = await API.getPromoTranslationByPromoId(id);

    if (response.status !== 200) {
      return;
    }

    this.currentEnTranslationId = response.data[0].id;
    this.currentFrTranslationId = response.data[1].id;
    this.editLanguage1 = response.data[0].language.id.toString();
    this.editLanguage2 = response.data[1].language.id.toString();
    this.editDescription = response.data[0].description;
    this.editFrenchDescription = response.data[1].description;
  }

  async getProducts() {
    const response = await API.getProductSummaryByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return;
    }

    this.products = response.data;
  }

  checkLang(lang1: string, lang2: string): boolean {
    console.log('LANG1', lang1);

    if (lang1.toString() === '2') {
      if (!this.editingPromo) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.promos.errors.lang1');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return false;
    }

    if (lang2.toString() === '1') {
      if (!this.editingPromo) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.promos.errors.lang2');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return false;
    }
    return true;
  }

  openDetailsPromo(promo: Promo) {
    this.editingPromo = true;
    this.currentPromo = promo;

    // console.log('CREATION DATE', this.currentPromo.creationDate);
    this.getPromoById(promo.promotionId);

    this.getPromoTranslationById(promo.promotionId);
    console.log('PROMO', this.currentPromo);

    // this.editLanguage1 = this.currentPromo.language[0].name;
  }

  handleChangePage(e: number) {
    this.currentPage = e;
    // this.getBurgers();
  }

  async createPromo() {
    // this.submitProductAdd = submitProductAddType.NONE;
    if (!this.checkLang(this.language1, this.language2)) {
      return null;
    }
    // this.$v.$touch();
    this.$v.language1.$touch();
    this.$v.description.$touch();
    this.$v.language2.$touch();
    this.$v.frenchDescription.$touch();
    this.$v.amount.$touch();
    this.$v.product.$touch();
    this.$v.startDate.$touch();
    this.$v.endDate.$touch();

    if (
      this.$v.language1.$invalid ||
      this.$v.description.$invalid ||
      this.$v.language2.$invalid ||
      this.$v.frenchDescription.$invalid ||
      this.$v.amount.$invalid ||
      this.$v.product.$invalid ||
      this.$v.startDate.$invalid ||
      this.$v.endDate.$invalid
    ) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.promos.errors.fields');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    if (this.amount <= 0) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.promos.errors.amount');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }
    const creationDate = new Date();
    const formattedCreationDate = formatDate(creationDate.toString());
    const formattedStartDate = formatDate(this.startDate?.toString() as string);
    const formattedEndDate = formatDate(this.endDate?.toString() as string);

    const productId: any = this.product.map((item) => ({
      id: item.id,
    }));

    const responseCreate = await API.addPromo(
      this.amount,
      formattedCreationDate,
      formattedStartDate,
      formattedEndDate,
      productId
    );

    if (responseCreate.status !== 200) {
      return;
    }

    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
      return;
    }

    const englishLang = responseEnglishLang.data;

    const responseCreateEnTranlation = await API.addPromoTranslation(
      this.description,
      responseCreate.data.id,
      englishLang
    );

    if (responseCreateEnTranlation.status !== 200) {
      return;
    }

    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
      return;
    }
    const frenchLang = responseFrenchLang.data;

    const responseCreateFrTranlation = await API.addPromoTranslation(
      this.frenchDescription,
      responseCreate.data.id,
      frenchLang
    );

    if (responseCreateFrTranlation.status !== 200) {
      return;
    }

    this.getPromos();
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.promos.success.create');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 2000);
    this.resetFields();
    console.log('ADD PROMO');
  }

  async updatePromo() {
    if (!this.checkLang(this.editLanguage1, this.editLanguage2)) {
      return null;
    }

    this.$v.editLanguage1.$touch();
    this.$v.editDescription.$touch();
    this.$v.editLanguage2.$touch();
    this.$v.editFrenchDescription.$touch();
    this.$v.editAmount.$touch();
    this.$v.editProduct.$touch();
    this.$v.editStartDate.$touch();
    this.$v.editEndDate.$touch();

    if (
      this.$v.editLanguage1.$invalid ||
      this.$v.editDescription.$invalid ||
      this.$v.editLanguage2.$invalid ||
      this.$v.editFrenchDescription.$invalid ||
      this.$v.editAmount.$invalid ||
      this.$v.editProduct.$invalid ||
      this.$v.editStartDate.$invalid ||
      this.$v.editEndDate.$invalid
    ) {
      this.errorUpdateAlert = true;
      this.errorMsg = this.$tc('pages.admin.promos.errors.fields');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    if (this.editAmount <= 0) {
      this.errorUpdateAlert = true;
      this.errorMsg = this.$tc('pages.admin.promos.errors.amount');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      // return;
    }

    const formattedStartDate = formatDate(
      this.editStartDate?.toString() as string
    );
    const formattedEndDate = formatDate(this.editEndDate?.toString() as string);
    const productId: any = this.editProduct.map((item) => ({
      id: item.id,
    }));

    console.log('CREATION DATAE', this.currentPromo?.creationDate);

    const responseUpdatePromo = await API.updatePromo(
      this.currentPromo?.promotionId as number,
      this.editAmount,
      this.creationDate,
      formattedStartDate,
      formattedEndDate,
      productId
    );

    if (responseUpdatePromo.status !== 200) {
      return;
    }

    const englishId = parseInt(this.editLanguage1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
      return;
    }

    const englishLang = responseEnglishLang.data;

    const responseUpdatePromoEnTranslation = await API.updatePromoTranslation(
      this.currentEnTranslationId,
      this.editDescription,
      this.currentPromo?.promotionId as number,
      englishLang
    );

    if (responseUpdatePromoEnTranslation.status !== 200) {
      return;
    }

    const frenchId = parseInt(this.editLanguage2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.ingredients.errors.getLanguage');
      return;
    }
    const frenchLang = responseFrenchLang.data;

    const responseUpdatePromoFrTranslation = await API.updatePromoTranslation(
      this.currentFrTranslationId,
      this.editFrenchDescription,
      this.currentPromo?.promotionId as number,
      frenchLang
    );

    if (responseUpdatePromoFrTranslation.status !== 200) {
      return;
    }

    this.getPromos();
    this.editingPromo = false;
    this.$v.$reset();
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.promos.success.update');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
    console.log('UPDATED PROMO');
  }

  async handleDelete(id: number) {
    this.deleteAlert = true;

    console.log('ID:', id);

    const response = await API.getPromoById(id);

    if (response.status !== 200) {
      return;
    }

    this.currentPromo = response.data;
  }

  async stopPromo() {
    const endDate = formatDate(new Date().toString());

    const response = await API.updatePromo(
      this.currentPromo?.id as number,
      this.currentPromo?.amount as number,
      this.currentPromo?.creationDate as string,
      this.currentPromo?.startDate as string,
      endDate,
      this.currentPromo?.products as Product[]
    );

    if (response.status !== 200) {
      return;
    }
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.promos.success.stopPromo');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.getPromos();
    this.deleteAlert = false;
  }
}
</script>
