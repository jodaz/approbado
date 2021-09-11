import { fade } from '@material-ui/core/styles/colorManipulator';

// const typography = {
//   fontFamily: '"Roboto", sans-serif',
//   fontSize: 14,
//   fontStyle: "normal",
//   fontWeightLight: 400,
//   fontWeightRegular: 500,
//   fontWeightMedium: 600,
//   fontWeightBold: 700,
// };

// const typographyBase = {
//   fontFamily: typography.fontFamily,
//   fontSize: typography.fontSize,
//   fontStyle: typography.fontStyle,
// };

// const removeButtonStyles = {
//   float: 'none',
//   display: 'flex',
//   justifyContent: 'center',
//   marginLeft: '2rem',
//   marginRight: '1rem',
// };

const palette = {
  primary: {
    main: '#07021A',  // Negro primario
    light: '#B7B7B7', // Plomo cuaternario
    dark: '#011C2C',  // Negro
  },
  secondary: {
    main: '#FFE835',   // Amarillo segundario
    light: '#E8E8E8',
    dark: '#283436', // Gray
  },
  error: {
    main: '#E02340',  // Rojo
  },
  background: {
    default: '#FFFFFF'
  },
  info: {
    main: '#206FCA' // Azul
  }
};

const theme = {
  palette: palette,
  shape: {
    borderRadius: 10,
  },
  overrides: {
    RaLayout: {
        content: {
            marginTop: '4em'
        },
        appFrame: {
            marginTop: '0 !important'
        }
    },
    RaMenuItemLink: {
        root: {
            color: palette.primary.light
        },
        active: {
            borderLeft: `5px solid ${palette.secondary.main}`,
            backgroundColor: fade(palette.secondary.main, 0.16),
            color: palette.secondary.main,
            borderRadius: '6px'
        },
        icon: {
            color: palette.primary.light
        }
    },
    MuiDrawer: {
      root: {
        backgroundColor: palette.primary.main
      }
    },
    MuiPaper: {
        elevation1: {
            boxShadow: 'none',
        },
        root: {
            border: '1px solid #e0e0e3',
            backgroundClip: 'padding-box',
        },
    },
    MuiButton: {
        contained: {
            backgroundColor: '#fff',
            color: '#4f3cc9',
            boxShadow: 'none',
        },
    },
    MuiInputBase: {
        input: {
          borderRadius: 4,
          backgroundColor: palette.primary.light,
          padding: '10px 12px !important',
          fontSize: 16,
          border: '1px solid #ced4da',
          '&:focus': {
            borderColor: palette.primary.main
          }
        }
    },
    MuiAppBar: {
        colorSecondary: {
            color: '#808080',
            backgroundColor: '#fff',
        },
    },
    MuiLinearProgress: {
        colorPrimary: {
            backgroundColor: '#f5f5f5',
        },
        barColorPrimary: {
            backgroundColor: '#d7d7d7',
        },
    },
    MuiFilledInput: {
        root: {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            '&$disabled': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
    },
    RaToolbar: {
        toolbar: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            justifyContent: "flex-end"
        }
    },
    MuiSnackbarContent: {
        root: {
            border: 'none',
        },
    },
  },
  props: {
    MuiButtonBase: {
        // disable ripple for perf reasons
        disableRipple: true,
    },
  },
}

export default theme;
