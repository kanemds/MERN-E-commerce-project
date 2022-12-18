import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import 'react-slideshow-image/dist/styles.css'
import Image from './Image'
import { styled } from '@mui/material/styles'




function SwipeableTextMobileStepper({ currentCategory }) {


  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = currentCategory.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }


  let bannerColor

  if (currentCategory[0].category === 'Cooking') {
    bannerColor = '#f06292'
  }
  if (currentCategory[0].category === 'Language') {
    bannerColor = '#2196f3'
  }
  if (currentCategory[0].category === 'People Management') {
    bannerColor = '#ff9800'
  }

  const Banner = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: bannerColor
  }))


  return (
    <Box >
      <Banner>
        <Typography variant='h5' sx={{ m: 1 }}>{currentCategory[0].category}</Typography>
      </Banner>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {currentCategory.map((step, index) => (
          <Box key={index}>
            {
              Math.abs(activeStep - index) <= 2 ? (
                <Image step={step} />
              ) : null
            }
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{ mr: 10 }}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{ ml: 10 }}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />


    </Box >
  )
}

export default SwipeableTextMobileStepper