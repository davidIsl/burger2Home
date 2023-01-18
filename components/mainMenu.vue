<template lang="pug">
b-container.m-0.p-0(fluid)
  .section-nav
    .backdrop-menu(v-if='isMenuOpen' v-b-toggle.nav-collapse)
    b-navbar.section-nav-bg(toggleable='md' type='light')
      b-container.p-0
        b-navbar-brand.custom-brand(
          :to='`/${$i18n.locale}/`'
          aria-label='AntelopeJS'
        )
          //- logoAntelopeBanner.w-100.
          b-img.logo.text-secondary(src='/img/logo-burger-white.png')
        b-navbar-toggle(target='nav-collapse')
        b-collapse#nav-collapse(
          is-nav
          ref='menuCollapse'
          @show='onOpen'
          @hide='onClose'
        )
          client-only
            b-navbar-nav.mx-auto
              b-nav-item.ml-2.ml-md-0.mr-2.mb-1.mb-md-0(
                :to='`/${$i18n.locale}/`'
                :link-attrs='{ "aria-label": $t("menu.title1") }'
              )
                span.menu-color(
                  :class='{ "active-menu": "/" + $i18n.locale + "/" == $route.path }'
                ) {{ $t('menu.title1') }}
              b-nav-item-dropdown.ml-2.ml-md-0.mr-2.mb-1.mb-md-0(
                left
                no-caret
                menu-class='p-0'
              )
                template(v-slot:button-content)
                  nuxt-link.menu-color(
                    :to='`/${$i18n.locale}/products/`'
                    :class='{ "active-menu": "/" + $i18n.locale + "/products/" == $route.path || "/" + $i18n.locale + "/table/" == $route.path || "/" + $i18n.locale + "/form/" == $route.path || "/" + $i18n.locale + "/account/" == $route.path }'
                  ) {{ $t('menu.title2') }}

                b-dropdown-item(:to='`/${$i18n.locale}/products/burgers/`') {{ $t('menu.title2sub2') }}
                b-dropdown-item(:to='`/${$i18n.locale}/products/fries/`') {{ $t('menu.title2sub3') }}
                b-dropdown-item(:to='`/${$i18n.locale}/products/drinks/`') {{ $t('menu.title2sub4') }}
              // ADMIN
              b-nav-item.ml-2.ml-md-0.mr-2.mb-1.mb-md-0(
                v-if='this.$store.state.users.currentUser !== null'
                left
                no-caret
                menu-class='p-0'
              )
                nuxt-link.menu-color(
                  :to='`/${$i18n.locale}/admin/`'
                  :class='{ "active-menu": "/" + $i18n.locale + "/admin/" == $route.path }'
                ) {{ $t('menu.title3') }}
              //- b-nav-item.ml-2.ml-md-0.mr-2.mb-1.mb-md-0(
              //-   :to='`/${$i18n.locale}/layout-error/`'
              //-   :link-attrs='{ "aria-label": $t("menu.title4") }'
              //- )
              //-   span.menu-color(
              //-     :class='{ "active-menu": "/" + $i18n.locale + "/layout-error/" == $route.path }'
              //-   ) {{ $t('menu.title4') }}
              b-nav-item.ml-2.ml-md-0.mr-2.mb-1.mb-md-0(
                :to='`/${$i18n.locale}/`'
                :link-attrs='{ "aria-label": $t("menu.title5") }'
              )
                span.menu-color(
                  :class='{ "active-menu": "/" + $i18n.locale + "/layout-error/" == $route.path }'
                ) {{ $t('menu.title5') }}
              //- b-nav-item.ml-2.ml-md-0.mr-2.mb-1.mb-md-0(
              //-   :to='`/${$i18n.locale}/`'
              //-   :link-attrs='{ "aria-label": $t("menu.title6") }'
              //- )
              //-   span.menu-color(
              //-     :class='{ "active-menu": "/" + $i18n.locale + "/layout-error/" == $route.path }'
              //-   ) {{ $t('menu.title6') }}
              b-nav-item-dropdown.ml-2.ml-md-0.mr-3.mb-2.mb-md-0(
                right
                no-caret
                menu-class='p-0'
              )
                template(v-slot:button-content)
                  span.menu-color
                    b-img.lang-icon(
                      :src='`/img/flags/${currentLang.icon}`'
                      :alt='`Current Language: ${currentLang.icon}`'
                    )
                    span.ml-2.d-md-none {{ currentLang.label }}
                b-dropdown-item(
                  v-if='currentLang.lang != lang.lang'
                  v-for='lang in langList'
                  :key='lang.lang'
                  @click='changeLang(lang)'
                  aria-label='Switch Language'
                )
                  b-img.lang-icon-item(
                    :src='`/img/flags/${lang.icon}`'
                    :alt='`Language: ${lang.label}`'
                  ) 
                  span {{ lang.label }}
              b-nav-item-dropdown(
                v-if='$store.state.users.currentUser'
                left
                no-caret
                menu-class='p-0'
              )
                template(v-slot:button-content)
                  b-avatar(variant='secondary')
                    b-badge(variant='darkRed')
                      font-awesome-icon(:icon='["fa", "user-check"]') 
                b-dropdown-item(:to='`/${$i18n.locale}/account/profile/`') {{ $t('menu.title7') }}
                b-dropdown-item(:to='`/${$i18n.locale}/account/historyOrder/`') {{ $t('menu.title8') }}
                b-dropdown-item(@click='reset') {{ $t('menu.title9') }}
              //- .basket.text-center.ml-md-2.mt-2.mt-md-0
              b-avatar(
                v-if='!$store.state.users.currentUser'
                variant='secondary'
                button
                @click='goToUrl("/" + $i18n.locale + "/account/")'
              )
              b-button.basket.p-0.mt-2.ml-2.my-auto(
                @click='goToUrl("/" + $i18n.locale + "/basket/")'
              )
                font-awesome-icon(:icon='["fa", "shopping-basket"]')
                b-badge(
                  v-if='this.$store.state.baskets.quantity > 0'
                  variant='darkRed'
                ) {{ this.$store.state.baskets.quantity }}
              //- b-button.basket.ml-0.ml-md-2.mr-2.mb-1.mb-md-0.mt-2.mt-md-0(
              //-   @click='goToUrl("/" + $i18n.locale + "/basket/")'
              //- )
                font-awesome-icon(:icon='["fa", "shopping-basket"]')
              //- b-button.button.w-50.mr-2(@click='connect') Connect
              //- b-button.button.w-50(@click='reset') RESET
              //- b-button.ml-2 Identify
              //- .pl-2
              //-   themeSwitcher
