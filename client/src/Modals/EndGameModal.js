import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


function MoveEndModal(props){


    return(
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='ModalHeaderContainer'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className='ModalHeader'>Game Over!</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>You guessed <b>{props.correct}</b> correct locations out of 10,</div>
                <div>and earned <b>{props.points}</b> points!</div>
                {/* <SuccessChart></SuccessChart> */}
                <div>Good Job!</div>
                <Button className='startGameInLevel' variant='outline-success' onClick={props.newGame}>New Game</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MoveEndModal