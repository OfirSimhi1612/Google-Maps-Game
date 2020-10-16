import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modals.css'
import Slider from 'react-slick';
import Levels from '../Configs/Levels'
import Button from 'react-bootstrap/Button'
import { StreetViewService } from '@react-google-maps/api';




function IntroModal(props){

    const [config, setConfig] = useState({
        mapType: 'Map',
        borders: true,
        roads: true,
        roadsNumbers: true,
        streets: true,
        cities: 'large'
    })

    
    const SliderSettings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
    };



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
                    <h1 className='ModalHeader'>Welcome!</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='LevelsSlider'>
                    <Slider {...SliderSettings} className='levelsSlider'>
                        {Levels.map(level => {
                            return (
                                <div className='levelSlide'>
                                    <h2>Level {level.level}</h2>
                                    <p>{level.discription}</p>
                                    <Button className='startGameInLevel' variant='success' onClick={() => props.start_game(level.level)}>Start!</Button>
                                </div>
                            );
                        })
                        }
                    </Slider>
                    {/* <div className='mapConfig'>
                        <div className='mapTypeConfig'>
                            <select className='mapTypeSelect'>
                                <option selected value='roadmap'>Map (without terrain)</option>
                                <option value='terrain'>Terrain</option>
                                <option value='hybrid'>Hybrid</option>
                                <option value='sattelite'>Sattelite</option>
                            </select>
                        </div> */}
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="outlined-success" id="mapType-dropdown-basic">
                                
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    {/* </div>
                    <div className='citiesConfig'>

                    </div>
                    <Button className='startGameInLevel' variant='success' onClick={() => props.start_game(1)}>Start!</Button> */}
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default IntroModal