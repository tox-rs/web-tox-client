import { Tox } from './tox';
import { Commander } from './commander';
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
  public commander: Commander;
  public chatWith: number | null;

  constructor() {
    const tox = new Tox();

    tox.addEventListener('core', ((ev: CustomEvent<ToxEvent>) => {
      this.onToxEvent(ev.detail);
    }) as EventListener);

    this.tox = tox;
    this.commander = new Commander();
    this.chatWith = null;
  }

  public runCommand(command: string) {
    const action = this.commander.evaluate(command);
    if (action === null) {
      return;
    }

    let response = null;
    switch (action.action) {
      case 'help':
        const msgs = [
          'Available commands:',
          '/help : shows this help message',
          '/info : get your name and Tox ID',
          '/add toxId [message] : add a friend. If no message, the friend will be added without a friend request',
          '/chat num : start chat with the friend with the id `num`',
        ];
        msgs.forEach((m) => printMessage(m));
        break;
      case 'add':
        if (action.message !== null) {
          response = this.tox.addFriend(action.toxId, action.message);
        } else {
          response = this.tox.addFriend(action.toxId);
        }
        break;
      case 'chat':
        printMessage('Chat with: ' + action.friend);
        this.chatWith = action.friend;
      default:
        break;
    }

    if (response !== null) {
      response.then((res) => console.log(res));
    }
  }
  public getInfo() {
    const response = this.tox.info();
    return response.then((res) => {
      return res;
    });
  }

  public setChatWith(num: number) {
    this.chatWith = num;
  }

  public onChatMessage(message: string) {
    if (message.charAt(0) === '/') {
      this.runCommand(message.substr(1));
      return;
    }

    if (this.chatWith !== null) {
      // printMessage(message);
      return this.tox
        .sendFriendMessage(this.chatWith, 'Normal', message)
        .then((response) => {
          return response;
        });
    }
  }
  public sendToxRequset(req: ToxRequest) {
    this.tox.sendRequest(req).then((res: ToxResponse) => {
      this.onToxResponse(res, req);
    });
  }
  public onToxResponse(res: ToxResponse, req: ToxRequest) {
    console.log(res);
    switch (res.response) {
      case 'Friend':
      case 'FriendExists':
      case 'LastOnline':
        store.dispatch('responses/friend/' + res.response, {res, req});
        break;
      case 'Conference':
      case 'ConferencePeerCount':
      case 'ConferencePeerPublicKey':
      case 'IsOwnPeerNumber':
      case 'ConferenceTitle':
      case 'ConferenceList':
      case 'ConferencePeerList':
      case 'ConferenceType':
        store.dispatch('responses/conference/' + res.response, {res, req});
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
        store.dispatch('responses/user/' + res.response, {res, req});
        break;
      default:
        break;
    }
  }
  public onToxEvent(event: ToxEvent) {
    console.log(event);
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
        store.dispatch('events/user/' + event.event, event);
        break;
      default:
        break;
    }
  }
}

function printMessage(msg: any) {
  store.dispatch('saveMsg', msg);
}
