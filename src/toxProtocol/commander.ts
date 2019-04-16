import { Action } from './action';
import { Input } from './input';

export class Commander {
  public evaluate(command: string): Action | null {
    const split = command.split(' ');
    const input = new Input(split.slice(1).join(' '));

    return this.evalCommand(split[0], input);
  }

  public evalCommand(command: string, input: Input): Action | null {
    switch (command) {
      case 'help': {
        if (!input.isOver()) {
          return null;
        }
        return { action: 'help' };
      }
      case 'info': {
        const target = input.readWord();
        let friend: number | null;
        if (target !== null) {
          friend = parseInt(target);
          if (isNaN(friend)) {
            return null;
          }
        } else {
          friend = null;
        }

        return { action: 'info', friend: friend };
      }
      case 'add': {
        const toxId = input.readWord();
        const message = input.readLine();

        if (toxId === null) {
          return null;
        }

        return { action: 'add', toxId, message };
      }
      case 'chat': {
        const arg = input.readWord();

        let friend = null;
        if (arg !== null) {
          friend = parseInt(arg);
        }

        if (friend === null) {
          return null;
        }

        return { action: 'chat', friend };
      }
      default:
        return null;
    }

    return null;
  }
}
