<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col
      .title-line
        h1.p-3.title.text-center.text-secondary {{ $t('pages.admin.ingredients.add.title') }}
  b-row
    b-col(
      :offset-lg='filters ? "2" : "2"'
      sm='16'
      :md='filters ? "18" : "16"'
      :lg='filters ? "18" : "14"'
    )
      h3.py-3.title.text-secondary {{ $t('pages.admin.ingredients.add.title4') }}
  b-row.mt-3
    b-col(
      :offset-lg='filters ? "2" : "2"'
      sm='16'
      :md='filters ? "18" : "16"'
      :lg='filters ? "16" : "14"'
    )
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.ingredients.add.placeholder3")'
      )
    //- b-col.mt-3.mt-sm-0(
    //-   sm='8'
    //-   :md='filters ? "6" : "8"'
    //-   :lg='filters ? "4" : "6"'
    //- )
    //-   b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
  b-row
    //- b-col.mt-3(v-if='filters' :offset-lg='filters ? "2" : "2"' lg='4')
    //-   filters
    b-col.mt-3(:offset-lg='filters ? "0" : "2"' :lg='filters ? "16" : "20"')
      //- div(v-if='itemSelected.length > 0')
      //-   b-button.mb-3(
      //-     variant='outline-danger'
      //-     @click='handleDelete($event, data.item.allergenId)'
      //-   ) {{ $t('pages.ingredients.add.button3') }}
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            table-variant='secondary'
            :current-page='currentPage'
            :perPage='perPage'
            :items='ingredients'
            :fields='fields'
            :totalIngredients='totalIngredients'
            @pageChange='handleChangePage'
          )
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "pencil-alt"]'
                @click='openDetails(data.item.ingredientId)'
              )
            template(#cell(trash)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "trash"]'
                @click='handleDelete(data.item.ingredientId)'
              )
          b-pagination(
            pills='pills'
            size='sm'
            v-model='currentPage'
            :total-rows='totalIngredients'
            :per-page='perPage'
            align='right'
            @change='handleChangePage'
          )
  b-row
    b-col.mx-auto(
      md='16'
      lg='12'
      xl='10'
      xxl='8'
    )
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.ingredients.add.title1') }}
  b-row
    b-col.mx-auto(
      md='16'
      lg='12'
      xl='10'
      xxl='8'
    )
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row.mb-1
          b-col.pb-3
            b-container.p-4.content.mb-5
              .div.p-0
                h5.text-secondary.title {{ $t('pages.admin.ingredients.add.title2') }}
                b-form-group.pt-1.text-primary(
                  :label='$t("pages.admin.ingredients.add.label1")'
                  label-for='language1'
                )
                  b-form-select#language1.input-form(
                    v-model='$v.language1.$model'
                    :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                    :placeholder='$t("pages.admin.ingredients.add.placeholder1")'
                    :options='langs'
                    selected='langs.value'
                    @blur='$v.language1.$touch()'
                  )
                  .input-error(v-if='$v.language1.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.text-primary(
                  :label='$t("pages.admin.ingredients.add.label2")'
                  label-for='name'
                )
                  b-form-input#name.input-form(
                    v-model='$v.name.$model'
                    :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                    :placeholder='$t("pages.admin.ingredients.add.placeholder2")'
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
                h5.pt-3.text-secondary.title {{ $t('pages.admin.ingredients.add.title3') }}
                b-form-group.pt-1.text-primary(
                  :label='$t("pages.admin.ingredients.add.label1")'
                  label-for='language2'
                )
                  b-form-select#language2.input-form(
                    v-model='$v.language2.$model'
                    :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                    :placeholder='$t("pages.admin.ingredients.add.placeholder1")'
                    :options='langs'
                    @blur='$v.language2.$touch()'
                  )
                  .input-error(v-if='$v.language2.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.text-primary(
                  :label='$t("pages.admin.ingredients.add.label3")'
                  label-for='frenchName'
                )
                  b-form-input#frenchName.input-form(
                    v-model='$v.frenchName.$model'
                    :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                    :placeholder='$t("pages.admin.ingredients.add.placeholder3")'
                    type='text'
                    name='frenchName'
                    @blur='$v.frenchName.$touch()'
                  )
                  .input-error(v-if='$v.frenchName.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.m-0.pt-3(
                  :label='$t("pages.admin.ingredients.add.label4")'
                  label-for='allergens'
                )
                  b-row
                    b-col
                      multiselect#allergens(
                        v-model='allergen'
                        :options='allergens'
                        :multiple='true'
                        :placeholder='$t("pages.admin.ingredients.add.placeholder4")'
                        :selectLabel='$t("pages.admin.ingredients.add.label5")'
                        :selectedLabel='$t("pages.admin.ingredients.add.label6")'
                        :deselectLabel='$t("pages.admin.ingredients.add.label7")'
                        :searchable='true'
                        label='name'
                        track-by='name'
                      )
                      //- .input-error.my-2(v-if='$v.allergen.$error')
                      //-   font-awesome-icon.mr-2(
                      //-     :icon='["fa", "exclamation-triangle"]'
                      //-   )
                      //-   | {{ $t('pages.errors.required') }}
                  b-row
                    b-col.mx-auto.mt-3(sm='12')
                      .flex.text-center
                        b-button.my-3.button.w-100(
                          :to='`/${$i18n.locale}/admin/allergensAdd/`'
                        ) {{ $t('pages.admin.ingredients.add.button1') }}
                b-row
                  b-col.mx-auto(sm='12')
                    .flex.text-center
                      b-button.button.w-100(
                        variant='secondary'
                        @click='createIngredient'
                      ) {{ $t('pages.admin.ingredients.add.button2') }}
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
      div {{ $t('pages.admin.ingredients.alert.title1') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.ingredients.alert.text1') }}
    template(#modal-footer)
      b-button.w-48(
        variant='outline-danger'
        @click='deleteIngredients(currentIngredients.id)'
      ) {{ $t('pages.admin.ingredients.alert.button1') }}
      b-button.w-48.button(variant='primary' @click='deleteAlert = false') {{ $t('pages.admin.ingredients.alert.button2') }}
  // ALERT OPTIONAL ALERT 
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='emptyOptionalFieldAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.ingredients.alert.title4') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.ingredients.alert.text3') }}
    template(#modal-footer)
      b-button.w-48(
        variant='outline-danger'
        @click='emptyFieldDecision(false)'
      ) {{ $t('pages.admin.ingredients.alert.button4') }}
      b-button.w-48.button(variant='primary' @click='emptyFieldDecision(true)') {{ $t('pages.admin.ingredients.alert.button3') }}
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
    hide-header-close
    v-model='editingIngredient'
    centered
  )
    template(#modal-title)
      h4.text-secondary.text-center {{ $t('pages.admin.ingredients.edit.title1') }}
    template(#modal-footer)
      b-button.button.w-48(@click='cancelAlert = true') {{ $t('pages.admin.ingredients.edit.button2') }}
      b-button.button.w-48(@click='updateIngredient') {{ $t('pages.admin.ingredients.edit.button1') }}
    b-container
      h6.pt-3.title.text-secondary {{ $t('pages.admin.ingredients.edit.title2') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.ingredients.edit.label1")'
        label-for='editLanguage1'
      )
        b-form-select#editLanguage1.input-form(
          v-model='$v.editLanguage1.$model'
          :class='{ "is-invalid": $v.editLanguage1.$error, "is-valid": !$v.editLanguage1.$invalid }'
          :placeholder='$t("pages.admin.ingredients.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage1.$touch()'
        )
        .input-error(v-if='$v.editLanguage1.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.ingredients.edit.label2")'
        label-for='editName'
      )
        b-form-input#editName.input-form(
          v-model='$v.editName.$model'
          :class='{ "is-invalid": $v.editName.$error, "is-valid": !$v.editName.$invalid }'
          :placeholder='$t("pages.admin.ingredients.edit.placeholder2")'
          type='text'
          name='editName'
          @blur='$v.editName.$touch()'
        )
        .input-error(v-if='$v.editName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      h6.pt-3.title.text-secondary {{ $t('pages.admin.ingredients.edit.title3') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.ingredients.edit.label1")'
        label-for='editLanguage2'
      )
        b-form-select#editLanguage2.input-form(
          v-model='$v.editLanguage2.$model'
          :class='{ "is-invalid": $v.editLanguage2.$error, "is-valid": !$v.editLanguage2.$invalid }'
          :placeholder='$t("pages.admin.ingredients.edit.placeholder1")'
          :options='langs'
          @blur='$v.editLanguage2.$touch()'
        )
        .input-error(v-if='$v.editLanguage2.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.text-primary(
        :label='$t("pages.admin.ingredients.edit.label3")'
        label-for='editFrenchName'
      )
        b-form-input#editFrenchName.input-form(
          v-model='$v.editFrenchName.$model'
          :class='{ "is-invalid": $v.editFrenchName.$error, "is-valid": !$v.editFrenchName.$invalid }'
          :placeholder='$t("pages.admin.ingredients.edit.placeholder3")'
          type='text'
          name='editFrenchName'
          @blur='$v.editFrenchName.$touch()'
        )
        .input-error(v-if='$v.editFrenchName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.pt-4(
        :label='$t("pages.admin.ingredients.add.label4")'
        label-for='allergens'
      )
        multiselect#allergens(
          v-model='$v.editAllergen.$model'
          :options='allergens'
          :multiple='true'
          :placeholder='$t("pages.admin.ingredients.edit.placeholder4")'
          :selectLabel='$t("pages.admin.ingredients.edit.label5")'
          :selectedLabel='$t("pages.admin.ingredients.edit.label6")'
          :deselectLabel='$t("pages.admin.ingredients.edit.label7")'
          :searchable='true'
          :class='{ "is-invalid": $v.editAllergen.$error }'
          label='name'
          track-by='name'
          @blur='$v.editAllergen.$touch()'
        )
          .input-error.my-2(v-if='$v.editAllergen.$error')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.errors.required') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import alert from '@/components/global/alert.vue';

