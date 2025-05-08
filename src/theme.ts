import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

// Gradient theme configuration
const gradients = {
  // Main gradients
  blue: {
    light: 'linear(to-r, blue.50, blue.100)',
    medium: 'linear(to-r, blue.100, blue.200)',
    strong: 'linear(to-r, blue.200, blue.300)',
    accent: 'linear(to-r, blue.400, blue.500)',
  },
  gray: {
    light: 'linear(to-r, gray.50, gray.100)',
    medium: 'linear(to-r, gray.100, gray.200)',
    strong: 'linear(to-r, gray.200, gray.300)',
  },
  // Bank-specific gradients (subtle versions)
  anz: {
    light: 'linear(to-r, #E6F0FA, #CCE1F5)',  // ANZ blue (lighter)
    medium: 'linear(to-r, #CCE1F5, #99C3EB)', // ANZ blue (medium)
  },
  asb: {
    light: 'linear(to-r, #FFF7E6, #FFEFC0)',  // ASB gold/yellow (lighter)
    medium: 'linear(to-r, #FFEFC0, #FFE080)', // ASB gold/yellow (medium)
  },
  bnz: {
    light: 'linear(to-r, #E6F0FA, #CCE1F5)',  // BNZ blue (lighter)
    medium: 'linear(to-r, #CCE1F5, #99C3EB)', // BNZ blue (medium)
  },
  westpac: {
    light: 'linear(to-r, #FAEAED, #F5D5DB)',  // Westpac red (lighter)
    medium: 'linear(to-r, #F5D5DB, #EBB0BC)', // Westpac red (medium)
  },
  // Semantic gradients
  success: {
    light: 'linear(to-r, green.50, green.100)',
    medium: 'linear(to-r, green.100, green.200)',
  },
  warning: {
    light: 'linear(to-r, orange.50, orange.100)',
    medium: 'linear(to-r, orange.100, orange.200)',
  },
  info: {
    light: 'linear(to-r, cyan.50, cyan.100)',
    medium: 'linear(to-r, cyan.100, cyan.200)',
  },
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  semanticTokens: {
    gradients,
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          boxShadow: 'sm',
          borderRadius: 'lg',
          transition: 'all 0.2s ease-in-out',
          bgGradient: gradients.gray.light,
          _hover: {
            boxShadow: 'md',
          },
        },
      },
      variants: {
        gradient: {
          container: {
            bgGradient: gradients.blue.light,
          }
        },
        elevated: {
          container: {
            boxShadow: 'md',
            bgGradient: gradients.gray.light,
          }
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
    },
    Stat: {
      baseStyle: {
        container: {
          px: 2,
          py: 2,
          bgGradient: gradients.blue.light,
          borderRadius: 'md',
        },
        label: {
          fontSize: 'sm',
          fontWeight: 'medium',
          color: 'gray.600',
        },
        number: {
          fontSize: '2xl',
          fontWeight: 'bold',
          color: 'gray.800',
        },
        helpText: {
          fontSize: 'xs',
          color: 'gray.500',
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: 'blue.600',
              fontWeight: 'semibold',
              bgGradient: gradients.blue.light,
            },
          },
        },
      },
    },
    Slider: {
      baseStyle: {
        track: {
          bg: 'gray.200',
        },
        filledTrack: {
          bgGradient: gradients.blue.accent,
        },
        thumb: {
          bg: 'white',
          borderColor: 'blue.500',
          _hover: {
            boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.3)',
          },
        },
      },
    },
  },
})

export default theme
export { gradients }
