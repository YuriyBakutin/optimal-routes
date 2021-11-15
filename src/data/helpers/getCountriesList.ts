export default (rawCountries: { [key: string]: string }) => {
  const countriesList = []

  for (const countryCode in rawCountries) {
    countriesList.push(
      { value: countryCode, label: rawCountries[countryCode] }
    )
  }

  return countriesList
}
