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
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle'

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

  // Fix other token icons missing
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
      setFromCurrencyError('From Currency is Required *')
      isValid = false
    } else {
      setFromCurrencyError('')
    }

    if (!toCurrency) {
      setToCurrencyError('To Currency is Required *')
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

  const reverseCurrency = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        padding: '0 10px'
      }}
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={6}
        sx={{
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          textAlign: 'center',
          borderRadius: '10px',
          backgroundColor: (theme) => theme.palette.main.background,
          boxShadow: 'rgba(0, 0, 0, 0.45) 0px 10px 15px;'
        }}
      >
        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            color: '#FFF7D4',
            marginBottom: '3rem',
            fontWeight: 'fontSupperBold'
          }}
        >
          Fancy Form
        </Typography>

        {/* Swap currency area */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#378CA1',
                borderRadius: '10px',
                height: '15vh',
                width: '70vh',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* From Currency Select */}
              <FormControl
                error={fromCurrencyError}
                sx={{
                  width: '80%',
                  ml: '10px',
                  '& label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#fff',
                      borderRadius: '10px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff'
                    }
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#fff'
                  }
                }}
              >
                <InputLabel id="from-currency-label">From Currency</InputLabel>
                <Select
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
            </Box>
          </Grid>

          {/* Button reverseCurrency */}
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: 'flex', justifyContent: 'flex-end', mr: '14%', position: 'relative' }}
          >
            <Box sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translate(0, -50%)' }}>
              <Button
                sx={{
                  color: 'white',
                  borderRadius: '100px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '3.8rem'
                  }
                }}
                onClick={reverseCurrency}
              >
                <SwapVerticalCircleIcon />
              </Button>
            </Box>
          </Grid>

          {/* To Currency Select */}
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#378CA1',
                borderRadius: '10px',
                height: '15vh',
                width: '70vh',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FormControl
                error={toCurrencyError}
                sx={{
                  width: '80%',
                  ml: '10px',
                  '& label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#fff',
                      borderRadius: '10px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff'
                    }
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#fff'
                  }
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
            </Box>
          </Grid>
        </Grid>

        {/* Text Field area */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            marginTop: '2rem'
          }}
        >
          <TextField
            sx={{
              width: '160px',
              height: '40px',
              '& input': { color: '#fff', textAlign: 'center' }
            }}
            id="input-amount"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="Type amount here..."
            error={Boolean(inputError)}
            helperText={inputError}
            variant="standard"
          />
          <DoubleArrowIcon sx={{ alignSelf: 'center', margin: '0 10px' }} />
          <TextField
            sx={{
              width: '160px',
              height: '40px',
              '& input': { color: '#fff', textAlign: 'center' }
            }}
            id="output-amount"
            value={outputAmount}
            s
            variant="standard"
          />
        </Box>

        {/* Button area */}
        <Box sx={{ marginTop: '3rem' }}>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              borderRadius: '10px',
              bgcolor: '#074E6E',
              color: 'white',
              '&:hover': {
                bgcolor: '#FFF7D4',
                color: '#333'
              }
            }}
            onClick={currencySwap}
          >
            Swap Now
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CurrencySwapForm
