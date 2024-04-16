import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontSupperBold: 700,
    fontSupperRegular: 600,
    fontSupperMedium: 500,
    fontSupperLight: 100
  },
  palette: {
    main: {
      default: '#fff',
      background: '#E7F0EF',
      swapBtn: '#86A789',
      clearBtn: '#86A789'
    }
  }
})

export default theme
