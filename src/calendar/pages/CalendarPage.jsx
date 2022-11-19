import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar, CalendarEvent } from "../"
import { localizer, getMessagesEs } from '../../helpers';
import { useState } from 'react';


const events = [{
  title: 'Cumpleaños feliz',
  notes: 'Hay que joder en banda',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Angel',
  },
}];


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( evt, start, end, isSelected ) => {
    // console.log({evt, start, end, isSelected});

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style,
    }
  }


  const onDoubleClick = ( evt ) => {
    console.log({doubleClic: evt})
  }

  const onSelect = ( evt ) => {
    console.log({click: evt})
  }

  const onViewChange = ( evt ) => {
    localStorage.setItem('lastView', evt);
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        // vista que se carga por default
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />
      
    </>
  )
}
