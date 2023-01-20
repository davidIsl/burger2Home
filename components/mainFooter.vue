<template lang="pug">
.main-footer
  b-container(fluid)
    b-row
      b-col(lg='8')
        h5.p-1.footer-title {{ $t('footer.title1') }}
        gmaps
          GMap.pt-3(
            ref='gMap'
            :language='$i18n.locale'
            :cluster='{ options: { styles: clusterStyle } }'
            :center='{ lat: locations[0].lat, lng: locations[0].lng }'
            :options='{ fullscreenControl: false, styles: mapStyle }'
            :zoom='12'
          )
      b-col.mt-2.mt-lg-0(lg='4')
        GMapMarker(
          v-for='location in locations'
          :key='location.id'
          :position='{ lat: location.lat, lng: location.lng }'
          :options='{ icon: location === currentLocation ? pins.selected : pins.notSelected }'
          @click='currentLocation = location'
        )
          GMapInfoWindow(:options='{ maxWidth: 200 }')
            div 
              h5.p-1.footer-title {{ location.name }}
              .mb-3.p-3.footer-content
                .mb-1(v-for='(item, index) in location.address' :key='index') {{ item }}
                .mb-1 {{ location.phone }}
              b-button.mb-1.gmapButton(variant='primary') {{ $t('footer.contacts') }}
              b-button.gmapButton(
                variant='primary'
                target='_blank'
                :href='`http://maps.google.com/maps?q=${location.address}`'
              ) {{ $t('footer.viewOnMap') }}
        GMapCircle(:options='circleOptions')
      b-col.mt-2.mt-lg-0(lg='6')
        div
          h5.p-1.footer-title {{ $t('footer.title2') }}
          .footer-content
            .pt-3 {{ $t('footer.text1') }}
            div {{ $t('footer.text2') }}
            div {{ $t('footer.text3') }}
            div {{ $t('footer.text4') }}
            div {{ $t('footer.text5') }}
            div {{ $t('footer.text6') }}
            div {{ $t('footer.text7') }}
      b-col.mt-2.mt-lg-0(lg='6')
        div 
          h5.p-1.footer-title {{ $t('footer.title3') }}
          .footer-content
            .pt-3
              nuxt-link.link(:to='`/${$i18n.locale}/`') {{ $t('footer.link1') }}
            div
              nuxt-link.link(:to='`/${$i18n.locale}/products/`') {{ $t('footer.link2') }}
            div
              nuxt-link.link(:to='`/${$i18n.locale}/products/burgers/`') {{ $t('footer.link4') }}
            div
              nuxt-link.link(:to='`/${$i18n.locale}/products/fries/`') {{ $t('footer.link5') }}
            div
              nuxt-link.link(:to='`/${$i18n.locale}/products/drinks/`') {{ $t('footer.link6') }}
            div(
              v-if='this.$store.state.users.currentUser !== null && this.$store.state.users.currentUser.role.name !== "customer"'
            )
              nuxt-link.link(:to='`/${$i18n.locale}/admin/`') {{ $t('footer.link7') }}
            div
              nuxt-link.link(:to='`/${$i18n.locale}/`') {{ $t('footer.link9') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  currentLocation: object = {};

  circleOptions: object = {};

  locations: object[] = [
    {
      name: 'Burger2Home',
      address: ['Rue Saint Laurent 31', '4000 Liège', 'Belgique'],
      phone: '+32 4 223 11 31',
      lat: 50.638492584228516,
      lng: 5.555871486663818,
    },
  ];

  pins: object = {
    selected:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEjElEQVRIia2Wa0wcZRSG35m9DbcFdrktlVILLQIFKpfSiPaGmjSppqlBhdhEksb6o1E0Jo0Rl21qJE2NbQRNldqiUktKf1QhaoxcpFKg5VpoF4G4QBDoXtgBZneHvcz4C2RhdhnQ99fknHfOk3O+b+b7CGxYPHHq1TMakiQ1AMBx3HRlbdk0QPAbqUKINb5TVL49LMzxEQHu6Ug1KwsPcUoBgJ6Xu4yzlNvDS25bGGlp5XcfGv4XcEHBDUmqerBCGeI89uKB8aj42AWCWNUczxMYmwrmf2zaZpx3yOoemtJK6upe9mwarHtdR3EU33gwZzLjmayZIDGdtHbHMi33tvRbZar8ioq3Fn35SN8leIJTcDdf2D+WJRYKAPuypoKP7DfkqNyWm/58El+J0yeI155Msrx5MHdKNHRJmki7xGwNiErYeni8rbdlUMgjOOqCghuS1IjB0feK+7ZRcu+lGvtbicaeXWBdgQAASmbDs9kPEK+Z9/Kxi1J8cjV9DDGSBJ1Ox61mSIXAjylGn0pNnFWuhvaNxKB9aA+OnngFoepQAMCcZQ63Ltci74lOpO8wLnsphRvJCXRIW3/0XgB3VjME1zg0hC3MSLKoVsbsrBRNXSkoKilehgJAqDoUhW8Xo7E7FY5F75XbnWRRq4JdhUIMQTBJcsmR4Q6vmN6gRvahPMgUsjV+OSVH5oE86P+K8IpHqOwgpZ4U0WCOQ0QA5T1mmlEiPDJSyA4AUEVFwWpTesWCAjzgOULwJUEwISEZxua9/GHB87CaTD7Bs0YjwoO8N9iCTQaC4BnRYPAYoRcor1Dy4xZ0N9+Ba9G1xu5knehpaUPydrNXnF6Qg+P5P0WDGYf0t4lHQezKWCDlxqHsQXx/4TJoy9xy3Gqmcf3i13gu+wECFN7LMzEV4mAYRaMQQ/BzYlhZfb9eXb4vczp2ZTwj8RHCA1vxc5UFrDsYAEBJGRzJGUScZu1Ee4fUVo+D+0mI4fNfffZUaWfJ8ft7VnchVjaHFBdr0jvLPj+7Vyjv819tZ2VftffG2DdFBdDep2FYu/RLX3mfYIWbv9beH231cH7OER/ycCQ6BqJolgmp3TBYV61j3R580atXOzcKvjsQsejiyIoLde86fHn8tiNxSj79pS3O7HSL79rlJtHUEWe2W5QVfmv7S7b0tbhzd+U7OI7MS9w6R/nzLunXtrg5w6Tyg/PX3u/051u3lXNXtZe69epxM70+12Sl0PUwcrz8ivbyel4RMyR4mpYfr2nYYeR53zclnidQU7/TNG+XFom5cfod9ZI6BpqNuan50aSE3x0fy6w9ngD83q2xDRtUl85dKbsupqboXSPZQpxu7YodnjYFrsnNmAP52/diR4asKaVi64kG63Q6zszIjn1bv3N60fnvoFinBNU/JM0wC/Kj611pV0rUqJd0934znZuWrzdMKg9nppgCAALVt5IsRlr+xvlvyvzu4v8EBoA/elpGMpOfV9tYadrohNI5PKaq+rjqTOVG62xSPKE9qW3QntQ2AH62uh8JHovri+Ct8s9eWnreTIV/AIR1wOGopbx1AAAAAElFTkSuQmCC',
    notSelected:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEjElEQVRIia2Wa0wcZRSG35m9DbcFdrktlVILLQIFKpfSiPaGmjSppqlBhdhEksb6o1E0Jo0Rl21qJE2NbQRNldqiUktKf1QhaoxcpFKg5VpoF4G4QBDoXtgBZneHvcz4C2RhdhnQ99fknHfOk3O+b+b7CGxYPHHq1TMakiQ1AMBx3HRlbdk0QPAbqUKINb5TVL49LMzxEQHu6Ug1KwsPcUoBgJ6Xu4yzlNvDS25bGGlp5XcfGv4XcEHBDUmqerBCGeI89uKB8aj42AWCWNUczxMYmwrmf2zaZpx3yOoemtJK6upe9mwarHtdR3EU33gwZzLjmayZIDGdtHbHMi33tvRbZar8ioq3Fn35SN8leIJTcDdf2D+WJRYKAPuypoKP7DfkqNyWm/58El+J0yeI155Msrx5MHdKNHRJmki7xGwNiErYeni8rbdlUMgjOOqCghuS1IjB0feK+7ZRcu+lGvtbicaeXWBdgQAASmbDs9kPEK+Z9/Kxi1J8cjV9DDGSBJ1Ox61mSIXAjylGn0pNnFWuhvaNxKB9aA+OnngFoepQAMCcZQ63Ltci74lOpO8wLnsphRvJCXRIW3/0XgB3VjME1zg0hC3MSLKoVsbsrBRNXSkoKilehgJAqDoUhW8Xo7E7FY5F75XbnWRRq4JdhUIMQTBJcsmR4Q6vmN6gRvahPMgUsjV+OSVH5oE86P+K8IpHqOwgpZ4U0WCOQ0QA5T1mmlEiPDJSyA4AUEVFwWpTesWCAjzgOULwJUEwISEZxua9/GHB87CaTD7Bs0YjwoO8N9iCTQaC4BnRYPAYoRcor1Dy4xZ0N9+Ba9G1xu5knehpaUPydrNXnF6Qg+P5P0WDGYf0t4lHQezKWCDlxqHsQXx/4TJoy9xy3Gqmcf3i13gu+wECFN7LMzEV4mAYRaMQQ/BzYlhZfb9eXb4vczp2ZTwj8RHCA1vxc5UFrDsYAEBJGRzJGUScZu1Ee4fUVo+D+0mI4fNfffZUaWfJ8ft7VnchVjaHFBdr0jvLPj+7Vyjv819tZ2VftffG2DdFBdDep2FYu/RLX3mfYIWbv9beH231cH7OER/ycCQ6BqJolgmp3TBYV61j3R580atXOzcKvjsQsejiyIoLde86fHn8tiNxSj79pS3O7HSL79rlJtHUEWe2W5QVfmv7S7b0tbhzd+U7OI7MS9w6R/nzLunXtrg5w6Tyg/PX3u/051u3lXNXtZe69epxM70+12Sl0PUwcrz8ivbyel4RMyR4mpYfr2nYYeR53zclnidQU7/TNG+XFom5cfod9ZI6BpqNuan50aSE3x0fy6w9ngD83q2xDRtUl85dKbsupqboXSPZQpxu7YodnjYFrsnNmAP52/diR4asKaVi64kG63Q6zszIjn1bv3N60fnvoFinBNU/JM0wC/Kj611pV0rUqJd0934znZuWrzdMKg9nppgCAALVt5IsRlr+xvlvyvzu4v8EBoA/elpGMpOfV9tYadrohNI5PKaq+rjqTOVG62xSPKE9qW3QntQ2AH62uh8JHovri+Ct8s9eWnreTIV/AIR1wOGopbx1AAAAAElFTkSuQmCC',
  };

  // Style from https://snazzymaps.com/
  mapStyle: object[] = [
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#878787',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f9f5ed',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#aee0f4',
        },
      ],
    },
  ];

  clusterStyle: object[] = [
    {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png',
      width: 50,
      height: 50,
      textColor: '#fff',
    },
  ];
}
</script>

<style lang="scss" scoped>
.main-footer {
  background-image: url('../static/img/chalkboard.jpg');
  // transition: background 0.5s;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
  bottom: 0;
  height: 100%;
  left: 0;
  padding: 30px 0;
  // position: relative;
  text-align: center;
  width: 100%;
}

.footer-title {
  color: var(--colorTitleFooter);
  border-bottom: 1px solid var(--colorTitleFooter);
}

.gmaps {
  height: 250px;
  box-sizing: border-box;
}

.gmapButton {
  border-radius: 10px;
  font-size: 0.7em;
  width: 100%;
}

.gmapButton:hover {
  background-color: var(--colorHoverFooter);
  color: var(--colorTextHoverFooter);
}

.footer-content {
  font-size: 0.8em;
}

.link {
  color: var(--colorFooterLink);
}

.link:hover {
  color: var(--colorHoverFooter);
}
</style>
