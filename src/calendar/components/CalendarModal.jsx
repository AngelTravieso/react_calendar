import { addHours, differenceInSeconds } from "date-fns/esm";
import { useMemo, useState } from "react";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';


registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setformSubmitted] = useState(false)

    const [formValues, setFormValues] = useState({
        title: 'Angel',
        notes: 'Travieso',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    // Para colocar clase is-invalid (bootstrap) al formulario
    const titleClass = useMemo(() => {
    
    if(!formSubmitted) return '';

    return (formValues.title.length > 0)
        ? '' // o is-valid
        : 'is-invalid'

    } , [formValues.title, formSubmitted]);


    const onInputChange = ( { target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value 
        });
    }

    // changing = 'start' || 'end'
    const onDateChanged = ( evt, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: evt
        });
    }

    const onCloseModal = () => {
        setIsOpen(false);
    }

    const onSubmit = ( evt ) => {
        evt.preventDefault();

        setformSubmitted(true);

        // validaciones
        const difference = differenceInSeconds( formValues.end, formValues.start );

        console.log({difference});

        // si falta fecha de inicio o fin
        // si la fecha fin es menor a la fecha inicio
        if( isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        // si el la nota (titulo) no es valido
        if( formValues.title.length <= 0) return;

        // TODO

        // cerrar modal
        // remover errores en pantalla

        console.log({formValues});

    }

  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={ 200 }
    >
       <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>
            <div className="form-group mb-2">
                <label htmlFor="start">Fecha y hora inicio</label>
                <DatePicker
                    locale="es"
                    selected={ formValues.start } 
                    onChange={ (event) => onDateChanged(event, 'start') }
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    timeCaption="hora"
                />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="end">Fecha y hora fin</label>
                <DatePicker
                    locale="es"
                    minDate={ formValues.start }
                    selected={ formValues.end } className="form-control"
                    onChange={ (event) => onDateChanged(event, 'end') }
                    dateFormat="Pp"
                    showTimeSelect
                    timeCaption="hora"
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label htmlFor="title">Titulo y notas</label>
                <input
                    type="text" 
                    className={`form-control ${ titleClass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    id="title"
                    value={ formValues.title }
                    onChange={ onInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
