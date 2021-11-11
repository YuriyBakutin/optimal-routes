export default interface ILink {
  [key: string]: {
    paths: {
      company: string,
      price: number,
    }[],
    viewedIndex: number,
  }
}