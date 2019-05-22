import { Vue } from 'vue-property-decorator';
import Item from '@/components/Item/index.vue';
export default Vue.extend({
  name: 'list',
  components: { Item },
  props: ['type'],
  data() {
    return { selectedFriends: [] };
  },
  computed: {
    conference(): object[] {
      return this.$store.state.rooms.filter((room: any) => {
        if (room) {
          if (room.type === 'conference') {
            return room;
          }
        }
      });
    },
    friend(): object[] {
      return this.$store.state.rooms.filter((room: any) => {
        if (room) {
          if (room.type === 'friend') {
            return room;
          }
        }
      });
    },
    contacts(): object[] | undefined {
      if (this.$store.state.rooms.length) {
        const selectedRoom = this.$store.state.selectedRoom;
        const room = this.$store.state.rooms[selectedRoom];
        if (room) {
          if (this.$store.state.info.friends && room.type === 'friend') {
            const info = { ...this.$store.state.info };
            delete info.friends;
            delete info.response;
            const arr = [];
            const numberFriend = room.friend;
            arr.push(info);
            arr.push(this.$store.state.info.friends[numberFriend]);
            return arr;
          }
          if (room.type === 'conference') {
            return room.peers;
          }
        }
      }
    },
    notifications(): object[] {
      return this.$store.state.notifications;
    },
    addMember(): boolean {
      return this.$store.state.addMemberActive;
    },
    isConference(): boolean {
      if (this.$store.state.rooms.length) {
        return this.$store.state.rooms[this.$store.state.selectedRoom].type ===
          'conference'
          ? true
          : false;
      } else {
        return false;
      }
    },
  },
  beforeUpdate() {
    if (!this.addMember) {
      this.selectedFriends = [];
    }
  },
  methods: {
    add(type: string) {
      if (type === 'friend') {
        this.$store.commit('DIALOG_TRIGGER', 'friend');
      } else if (type === 'member') {
        this.selectedFriends.forEach((val) => {
          this.$store.dispatch('requests/conference/InviteToConference', val);
        });
        this.$store.commit('ADD_MEMBER_TRIGGER');
      } else {
        this.$store.dispatch('requests/conference/NewConference');
      }
    },
    switchAddMember() {
      this.$store.commit('ADD_MEMBER_TRIGGER');
    },
  },
});
