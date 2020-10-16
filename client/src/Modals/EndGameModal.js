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
                <h1 className='ModalHeader'>Game Over!</h1>
            </Modal.Header>
            <Modal.Body>
                <div>You guessed {props.correct} correct point out of 10 (less than 6 km from the point),</div>
                <div>and earned {props.points} points!</div>
                {/* <SuccessChart></SuccessChart> */}
                <div>Good Job!</div>
                <Button variant='outline-success' onClick={props.newGame}>New Game</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MoveEndModal