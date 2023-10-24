export default async () => {
  let result = []
  try {
    const response = await fetch('./facility.json')
    const data = await response.json()
    result = {
      filter: {
        category: data.map((d) => ({
          en: d.apiso_Title_txt[0],
          zh: d.apiso_Title_txt[1],
        })),
      },
      dataset: data.reduce(
        (result, d) => [
          ...result,
          ...d.feature.features.map((f) => ({
            id: f.properties.GmlID,
            category: d.apiso_Title_txt,
            coordinates: {
              lng: f.geometry.coordinates[0],
              lat: f.geometry.coordinates[1],
            },
            title: [
              f.properties.NAME_EN || f.properties.Facility_Name_EN,
              f.properties.NAME_TC || f.properties.Facility_Name_TC,
            ],
          })),
        ],
        []
      ),
    }
  } catch (error) {
    console.error(error)
  }
  return result
}
