import { Component, Prop, Vue } from 'vue-property-decorator';
import { Client } from '@/toxProtocol/client';
export default Vue.extend({
  name: 'tox-area',
  components: {},
  props: [],
  data() {
    return { message: '', content: this.$store.state.msgs, client: new Client() };
  },
  computed: {},
  mounted() {},
  methods: {
    submit(ev: any) {
      this.client.onChatMessage(this.message);
      this.message = '';
    },
  },
});
