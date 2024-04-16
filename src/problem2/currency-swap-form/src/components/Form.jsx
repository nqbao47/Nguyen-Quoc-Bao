import { useState, useEffect } from 'react'
import {
  FormControl,
  Typography,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Button,
  Grid,
  Box,
  Avatar
} from '@mui/material'
import { fetchCurrencies } from '../apis/index'

function CurrencySwapForm() {
  const [currencies, setCurrencies] = useState([])

  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')

  const [inputError, setInputError] = useState('')
  const [fromCurrencyError, setFromCurrencyError] = useState(false)
  const [toCurrencyError, setToCurrencyError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      let data = await fetchCurrencies()
      data = addCustomIcons(data)
      setCurrencies(data)
      console.log(data)
    }
    fetchData()
  }, [])

  // Add other token icons missing
  const addCustomIcons = (data) => {
    const customIcons = {
      RATOM: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/rATOM.svg',
      STEVMOS: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stEVMOS.svg',
      STOSMO: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stOSMO.svg',
      STATOM: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stATOM.svg',
      STLUNA: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stLUNA.svg'
    }

    const newData = data.map((item) => {
      if (customIcons[item.currency]) {
        return {
          ...item,
          iconURL: customIcons[item.currency]
        }
      } else {
        return item
      }
    })

    return newData
  }

  const validateInputs = () => {
    let isValid = true

    if (!fromCurrency) {
      setFromCurrencyError('Required *')
      isValid = false
    } else {
      setFromCurrencyError('')
    }

    if (!toCurrency) {
      setToCurrencyError('Required *')
      isValid = false
    } else {
      setToCurrencyError('')
    }

    if (!inputAmount || isNaN(inputAmount)) {
      setInputError('Required *')
      isValid = false
    } else {
      setInputError('')
    }

    return isValid
  }

  const currencySwap = (e) => {
    e.preventDefault()
    if (!validateInputs()) {
      return
    }

    const fromPrice = currencies.find((currency) => currency.currency === fromCurrency)?.price
    const toPrice = currencies.find((currency) => currency.currency === toCurrency)?.price

    const exchangeRates = toPrice / fromPrice
    const result = (inputAmount * exchangeRates).toFixed(2)

    setOutputAmount(result)
    console.log(exchangeRates)
  }

  const currencyClear = () => {
    setFromCurrency('')
    setToCurrency('')
    setInputAmount('')
    setOutputAmount('')

    setFromCurrencyError(false)
    setToCurrencyError(false)
    setInputError('')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px',
          maxWidth: '600px',
          textAlign: 'center',
          borderRadius: '10px',
          backgroundColor: (theme) => theme.palette.main.background,
          boxShadow: '0 10px 10px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Title */}
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                fontSize: '5rem',
                color: '#FFF7D4',
                marginBottom: '3rem',
                fontWeight: 'fontSupperBold'
              }}
            >
              Fancy Form
            </Typography>
          </Grid>

          {/* Swap currency area */}
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <FormControl
                  error={fromCurrencyError}
                  sx={{
                    width: '160px'
                  }}
                >
                  <InputLabel id="from-currency-label">From Currency</InputLabel>
                  <Select
                    labelStyle={{ color: '#D9EDBF' }}
                    labelId="from-currency-label"
                    id="from-currency-select"
                    value={fromCurrency}
                    label="From Currency"
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {currencies.map((currency, index) => (
                      <MenuItem key={index} value={currency.currency}>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <Avatar src={currency.iconURL} />
                          </Grid>
                          <Grid item>{currency.currency}</Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                  {fromCurrencyError && (
                    <Typography sx={{ textAlign: 'left', fontSize: '0.8rem' }} color="error">
                      {fromCurrencyError}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  error={toCurrencyError}
                  sx={{
                    width: '160px'
                  }}
                >
                  <InputLabel id="to-currency-label">To Currency</InputLabel>
                  <Select
                    labelId="to-currency-label"
                    id="to-currency-select"
                    value={toCurrency}
                    label="To Currency"
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {currencies.map((currency, index) => (
                      <MenuItem key={index} value={currency.currency}>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <Avatar src={currency.iconURL} />
                          </Grid>
                          <Grid item>{currency.currency}</Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                  {toCurrencyError && (
                    <Typography sx={{ textAlign: 'left', fontSize: '0.8rem' }} color="error">
                      {toCurrencyError}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: '160px' }}
                  id="input-amount"
                  label="Amount"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="Type here..."
                  error={Boolean(inputError)}
                  helperText={inputError}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6">→</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField sx={{ width: '160px' }} id="output-amount" value={outputAmount} />
              </Grid>
            </Grid>
          </Grid>

          {/* Button area */}
          <Grid item xs={12} sx={{ marginTop: '3rem' }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6} md={3}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    bgcolor: '#4caf50',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#65B741'
                    }
                  }}
                  onClick={currencySwap}
                >
                  Swap Now
                </Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    bgcolor: '#9B4444',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#D24545'
                    }
                  }}
                  onClick={currencyClear}
                >
                  Clear Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CurrencySwapForm
