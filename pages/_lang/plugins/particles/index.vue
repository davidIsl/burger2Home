<template lang="pug">
.py-5
  b-container(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 {{ $t('pages.particles.title') }}
          a(
            href='https://www.npmjs.com/package/particles.vue'
            target='_blank'
            rel='noopener'
          ) https://www.npmjs.com/package/particles.vue
          br.
          a(
            href='https://particles.js.org/samples/index.html#warp'
            target='_blank'
            rel='noopener'
          ) https://particles.js.org/samples/index.html#warp
          .mt-4
            p.text-justify {{ $t('pages.particles.text') }}
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 1
          .mt-4
            particles#tsparticles1.border(:options='particlesOptions1')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 2
          .mt-4
            particles#tsparticles2.border(:options='particlesOptions2')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 3
          .mt-4
            particles#tsparticles3.border(:options='particlesOptions3')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 4
          .mt-4
            particles#tsparticles4.border(:options='particlesOptions4')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 5
          .mt-4
            particles#tsparticles5.border(:options='particlesOptions5')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 6
          a(href='img/particles/deer.svg' target='_blank' rel='noopener') img/particles/deer.svg
          .mt-4
            particles#tsparticles6.border(:options='particlesOptions6')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example 7
          a(href='img/particles/google.svg' target='_blank' rel='noopener') img/particles/google.svg
          .mt-4
            particles#tsparticles7.border(:options='particlesOptions7')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Example AntelopeJS
          a(
            href='img/particles/antelope-head.svg'
            target='_blank'
            rel='noopener'
          ) img/particles/antelope-head.svg
          .mt-4
            particles#tsparticles8.border(:options='particlesOptions8')
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

// https://particles.js.org/samples/
import Particles from 'particles.vue';
declare module 'particles.vue';
Vue.use(Particles);

@Component({
  components: {},
})
export default class extends Vue {
  // Particles example 1
  particlesOptions1: any = {
    background: {
      opacity: 0,
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      links: {
        color: 'rgba(116, 121, 243, 1)',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  // Particles example 2
  particlesOptions2: any = {
    background: {
      opacity: 0,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'grab',
          parallax: {
            enable: true,
            force: 60,
          },
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        grab: {
          distance: 400,
        },
      },
    },
    particles: {
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      links: {
        color: {
          value: 'rgba(116, 121, 243, 1)',
        },
        enable: true,
        distance: 150,
        opacity: 0.4,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          bottom: 'out',
          left: 'out',
          right: 'out',
          top: 'out',
        },
      },
      number: {
        density: {
          enable: true,
        },
      },
      opacity: {
        random: {
          enable: true,
        },
        value: 0.5,
        animation: {
          enable: true,
          minimumValue: 0.1,
          speed: 3,
        },
      },
      size: {
        random: {
          enable: true,
        },
        value: 10,
        animation: {
          enable: true,
          minimumValue: 0.1,
          speed: 20,
        },
      },
    },
  };

  // Particles example 3
  particlesOptions3: any = {
    background: {
      opacity: 0,
    },
    interactivity: {
      events: {
        onClick: {
          mode: 'push',
        },
        onHover: {
          mode: 'repulse',
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        grab: {
          distance: 400,
        },
      },
    },
    particles: {
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      links: {
        color: {
          value: 'rgba(116, 121, 243, 1)',
        },
        distance: 150,
        enable: true,
        warp: true,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          bottom: 'out',
          left: 'out',
          right: 'out',
          top: 'out',
        },
        speed: 6,
        warp: true,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
        animation: {
          minimumValue: 0.1,
          speed: 3,
        },
      },
      size: {
        random: {
          enable: true,
        },
        animation: {
          minimumValue: 0.1,
          speed: 20,
        },
      },
    },
  };

  // Particles example 4
  particlesOptions4: any = {
    particles: {
      number: {
        value: 12,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      shape: {
        type: 'polygon',
        stroke: {
          width: 0,
          color: '#000',
        },
        polygon: {
          nb_sides: 6,
        },
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 160,
        random: false,
        anim: {
          enable: true,
          speed: 10,
          size_min: 40,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 200,
        color: 'rgba(116, 121, 243, 1)',
        opacity: 1,
        width: 2,
      },
      move: {
        enable: true,
        speed: 8,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'grab',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  // Particles example 5
  particlesOptions5: any = {
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 10,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 500,
        color: '#ffffff',
        opacity: 0.4,
        width: 2,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'bottom',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'bubble',
        },
        onclick: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 0.5,
          },
        },
        bubble: {
          distance: 400,
          size: 4,
          duration: 0.3,
          opacity: 1,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  // Particles example 6
  particlesOptions6: any = {
    background: {
      color: {
        opacity: 0,
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    detectRetina: false,
    fpsLimit: 30,
    interactivity: {
      events: {
        onClick: {
          mode: 'push',
        },
        onDiv: {
          selectors: '#repulse-div',
          mode: 'repulse',
        },
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 40,
          duration: 2,
          opacity: 8,
          size: 6,
        },
        grab: {
          distance: 400,
        },
        slow: {
          factor: 1,
          radius: 0,
        },
      },
    },
    particles: {
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      links: {
        color: {
          value: 'rgba(116, 121, 243, 1)',
        },
        distance: 30,
        enable: true,
        opacity: 0.4,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          default: 'bounce',
          bottom: 'bounce',
          left: 'bounce',
          right: 'bounce',
          top: 'bounce',
        },
        speed: 1,
      },
      number: {
        density: {
          area: 2000,
        },
        value: 300,
      },
      opacity: {
        value: 0.4,
        animation: {
          enable: true,
          minimumValue: 0.05,
        },
      },
      size: {
        random: {
          enable: true,
        },
        value: 1,
        animation: {
          minimumValue: 0.1,
          speed: 40,
        },
      },
    },
    polygon: {
      draw: {
        enable: true,
        stroke: {
          color: {
            value: 'rgba(255,255,255,0.2)',
          },
          width: 0.5,
          opacity: 0.2,
        },
      },
      enable: true,
      inline: {
        arrangement: 'equidistant',
      },
      move: {
        radius: 10,
        type: 'path',
      },
      scale: 0.6,
      type: 'inline',
      url: 'img/particles/deer.svg',
    },
  };

  // Particles example 7
  //   fullScreen: {
  //   enable: true,
  //   zIndex: 1,
  // },
  particlesOptions7: any = {
    background: {
      color: {
        opacity: 0,
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    detectRetina: false,
    fpsLimit: 30,
    interactivity: {
      events: {
        onClick: {
          mode: 'push',
        },
        onDiv: {
          selectors: '#repulse-div',
          mode: 'repulse',
        },
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 40,
          duration: 2,
          opacity: 8,
          size: 6,
        },
        grab: {
          distance: 400,
        },
        slow: {
          factor: 1,
          radius: 0,
        },
      },
    },
    particles: {
      color: {
        value: ['#4285f4', '#34A853', '#FBBC05', '#EA4335'],
      },
      links: {
        color: {
          value: 'random',
        },
        distance: 40,
        enable: true,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          default: 'bounce',
          bottom: 'bounce',
          left: 'bounce',
          right: 'bounce',
          top: 'bounce',
        },
        speed: 1,
      },
      number: {
        density: {
          area: 2000,
        },
        value: 200,
      },
      opacity: {
        value: 0.4,
        animation: {
          enable: true,
          minimumValue: 0.05,
        },
      },
      size: {
        random: {
          enable: true,
        },
        value: 1,
        animation: {
          minimumValue: 0.1,
          speed: 40,
        },
      },
    },
    polygon: {
      draw: {
        enable: false,
        stroke: {
          color: {
            value: 'rgba(255,255,255,0.2)',
          },
          width: 0.5,
          opacity: 0.2,
        },
      },
      enable: true,
      inline: {
        arrangement: 'equidistant',
      },
      move: {
        radius: 10,
        type: 'path',
      },
      scale: 0.5,
      type: 'inline',
      url: 'img/particles/google.svg',
      position: {
        x: 40,
        y: 25,
      },
    },
  };

  particlesOptions8: any = {
    background: {
      color: {
        opacity: 0,
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    detectRetina: false,
    fpsLimit: 30,
    interactivity: {
      events: {
        onClick: {
          mode: 'push',
        },
        onDiv: {
          selectors: '#repulse-div',
          mode: 'repulse',
        },
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 40,
          duration: 2,
          opacity: 8,
          size: 6,
        },
        grab: {
          distance: 400,
        },
        slow: {
          factor: 1,
          radius: 0,
        },
      },
    },
    particles: {
      color: {
        value: 'rgba(116, 121, 243, 1)',
      },
      links: {
        color: {
          value: 'rgba(116, 121, 243, 1)',
        },
        distance: 30,
        enable: true,
        opacity: 0.4,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          default: 'bounce',
          bottom: 'bounce',
          left: 'bounce',
          right: 'bounce',
          top: 'bounce',
        },
        speed: 1,
      },
      number: {
        density: {
          area: 2000,
        },
        value: 300,
      },
      opacity: {
        value: 0.4,
        animation: {
          enable: true,
          minimumValue: 0.05,
        },
      },
      size: {
        random: {
          enable: true,
        },
        value: 1,
        animation: {
          minimumValue: 0.1,
          speed: 40,
        },
      },
    },
    polygon: {
      draw: {
        enable: true,
        stroke: {
          color: {
            value: 'rgba(255,255,255,0.2)',
          },
          width: 0.5,
          opacity: 0.2,
        },
      },
      enable: true,
      inline: {
        arrangement: 'equidistant',
      },
      move: {
        radius: 10,
        type: 'path',
      },
      scale: 0.6,
      type: 'inline',
      url: 'img/particles/antelope-head.svg',
      position: {
        x: 35,
        y: 10,
      },
    },
  };
}
</script>

<style lang="scss" scoped></style>
