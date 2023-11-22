import React from 'react'
import {HousingRequirementsComponent} from '../components'
import {ModalProvider} from '../utils/modalContext'

const HousingRequirement = () => {
  return (
    <ModalProvider>
        <HousingRequirementsComponent/>
    </ModalProvider>
  )
}

export default HousingRequirement