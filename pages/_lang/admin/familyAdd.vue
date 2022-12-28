<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col
      .title-line
        h1.p-3.title.text-center.text-secondary {{ $t('pages.admin.familyAdd.title') }}
  b-row
    b-col.mx-auto(
      md='16'
      lg='12'
      xl='10'
      xxl='8 '
    )
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.familyAdd.title1') }}
  b-row
    b-col.mx-auto
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row.mb-1
          b-col.pb-3
            b-container.p-4.content.mb-5
              b-row
                b-col.mx-auto(md='12' xl='10')
                  h5.text-secondary.title {{ $t('pages.admin.familyAdd.title2') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.familyAdd.label")'
                    label-for='language1'
                  )
                    b-form-select#language1.input-form(
                      v-model='$v.language1.$model'
                      :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                      :placeholder='$t("pages.admin.familyAdd.placeholder")'
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
                    :label='$t("pages.admin.familyAdd.label1")'
                    label-for='name'
                  )
                    b-form-input#name.input-form(
                      v-model='$v.name.$model'
                      :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                      :placeholder='$t("pages.admin.familyAdd.placeholder1")'
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
                    :label='$t("pages.admin.familyAdd.label2")'
                    label-for='description'
                  )
                    b-form-textarea#description.input-area(
                      v-model='$v.description.$model'
                      :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                      :placeholder='$t("pages.admin.familyAdd.placeholder2")'
                      name='description'
                      @blur='$v.description.$touch()'
                    )
                    .input-error(v-if='$v.description.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                b-col.mx-auto(md='12' xl='10')
                  h5.text-secondary.title {{ $t('pages.admin.familyAdd.title3') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.familyAdd.label")'
                    label-for='language2'
                  )
                    b-form-select#language2.input-form(
                      v-model='$v.language2.$model'
                      :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                      :placeholder='$t("pages.admin.familyAdd.placeholder")'
                      :options='langs'
                      @blur='$v.language2.$touch()'
                    )
                    .input-error(v-if='$v.language2.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.familyAdd.label4")'
                    label-for='frenchName'
                  )
                    b-form-input#frenchName.input-form(
                      v-model='$v.frenchName.$model'
                      :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                      :placeholder='$t("pages.admin.familyAdd.placeholder3")'
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
                    :label='$t("pages.admin.familyAdd.label4")'
                    label-for='frenchDescription'
                  )
                    b-form-textarea#frenchDescription.input-area(
                      v-model='$v.frenchDescription.$model'
                      :class='{ "is-invalid": $v.frenchDescription.$error, "is-valid": !$v.frenchDescription.$invalid }'
                      :placeholder='$t("pages.admin.familyAdd.placeholder4")'
                      name='frenchDescription'
                      @blur='$v.frenchDescription.$touch()'
                    )
                    .input-error(v-if='$v.frenchDescription.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                //- b-form-group.m-0(
                //-   :label='$t("pages.admin.familyAdd.label3")'
                //-   label-for='allergens'
                //- )
                //-   b-row
                //-     b-col
                //-       multiselect#allergens(
                //-         v-model='$v.allergen.$model'
                //-         :options='allergens'
                //-         :multiple='true'
                //-         :selectLabel='$t("pages.admin.selectLabel")'
                //-         :selectedLabel='$t("pages.admin.selectedLabel")'
                //-         :deselectLabel='$t("pages.admin.deselectLabel")'
                //-         :searchable='false'
                //-         :class='{ "is-invalid": $v.allergen.$error }'
                //-         label='name'
                //-         track-by='name'
                //-         @blur='$v.allergen.$touch()'
                //-       )
                //-       .input-error.my-2(v-if='$v.allergen.$error')
                //-         font-awesome-icon.mr-2(
                //-           :icon='["fa", "exclamation-triangle"]'
                //-         )
                //-         | {{ $t('pages.errors.required') }}
                //- b-row
                //-   b-col.mx-auto(sm='12')
                //-     .flex.text-center
                //-       b-button.my-3.button.w-100() {{ $t('pages.admin.familyAdd.button1') }}
              b-row
                b-col.mx-auto(sm='12' lg='6')
                  .flex.text-center
                    b-button.mt-3.button.w-100(
                      variant='secondary'
                      @click='createFamily'
                    ) {{ $t('pages.admin.familyAdd.button1') }}
              b-row.mt-5(align-h='center')
                b-col.p-0(cols='22')
                  b-container.p-0
                    alert(
                      :show='submitProductAdd === submitProductAddType.ERROR || submitProductAdd === submitProductAddType.SUCCESS'
                      :variant='submitProductAdd === submitProductAddType.ERROR ? "error" : "success"'
                      :icon='submitProductAdd === submitProductAddType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
                    )
                      h6.m-0.mb-2.text-center {{ errorMsg }}
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
  langs: SelectOption[] = [];

  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  errorMsg: string = '';
  error?: boolean = false;

  mounted() {
    this.updateData();
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

  updateData() {
    this.getLanguages();
  }

  checkLang(): boolean {
    // if (this.submitProductAdd === submitProductAddType.ERROR) {
    //   this.submitProductAdd = submitProductAddType.NONE;
    // }
    console.log('LANG1', this.language1);

    if (this.language1.toString() === '2') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.familyAdd.errors.lang1');
      return false;
    }

    if (this.language2.toString() === '1') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.familyAdd.errors.lang2');
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
      this.errorMsg = this.$tc('pages.admin.familyAdd.errors.fields');
      return;
    }
    console.log('ADD Family');

    const responseCreateFamily = await API.addFamily();

    if (responseCreateFamily.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.familyAdd.errors.createFamily');
      return;
    }

    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.familyAdd.errors.getLanguage');
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
      this.errorMsg = this.$tc(
        'pages.admin.familyAdd.errors.createTranslation'
      );
      return;
    }

    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.familyAdd.errors.getLanguage');
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
      this.errorMsg = this.$tc(
        'pages.admin.familyAdd.errors.createTranslation'
      );
      return; // ERROR DOES NOT DISPLAYED ... ERROR PAGE NOT ALERT !!!
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.familyAdd.success');
  }
}
</script>
<style scoped></style>