</template>

<script lang="ts" scoped>
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import logoAntelopeBanner from '~/components/svg/logoAntelopeBanner.vue';
// import themeSwitcher from '~/components/themeSwitcher.vue';
// import { API } from '~/utils/javaBack';

export interface Lang {
  lang: string;
  icon: string;
  label: string;
}

export interface BCollapse {
  toggle: () => void;
}

@Component({
  components: { logoAntelopeBanner },
})
export default class extends Vue {
  isMenuOpen: boolean = false;
  userConnected: boolean = false;
  get langList(): Lang[] {
    return [
      { lang: 'fr', icon: 'fr.png', label: 'Français' },
      { lang: 'en', icon: 'en.png', label: 'English' },
    ];
  }

  get currentLang(): Lang | undefined {
    const result: Lang | undefined = this.langList.find(
      (lang) => lang.lang === this.$i18n.locale
    );
    return result;
  }

  @Watch('$route')
  onRouteChanged() {
    if (window.innerWidth < 789 && this.isMenuOpen)
      (this.$refs.menuCollapse as unknown as BCollapse).toggle();
  }

  onOpen() {
    this.isMenuOpen = true;
  }

  onClose() {
    this.isMenuOpen = false;
  }

  changeLang(lang: Lang) {
    const currentPath = this.$route.path;
    const oldLocale = this.$i18n.locale;

    this.$i18n.locale = lang.lang;

    history.pushState(
      {},
      '',
      currentPath.replace(`/${oldLocale}/`, `/${this.$i18n.locale}/`)
    );
  }

  goToUrl(url: string) {
    this.$router.push(url);
  }

  // async getUser(userId: number) {
  //   const response = await API.getUserById(userId);

  //   if (response.status !== 200) {
  //     return;
  //   }

  //   this.$store.commit('users/setCurrentUser', response.data);
  //   console.log('GETUSER', response.data);
  //   console.log('STORE USER', this.$store.state.users.currentUser);
  // }

  getRole() {
    return this.$store.getters['users/getRoles'];
  }

  connect() {
    this.$store.dispatch('users/getUser');
  }

  reset() {
    this.$store.commit('baskets/resetBasket');
    this.$store.commit('users/resetUser');
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/bt-custom.scss';

// Backdrop mobile menu
.backdrop-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.section-nav {
  box-shadow: var(--shadowMenu);
  background-image: url('../static/img/chalkboard.jpg');
  width: 100%;
  // Custom brand
  .custom-brand {
    max-width: 200px;
    margin: 10px 0px 5px 0px;
  }

  // Custom section nav
  .section-nav-bg {
    // background: var(--backgroundMenu);
    transition: background 0.5s;
  }

  // Color Menu
  .menu-color {
    color: var(--colorMenu);
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    text-decoration: none;
  }

  // Active Menu
  .active-menu {
    font-weight: 600;
  }

  // DropDown Menu
  .dropdown-menu {
    border-top: var(--borderMenuDropdown);
    background: var(--backgroundMenuDropdown);
    // background-image: url('../static/img/charlkboard.jpg');
  }
  .dropdown-item {
    color: var(--colorMenuDropdown) !important;
    font-size: 16px;
    font-weight: 500;
    &:hover {
      background: var(--backgroundMenuDropdownHover);
      transition: background 0.5s;
      color: var(--colorMenuDropdownHover) !important;
    }
  }
  .dropdown:hover > .dropdown-menu {
    @include from-tablet-only {
      display: block;
      margin-top: 0px;
    }
  }

  // Lang Menu
  .lang-icon {
    width: 20px;
    height: 20px;
    margin-top: -3px;
  }

  .lang-icon-item {
    width: 18px;
    height: 18px;
    margin-top: -3px;
    margin-left: -3px;
    margin-right: 10px;
  }

  .basket {
    background-color: var(--secondary);
    color: var(--gray);
    width: 40px;
    height: 40px;
    border-radius: 30px;
  }
}
</style>
