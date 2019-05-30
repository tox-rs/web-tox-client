import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'item',
  components: {},
  props: ['type', 'room', 'contact', 'notification'],
  data() {
    return {};
  },
  computed: {
    status(): string {
      if (this.$store.state.info.friends[this.$props.room.friend].connection) {
        if (
          this.$store.state.info.friends[this.$props.room.friend].connection ===
          'None'
        ) {
          return 'Offline';
        } else {
          return this.$store.state.info.friends[this.$props.room.friend]
            .status === 'None'
            ? 'Online'
            : this.$store.state.info.friends[this.$props.room.friend].status;
        }
      } else {
        return 'Offline';
      }
    },
    avatar(): string {
      if (this.$props.room && this.$props.room.type !== 'conference') {
        const avatar = this.$store.state.avatarStorage[
          this.$store.state.info.friends[this.$props.room.friend].number
        ];
        if (avatar) {
          return 'data:image/png;base64,' + avatar;
        } else {
          return '';
        }
      } else if (this.$props.contact) {
        if (this.$props.contact.avatar) {
          return 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, this.$store.state.info.avatar));
        }
        const avatar = this.$store.state.avatarStorage[
          this.$props.contact.number
        ];
        if (avatar) {
          return 'data:image/png;base64,' + avatar;
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    selectedContact(): object {
      return this.$store.state.selectedContact;
    },
    senderName(): string {
      if (this.$store.state.info.friends && this.notification) {
        return this.notification.num !== null
          ? this.$store.state.info.friends[this.notification.num].name
          : '';
      } else {
        return '';
      }
    },
  },
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
    acceptNotification() {
      if (this.notification.type === 'invite') {
        this.$store.dispatch(
          'requests/conference/JoinConference',
          this.notification,
        );
      } else {
        this.$store.dispatch(
          'requests/friend/AddFriendNorequest',
          this.notification.value,
        );
      }

      this.$store.commit('DELETE_NOTIFICATION', this.notification.id);
    },
    deleteNotification() {
      this.$store.commit('DELETE_NOTIFICATION', this.notification.id);
    },
    deleteItem() {
      if (this.room.type === 'friend') {
        this.$store.dispatch(
          'requests/friend/DeleteFriend',
          this.$store.state.info.friends[this.$props.room.friend].number,
        );
        this.$store.dispatch(
          'deleteFriendRoom',
          this.$store.state.info.friends[this.$props.room.friend].number,
        );
      } else {
        this.$store.dispatch(
          'requests/conference/DeleteConference',
          this.room.conference,
        );
        this.$store.commit('UPDATE_ROOM_LIST', this.room.conference);
      }
    },
  },
});
