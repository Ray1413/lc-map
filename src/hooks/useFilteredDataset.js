import useGlobalSetting from './useGlobalSetting'
import { escapeRegExp } from '@/utils/highlightText'
export default () => {
  const {
    searchText,
    datasetInfo,
    selectedCategory,
    // selectedProvider,
    // setSelectedCategory,
    // setSelectedProvider,
  } = useGlobalSetting()

  const keyword = escapeRegExp(searchText)
  let dataset = datasetInfo.dataset || []
  // .slice(0, 10)

  if (selectedCategory.en) {
    // dataset = dataset.filter((d) => d.category[0] == selectedCategory)
    dataset = dataset.filter(
      (d) => d.resources['en']['category'] === selectedCategory['en']
    )
  }
  // if (selectedProvider) {
  //   // dataset = dataset.filter((d) => d.provider[0] == selectedProvider)
  //   dataset = dataset.filter((d) => d.provider.includes(selectedProvider))
  // }

  dataset = dataset.filter(
    // (d) => d.title.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0
    // // ||
    // // d.category.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0

    (d) => {
      const exp = new RegExp(keyword, 'ig')
      return (
        exp.test(d.resources['en']['title']) ||
        exp.test(d.resources['zh']['title']) ||
        exp.test(d.resources['en']['facilities']) ||
        exp.test(d.resources['zh']['facilities'])
      )
    }
  )

  // remove duplicates
  dataset = dataset.filter(
    (d, index) =>
      index ==
      dataset.findIndex(
        (a) => a.resources['en']['title'] == d.resources['en']['title']
      )
  )

  return dataset
}
