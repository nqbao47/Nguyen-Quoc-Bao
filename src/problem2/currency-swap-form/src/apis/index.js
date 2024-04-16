// Get Currencies and prices
async function fetchCurrencies() {
  const rs = await fetch('https://interview.switcheo.com/prices.json')
  const data = await rs.json()
  return data
}

export { fetchCurrencies }
