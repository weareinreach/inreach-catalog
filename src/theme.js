import {createMuiTheme} from '@material-ui/core/styles';

export const breakpoints = {
	xs: 360,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1500
};

export const searchInput = (theme) => ({
	border: 'none',
	boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
	padding: '1.2rem',
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.fontSize,
	width: '100%',
	marginBottom: theme.spacing(3),
	height: '3.4rem',
	color: theme.palette.common.lightBlack,
	backgroundColor: theme.palette.common.white,
	borderRadius: '0.1px'
});

export const selectInput = (theme) => ({
	border: 'none',
	padding: '1.2rem',
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.fontSize,
	width: '100%',
	height: '3.4rem',
	color: theme.palette.common.lightBlack,
	backgroundColor: theme.palette.common.white,
	borderRadius: '0.1px'
});

export const dropShadow = (theme) => ({
	boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
});

export const searchInputMobile = (theme) => ({
	padding: theme.spacing(2),
	height: theme.spacing(6)
});

export const bodyLink = (theme) => ({
	color: theme.palette.secondary[500]
});

export const listLink = (theme) => ({
	'& + &:before': {
		content: '", "'
	}
});

export const mobilePadding = (theme) => ({
	paddingLeft: '20px',
	paddingRight: '20px'
});

export const boldFont = (theme) => ({
	fontWeight: '600'
});

export const italicFont = (theme) => ({
	fontStyle: 'italic'
});

