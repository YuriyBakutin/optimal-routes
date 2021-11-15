import IRouteLink from "./IRouteLink";

export default interface IRouteUI {
  prise: number,
  src: string,
  links: IRouteLink[],
  key?: string,
}
