import { Vue, Watch } from 'vue-property-decorator';
import { QrcodeStream } from 'vue-qrcode-reader';
import VueQRCodeComponent from 'vue-qrcode-component';
Vue.component('qr-code', VueQRCodeComponent);

export default Vue.extend({
  name: 'vue-dialog',
  components: { QrcodeStream, VueQRCodeComponent },
  props: [],
  data() {
    return { value: null, navigator: navigator };
  },
  computed: {
    active: {
      get(): boolean {
        return this.$store.state.dialogActive;
      },
      set() {
        this.$store.commit('DIALOG_TRIGGER');
      },
    },
    dialogType(): string {
      return this.$store.state.dialogType;
    },
    qrCode(): string {
      return this.$store.state.info.tox_id;
    },
    dialogContent(): object {
      if (this.dialogType === 'friend') {
        return {
          title: 'Start a chat',
          content: 'Who would you like to communicate with?',
          placeholder: 'Tox ID',
        };
      } else if (this.dialogType === 'setName') {
        return {
          title: 'Set name',
          content: ' ',
          placeholder: 'Name',
        };
      } else {
        return {
          title: 'Scan QR',
        };
      }
    },
  },
  mounted() {},
  methods: {
    onConfirm() {
      if (this.dialogType === 'friend') {
        this.$store.dispatch('requests/friend/AddFriend', {
          tox_id: this.value,
        });
      } else {
        this.$store.dispatch('requests/user/SetName', this.value);
      }
      this.active = false;
    },
    openQRDialog() {
      this.$store.commit('DIALOG_TRIGGER', 'QR');
    },
    onDecode(decodedString: any) {
      this.$store.dispatch('requests/friend/AddFriend', {
        tox_id: decodedString,
      });
      this.$store.commit('DIALOG_TRIGGER');
    },
  },
});
