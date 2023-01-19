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
import { pink, blue, orange } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function SwipeableTextMobileStepper({ currentCategory }) {


  const navigate = useNavigate()

  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const [recentlyView, setRecentlyView] = useState(JSON.parse(localStorage.getItem('recentlyView')) || null)

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

  let buttonContrast
  let buttonBC
  let buttonHover

  if (currentCategory[0].category === 'Cooking') {
    buttonContrast = pink[50]
    buttonBC = pink[50]
    buttonHover = pink[100]
  }
  if (currentCategory[0].category === 'Language') {
    buttonContrast = blue[50]
    buttonBC = blue[50]
    buttonHover = blue[100]
  }
  if (currentCategory[0].category === 'People Management') {
    buttonContrast = orange[50]
    buttonBC = orange[50]
    buttonHover = orange[100]
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(buttonContrast),
    backgroundColor: buttonBC,
    '&:hover': {
      backgroundColor: buttonHover,
    },
  }))

  const hanldClick = (id, image) => {
    console.log(id, image)
    navigate(`/products/${id}`)
    if (recentlyView == null) {
      localStorage.setItem('recentlyView', JSON.stringify([{ id: id, image: image }]))
    }
    const exist = recentlyView.find(product => product.id === id)

    if (!exist) {
      localStorage.setItem('recentlyView', JSON.stringify([...recentlyView, { id: id, image: image }]))
    }
  }


  return (
    <Box >
      <Banner>
        <Typography variant='h5' sx={{ m: 2 }}>{currentCategory[0].category}</Typography>
      </Banner>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {currentCategory.map((step, index) => (
          < Box key={index} >
            {
              Math.abs(activeStep - index) <= 2 ? (
                <ColorButton
                  sx={{ height: '100%', width: '100%' }}
                  onClick={() => hanldClick(step._id, step.image)}
                >
                  <Image step={step} />
                </ColorButton>

              ) : null
            }
          </Box>
        ))
        }
      </SwipeableViews >
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