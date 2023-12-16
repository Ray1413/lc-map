export default async () => {
  let result = null
  try {
    const response = await fetch('./facility.min.json')
    result = await response.json()
  } catch (error) {
    console.error(error)
  }
  // console.log(result.dataset[0])
  return result
}
