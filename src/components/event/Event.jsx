import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import './event.scss'

const Event = ({ id, height, marginTop, title, time, onDeleteEvent }) => {
   const [isButtonVisible, setButtonVisible] = useState(false)
   const eventStyle = {
      height,
      marginTop,
   }

   const toggleButtonVisibility = e => {
      e.stopPropagation()
      setButtonVisible(!isButtonVisible)
   }

   return (
      <div style={eventStyle} className='event' onClick={toggleButtonVisibility}>
         <div className='event__content'>
            <div className='event__title'>{title}</div>
            <div className='event__time'>{time}</div>
         </div>
         {isButtonVisible && (
            <button
               className='delete-event-btn'
               onClick={e => {
                  e.stopPropagation()
                  onDeleteEvent(id)
               }}
            >
               <FontAwesomeIcon icon={faTrash} className='delete-event-btn__icon' />
               Delete
            </button>
         )}
      </div>
   )
}

Event.propTypes = {
   id: PropTypes.string.isRequired,
   height: PropTypes.number.isRequired,
   marginTop: PropTypes.number.isRequired,
   title: PropTypes.string.isRequired,
   time: PropTypes.string.isRequired,
   onDeleteEvent: PropTypes.func.isRequired,
}

export default Event
