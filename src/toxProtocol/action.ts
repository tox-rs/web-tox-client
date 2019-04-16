export type Action =
  | { action: 'help' }
  | { action: 'info'; friend: number | null }
  | { action: 'add'; toxId: string; message: string | null }
  | { action: 'chat'; friend: number };
