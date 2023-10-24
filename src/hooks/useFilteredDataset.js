import useGlobalSetting from './useGlobalSetting'
import { escapeRegExp } from '@/utils/highlightText'
export default () => {
  const {
    searchText,
    datasetInfo,
    selectedCategory,
    selectedProvider,
    setSelectedCategory,
    setSelectedProvider,
  } = useGlobalSetting()

  const keyword = escapeRegExp(searchText)
  let dataset = datasetInfo.dataset || []
  // .slice(0, 10)

  if (selectedCategory.en) {
    // dataset = dataset.filter((d) => d.category[0] == selectedCategory)
    dataset = dataset.filter((d) => d.category.includes(selectedCategory.en))
  }
  if (selectedProvider) {
    // dataset = dataset.filter((d) => d.provider[0] == selectedProvider)
    dataset = dataset.filter((d) => d.provider.includes(selectedProvider))
  }

  dataset = dataset.filter(
    (d) => d.title.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0
    // ||
    // d.category.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0
  )

  // remove duplicates
  dataset = dataset.filter(
    (d, index) => index == dataset.findIndex((a) => a.title[0] == d.title[0])
  )

  return dataset
}
