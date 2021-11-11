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
          links[linkName] = []
        }

        links[linkName].push({ company, price: rawLink.price })
      }
    )
  }

  return links
}
