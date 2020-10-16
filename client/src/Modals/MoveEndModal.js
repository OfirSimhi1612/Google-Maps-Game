import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import './Modals.css'


function MoveEndModal(props){


    return(
        <>
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header id='ModalHeaderContainer'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 className='MoveEndModalHeader'>{props.success ? 'Good Job!' : (props.distance < 20 ? 'Almost!' : 'Shity one...')}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div><b>{props.distance} Km</b> from the correct point</div>
                <div><b>{props.points}</b> points gained!</div>
                <Button className='nextMoveButton' variant='outline-success' onClick={props.nextMove}>Next</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MoveEndModal