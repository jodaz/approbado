const typography = {
  fontFamily: '"Roboto", sans-serif',
  fontSize: 14,
  fontStyle: "normal",
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
};

const typographyBase = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontStyle: typography.fontStyle,
};

const removeButtonStyles = {
  float: 'none',
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '2rem',
  marginRight: '1rem',
};

const palette = {
  primary: {
    main: '#07021A',  // Negro primario
    light: '#FFFFFF', // Blanco
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
  palette: { ...palette },
  typography: {
    ...typographyBase
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: 0
      }
    },
    RaReferenceField: {
      link: {
        color: `${palette.primary.main} !important`,
        fontWeight: '700 !important',
        letterSpacing: '0.5px'
      }
    },
    RaSidebar: {
      drawerPaper: {
        backgroundColor: '#024B78 !important'
      }
    },
    MuiTypography: {
      root: {
        color: palette.primary.dark
      }
    },
    RaMenuItemLink: {
      root: {
        fontWeight: '400',
        fontSize: '14px',
      },
      active: {
        color: 'yellow',
      },
    },
    RaLabeled: {
      value: {
        backgroundColor: palette.primary.light,
        borderRadius: '5px',
        borderColor: palette.secondary.main,
        borderStyle: 'solid',
        borderWidth: '3px'
      }
    },
    RaToolbar: {
      toolbar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: "flex-end"
      }
    },
    RaSaveButton: {
      button: {
        borderRadius: '0',
        textTransform: 'capitalize'
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none',
      },
      root: {
        border: '1px solid #e0e0e3',
        backgroundClip: 'padding-box',
        borderRadius: '0 !important'
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0
      },
      outlined: {
        borderWidth: '1px !important'
      },
      contained: {
        backgroundColor: '#fff',
        color: '#4f3cc9',
        boxShadow: 'none',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        color: palette.primary.dark,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: '0'
      }
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
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0'
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
    MuiSnackbarContent: {
      root: {
        border: 'none',
      },
    },
    RaLayout: {
      appFrame: {
        marginTop: '0 !important',
      },
      content: {
        marginTop: '48px'
      }
    },
    RaAutocompleteSuggestionList: {
      suggestionsPaper: {
        marginTop: '0 !important'
      }
    },
    PrivateTabIndicator: {
      colorPrimary: {
        backgroundColor: palette.error.main
      }
    },
    RaList: {
      content: {
        backgroundColor: `${palette.secondary.light} !important`
      }
    },
    MuiTablePagination: {
      select: {
        backgroundColor: `${palette.secondary.light} !important`
      }
    },
    MuiTabs: {
      root: {
        backgroundColor: palette.primary.main,
        color: palette.primary.light
      }
    },
    RaDatagrid: {
      headerCell: {
        borderRadius: '0 !important',
        backgroundColor: palette.secondary.light,
        fontWeight: 700
      }
    },
    RaSkipToContentButton: {
      skipToContentButton: {
        display: 'none !important'
      }
    },
    MuiToolbar: {
      root: {
        backgroundColor: 'inherit'
      }
    },
    RaImageInput: {
      removeButton: removeButtonStyles
    },
    RaFileInput: {
      dropZone: {
        padding: '0 2rem',
        background: 'inherit !important'
      },
      removeButton: removeButtonStyles
    },
    previews: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  props: {
    MuiButtonBase: {
      // disable ripple for perf reasons
      disableRipple: true,
    },
  },
};

export default theme;
