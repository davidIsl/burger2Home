export default {
  props: {
    fakeId: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: '',
    },
  },
  computed: {
    payload() {
      return { ...this.$store.state.meteor.pageData.payload };
    },
  },
  created() {
    this.$store.commit('meteor/switchData');
  },
  async beforeMount() {
    const { data } = await this.$axios({
      method: 'post',
      url:
        '/engine/' +
        process.env.ENGINE +
        '/getmaintenance/' +
        process.env.NAMESPACE,
      data: {
        lang: this.lang,
      },
    });

    if (data.enabled) {
      this.$nuxt.error({
        message: data.message,
        statusCode: 503,
      });
    }
  },
};
