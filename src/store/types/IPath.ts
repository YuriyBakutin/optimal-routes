export default interface IPath {
  [key: string]: {
    [key: string]: {
      links: {
        company: string,
        price: number,
      }[],
      viewedIndex: number,
    }
  }
}
