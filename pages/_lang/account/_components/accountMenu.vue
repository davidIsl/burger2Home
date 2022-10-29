<template lang="pug">
b-container
  b-row
    b-col.text-center
      LogoAntelope.w-75.mt-2.mb-5(color='purple')
  b-row
    b-col
      ul.menu-account
        li(
          :class='{ active: currentAnchor === "show-profil" || currentAnchor === "update-profil" }'
        )
          a(href='#' @click.prevent='changeChild("show-profil")') {{ $t('pages.account.menu.title1') }}
        //- li(
        //-   :class='{ active: currentAnchor === "show-billing" }'
        //- )
        //-   a(href='#' @click.prevent='changeChild("show-billing")') {{ $t("pages.account.menu.title2") }}
        li(
          :class='{ active: currentAnchor === "show-delivery" || currentAnchor === "add-delivery" || currentAnchor === "update-delivery" }'
        )
          a(href='#' @click.prevent='changeChild("show-delivery")') {{ $t('pages.account.menu.title3') }}
        li(
          :class='{ active: currentAnchor === "show-payment" || currentAnchor === "add-payment" }'
        )
          a(href='#' @click.prevent='changeChild("show-payment")') {{ $t('pages.account.menu.title4') }}
        li(:class='{ active: currentAnchor === "update-password" }')
          a(href='#' @click.prevent='changeChild("update-password")') {{ $t('pages.account.menu.title5') }}
        li(:class='{ active: currentAnchor === "show-orders" }')
          a(href='#' @click.prevent='changeChild("show-orders")') {{ $t('pages.account.menu.title6') }}
        li
          a.text-danger(href='#') {{ $t('pages.account.menu.title7') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import LogoAntelope from '~/components/svg/logoAntelope.vue';

@Component({
  components: { LogoAntelope },
})
export default class extends Vue {
  @Prop() currentAnchor!: string;

  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.menu-account {
  margin-left: -37.5px;
  margin-top: 20px;
  margin-bottom: 40px;
  list-style: none;
  @include for-tablet-only {
    margin-left: -40px;
  }
  @include for-phone-only {
    margin-left: -40px;
  }
  li {
    margin-bottom: 15px;
  }
}

a,
a:hover {
  text-decoration: none !important;
}

.active {
  background: var(--backgroundMenuAccountActive);
  transition: background 0.5s;
  border-radius: 4px;
  padding: 5px 10px 7px 10px;
  margin: -5px -10px -7px -10px;
  a,
  a:hover {
    color: var(--colorMenuAccountActive);
  }
}
</style>
