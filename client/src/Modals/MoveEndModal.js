import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import './Modals.css'


function MoveEndModal(props){

    
    return(
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header id='ModalHeaderContainer'>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.points.length === 1 ?
                    <h3 className='MoveEndModalHeader'>{props.success ? 'Good Job!' : (props.distance < 20 ? 'Almost!' : 'Shity one...')}</h3>
                    : <h3>Nice Round!</h3>
                }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                {props.points.length === 1 ?
                    <>
                        <div><b>{props.distance[0]} Km</b> from the correct point</div>
                        <div><b>{props.points[0]}</b> points gained!</div>
                    </>
                    :
                    <>
                        <div className='playersStats'>
                            {
                                props.points.map((points, index) => {
                                    return <>
                                    <h4>Player {index + 1}</h4>
                                        <div><b>{props.distance[index]} Km</b> from the correct point</div>
                                        <div><b>{points}</b> points gained!</div>
                                        <br></br>
                                    </>
                                })
                            }
                        </div>
                    </>

                }
                <Button className='nextMoveButton' variant='outline-success' onClick={props.nextMove}>Next</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MoveEndModal