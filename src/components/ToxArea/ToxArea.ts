import { Component, Prop, Vue } from 'vue-property-decorator';
import Search from '@/components/Search/index.vue';
export default Vue.extend({
  name: 'tox-area',
  components: { Search },
  props: [],
  data() {
    return {
      message: '',
    };
  },
  computed: {
    active(): boolean {
      return this.$store.state.toxAreaActive;
    },
    content(): object[] {
      return this.$store.state.rooms[this.$store.state.selectedRoom]
        ? this.$store.state.rooms[this.$store.state.selectedRoom].msgs
        : [];
    },
    typingContact(): void {
      if (!this.$store.state.rooms[this.$store.state.selectedRoom]) {
        return;
      }
      if (
        this.$store.state.rooms[this.$store.state.selectedRoom].typing !==
        'empty'
      ) {
        return this.$store.state.info.friends[
          this.$store.state.rooms[this.$store.state.selectedRoom].typing
        ];
      }
    },
  },
  mounted() {},
  methods: {
    submit(ev: any) {
      if (this.message) {
        if (
          this.$store.state.rooms[this.$store.state.selectedRoom].type ===
          'friend'
        ) {
          this.$store.dispatch('requests/friend/SendFriendMessage', {
            friend: this.$store.state.info.friends[
              this.$store.state.rooms[this.$store.state.selectedRoom].friend
            ].number,
            message: this.message,
          });
        } else {
          this.$store.dispatch('requests/conference/SendConferenceMessage', {
            conference: this.$store.state.rooms[this.$store.state.selectedRoom]
              .conference,
            message: this.message,
          });
        }
      }
      this.message = '';
    },
  },
});
