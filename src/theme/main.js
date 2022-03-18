import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
	components: {
		// Название компонента
		MuiButton: {
			// Перезапись дефолтных стилей компонента
			styleOverrides: {
				root: {
					padding: '10px'
				}
			},
			// Условная стилистика в зависимости от props variant (<Button variant="get" />)
			variants: [
				{
					props: { variant: 'get' },
					style: {
						backgroundColor: green[500],
						'&:hover': {
							background: green[700],
						},
					},
				},
			]
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					background: 'rgba(0, 0, 0, .2)',
					padding: '10px 0',
				}
			}
		}
	},
	// Главные стили на всю страницу
	palette: {
		primary: {
			main: green[500],
		},
		secondary: {
			main: purple[500],
		},
	},
})

export default theme