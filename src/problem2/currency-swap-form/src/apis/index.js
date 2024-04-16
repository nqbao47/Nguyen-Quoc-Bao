// Get Currencies, prices
async function fetchCurrencies() {
  const rs = await fetch('https://interview.switcheo.com/prices.json')
  const data = await rs.json()

  // Thêm logic để tạo URL cho từng token icon và thêm vào dữ liệu
  const newData = await Promise.all(
    data.map(async (item) => {
      // Tạo URL cho token icon dựa trên tên currency
      const iconURL = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`

      // Trả về object mới bổ sung iconURL vào dữ liệu
      return {
        ...item,
        iconURL: iconURL
      }
    })
  )

  return newData
}

export { fetchCurrencies }
