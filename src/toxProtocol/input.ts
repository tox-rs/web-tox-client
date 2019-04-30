export class Input {
  public input: string;

  constructor(input: string) {
    this.input = input;
  }

  public readWord(): string | null {
    const split = this.input.split(' ');
    const wordIx = split.findIndex((s) => s !== '');

    if (wordIx !== -1) {
      this.input = split.slice(wordIx + 1).join(' ');

      return split[wordIx];
    }

    return null;
  }

  public readLine(): string | null {
    if (this.isOver()) {
      return null;
    }

    const line = this.input;

    this.input = '';

    return line;
  }

  public isOver(): boolean {
    const split = this.input.split(' ');

    return split.findIndex((s) => s !== '') === -1;
  }
}
