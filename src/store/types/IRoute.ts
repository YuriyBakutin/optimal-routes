import IRouteLink from "./IRouteLink";

export default interface IRoute {
  prise: number,
  src: string,
  links: IRouteLink[],
}