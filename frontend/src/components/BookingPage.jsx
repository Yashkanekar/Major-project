import React, { Fragment } from 'react'
import ConfirmBooking from './ConfirmBooking'
import MapPage from './MapPage'

const BookingPage = () => {
  return (
    <Fragment>
        <MapPage/>
        <ConfirmBooking/>
    </Fragment>
  )
}

export default BookingPage