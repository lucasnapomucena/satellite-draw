export interface IControl {
  name: string;
  icon: JSX.Element;
  handler: () => void;
}
