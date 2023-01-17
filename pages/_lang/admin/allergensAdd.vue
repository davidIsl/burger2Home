<template lang="pug">
b-container.p-sm-5.pb-3.pb-sm-0.bg-gray(fluid)
  b-row
    b-col(offset-lg='2' sm='16' lg='20')
      .title-line
        h1.pb-3.title.text-secondary {{ $t('pages.admin.allergens.add.title') }}
  b-row
    b-col(offset-lg='2' sm='16' lg='14')
      h3.py-3.title.text-secondary {{ $t('pages.admin.allergens.add.title4') }}
  b-row.mt-3
    b-col(offset-lg='2' sm='16' lg='14')
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.allergens.add.placeholder3")'
      )

  b-row
    b-col.mt-3(offset-lg='2' lg='20')
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            head-row-variant='darkRed'
            table-variant='gray'
            :current-page='currentPage'
            :perPage='perPage'
            :items='allergens'
            :fields='fields'
            :totalAllergens='totalAllergens'
          )
            //- template(#head(x)='data')
            //-   b-form-checkbox#checkbox-header(
            //-     name='checkbox-header'
            //-     @change='selectAllTableItems($event)'
            //-   )
            //- template(#cell(x)='data')
            //-   b-form-checkbox(
            //-     :checked='selectedAllItems'
            //-     @input='selectTableItem($event, data.item.id)'
            //-   )
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "pencil-alt"]'
                @click='openDetails(data.item.allergenId)'
              )
            template(#cell(trash)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "trash"]'
                @click='handleDelete(data.item.allergenId)'
              )
          b-pagination(
            pills='pills'
            size='sm'
            v-model='currentPage'
            :total-rows='totalAllergens'
            :per-page='perPage'
            align='right'
            @change='handleChangePage'
          )
  b-row.pt-5
    b-col(offset-lg='2' md='16' lg='20')
      h3.py-3.text-secondary.title {{ $t('pages.admin.allergens.add.title1') }}
  b-row
    b-col(offset-lg='2' sm='24' lg='20')
      .p-4.content
        b-row
          b-col.mx-auto(md='12' xl='9')
            h5.text-secondary.title {{ $t('pages.admin.allergens.add.title2') }}
            b-form-group.pt-3.text-primary(
              :label='$t("pages.admin.allergens.add.label")'
              label-for='language1'
            )
              b-form-select#language1.input-form(
                v-model='$v.language1.$model'
                :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                :placeholder='$t("pages.admin.allergens.add.placeholder")'
                :options='langs'
                @blur='$v.language1.$touch()'
              )
              .input-error(v-if='$v.language1.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
            b-form-group.pt-0.pt-md-3.text-primary(
              :label='$t("pages.admin.allergens.add.label1")'
              label-for='name'
            )
              b-form-input#name.input-form(
                v-model='$v.name.$model'
                :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                :placeholder='$t("pages.admin.allergens.add.placeholder1")'
                type='text'
                name='name'
                @blur='$v.name.$touch()'
              )
              .input-error(v-if='$v.name.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
          b-col.mx-auto.pt-3.pt-md-0(md='12' xl='9')
            h5.text-secondary.title {{ $t('pages.admin.allergens.add.title3') }}
            b-form-group.pt-3.text-primary(
              :label='$t("pages.admin.allergens.add.label")'
              label-for='language2'
            )
              b-form-select#language2.input-form(
                v-model='$v.language2.$model'
                :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                :placeholder='$t("pages.admin.allergens.add.placeholder")'
                :options='langs'
                @blur='$v.language2.$touch()'
              )
              .input-error(v-if='$v.language2.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
            b-form-group.pt-0.pt-md-3.text-primary(
              :label='$t("pages.admin.allergens.add.label2")'
              label-for='frenchName'
            )
              b-form-input#frenchName.input-form(
                v-model='$v.frenchName.$model'
                :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                :placeholder='$t("pages.admin.allergens.add.placeholder2")'
                type='text'
                name='frenchName'
                @blur='$v.frenchName.$touch()'
              )
              .input-error(v-if='$v.frenchName.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
        b-row
          b-col.mx-auto(sm='12' lg='6')
            .flex.text-center
              b-button.mt-3.button.w-100(
                variant='secondary'
                @click='createAllergen'
              ) {{ $t('pages.admin.allergens.add.button1') }}
        b-row.mt-3(align-h='center')
          b-col.p-0(cols='22')
            b-container.p-0
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
    v-model='deleteAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.allergens.alert.title1') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.allergens.alert.text1') }}
    template(#modal-footer)
      b-button.w-48(
        variant='outline-danger'
        @click='deleteAllergen(currentAllergen.id)'
      ) {{ $t('pages.admin.allergens.alert.button1') }}
      b-button.w-48(variant='primary' @click='deleteAlert = false') {{ $t('pages.admin.allergens.alert.button2') }}
  // CANCEL MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='cancelAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.allergens.alert.title2') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.allergens.alert.text2') }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='stopUpdate') {{ $t('pages.admin.allergens.alert.button3') }}
      b-button.w-48(variant='primary' @click='cancelAlert = false') {{ $t('pages.admin.allergens.alert.button4') }}
  // ERROR UPDATE MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='errorUpdateAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.allergens.alert.title3') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ errorMsg }}
    template(#modal-footer)
      //- b-button.w-48(variant='outline-danger' @click='stopEditing') {{ $t('pages.admin.allergens.alert.button3') }}
      b-button.w-48(variant='outline-danger' @click='errorUpdateAlert = false') {{ $t('pages.admin.allergens.alert.button5') }}
    // MODAL EDITING ALLERGEN
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='editingAllergen'
    centered
  )
    template(#modal-title)
      h4.text-secondary.text-center {{ $t('pages.admin.allergens.edit.title1') }}
    template(#modal-footer)
      b-button.button.w-48(@click='updateAllergen') {{ $t('pages.admin.allergens.edit.button1') }}
      b-button.button.w-48(@click='cancelAlert = true') {{ $t('pages.admin.allergens.edit.button2') }}
    b-container
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.allergens.edit.label1")'
        label-for='editLanguage1'
      )
        b-form-select#editLanguage1.input-form(
          v-model='$v.editLanguage1.$model'
          :class='{ "is-invalid": $v.editLanguage1.$error, "is-valid": !$v.editLanguage1.$invalid }'
          :placeholder='$t("pages.admin.allergens.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage1.$touch()'
        )
        .input-error(v-if='$v.editLanguage1.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.allergens.edit.label2")'
        label-for='name'
      )
        b-form-input#editName.input-form(
          v-model='$v.editName.$model'
          :class='{ "is-invalid": $v.editName.$error, "is-valid": !$v.editName.$invalid }'
          :placeholder='$t("pages.admin.allergens.edit.placeholder2")'
          type='text'
          name='editName'
          @blur='$v.editName.$touch()'
        )
        .input-error(v-if='$v.editName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.allergens.edit.label1")'
        label-for='editLanguage2'
      )
        b-form-select#editLanguage2.input-form(
          v-model='$v.editLanguage2.$model'
          :class='{ "is-invalid": $v.editLanguage2.$error, "is-valid": !$v.editLanguage2.$invalid }'
          :placeholder='$t("pages.admin.allergens.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage2.$touch()'
        )
        .input-error(v-if='$v.editLanguage2.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.allergens.edit.label3")'
        label-for='editFrenchName'
      )
        b-form-input#editFrenchName.input-form(
          v-model='$v.editFrenchName.$model'
          :class='{ "is-invalid": $v.editFrenchName.$error, "is-valid": !$v.editFrenchName.$invalid }'
          :placeholder='$t("pages.admin.allergens.edit.placeholder3")'
          type='text'
          name='editFrenchName'
          @blur='$v.editFrenchName.$touch()'
        )
        .input-error(v-if='$v.editFrenchName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import alert from '@/components/global/alert.vue';
import filters from '@/components/global/filters.vue';

import { Allergens, SelectOption, submitProductAddType } from '@/utils/utils';
import { API } from '@/utils/javaBack';

@Component({
  components: { alert, filters },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) language1: string = '';
  @Validate({ required }) language2: string = '';
  @Validate({ required }) frenchName: string = '';
  @Validate({ required }) editName: string = '';
  @Validate({ required }) editLanguage1: string = '';
  @Validate({ required }) editLanguage2: string = '';
  @Validate({ required }) editFrenchName: string = '';

  langs: SelectOption[] = [];
  allergens: Allergens[] = [];
  currentAllergen: Allergens[] = [];

  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;
  errorMsg: string = '';

  filterSearch: string = '';
  // viewDetails: boolean = false;

  currentPage: number = 1;
  perPage: number = 8;
  totalAllergens: number = 0;

  itemSelected: number[] = [];
  selectedAllItems: boolean = false;

  errorUpdateAlert: boolean = false;
  cancelAlert: boolean = false;
  deleteAlert: boolean = false;
  editingAllergen: boolean = false;

  fields = [
    {
      key: 'allergenId',
      sortable: true,
    },
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'language.name',
      sortable: true,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
    {
      key: 'trash',
      sortable: false,
    },
  ];

  mounted() {
    if (this.$store.state.users.currentUser.role.name !== 'admin') {
      return this.$router.push(`/${this.$i18n.locale}/error`);
    }

    this.updateData();
    console.log('ROUTE', this.$route.params);
  }

  openDetails(id: number) {
    this.editingAllergen = true;
    this.getAllergenTranslationById(id);
  }

  stopUpdate() {
    this.cancelAlert = false;
    this.editingAllergen = false;
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
  }

  async getAllergens() {
    const response = await API.allergensList();

    if (response.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.getAllergens');
      return;
    }

    this.allergens = response.data;
    this.totalAllergens = response.data.length;
  }

  async getAllergenTranslationById(id: number) {
    const response = await API.getAllergensTranslationById(id);

    if (response.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.getAllergens');
      return;
    }

    this.currentAllergen = response.data;

    this.editLanguage1 = this.currentAllergen[0].language.id.toString();
    this.editName = this.currentAllergen[0].name;
    this.editLanguage2 = this.currentAllergen[1].language.id.toString();
    this.editFrenchName = this.currentAllergen[1].name;
  }

  async deleteAllergen(id: number) {
    const response = await API.deleteAllergen(id);

    if (response.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.delete');
      return;
    }

    this.deleteAlert = false;
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.allergens.success.delete');
    this.getAllergens();
  }

  updateData() {
    this.getLanguages();
    this.getAllergens();
  }

  checkLang(lang1: string, lang2: string): boolean {
    if (lang1.toString() === '2') {
      if (!this.editingAllergen) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.allergens.errors.lang1');
      return false;
    }

    if (lang2.toString() === '1') {
      if (!this.editingAllergen) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.allergens.errors.lang2');
      return false;
    }
    return true;
  }

  async createAllergen() {
    if (!this.checkLang(this.language1, this.language2)) {
      return null;
    }
    this.$v.name.$touch();
    this.$v.frenchName.$touch();
    this.$v.language1.$touch();
    this.$v.language2.$touch();

    if (
      this.$v.name.$invalid ||
      this.$v.language1.$invalid ||
      this.$v.language2.$invalid ||
      this.$v.frenchName.$invalid
    ) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.fields');
      return;
    }

    const responseCreateAllergen = await API.addAllergen();

    if (responseCreateAllergen.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.create');
      return;
    }

    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
      return;
    }

    const englishLang = responseEnglishLang.data;

    const responseCreateEnglishTranslation = await API.addAllergenTranslation(
      this.name,
      englishLang,
      responseCreateAllergen.data.id
    );

    if (responseCreateEnglishTranslation.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc(
        'pages.admin.allergens.errors.createTranslation'
      );
      return;
    }

    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
      return;
    }
    const frenchLang = responseFrenchLang.data;

    const responseCreateFrenchTranslation = await API.addAllergenTranslation(
      this.frenchName,
      frenchLang,
      responseCreateAllergen.data.id
    );

    if (responseCreateFrenchTranslation.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc(
        'pages.admin.allergens.errors.createTranslation'
      );
      return;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.allergens.success.create');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.getAllergens();
  }

  async updateAllergen() {
    if (!this.checkLang(this.editLanguage1, this.editLanguage2)) {
      return null;
    }

    this.$v.editLanguage1.$touch();
    this.$v.editLanguage2.$touch();
    this.$v.editName.$touch();
    this.$v.editFrenchName.$touch();

    if (
      this.$v.editName.$invalid ||
      this.$v.editLanguage1.$invalid ||
      this.$v.editLanguage2.$invalid ||
      this.$v.editFrenchName.$invalid
    ) {
      this.errorUpdateAlert = true;
      this.errorMsg = this.$tc('pages.admin.allergens.errors.fields');
      return;
    }

    const responseUpdateAllergenEnTranslation =
      await API.updateAllergenTranslation(
        this.currentAllergen[0].id,
        this.editName,
        this.currentAllergen[0].language,
        this.currentAllergen[0].allergenId
      );

    if (responseUpdateAllergenEnTranslation.status !== 200) {
      return null;
    }

    const responseUpdateAllergenFrTranslation =
      await API.updateAllergenTranslation(
        this.currentAllergen[1].id,
        this.editFrenchName,
        this.currentAllergen[1].language,
        this.currentAllergen[1].allergenId
      );

    if (responseUpdateAllergenFrTranslation.status !== 200) {
      return null;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.allergens.success.update');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.editingAllergen = false;
    this.$v.$reset();
    this.getAllergens();
  }

  resetData() {
    this.submitProductAdd = submitProductAddType.NONE;
    this.language1 = '';
    this.language2 = '';
    this.name = '';
    this.frenchName = '';
    this.$v.$reset();
  }

  handleChangePage(e: number) {
    this.currentPage = e;
  }

  async handleDelete(id: number) {
    this.deleteAlert = true;

    const response = await API.getAllergenById(id);

    if (response.status !== 200) {
      return;
    }

    this.currentAllergen = response.data;
  }

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped></style>
