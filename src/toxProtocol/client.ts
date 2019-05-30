import { Tox } from './tox';
import store from '@/store';
import {
  ToxResponse,
  ToxEvent,
  ToxRequest,
  MessageType,
  Events,
} from 'ws-tox-protocol';
export class Client {
  public tox: Tox;

  constructor() {
    const tox = new Tox();

    tox.addEventListener('core', ((ev: CustomEvent<ToxEvent>) => {
      this.onToxEvent(ev.detail);
    }) as EventListener);

    this.tox = tox;
  }

  public sendToxRequset(req: ToxRequest) {
    this.tox.sendRequest(req).then((res: ToxResponse) => {
      if (res) {
        this.onToxResponse(res, req);
      }
    });
    if (req.request === 'SetInfo' || req.request === 'SetName') {
      this.tox.pushResponse({ response: 'Ok' } as ToxResponse);
    }
  }
  public onToxResponse(res: ToxResponse, req: ToxRequest) {
    // console.log(res);
    switch (res.response) {
      case 'Friend':
      case 'FriendExists':
      case 'LastOnline':
        store.dispatch('responses/friend/' + res.response, { res, req });
        break;
      case 'Conference':
      case 'ConferencePeerCount':
      case 'ConferencePeerPublicKey':
      case 'IsOwnPeerNumber':
      case 'ConferenceTitle':
      case 'ConferenceList':
      case 'ConferencePeerList':
      case 'ConferenceType':
        store.dispatch('responses/conference/' + res.response, { res, req });
        break;
      case 'Ok':
      case 'MessageSent':
      case 'Info':
      case 'ConnectionStatus':
      case 'Address':
      case 'Nospam':
      case 'PublicKey':
      case 'Name':
      case 'StatusMessage':
      case 'Status':
        store.dispatch('responses/user/' + res.response, { res, req });
        break;
      default:
        break;
    }
    if ((res as any).error) {
      store.commit(
        'ERROR_MSG',
        (res as any).response + ': ' + (res as any).error,
      );
    }
  }
  public onToxEvent(event: ToxEvent) {
    // console.log(event);
    switch (event.event) {
      case 'FriendRequest':
      case 'FriendMessage':
      case 'FriendName':
      case 'FriendStatusMessage':
      case 'FriendStatus':
      case 'FriendConnectionStatus':
      case 'FriendTyping':
      case 'FriendReadReceipt':
      case 'FriendMessage':
        store.dispatch('events/friend/' + event.event, event);
        break;
      case 'ConferenceInvite':
      case 'ConferenceConnected':
      case 'ConferenceMessage':
      case 'ConferenceTitle':
      case 'ConferencePeerName':
      case 'ConferencePeerName':
      case 'ConferencePeerListChanged':
        store.dispatch('events/conference/' + event.event, event);
        break;
      case 'ConnectionStatus':
      case 'FileReceipt':
      case 'FileChunkRequest':
        store.dispatch('events/user/' + event.event, event);
        break;
      case 'FileChunkReceipt':
        store.commit('WRITE_AVATAR', event);
        break;
      case 'SecretKey':
        if (!localStorage.sk) {
          localStorage.setItem('sk', event.secret_key);
        }
        store.dispatch('getData');
      default:
        break;
    }
  }
}