import {
  Allergens,
  Ingredients,
  formatDate,
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
  @Validate({ required }) editName: string = '';
  @Validate({ required }) editLanguage1: string = '';
  @Validate({ required }) editLanguage2: string = '';
  @Validate({ required }) editFrenchName: string = '';
  @Validate({ required }) editAllergen: Allergens[] = [];

  allergens: Allergens[] = [];
  allergensId: any[] = [];
  langs: SelectOption[] = [];
  ingredients: Ingredients[] = [];
  currentIngredients: Ingredients[] = [];

  filters: boolean = false;
  filterSearch: string = '';

  perPage: number = 8;
  currentPage: number = 1;
  totalIngredients: number = 0;

  stepProductAddType = stepProductAddType;
  stepProductAdd = stepProductAddType.STEP1;
  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  emptyDecision: boolean = false;
  emptyOptionalFieldAlert: boolean = false;
  errorUpdateAlert: boolean = false;
  cancelAlert: boolean = false;
  deleteAlert: boolean = false;
  editingIngredient: boolean = false;

  errorMsg: string = '';
  error?: boolean = false;

  fields = [
    {
      key: 'ingredientId',
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
    this.updateData();
  }

  openDetails(id: number) {
    this.editingIngredient = true;
    this.getIngredientTranslationById(id);
  }

  stopUpdate() {
    this.cancelAlert = false;
    this.editingIngredient = false;
    this.$v.$reset();
    this.editAllergen = [];
  }

  emptyFieldDecision(decision: boolean) {
    if (decision) {
      this.emptyDecision = true;
      console.log('YES', this.emptyDecision);
      console.log('LENGTH', this.allergen.length);
    } else {
      this.emptyDecision = false;
      console.log('NO');
    }
    this.emptyOptionalFieldAlert = false;
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
    const response = await API.allergensListByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.allergens = response.data;
  }

  async getIngredients() {
    const response = await API.ingredientsList();

    if (response.status !== 200) {
      return null;
    }

    this.ingredients = response.data;
    this.totalIngredients = this.ingredients.length;
  }

  async getIngredientTranslationById(id: number) {
    const response = await API.getIngredientsTranslationById(id);

    if (response.status !== 200) {
      return;
    }

    this.currentIngredients = response.data;

    // SET DATA TO EDIT INPUT FIELDS
    this.editLanguage1 = this.currentIngredients[0].language.id.toString();
    this.editName = this.currentIngredients[0].name;
    this.editLanguage2 = this.currentIngredients[1].language.id.toString();
    this.editFrenchName = this.currentIngredients[1].name;

    // GET ALLERGENS
    const responseAllergens = await API.getIngredientsById(id);

    if (responseAllergens.status !== 200) {
      return;
    }
    console.log('responseAllergens', responseAllergens.data);
    console.log('Lenght', responseAllergens.data.allergens.length);

    for (
      let index = 0;
      index < responseAllergens.data.allergens.length;
      index++
    ) {
      const id = responseAllergens.data.allergens[index].id;
      console.log('ID:', id);

      const responseAllergensTranslation =
        await API.getAllergensTranslationById(id);

      if (responseAllergensTranslation.status !== 200) {
        return;
      }

      if (this.$i18n.locale === 'en') {
        this.editAllergen.push(responseAllergensTranslation.data[0]);
      }
      if (this.$i18n.locale === 'fr') {
        this.editAllergen.push(responseAllergensTranslation.data[1]);
      }
    }

    console.log('Current ING', this.editAllergen);
  }

  updateData() {
    this.getLanguages();
    this.getAllergens();
    this.getIngredients();
  }

  checkLang(lang1: string, lang2: string): boolean {
    console.log('LANG1', lang1);

    if (lang1.toString() === '2') {
      if (!this.editingIngredient) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.ingredients.errors.lang1');
      return false;
    }

    if (lang2.toString() === '1') {
      if (!this.editingIngredient) {
        this.submitProductAdd = submitProductAddType.ERROR;
      } else {
        this.errorUpdateAlert = true;
      }
      this.errorMsg = this.$tc('pages.admin.ingredients.errors.lang2');
      return false;
    }
    return true;
  }

  async createIngredient() {
    if (!this.checkLang(this.language1, this.language2)) {
      return null;
    }
    this.$v.language1.$touch();
    this.$v.name.$touch();
    this.$v.language2.$touch();
    this.$v.frenchName.$touch();

    if (
      this.$v.name.$invalid ||
      this.$v.language1.$invalid ||
      this.$v.language2.$invalid ||
      this.$v.frenchName.$invalid
    ) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.ingredients.errors.fields');
      return;
    }
    console.log('ALLERGEN LENGTH:', this.allergen.length);
    console.log('EMPTY DECISION:', this.emptyDecision);
    // TODO ALERT ADMIN IF ALLERGEN IS EMPTY BECAUSE OPTIANAL FIELDS
    // if (this.allergen.length === 0 && !this.emptyDecision) {
    //   this.emptyOptionalFieldAlert = true;
    //   return;
    // }

    // if (
    //   (this.emptyDecision && this.allergen.length === 0) ||
    //   (this.allergen.length > 0 && !this.emptyDecision)
    // ) {
    // NOT WORKING
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

    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.ingredients.errors.getLanguage');
      return;
    }
    const englishLang = responseEnglishLang.data;

    const responseCreateEnglishTranslation = await API.addIngredientTranslation(
      this.name,
      englishLang,
      responseCreateIngredients.data.id
    );

    if (responseCreateEnglishTranslation.status !== 200) {
      return null;
    }

    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.ingredients.errors.getLanguage');
      return;
    }
    const frenchLang = responseFrenchLang.data;

    const responseCreateFrenchTranslation = await API.addIngredientTranslation(
      this.frenchName,
      frenchLang,
      responseCreateIngredients.data.id
    );

    if (responseCreateFrenchTranslation.status !== 200) {
      return null;
    }

    const date = new Date();
    const formattedDate = formatDate(date.toString());
    console.log(formattedDate);

    const responseInitialStock = await API.addStockIngredients(
      responseCreateIngredients.data.id,
      0,
      formattedDate
    );

    if (responseInitialStock.status !== 200) {
      return;
    }

    this.getIngredients();
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.ingredients.success.create');
    // }
  }

  async updateIngredient() {
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
      this.errorMsg = this.$tc('pages.admin.ingredients.errors.fields');
      return;
    }

    const responseUpdateIngredientEnTranslation =
      await API.updateIngredientTranslation(
        this.currentIngredients[0].id,
        this.editName,
        this.currentIngredients[0].language,
        this.currentIngredients[0].ingredientId
      );

    if (responseUpdateIngredientEnTranslation.status !== 200) {
      return;
    }

    const responseUpdateIngredientFrTranslation =
      await API.updateIngredientTranslation(
        this.currentIngredients[1].id,
        this.editFrenchName,
        this.currentIngredients[1].language,
        this.currentIngredients[1].ingredientId
      );

    if (responseUpdateIngredientFrTranslation.status !== 200) {
      return;
    }

    const updatedAllergens: any = this.editAllergen.map((allergen) => ({
      id: allergen.allergenId,
    }));
    const responseUpdateIngredients = await API.updateIngredient(
      this.currentIngredients[0].ingredientId,
      updatedAllergens
    );

    if (responseUpdateIngredients.status !== 200) {
      return;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.ingredients.success.update');
    this.editingIngredient = false;
    this.$v.$reset();
    this.editAllergen = [];
    this.getIngredients();
  }

  async handleDelete(id: number) {
    this.deleteAlert = true;

    console.log('ID:', id);

    const response = await API.getIngredientsById(id);

    if (response.status !== 200) {
      return;
    }

    this.currentIngredients = response.data;
  }

  handleChangePage(e: number) {
    this.currentPage = e;
  }

  async deleteIngredients(id: number) {
    const response = await API.deleteIngredients(id);

    if (response.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.allergens.errors.delete');
      return;
    }

    this.deleteAlert = false;
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.ingredients.success.delete');
    this.getIngredients();
  }
}
</script>
<style scoped></style>
