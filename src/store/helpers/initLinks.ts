import IRawCompanies from '~/store/types/IRawCompanies'
import IRawLink from '~/store/types/IRawLink'
import IPath from '~/store/types/IPath'

export default (companies: IRawCompanies, countries: { [key: string]: string }) => {
  const paths: IPath = {}

  for (const countryCode in countries) {
    paths[countryCode] = {}
  }

  for (const company in companies) {
    companies[company].forEach(
      (rawLink: IRawLink) => {
        // if (!paths[rawLink.src]) {
        //   paths[rawLink.src] = {}
        // }

        if (!paths[rawLink.src][rawLink.des]) {
          paths[rawLink.src][rawLink.des] = { links: [], viewedIndex: 0 }
        }

        paths[rawLink.src][rawLink.des].links.push({ company, price: rawLink.price })
      }
    )
  }

  for (const src in paths) {
    for (const des in paths[src])
      paths[src][des].links.sort((a, b) => a.price - b.price)
  }

  return paths
}
