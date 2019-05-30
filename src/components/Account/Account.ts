import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'account',
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    name(): string | undefined {
      if (this.$store.state.info) {
        return this.$store.state.info.name;
      }
    },
    avatar(): string {
      return (
        'data:image/png;base64,' +
        btoa(String.fromCharCode.apply(null, this.$store.state.info.avatar))
      );
    },
  },
  methods: {
    setName() {
      this.$store.commit('DIALOG_TRIGGER', 'setName');
    },
    setAvatar() {
      this.$store.commit('DIALOG_TRIGGER', 'setAvatar');
    },
  },
});
