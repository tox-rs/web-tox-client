import 'ws-tox-protocol';

export class Tox {
  public socket: WebSocket;
  public eventTarget: EventTarget;
  public requestQueue: [(value: ToxResponse) => void, (reason: any) => void][];

  constructor() {
    const socket = new WebSocket('ws://127.0.0.1:2794');
    socket.addEventListener('message', (ev) => this.onWsMessage(ev));

    const target = new EventTarget();

    this.socket = socket;
    this.eventTarget = target;
    this.requestQueue = [];
  }

  public pushResponse(response: ToxResponse) {
    const target = this.requestQueue.shift();

    if (target) {
      target[0](response);
    }
  }

  public onWsMessage(event: MessageEvent) {
    if (typeof event.data === 'string') {
      // FIXME: this code does no validation
      const data = JSON.parse(event.data.toString());

      if (data.response !== undefined) {
        this.pushResponse(data as ToxResponse);
      } else if (data.event !== undefined) {
        const event = new CustomEvent('core', {
          detail: data as ToxEvent,
        });

        this.eventTarget.dispatchEvent(event);
      }
    }
  }
  public addEventListener(type: 'core', listener: EventListener) {
    this.eventTarget.addEventListener(type, listener);
  }

  public info(): Promise<ToxResponse> {
    return new Promise((accept, reject) => {
      const request: ToxRequest = { request: 'Info' };

      this.socket.send(JSON.stringify(request));
      this.requestQueue.push([accept, reject]);
    });
  }
  public addFriend(toxId: string, message?: string): Promise<ToxResponse> {
    return new Promise((accept, reject) => {
      let request: ToxRequest;

      if (message !== undefined) {
        request = { request: 'AddFriend', tox_id: toxId, message };
      } else {
        request = { request: 'AddFriendNorequest', tox_id: toxId };
      }

      this.socket.send(JSON.stringify(request));
      this.requestQueue.push([accept, reject]);
    });
  }
  public sendFriendMessage(
    friend: number,
    kind: MessageType,
    message: string,
  ): Promise<ToxResponse> {
    return new Promise((accept, reject) => {
      const request: ToxRequest = {
        request: 'SendFriendMessage',
        friend,
        kind,
        message,
      };

      this.socket.send(JSON.stringify(request));
      this.requestQueue.push([accept, reject]);
    });
  }
}
