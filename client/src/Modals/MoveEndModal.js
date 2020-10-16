import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


function MoveEndModal(props){


    return(
        <>
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='ModalHeaderContainer'>
                <h3 className='ModalHeader'>{props.success ? 'Good Job!' : (props.distance < 20 ? 'Almost!' : 'Shity one...')}</h3>
            </Modal.Header>
            <Modal.Body>
                <div>You guessed {props.distance} Km from the correct point,</div>
                <div>And earned {props.points} points!</div>
                <Button variant='outline-success' onClick={props.nextMove}>Next</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MoveEndModal