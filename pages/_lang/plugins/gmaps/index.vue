<template lang="pug">
div
  b-container.py-5(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 {{ $t('pages.gmaps.title') }}
          a(
            href='https://gitlab.com/broj42/nuxt-gmaps/-/tree/master'
            target='_blank'
            rel='noopener'
          ) https://gitlab.com/broj42/nuxt-gmaps/-/tree/master
      b-row
        b-col
          a(href='https://snazzymaps.com/' target='_blank' rel='noopener') https://snazzymaps.com/
          .mt-4
            p.text-justify {{ $t('pages.gmaps.text') }}
    b-container.mb-5
      h2.mb-4 {{ $t('pages.gmaps.example') }} 1
      gmapExample1.
    b-container.mb-5
      h2.mb-4 {{ $t('pages.gmaps.example') }} 2
      gmapExample2.
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import gmapExample1 from './_components/gmapExample1.vue';
import gmapExample2 from './_components/gmapExample2.vue';

@Component({
  components: {
    gmapExample1,
    gmapExample2,
  },
})
export default class extends Vue {
  currentLocation: object = {};

  circleOptions: object = {};

  locations: object[] = [
    {
      name: 'Antelope.js',
      address: ['Boulevard frère orban 18', '4030 Liège', 'Belgique'],
      lat: 50.63615309636094,
      lng: 5.583525906560453,
    },
  ];

  pins: object = {
    selected:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEjElEQVRIia2Wa0wcZRSG35m9DbcFdrktlVILLQIFKpfSiPaGmjSppqlBhdhEksb6o1E0Jo0Rl21qJE2NbQRNldqiUktKf1QhaoxcpFKg5VpoF4G4QBDoXtgBZneHvcz4C2RhdhnQ99fknHfOk3O+b+b7CGxYPHHq1TMakiQ1AMBx3HRlbdk0QPAbqUKINb5TVL49LMzxEQHu6Ug1KwsPcUoBgJ6Xu4yzlNvDS25bGGlp5XcfGv4XcEHBDUmqerBCGeI89uKB8aj42AWCWNUczxMYmwrmf2zaZpx3yOoemtJK6upe9mwarHtdR3EU33gwZzLjmayZIDGdtHbHMi33tvRbZar8ioq3Fn35SN8leIJTcDdf2D+WJRYKAPuypoKP7DfkqNyWm/58El+J0yeI155Msrx5MHdKNHRJmki7xGwNiErYeni8rbdlUMgjOOqCghuS1IjB0feK+7ZRcu+lGvtbicaeXWBdgQAASmbDs9kPEK+Z9/Kxi1J8cjV9DDGSBJ1Ox61mSIXAjylGn0pNnFWuhvaNxKB9aA+OnngFoepQAMCcZQ63Ltci74lOpO8wLnsphRvJCXRIW3/0XgB3VjME1zg0hC3MSLKoVsbsrBRNXSkoKilehgJAqDoUhW8Xo7E7FY5F75XbnWRRq4JdhUIMQTBJcsmR4Q6vmN6gRvahPMgUsjV+OSVH5oE86P+K8IpHqOwgpZ4U0WCOQ0QA5T1mmlEiPDJSyA4AUEVFwWpTesWCAjzgOULwJUEwISEZxua9/GHB87CaTD7Bs0YjwoO8N9iCTQaC4BnRYPAYoRcor1Dy4xZ0N9+Ba9G1xu5knehpaUPydrNXnF6Qg+P5P0WDGYf0t4lHQezKWCDlxqHsQXx/4TJoy9xy3Gqmcf3i13gu+wECFN7LMzEV4mAYRaMQQ/BzYlhZfb9eXb4vczp2ZTwj8RHCA1vxc5UFrDsYAEBJGRzJGUScZu1Ee4fUVo+D+0mI4fNfffZUaWfJ8ft7VnchVjaHFBdr0jvLPj+7Vyjv819tZ2VftffG2DdFBdDep2FYu/RLX3mfYIWbv9beH231cH7OER/ycCQ6BqJolgmp3TBYV61j3R580atXOzcKvjsQsejiyIoLde86fHn8tiNxSj79pS3O7HSL79rlJtHUEWe2W5QVfmv7S7b0tbhzd+U7OI7MS9w6R/nzLunXtrg5w6Tyg/PX3u/051u3lXNXtZe69epxM70+12Sl0PUwcrz8ivbyel4RMyR4mpYfr2nYYeR53zclnidQU7/TNG+XFom5cfod9ZI6BpqNuan50aSE3x0fy6w9ngD83q2xDRtUl85dKbsupqboXSPZQpxu7YodnjYFrsnNmAP52/diR4asKaVi64kG63Q6zszIjn1bv3N60fnvoFinBNU/JM0wC/Kj611pV0rUqJd0934znZuWrzdMKg9nppgCAALVt5IsRlr+xvlvyvzu4v8EBoA/elpGMpOfV9tYadrohNI5PKaq+rjqTOVG62xSPKE9qW3QntQ2AH62uh8JHovri+Ct8s9eWnreTIV/AIR1wOGopbx1AAAAAElFTkSuQmCC',
    notSelected:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEjElEQVRIia2Wa0wcZRSG35m9DbcFdrktlVILLQIFKpfSiPaGmjSppqlBhdhEksb6o1E0Jo0Rl21qJE2NbQRNldqiUktKf1QhaoxcpFKg5VpoF4G4QBDoXtgBZneHvcz4C2RhdhnQ99fknHfOk3O+b+b7CGxYPHHq1TMakiQ1AMBx3HRlbdk0QPAbqUKINb5TVL49LMzxEQHu6Ug1KwsPcUoBgJ6Xu4yzlNvDS25bGGlp5XcfGv4XcEHBDUmqerBCGeI89uKB8aj42AWCWNUczxMYmwrmf2zaZpx3yOoemtJK6upe9mwarHtdR3EU33gwZzLjmayZIDGdtHbHMi33tvRbZar8ioq3Fn35SN8leIJTcDdf2D+WJRYKAPuypoKP7DfkqNyWm/58El+J0yeI155Msrx5MHdKNHRJmki7xGwNiErYeni8rbdlUMgjOOqCghuS1IjB0feK+7ZRcu+lGvtbicaeXWBdgQAASmbDs9kPEK+Z9/Kxi1J8cjV9DDGSBJ1Ox61mSIXAjylGn0pNnFWuhvaNxKB9aA+OnngFoepQAMCcZQ63Ltci74lOpO8wLnsphRvJCXRIW3/0XgB3VjME1zg0hC3MSLKoVsbsrBRNXSkoKilehgJAqDoUhW8Xo7E7FY5F75XbnWRRq4JdhUIMQTBJcsmR4Q6vmN6gRvahPMgUsjV+OSVH5oE86P+K8IpHqOwgpZ4U0WCOQ0QA5T1mmlEiPDJSyA4AUEVFwWpTesWCAjzgOULwJUEwISEZxua9/GHB87CaTD7Bs0YjwoO8N9iCTQaC4BnRYPAYoRcor1Dy4xZ0N9+Ba9G1xu5knehpaUPydrNXnF6Qg+P5P0WDGYf0t4lHQezKWCDlxqHsQXx/4TJoy9xy3Gqmcf3i13gu+wECFN7LMzEV4mAYRaMQQ/BzYlhZfb9eXb4vczp2ZTwj8RHCA1vxc5UFrDsYAEBJGRzJGUScZu1Ee4fUVo+D+0mI4fNfffZUaWfJ8ft7VnchVjaHFBdr0jvLPj+7Vyjv819tZ2VftffG2DdFBdDep2FYu/RLX3mfYIWbv9beH231cH7OER/ycCQ6BqJolgmp3TBYV61j3R580atXOzcKvjsQsejiyIoLde86fHn8tiNxSj79pS3O7HSL79rlJtHUEWe2W5QVfmv7S7b0tbhzd+U7OI7MS9w6R/nzLunXtrg5w6Tyg/PX3u/051u3lXNXtZe69epxM70+12Sl0PUwcrz8ivbyel4RMyR4mpYfr2nYYeR53zclnidQU7/TNG+XFom5cfod9ZI6BpqNuan50aSE3x0fy6w9ngD83q2xDRtUl85dKbsupqboXSPZQpxu7YodnjYFrsnNmAP52/diR4asKaVi64kG63Q6zszIjn1bv3N60fnvoFinBNU/JM0wC/Kj611pV0rUqJd0934znZuWrzdMKg9nppgCAALVt5IsRlr+xvlvyvzu4v8EBoA/elpGMpOfV9tYadrohNI5PKaq+rjqTOVG62xSPKE9qW3QntQ2AH62uh8JHovri+Ct8s9eWnreTIV/AIR1wOGopbx1AAAAAElFTkSuQmCC',
  };

  mapStyle: object[] = [];

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

<style lang="scss" scoped></style>
