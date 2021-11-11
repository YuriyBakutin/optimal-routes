import IRawCompanies from '~/store/types/IRawCompanies'
import IRawLink from '~/store/types/IRawLink'
import ILink from '~/store/types/ILink'
import getLinkName from './getLinkName'

export default (companies: IRawCompanies) => {
  const links: ILink = {}

  for (const company in companies) {
    companies[company].forEach(
      (rawLink: IRawLink) => {
        const linkName = getLinkName(rawLink.src, rawLink.des)

        if (!links[linkName]) {
          links[linkName] = { paths: [], viewedIndex: 0 }
        }

        links[linkName].paths.push({ company, price: rawLink.price })
      }
    )
  }

  for (const link in links) {
    links[link].paths.sort((a, b) => a.price - b.price)
  }

  return links
}
