import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'item',
  components: {},
  props: ['type', 'room', 'contact'],
  data() {
    return {};
  },
  computed: {
    status(): string {
      if (this.$store.state.info.friends) {
        return this.$store.state.info.friends[this.$props.room.friend].status ===
        'None'
        ? Math.round(
            this.$store.state.info.friends[this.$props.room.friend]
              .last_online / 10,
          ) === Math.round(Date.now() / 10000)
          ? 'Online'
          : 'Offline'
        : this.$store.state.info.friends[this.$props.room.friend].status;
      } else {
        return 'Offline';
      }
    },
    selectedContact(): object {
      return this.$store.state.selectedContact;
    },
  },
  mounted() {},
  methods: {
    click(type: string) {
      if (this.$props.type === 'conference' || this.$props.type === 'friend') {
        this.$store.dispatch('selectRoom', this.$props.room.id);
      }
      if (this.$props.type === 'group') {
        if (this.selectedContact && type === 'stop') {
          this.$store.commit('SELECT_CONTACT', null);
        } else if (!this.selectedContact) {
          this.$store.commit('SELECT_CONTACT', this.$props.contact);
        }
      }
    },
  },
});
