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

  public onToxEvent(event: ToxEvent) {
    console.log(event);
    switch (event.event) {
      case 'FriendMessage':
        event = event as Events.FriendMessage;
        printMessage(event);
        break;
      case 'FriendTyping':
        event = event as Events.FriendTyping;
        store.dispatch('setTyping', event);
        break;
      case 'FriendReadReceipt':
        event = event as Events.FriendReadReceipt;
        store.dispatch('changeStatusMsg', event.message_id);
        break;
      case 'ConferencePeerName':
        event = event as Events.ConferencePeerName;
        store.dispatch('addMember', event);
        break;
      case 'ConferenceMessage':
        event = event as Events.ConferenceMessage;
        printMessage(event);
        break;
      case 'ConferenceInvite':
        event = event as Events.ConferenceInvite;
        const data = {
          type: 'invite',
          value: event.cookie,
          num: event.friend,
        };
        store.dispatch('addNotification', data);
        break;
      default:
        break;
    }
  }
}

function printMessage(msg: any) {
  store.dispatch('saveMsg', msg);
}
