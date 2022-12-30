<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col
      .title-line
        h1.p-3.title.text-center.text-secondary {{ $t('pages.admin.family.add.title1') }}
  b-row
    b-col(
      :offset-lg='filters ? "2" : "2"'
      sm='16'
      :md='filters ? "18" : "16"'
      :lg='filters ? "18" : "14"'
    )
      h3.py-3.title.text-secondary {{ $t('pages.admin.family.add.title2') }}
  b-row.mt-3
    b-col(
      :offset-lg='filters ? "2" : "2"'
      sm='16'
      :md='filters ? "18" : "16"'
      :lg='filters ? "16" : "14"'
    )
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.family.add.placeholder0")'
      )
  b-row
    b-col.mt-3(:offset-lg='filters ? "0" : "2"' :lg='filters ? "16" : "20"')
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            table-variant='secondary'
            :current-page='currentPage'
            :perPage='perPage'
            :items='families'
            :fields='fields'
            :totalIngredients='totalFamilies'
            @pageChange='handleChangePage'
          )
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "pencil-alt"]'
                @click='openDetails(data.item.id)'
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
            @change='handleChangePage'
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
                      v-on:focus='resetAlertMsg'
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
                      formatter='resetAlertMsg'
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
      b-button.button.w-48 {{ $t('pages.admin.family.edit.button1') }}
      b-button.button.w-48(@click='cancelAlert = true') {{ $t('pages.admin.family.edit.button2') }}
    b-container
      h6.pt-3.title.text-secondary {{ $t('pages.admin.family.edit.title2') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.family.edit.label1")'
        label-for='language1'
      )
        b-form-select#language1.input-form(
          v-model='$v.language1.$model'
          :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder1")'
          :options='langs'
          v-on:focus='resetAlertMsg'
          @blur='$v.language1.$touch()'
        )
        .input-error(v-if='$v.language1.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.family.edit.label2")'
        label-for='name'
      )
        b-form-input#name.input-form(
          v-model='$v.name.$model'
          :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder2")'
          type='text'
          name='name'
          @blur='$v.name.$touch()'
        )
        .input-error(v-if='$v.name.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
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
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      h6.pt-3.title.text-secondary {{ $t('pages.admin.family.edit.title3') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.family.edit.label1")'
        label-for='language2'
      )
        b-form-select#language2.input-form(
          v-model='$v.language2.$model'
          :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder1")'
          :options='langs'
          v-on:focus='resetAlertMsg'
          @blur='$v.language2.$touch()'
        )
        .input-error(v-if='$v.language2.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.family.edit.label4")'
        label-for='frenchName'
      )
        b-form-input#frenchName.input-form(
          v-model='$v.frenchName.$model'
          :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
          :placeholder='$t("pages.admin.family.edit.placeholder4")'
          type='text'
          name='frenchName'
          @blur='$v.frenchName.$touch()'
        )
        .input-error(v-if='$v.frenchName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
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
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      //- b-form-group.pt-4(
      //-   :label='$t("pages.admin.family.add.label4")'
      //-   label-for='allergens'
      //- )
      //-   multiselect#allergens(
      //-     v-model='$v.allergen.$model'
      //-     :options='allergens'
      //-     :multiple='true'
      //-     :placeholder='$t("pages.admin.family.edit.placeholder4")'
      //-     :selectLabel='$t("pages.admin.family.edit.label5")'
      //-     :selectedLabel='$t("pages.admin.family.edit.label6")'
      //-     :deselectLabel='$t("pages.admin.family.edit.label7")'
      //-     :searchable='true'
      //-     :class='{ "is-invalid": $v.allergen.$error }'
      //-     label='name'
      //-     track-by='name'
      //-     @blur='$v.allergen.$touch()'
      //-   )
      //-     .input-error.my-2(v-if='$v.allergen.$error')
      //-       font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
      //-       | {{ $t('pages.errors.required') }}
</template>
<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator';
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
  // @Validate({ required }) family: Families[] = [];

  families: Families[] = [];
  familiesId: any[] = [];
  currentFamily: Families[] = [];
  langs: SelectOption[] = [];

  currentPage: number = 1;
  perPage: number = 8;
  totalFamilies: number = 0;

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

  checkLang(): boolean {
    console.log('LANG1', this.language1);

    if (this.language1.toString() === '2') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.lang1');
      return false;
    }

    if (this.language2.toString() === '1') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.family.errors.lang2');
      return false;
    }
    return true;
  }

  @Watch('focus')
  resetAlertMsg() {
    this.errorMsg = '';
    this.submitProductAdd = submitProductAddType.NONE;
  }

  async createFamily() {
    if (!this.checkLang()) {
      return null;
    }
    this.$v.$touch();
    if (this.$v.$invalid) {
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

  updateFamily() {}
}
</script>
<style scoped></style>