export const dividerSpacing = (theme) => ({
	marginBottom: theme.spacing(4)
});

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
const catalogTheme = createMuiTheme({
	maxColumnWidth: '1300px',
	direction: 'ltr',
	palette: {
		common: {
			black: '#000',
			blue: '#6988c1',
			white: '#fff',
			transparent: 'rgba(0, 0, 0, 0)',
			fullBlack: 'rgba(0, 0, 0, 1)',
			darkBlack: 'rgba(29, 31, 35, 1)',
			lightBlack: 'rgba(29, 31, 35, 1)',
			minBlack: 'rgba(0, 0, 0, 0.26)',
			faintBlack: 'rgba(0, 0, 0, 0.12)',
			fullWhite: 'rgba(255, 255, 255, 1)',
			darkWhite: 'rgba(255, 255, 255, 0.87)',
			lightWhite: 'rgba(255, 255, 255, 0.54)',
			darkGrey: '#e9e9e9',
			lightGrey: '#f7f7f7',
			separator: '#d3dcec',
			gold: '#ffd04a',
			orange: '#F36D52',
			yellow: '#FFD048',
			green: '#15B58A',
			cyan: '#23BCD7',
			success: '#00C419',
			error: '#E1001C'
		},
		type: 'light',
		primary: {
			50: '#FCDCDB',
			100: '#FCDCDB',
			200: '#CC4747',
			300: '#CC4747',
			400: '#CC4747',
			500: '#CC4747',
			600: '#CC4747',
			700: '#CC4747',
			800: '#CC4747',
			900: '#991F1F',
			A100: '#CC4747',
			A200: '#CC4747',
			A400: '#CC4747',
			A700: '#CC4747',
			contrastDefaultColor: 'light'
		},
		secondary: {
			50: '#E3E9F3',
			100: '#E3E9F3',
			200: '#5073B3',
			300: '#5073B3',
			400: '#5073B3',
			500: '#5073B3',
			600: '#5073B3',
			700: '#5073B3',
			800: '#5073B3',
			900: '#2D4A80',
			A100: '#5073B3',
			A200: '#5073B3',
			A400: '#5073B3',
			A700: '#5073B3',
			contrastDefaultColor: 'light'
		},
		error: {
			50: '#ffebee',
			100: '#ffcdd2',
			200: '#ef9a9a',
			300: '#e57373',
			400: '#ef5350',
			500: '#f44336',
			600: '#e53935',
			700: '#d32f2f',
			800: '#c62828',
			900: '#b71c1c',
			A100: '#ff8a80',
			A200: '#ff5252',
			A400: '#ff1744',
			A700: '#d50000',
			contrastDefaultColor: 'light'
		},
		grey: {
			50: '#fafafa',
			100: '#f5f5f5',
			200: '#eeeeee',
			300: '#e0e0e0',
			400: '#bdbdbd',
			500: '#9e9e9e',
			600: '#757575',
			700: '#616161',
			800: '#424242',
			900: '#212121',
			A100: '#d5d5d5',
			A200: '#aaaaaa',
			A400: '#303030',
			A700: '#616161',
			contrastDefaultColor: 'dark'
		},
		shades: {
			dark: {
				text: {
					primary: 'rgba(255, 255, 255, 1)',
					secondary: 'rgba(255, 255, 255, 0.7)',
					disabled: 'rgba(255, 255, 255, 0.5)',
					hint: 'rgba(255, 255, 255, 0.5)',
					icon: 'rgba(255, 255, 255, 0.5)',
					divider: 'rgba(255, 255, 255, 0.12)',
					lightDivider: 'rgba(255, 255, 255, 0.075)'
				},
				input: {
					bottomLine: 'rgba(255, 255, 255, 0.7)',
					helperText: 'rgba(255, 255, 255, 0.7)',
					labelText: 'rgba(255, 255, 255, 0.7)',
					inputText: 'rgba(255, 255, 255, 1)',
					disabled: 'rgba(255, 255, 255, 0.5)'
				},
				action: {
					active: 'rgba(255, 255, 255, 1)',
					disabled: 'rgba(255, 255, 255, 0.3)'
				},
				background: {
					default: '#303030',
					paper: '#424242',
					appBar: '#212121',
					contentFrame: '#212121',
					status: '#000'
				}
			},
			light: {
				text: {
					primary: 'rgba(0, 0, 0, 0.87)',
					secondary: 'rgba(0, 0, 0, 0.54)',
					disabled: 'rgba(0, 0, 0, 0.38)',
					hint: 'rgba(0, 0, 0, 0.38)',
					icon: 'rgba(0, 0, 0, 0.38)',
					divider: 'rgba(0, 0, 0, 0.12)',
					lightDivider: 'rgba(0, 0, 0, 0.075)'
				},
				input: {
					bottomLine: 'rgba(0, 0, 0, 0.42)',
					helperText: 'rgba(0, 0, 0, 0.54)',
					labelText: 'rgba(0, 0, 0, 0.54)',
					inputText: 'rgba(0, 0, 0, 0.87)',
					disabled: 'rgba(0, 0, 0, 0.42)'
				},
				action: {
					active: 'rgba(0, 0, 0, 0.54)',
					disabled: 'rgba(0, 0, 0, 0.26)'
				},
				background: {
					default: '#fafafa',
					paper: '#fff',
					appBar: '#fff',
					contentFrame: '#eeeeee'
				}
			}
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
			icon: 'rgba(0, 0, 0, 0.38)',
			divider: 'rgba(0, 0, 0, 0.12)',
			lightDivider: 'rgba(0, 0, 0, 0.075)'
		},
		input: {
			bottomLine: 'rgba(0, 0, 0, 0.42)',
			helperText: 'rgba(0, 0, 0, 0.54)',
			labelText: 'rgba(0, 0, 0, 0.54)',
			inputText: 'rgba(0, 0, 0, 0.87)',
			disabled: 'rgba(0, 0, 0, 0.42)'
		},
		action: {
			active: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.26)'
		},
		background: {
			default: '#fafafa',
			paper: '#fff',
			appBar: 'rgba(0, 0, 0, 0.87)',
			contentFrame: '#eeeeee'
		}
	},
	typography: {
		fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
		fontSize: 16,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 600,
		fontWeightHeavy: 700,
		h1: {
			fontSize: 32,
			fontWeight: 700,
			fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
			lineHeight: 1.2,
			color: 'rgba(29, 31, 35, 1)'
		},
		h2: {
			fontSize: 24,
			fontWeight: 600,
			fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
			lineHeight: 1.2,
			color: 'rgba(29, 31, 35, 1)'
		},
		h3: {
			fontSize: 22,
			fontWeight: 700,
			fontFamily: '"Open Sans", sans-serif',
			lineHeight: '40px',
			color: 'rgba(29, 31, 35, 1)'
		},
		h4: {
			fontSize: 18,
			fontWeight: 500,
			fontFamily: '"Open Sans", sans-serif',
			lineHeight: 'inherit',
			color: 'rgba(29, 31, 35, 1)'
		},
		h5: {
			fontSize: 16,
			fontWeight: 700,
			fontFamily: '"Open Sans", sans-serif',
			letterSpacing: '-.02em',
			lineHeight: 1.35,
			color: 'rgba(29, 31, 35, 1)'
		},
		h6: {
			fontSize: 12,
			fontWeight: 600,
			fontFamily: '"Open Sans", sans-serif',
			letterSpacing: '-.04em',
			lineHeight: 1,
			color: 'rgba(29, 31, 35, 1)',
			textTransform: 'uppercase'
		},
		subtitle2: {
			fontSize: 18,
			fontWeight: 600,
			fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
			lineHeight: 1.2,
			color: 'rgba(29, 31, 35, 1)'
		},
		body1: {
			fontSize: 14,
			fontWeight: 400,
			fontFamily: '"Open Sans", sans-serif',
			lineHeight: '20px',
			color: 'rgba(29, 31, 35, 1)'
		},
		body2: {
			fontSize: 16,
			fontWeight: 400,
			fontFamily: '"Open Sans", sans-serif',
			lineHeight: '20px',
			color: 'rgba(29, 31, 35, 1)'
		},
		caption: {
			fontSize: 14,
			fontWeight: 400,
			fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
			lineHeight: '20px',
			color: 'rgba(0, 0, 0, 0.54)'
		},
		button: {
			fontSize: 16,
			textTransform: 'uppercase',
			fontWeight: 700,
			fontFamily: '"Open Sans", sans-serif',
			letterSpacing: '1px'
		}
	},
	mixins: {
		toolbar: {
			minHeight: 56,
			'@media (min-width:0px) and (orientation: landscape)': {
				minHeight: 48
			},
			'@media (min-width:600px)': {
				minHeight: 64
			}
		}
	},
	breakpoints: {
		keys: Object.keys(breakpoints),
		values: breakpoints
	},
	shadows: [
		'none',
		'0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
		'0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
		'0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
		'0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		'0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
		'0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
		'0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
		'0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
		'0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
		'0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
		'0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)',
		'0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
		'0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)',
		'0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)',
		'0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
		'0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
		'0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
		'0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
		'0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)',
		'0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
		'0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)',
		'0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)',
		'0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)',
		'0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)'
	],
	spacing: 8,
	transitions: {
		easing: {
			easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
			easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
			easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
			sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
		},
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			standard: 300,
			complex: 375,
			enteringScreen: 225,
			leavingScreen: 195
		}
	},
	zIndex: {
		mobileStepper: 900,
		menu: 1000,
		appBar: 1100,
		drawerOverlay: 1200,
		navDrawer: 1300,
		dialogOverlay: 1400,
		dialog: 1500,
		layer: 2000,
		popover: 2100,
		snackbar: 2900,
		tooltip: 3000
	},
	custom: {
		inputLabel: {
			fontSize: 17,
			fontWeight: 700,
			fontFamily: '"Open Sans", sans-serif',
			letterSpacing: '-.02em',
			'& p': {
				fontSize: 12,
				fontWeight: 600,
				color: '#000'
			},
			'& span': {
				height: '20px',
				fontSize: '20px'
			}
		},
		inputText: {
			fontSize: 13,
			fontWeight: 400,
			fontFamily: '"Open Sans", sans-serif',
			color: 'rgba(0, 0, 0, 0.90)'
		}
	},
	overrides: {
		MuiBottomNavigation: {
			root: {
				height: 'auto'
			}
		},
		MuiInput: {
			underline: {
				'&:before': {
					height: '0.8px'
				},
				'&:after': {
					backgroundColor: '#5073B3'
				}
			}
		},
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: '#fff',
				color: 'rgba(0, 0, 0, 0.87)'
			}
		},
		MuiPaper: {
			elevation4: {
				boxShadow: '0px 1px 0px 0px rgba(0, 0, 0, 0.2)'
			}
		},
		MuiTextarea: {
			root: {
				width: '100%',
				marginTop: '0px'
			}
		},
		MuiFormLabel: {
			root: {
				'&$focused': {
					color: '#5073B3'
				}
			}
		},
		MuiButton: {
			root: {
				'&:hover': {
					backgroundColor: 'transparent'
				}
			}
		},
		MuiIconButton: {
			root: {
				'&:hover': {
					backgroundColor: 'transparent'
				}
			}
		}
	}
});

export default catalogTheme;
