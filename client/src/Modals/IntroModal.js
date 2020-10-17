import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modals.css'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'




function IntroModal(props){

    const [config, setConfig] = useState({
        gameType: [1, '1 Player'],
        mapType: ['roadmap', 'Road Map'],
        roads: [true, true, 'Roads and numbers'],
        cities: ['large', 'Large Cities Only']
    })

    function updateConfig(key, value){
        setConfig({
            ...config,
            [key]: value
        })
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
                    <h1 className='ModalHeader'>Welcome!</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mapConfig'>
                <h3 className='configTitle'>Choose Game Configuration: </h3>
                <div className='configKeyDiv'>
                        <label className='gameTypeLabel'>Participants: </label>
                        <Dropdown className='dropDowns'>
                            <Dropdown.Toggle variant="outline-info" id="mapType-dropdown-basic">
                                { config.gameType[1]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onSelect={() => updateConfig('gameType', [1, '1 Player'])}>1 Player</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('gameType', [2, '2 Players'])}>2 Players</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('gameType', [3, '3 Players'])}>3 Players</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown >
                    </div>
                    <div className='configKeyDiv'>
                        <label className='mapTypeLabel'>Map Type: </label>
                        <Dropdown className='dropDowns'>
                            <Dropdown.Toggle variant="outline-info" id="mapType-dropdown-basic">
                                { config.mapType[1]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onSelect={() => updateConfig('mapType', ['roadmap', 'Road Map'])}>Road Map</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('mapType', ['hybrid', 'Satellite'])}>Satellite</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('mapType', ['terrain', 'Terrain'])}>Terrain</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown >
                    </div>
                    <div className='configKeyDiv'>
                        <label className='raodsLabel'>Roads Display: </label>
                        <Dropdown className='dropDowns'>
                            <Dropdown.Toggle variant="outline-info" id="roads-dropdown-basic">
                                { config.roads[2]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onSelect={() => updateConfig('roads', [true, true, 'Roads And Numbers'])}>Roads And Numbers</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('roads', [true, false, 'Only Roads'])}>Only Roads</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('roads', [false, false, 'No Roads'])}>No Roads</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='configKeyDiv'>
                        <label className='citiesLabel'>Cities: </label>
                        <Dropdown className='dropDowns'>
                            <Dropdown.Toggle variant="outline-info" id="cities-dropdown-basic">
                                { config.cities[1]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onSelect={() => updateConfig('cities', ['large', 'Large Cities Only'])}>Large Cities Only</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('cities', ['mediume', 'Large And Medium Cities'])}>Large And Medium Cities</Dropdown.Item>
                                <Dropdown.Item onSelect={() => updateConfig('cities', ['small', 'All Cities'])}>All Cities</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                    </div>                  
                    <Button className='startGameInLevel' variant='success' onClick={() => props.start_game(config)}>Start!</Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default IntroModal