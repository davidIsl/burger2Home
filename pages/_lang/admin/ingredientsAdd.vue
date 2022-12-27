<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.ingredientsAdd.title1') }}
  b-row
    b-col.mx-auto(md='16' lg='12' xl='10')
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row.mb-1
          b-col.pb-3
            b-container.p-4.content.mb-5
              .div.p-0
                h5.text-secondary.title {{ $t('pages.admin.ingredientsAdd.title2') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.ingredientsAdd.label")'
                  label-for='language1'
                )
                  b-form-select#language1.input-form(
                    v-model='$v.language1.$model'
                    :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                    :placeholder='$t("pages.admin.ingredientsAdd.placeholder")'
                    :options='langs'
                    selected='langs.value'
                    @blur='$v.language1.$touch()'
                  )
                  .input-error(v-if='$v.language1.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.ingredientsAdd.label1")'
                  label-for='name'
                )
                  b-form-input#name.input-form(
                    v-model='$v.name.$model'
                    :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                    :placeholder='$t("pages.admin.ingredientsAdd.placeholder1")'
                    type='text'
                    name='name'
                    @blur='$v.name.$touch()'
                  )
                  .input-error(v-if='$v.name.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              .div.p-0
                h5.text-secondary.title {{ $t('pages.admin.ingredientsAdd.title3') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.ingredientsAdd.label")'
                  label-for='language2'
                )
                  b-form-select#language2.input-form(
                    v-model='$v.language2.$model'
                    :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                    :placeholder='$t("pages.admin.ingredientsAdd.placeholder")'
                    :options='langs'
                    @blur='$v.language2.$touch()'
                  )
                  .input-error(v-if='$v.language2.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.ingredientsAdd.label2")'
                  label-for='frenchName'
                )
                  b-form-input#frenchName.input-form(
                    v-model='$v.frenchName.$model'
                    :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                    :placeholder='$t("pages.admin.ingredientsAdd.placeholder1")'
                    type='text'
                    name='frenchName'
                    @blur='$v.frenchName.$touch()'
                  )
                  .input-error(v-if='$v.frenchName.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.m-0(
                  :label='$t("pages.admin.ingredientsAdd.label3")'
                  label-for='allergens'
                )
                  b-row
                    b-col
                      multiselect#allergens(
                        v-model='$v.allergen.$model'
                        :options='allergens'
                        :multiple='true'
                        :selectLabel='$t("pages.admin.selectLabel")'
                        :selectedLabel='$t("pages.admin.selectedLabel")'
                        :deselectLabel='$t("pages.admin.deselectLabel")'
                        :searchable='false'
                        :class='{ "is-invalid": $v.allergen.$error }'
                        label='name'
                        track-by='name'
                        @blur='$v.allergen.$touch()'
                      )
                      .input-error.my-2(v-if='$v.allergen.$error')
                        font-awesome-icon.mr-2(
                          :icon='["fa", "exclamation-triangle"]'
                        )
                        | {{ $t('pages.errors.required') }}
                  b-row
                    b-col.mx-auto(sm='12')
                      .flex.text-center
                        b-button.my-3.button.w-100(
                          v-b-toggle.sidebar-ingredient
                        ) {{ $t('pages.admin.ingredientsAdd.button1') }}
                b-row
                  b-col.mx-auto(sm='12')
                    .flex.text-center
                      b-button.button.w-100(
                        variant='secondary'
                        @click='createIngredient'
                      ) {{ $t('pages.admin.ingredientsAdd.button2') }}
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
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import alert from '@/components/global/alert.vue';

import {
  Allergens,
  SelectOption,
  stepProductAddType,
  submitProductAddType,
} from '@/utils/utils';
import { API } from '@/utils/javaBack';

@Component({
  components: { alert },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) language1: string = '';
  @Validate({ required }) language2: string = '';
  @Validate({ required }) frenchName: string = '';
  @Validate({ required }) allergen: Allergens[] = [];

  allergens: Allergens[] = [];
  allergensId: any[] = [];
  langs: SelectOption[] = [];

  stepProductAddType = stepProductAddType;
  stepProductAdd = stepProductAddType.STEP1;
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

  async getAllergens() {
    const response = await API.allergensList(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.allergens = response.data;
  }

  updateData() {
    this.getLanguages();
    this.getAllergens();
  }

  checkLang(): boolean {
    // if (this.submitProductAdd === submitProductAddType.ERROR) {
    //   this.submitProductAdd = submitProductAddType.NONE;
    // }
    console.log('LANG1', this.language1);

    if (this.language1.toString() === '2') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.ingredientsAdd.errorLang1');
      return false;
    }

    if (this.language2.toString() === '1') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.ingredientsAdd.errorLang2');
      return false;
    }
    return true;
  }

  async createIngredient() {
    if (!this.checkLang()) {
      return null;
    }
    this.$v.$touch();
    console.log('ADD INGREDIENT');

    this.allergensId = this.allergen.map((allergen) => ({
      id: allergen.allergenId,
    }));

    console.log('ALLERGENS:', this.allergens);
    console.log('ALLERGEN:', this.allergen);
    console.log('ALLERGENSID:', this.allergensId);

    const responseCreateIngredients = await API.addIngredient(this.allergensId);

    if (responseCreateIngredients.status !== 200) {
      return null;
    }

    const englishLang: any = {
      id: 1,
    };

    const responseCreateEnglishTranslation = await API.addIngredientTranslation(
      this.name,
      englishLang,
      responseCreateIngredients.data.id
    );

    if (responseCreateEnglishTranslation.status !== 200) {
      return null;
    }

    const frenchLang: any = {
      id: 2,
    };

    const responseCreateFrenchTranslation = await API.addIngredientTranslation(
      this.frenchName,
      frenchLang,
      responseCreateIngredients.data.id
    );

    if (responseCreateFrenchTranslation.status !== 200) {
      return null;
    }
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.add.success');
  }
}
</script>
<style scoped></style>
