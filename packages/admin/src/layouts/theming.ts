const typography = {
  fontFamily: '"Montserrat", sans-serif',
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
    main: '#024B78',  // Verde oscuro
    light: '#FFF5F6', // Blanco
    dark: '#011C2C',  // Negro
  },
  secondary: {
    main: '#0296B0',   // Verde
    light: '#E8E8E8',
    dark: '#283436', // Gray
  },
  error: {
    main: '#E1303A',  // Rojo
  },
  background: {
    default: '#fff5f6'
  },
  info: {
    main: '#0296B0'
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
        fontWeight: '700',
        fontSize: '14px',
      },
      active: {
        color: '#FFF5F6 !important',
        backgroundColor: 'rgba(225,48,58,0.5) !important',
      },
    },
    MuiListItemIcon: {
      root: {
        color: '#FFF5F6 !important'
      }
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
        background: '#fff'
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
    RaSimpleFormIterator: {
      index: {
        display: 'none'
      },
      form: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box'
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
    },
  },
  props: {
    MuiButtonBase: {
      // disable ripple for perf reasons
      disableRipple: true,
    },
  },
};

export default theme;
