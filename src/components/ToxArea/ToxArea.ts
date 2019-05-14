import { Component, Prop, Vue } from 'vue-property-decorator';
import Search from '@/components/Search/index.vue';
export default Vue.extend({
  name: 'tox-area',
  components: {Search},
  props: [],
  data() {
    return {
      message: '',
    };
  },
  computed: {
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
          null &&
        this.$store.state.rooms[this.$store.state.selectedRoom].typing !==
          undefined
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
        console.log(this);
        this.$store.dispatch('sendMsg', {
          room: this.$store.state.selectedRoom,
          msg: this.message,
          author: this.$store.state.info.name,
        });
      }
      this.message = '';
    },
  },
});
