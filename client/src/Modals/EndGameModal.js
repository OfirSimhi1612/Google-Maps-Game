import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


function MoveEndModal(props){

    function getWinner(){

        const maxPoints = Math.max(...props.points)
        const winner = props.points.indexOf(maxPoints)

        return winner + 1
    }

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
                {props.points.length === 1 ? 
                <>
                    <div>You guessed <b>{props.correct}</b> correct locations out of 10,</div>
                    <div>and earned <b>{props.points}</b> points!</div>
                     <div>Good Job!</div>
                </>
                :
                <div>
                    <h3>The winner is Player {getWinner()}! </h3>
                    <br></br>
                    <h4>Good Game!</h4>
                </div>
                }
                
                <Button className='startGameInLevel' variant='outline-success' onClick={props.newGame}>New Game</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MoveEndModal