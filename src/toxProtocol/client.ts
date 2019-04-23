import { Tox } from './tox';
import { Commander } from './commander';
import store from '@/store';
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
      response.then((res) => printMessage(res));
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
      //printMessage(message);
      return this.tox
        .sendFriendMessage(this.chatWith, 'Normal', message)
        .then((response) => {
          return response;
        });
    }
  }

  public onToxEvent(event: ToxEvent) {
    printMessage(event);
  }
}

function printMessage(msg: any) {
  store.dispatch('saveMsg', msg);
}
