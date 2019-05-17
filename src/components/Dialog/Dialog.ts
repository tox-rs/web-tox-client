import { Vue, Watch } from 'vue-property-decorator';
export default Vue.extend({
  name: 'vue-dialog',
  components: {},
  props: [],
  data() {
    return { value: null };
  },
  computed: {
    active: {
      get(): boolean {
        if (this.$store.state.dialogActive) {
          const self = this;
          setTimeout(() => {
            self.$children[0].$children[0].$children[3].$children[1].$el.classList.add(
              'md-raised',
            );
          }, 100);
        }
        return this.$store.state.dialogActive;
      },
      set() {
        this.$store.commit('DIALOG_TRIGGER');
      },
    },
    dialogType(): string {
      return this.$store.state.dialogType;
    },
    dialogContent(): object {
      if (this.dialogType === 'friend') {
        return {
          title: 'Start a chat',
          content: 'Who would you like to communicate with?',
          placeholder: 'Tox ID',
        };
      } else {
        return {
          title: 'Set name',
          content: ' ',
          placeholder: 'Name',
        };
      }
    },
  },
  mounted() {},
  methods: {
    onConfirm(value: any) {
      if (this.dialogType === 'friend') {
        this.$store.dispatch('requests/friend/AddFriend', { tox_id: value });
      } else {
        this.$store.dispatch('requests/user/SetName', value);
      }
    },
  },
});
