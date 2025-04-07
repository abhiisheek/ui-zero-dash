export type ObjectType = {
  [key: string]: any;
};

export type NotifierType = {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  id: number;
}
