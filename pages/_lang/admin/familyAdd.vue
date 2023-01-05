<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col
      .title-line
        h1.p-3.title.text-center.text-secondary {{ $t('pages.admin.family.add.title1') }}
  b-row
    b-col(offset-lg='2' sm='16' lg='14')
      h3.py-3.title.text-secondary {{ $t('pages.admin.family.add.title2') }}
  b-row.mt-3
    b-col(offset-lg='2' sm='16' lg='14')
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.family.add.placeholder0")'
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
            :items='families'
            :fields='fields'
            :totalIngredients='totalFamilies'
          )
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "pencil-alt"]'
                @click='openDetails(data.item.productFamilyId)'
              )
            template(#cell(trash)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "trash"]'
                @click='handleDelete(data.item.productFamilyId)'
              )
          b-pagination(
            pills='pills'
            size='sm'
            v-model='currentPage'
            :total-rows='totalFamilies'
            :per-page='perPage'
            align='right'
          )
  b-row
    b-col.mx-auto(
      md='16'
      lg='12'
      xl='10'
      xxl='8 '
    )
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.family.add.title3') }}
  b-row
    b-col
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row.mb-1
          b-col.pb-3
            b-container.p-4.content.mb-5
              b-row
                b-col.mx-auto(md='12' xl='10')
                  h5.text-secondary.title {{ $t('pages.admin.family.add.title4') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.family.add.label1")'
                    label-for='language1'
                  )
                    b-form-select#language1.input-form(
                      v-model='$v.language1.$model'
                      :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                      :placeholder='$t("pages.admin.family.add.placeholder1")'
                      :options='langs'
                      @blur='$v.language1.$touch()'
                    )
                    .input-error(v-if='$v.language1.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.family.add.label2")'
                    label-for='name'
                  )
                    b-form-input#name.input-form(
                      v-model='$v.name.$model'
                      :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                      :placeholder='$t("pages.admin.family.add.placeholder2")'
                      type='text'
                      name='name'
                      @blur='$v.name.$touch()'
                    )
                    .input-error(v-if='$v.name.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.family.add.label3")'
                    label-for='description'
                  )
                    b-form-textarea#description.input-area(
                      v-model='$v.description.$model'
                      :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                      :placeholder='$t("pages.admin.family.add.placeholder3")'
                      name='description'
                      @blur='$v.description.$touch()'
                    )
                    .input-error(v-if='$v.description.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                b-col.mx-auto(md='12' xl='10')
                  h5.text-secondary.title {{ $t('pages.admin.family.add.title4') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.family.add.label1")'
                    label-for='language2'
                  )
                    b-form-select#language2.input-form(
                      v-model='$v.language2.$model'
                      :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                      :placeholder='$t("pages.admin.family.add.placeholder1")'
                      :options='langs'
                      @blur='$v.language2.$touch()'
                    )
                    .input-error(v-if='$v.language2.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.family.add.label4")'
                    label-for='frenchName'
                  )
                    b-form-input#frenchName.input-form(
                      v-model='$v.frenchName.$model'
                      :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                      :placeholder='$t("pages.admin.family.add.placeholder4")'
                      type='text'
                      name='frenchName'
                      @blur='$v.frenchName.$touch()'
                    )
                    .input-error(v-if='$v.frenchName.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.family.add.label5")'
                    label-for='frenchDescription'
                  )
                    b-form-textarea#frenchDescription.input-area(
                      v-model='$v.frenchDescription.$model'
                      :class='{ "is-invalid": $v.frenchDescription.$error, "is-valid": !$v.frenchDescription.$invalid }'
                      :placeholder='$t("pages.admin.family.add.placeholder5")'
                      name='frenchDescription'
                      @blur='$v.frenchDescription.$touch()'
                    )
                    .input-error(v-if='$v.frenchDescription.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
              b-row
                b-col.mx-auto(sm='12' lg='6')
                  .flex.text-center
                    b-button.mt-3.button.w-100(
                      variant='secondary'
                      @click='createFamily'
                    ) {{ $t('pages.admin.family.add.button1') }}
              b-row.mt-5(align-h='center')
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
      div {{ $t('pages.admin.family.alert.title1') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.family.alert.text1') }}
    template(#modal-footer)
      b-button.w-48(
        variant='outline-danger'
        @click='deleteFamily(currentFamily.id)'
      ) {{ $t('pages.admin.family.alert.button1') }}
      b-button.w-48(variant='primary' @click='deleteAlert = false') {{ $t('pages.admin.family.alert.button2') }}
  // CANCEL MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='cancelAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.family.alert.title2') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.family.alert.text2') }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='stopUpdate') {{ $t('pages.admin.family.alert.button3') }}
      b-button.w-48(variant='primary' @click='cancelAlert = false') {{ $t('pages.admin.family.alert.button4') }}
  // ERROR UPDATE MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='errorUpdateAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.family.alert.title3') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ errorMsg }}
    template(#modal-footer)
      //- b-button.w-48(variant='outline-danger' @click='stopEditing') {{ $t('pages.admin.family.alert.button3') }}
      b-button.w-48(variant='outline-danger' @click='errorUpdateAlert = false') {{ $t('pages.admin.family.alert.button5') }}
  // EDITING MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='editingFamily'
    centered
  )
    template(#modal-title)
      h4.text-secondary.text-center {{ $t('pages.admin.family.edit.title1') }}
    template(#modal-footer)
      b-button.button.w-48(@click='updateFamily') {{ $t('pages.admin.family.edit.button1') }}
      b-button.button.w-48(@click='cancelAlert = true') {{ $t('pages.admin.family.edit.button2') }}
    b-container
      h6.pt-3.title.text-secondary {{ $t('pages.admin.family.edit.title2') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.family.edit.label1")'
        label-for='editLanguage1'
      )
        b-form-select#editLanguage1.input-form(
          v-model='$v.editLanguage1.$model'
          :class='{ "is-invalid": $v.editLanguage1.$error, "is-valid": !$v.editLanguage1.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage1.$touch()'
        )
        .input-error(v-if='$v.editLanguage1.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.family.edit.label2")'
        label-for='editName'
      )
        b-form-input#editName.input-form(
          v-model='$v.editName.$model'
          :class='{ "is-invalid": $v.editName.$error, "is-valid": !$v.editName.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder2")'
          type='text'
          name='editName'
          @blur='$v.editName.$touch()'
        )
        .input-error(v-if='$v.editName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.family.add.label3")'
        label-for='editDescription'
      )
        b-form-textarea#editDescription.input-area(
          v-model='$v.editDescription.$model'
          :class='{ "is-invalid": $v.editDescription.$error, "is-valid": !$v.editDescription.$invalid }'
          :placeholder='$t("pages.admin.family.add.placeholder3")'
          name='editDescription'
          @blur='$v.editDescription.$touch()'
        )
        .input-error(v-if='$v.editDescription.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      h6.pt-3.title.text-secondary {{ $t('pages.admin.family.edit.title3') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.family.edit.label1")'
        label-for='editLanguage2'
      )
        b-form-select#editLanguage2.input-form(
          v-model='$v.editLanguage2.$model'
          :class='{ "is-invalid": $v.editLanguage2.$error, "is-valid": !$v.editLanguage2.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage2.$touch()'
        )
        .input-error(v-if='$v.editLanguage2.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.family.edit.label4")'
        label-for='editFrenchName'
      )
        b-form-input#editFrenchName.input-form(
          v-model='$v.editFrenchName.$model'
          :class='{ "is-invalid": $v.editFrenchName.$error, "is-valid": !$v.editFrenchName.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder4")'
          type='text'
          name='editFrenchName'
          @blur='$v.editFrenchName.$touch()'
        )
        .input-error(v-if='$v.editFrenchName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.family.add.label5")'
        label-for='editFrenchDescription'
      )
        b-form-textarea#editFrenchDescription.input-area(
          v-model='$v.editFrenchDescription.$model'
          :class='{ "is-invalid": $v.editFrenchDescription.$error, "is-valid": !$v.editFrenchDescription.$invalid }'
          :placeholder='$t("pages.admin.family.add.placeholder5")'
          name='editFrenchDescription'
          @blur='$v.editFrenchDescription.$touch()'
        )
        .input-error(v-if='$v.editFrenchDescription.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import alert from '@/components/global/alert.vue';

import { Families, SelectOption, submitProductAddType } from '@/utils/utils';
import { API } from '@/utils/javaBack';

@Component({
  components: { alert },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) language1: string = '';
  @Validate({ required }) language2: string = '';
  @Validate({ required }) frenchName: string = '';
  @Validate({ required }) frenchDescription: string = '';
  @Validate({ required }) editName: string = '';
  @Validate({ required }) editDescription: string = '';
  @Validate({ required }) editLanguage1: string = '';
  @Validate({ required }) editLanguage2: string = '';
  @Validate({ required }) editFrenchName: string = '';
  @Validate({ required }) editFrenchDescription: string = '';
  // @Validate({ required }) family: Families[] = [];

  families: Families[] = [];
  // filterFamilies
  familiesId: any[] = [];
  currentFamily: Families[] = [];
  langs: SelectOption[] = [];

  filterSearch: string = '';
  currentPage: number = 1;
  perPage: number = 8;
  totalFamilies: number = 0;

  errorUpdateAlert: boolean = false;
  cancelAlert: boolean = false;
  deleteAlert: boolean = false;
  editingFamily: boolean = false;

  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  errorMsg: string = '';
  error?: boolean = false;

  fields = [
    {
      key: 'productFamilyId',
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
      key: 'description',
      sortable: false,
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
    this.updateData();
  }

  openDetails(id: number) {
    this.editingFamily = true;
    this.getFamilyTranslationById(id);
  }

  stopUpdate() {
    this.cancelAlert = false;
    this.editingFamily = false;
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

  async getFamilyList() {
    const response = await API.familyList();

    if (response.status !== 200) {
      return;
    }

    this.families = response.data;
    this.totalFamilies = this.families.length;
  }

  async getFamilyTranslationById(id: number) {
    const response = await API.getFamilyTranslationById(id);

    if (response.status !== 200) {
      return;
    }

    this.currentFamily = response.data;
    // SET English translation to input fields
    this.editLanguage1 = this.currentFamily[0].language.id.toString();
    this.editName = this.currentFamily[0].name;
    this.editDescription = this.currentFamily[0].description as string;

    // SET French translation to input fields
    this.editLanguage2 = this.currentFamily[1].language.id.toString();
    this.editFrenchName = this.currentFamily[1].name;
    this.editFrenchDescription = this.currentFamily[1].description as string;
  }

  async deleteFamily(id: number) {
    const response = await API.deleteFamily(id);

    if (response.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.allergens.errors.delete');
      return;
    }

    this.deleteAlert = false;
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.family.success.delete');
    this.getFamilyList();
  }

  async handleDelete(id: number) {
    this.deleteAlert = true;

    const response = await API.getFamilyById(id);

    if (response.status !== 200) {
      return;
    }

    this.currentFamily = response.data;
  }

  updateData() {
    this.getLanguages();
    this.getFamilyList();
  }

  checkLang(lang1: string, lang2: string): boolean {
    console.log('LANG1', lang1);

    if (lang1.toString() === '2') {
      if (!this.editingFamily) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.family.errors.lang1');
      return false;
    }

    if (lang2.toString() === '1') {
      if (!this.editingFamily) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.family.errors.lang2');
      return false;
    }
    return true;
  }

  // @Watch('focus')
  // resetAlertMsg() {
  //   this.errorMsg = '';
  //   this.submitProductAdd = submitProductAddType.NONE;
  // }

  async createFamily() {
    if (!this.checkLang(this.language1, this.language2)) {
      return null;
    }
    this.$v.language1.$touch();
    this.$v.name.$touch();
    this.$v.description.$touch();
    this.$v.language2.$touch();
    this.$v.frenchName.$touch();
    this.$v.frenchDescription.$touch();

    if (
      this.$v.name.$invalid ||
      this.$v.language1.$invalid ||
      this.$v.language2.$invalid ||
      this.$v.frenchName.$invalid ||
      this.$v.description.$invalid ||
      this.$v.frenchDescription.$invalid
    ) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.fields');
      return;
    }
    console.log('ADD Family');

    const responseCreateFamily = await API.addFamily();

    if (responseCreateFamily.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.create');
      return;
    }

    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.getLanguage');
      return;
    }

    const englishLang = responseEnglishLang.data;

    const responseCreateEnglishTranslation = await API.addFamilyTranslation(
      responseCreateFamily.data.id,
      englishLang,
      this.description,
      this.name
    );

    if (responseCreateEnglishTranslation.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.createTranslation');
      return;
    }

    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.getLanguage');
      return;
    }
    const frenchLang = responseFrenchLang.data;

    const responseCreateFrenchTranslation = await API.addFamilyTranslation(
      responseCreateFamily.data.id,
      frenchLang,
      this.frenchDescription,
      this.frenchName
    );

    if (responseCreateFrenchTranslation.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.createTranslation');
      return; // ERROR DOES NOT DISPLAYED ... ERROR PAGE NOT ALERT !!!
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.family.success.create');
    this.getFamilyList();
  }

  async updateFamily() {
    if (!this.checkLang(this.editLanguage1, this.editLanguage2)) {
      return null;
    }

    this.$v.editLanguage1.$touch();
    this.$v.editLanguage2.$touch();
    this.$v.editName.$touch();
    this.$v.editFrenchName.$touch();
    this.$v.editDescription.$touch();
    this.$v.editFrenchDescription.$touch();

    if (
      this.$v.editName.$invalid ||
      this.$v.editLanguage1.$invalid ||
      this.$v.editLanguage2.$invalid ||
      this.$v.editFrenchName.$invalid ||
      this.$v.editDescription.$invalid ||
      this.$v.editFrenchDescription.$invalid
    ) {
      this.errorUpdateAlert = true;
      this.errorMsg = this.$tc('pages.admin.family.errors.fields');
      return;
    }

    const responseUpdateFamilyEnTranslation = await API.updateFamilyTranslation(
      this.currentFamily[0].id,
      this.currentFamily[0].productFamilyId,
      this.currentFamily[0].language,
      this.editDescription,
      this.editName
    );

    if (responseUpdateFamilyEnTranslation.status !== 200) {
      return null;
    }

    const responseUpdateFamilyFrTranslation = await API.updateFamilyTranslation(
      this.currentFamily[1].id,
      this.currentFamily[1].productFamilyId,
      this.currentFamily[1].language,
      this.editFrenchDescription,
      this.editFrenchName
    );

    if (responseUpdateFamilyFrTranslation.status !== 200) {
      return null;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.allergens.success.update');
    this.editingFamily = false;
    this.$v.$reset();
    this.getFamilyList();
  }
}
</script>
<style scoped></style>
