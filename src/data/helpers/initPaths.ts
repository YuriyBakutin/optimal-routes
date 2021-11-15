import IRawCompanies from '~/data/types/IRawCompanies'
import IRawLink from '~/data/types/IRawLink'
import IPath from '~/data/types/IPath'

export default (companies: IRawCompanies, countries: { [key: string]: string }) => {
  const paths: IPath[][][] = []
  const nodes: string[] = []
  const nodeIndexes: { [node: string]: number } = {}
  const countriesList = []

  for (const countryCode in countries) {
    const index = nodes.length
    nodeIndexes[countryCode] = index
    paths[index] = []
    countriesList[index] = { value: countryCode, label: countries[countryCode] }
    nodes[index] = countryCode
  }

  for (const company in companies) {
    companies[company].forEach(
      (rawLink: IRawLink) => {
        let path: IPath[] = paths[nodeIndexes[rawLink.src]][nodeIndexes[rawLink.des]]

        if (!path) {
          paths[nodeIndexes[rawLink.src]][nodeIndexes[rawLink.des]] = []
        }

        paths[nodeIndexes[rawLink.src]][nodeIndexes[rawLink.des]].push(
          { company, price: rawLink.price }
        )
      }
    )
  }

  for (const src in paths) {
    for (const des in paths[src])
      paths[src][des].sort((a, b) => a.price - b.price)
  }

  return { paths, nodeIndexes, nodes, countriesList }
}
