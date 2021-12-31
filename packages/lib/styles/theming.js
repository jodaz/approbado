import { fade } from '@material-ui/core/styles/colorManipulator';

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
        default: '#FFFFFF',
        dark: '#F9F9F9'
    },
    info: {
        main: '#2280ED', // Azul primario,
        light: '#6D6D6D', // Plomo secundario
    }
};

const theme = {
    palette: palette,
    typography: {
        fontFamily: ['"Noto Sans Display"', 'sans-serif'].join(','),
    },
    shape: {
        borderRadius: 10,
    },
    overrides: {
        RaLayout: {
            content: {
                marginTop: '4em',
                padding: '0 3em !important'
            },
            appFrame: {
                marginTop: '0 !important'
            }
        },
        RaTopToolbar: {
            root: {
                alignItems: 'center',
                justifyContent: 'space-between'
            },
        },
        RaButton: {
            button: {
                borderRadius: '6px',
                padding: '0.5em 1em',
                textTransform: 'none',
                fontSize: '1em',
                "&[aria-label=Create]": {
                    backgroundColor: palette.secondary.main,
                }
            }
        },
        MuiDrawer: {
            root: {
                backgroundColor: palette.primary.main
            }
        },
        MuiMenu: {
            paper: {
                borderRadius: '6px !important',
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
            rounded: {
                borderRadius: '3px !important'
            }
        },
        MuiButton: {
            contained: {
                backgroundColor: '#fff',
                color: '#4f3cc9',
                boxShadow: 'none',
            },
        },
        MuiInputBase: {
            root: {
                border: `1px solid ${palette.primary.light}`,
                borderRadius: 6,
                backgroundColor: palette.background.default,
                padding: '0 !important',
                fontSize: 16,
                borderRadius: '5px',
                transition: "none",
                marginBottom: '0.3rem',
                boxShadow: 'none',
                '&.Mui-focused': {
                    borderRadius: 6,
                    color: `${palette.primary.main}`,
                    border: `1px solid ${palette.info.main}`,
                    boxShadow: `0px 0px 1px 1px ${fade(palette.info.main, 0.7)}`
                }
            },
            input: {
                backgroundColor: fade('#fff', 0.8),
                padding: '0.7rem !important',
                borderRadius: 6
            }
        },
        MuiInputLabel: {
            animated: {
                transition: 'none'
            }
        },
        MuiAppBar: {
            root: {
                boxShadow: `0px 1px 5px ${palette.primary.light} !important`,
            },
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
        MuiList: {
            root: {
                padding: '0 !important'
            }
        },
        MuiFilledInput: {
            root: {
                transition: "none !important",
                borderRadius: '5px !important',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
            },
            underline: {
                '&::before': {
                    content: 'none'
                },
                '&::after': {
                    content: 'none'
                }
            }
        },
        MuiInput: {
            underline: {
                '&::before': {
                    content: 'none'
                },
                '&::after': {
                    content: 'none'
                }
            }
        },
        MuiFormHelperText: {
            contained: {
                marginLeft: '7px'
            }
        },
        RaSaveButton: {
            button: {
                backgroundColor: palette.secondary.main,
                color: palette.primary.main,
                borderRadius: '6px',
                textTransform: 'none',
                fontSize: '1em',
                padding: '0.5em 2em'
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
        MuiSnackbarContent: {
            root: {
                border: 'none',
            },
        },
        RaSidebar: {
            root: {
                height: 'inherit'
            },
            fixed: {
                width: 'inherit',
                height: 'inherit'
            }
        },
        PrivateTabIndicator: {
            colorPrimary: {
                backgroundColor: palette.info.main
            }
        },
        MuiFormLabel: {
            root: {
                color: palette.primary.main
            }
        },
        MuiInputAdornment: {
            root: {
                color: '#ced4da',
                marginLeft: '8px !important'
            }
        },
        MuiDialogTitle: {
            root: {
                padding: '0 !important'
            }
        },
        MuiDialogContent: {
            root: {
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 2rem !important',
                justifyContent: 'space-around',
                alignItems: 'center'
            }
        },
        MuiDialog: {
            paper: {
                borderRadius: '6px !important'
            }
        },
        MuiTypography: {
            root: {
                '&::selection': {
                    backgroundColor: palette.secondary.main,
                    color: palette.primary.main
                }
            }
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: '8px',
                backgroundColor: palette.primary.dark,
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '20px'
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                color: `${palette.info.main} !important`
            }
        }
    },
    props: {
        MuiButtonBase: {
            // disable ripple for perf reasons
            disableRipple: true
        },
    },
}

export default theme;
