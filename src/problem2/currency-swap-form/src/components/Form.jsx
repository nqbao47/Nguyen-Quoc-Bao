import { useState, useEffect } from 'react'
import { FormControl, Typography, InputLabel, TextField, MenuItem, Select, Button, Grid, Box } from '@mui/material'
import { fetchCurrencies } from '../apis/index'

function CurrencySwapForm() {
  const [currencies, setCurrencies] = useState([])

  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCurrencies()
      setCurrencies(data)
    }
    fetchData()
  }, [])

  const currencySwap = (e) => {
    console.log('currencySwap')

    e.preventDefault()
    const fromPrice = currencies.find((currency) => currency.currency === fromCurrency)?.price

    const toPrice = currencies.find((currency) => currency.currency === toCurrency)?.price

    if (!fromPrice || !toPrice) {
      alert('Please select option before!')
    }

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
          {/* Main box */}
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <FormControl
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
                        {currency.currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
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
                        {currency.currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {/* Textfield box */}
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: '160px' }}
                  id="input-amount"
                  label="Amount to send"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="Type here..."
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
          {/* Button box */}
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
