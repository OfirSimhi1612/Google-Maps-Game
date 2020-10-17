import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import './App.css';
import Map from './Maps/map'
import IntroModal from './Modals/IntroModal'
import { getCities, getRandomCity, getAbsuluteDistance, getHintCordinates } from './Game/GameManager'
import MoveEndModal from './Modals/MoveEndModal';
import EndGameModal from './Modals/EndGameModal'




function App() {

  const [modalsControl, setModalsControl] = useState({Intro: false, MoveEnd: false})
  const [gameSettings, setGameSettings] = useState({
      config: {
        mapType: ['roadmap', 'Road Map'],
        roads: [true, true, 'Roads and numbers'],
        cities: ['large', 'Large Cities Only']
      }
  })
  const [mapState, setMapState] = useState({zoom: 8})
  const [cities, setCities] = useState({ all: [], missing: []})
  const [gameMoves, setGameMoves] = useState({movesStatistics: []})

  
  useEffect(() => {
    setTimeout(() => setModalsControl({
      ...modalsControl,
      Intro: true
    })
  , 1000)
  }, [])


  function startGame(config){
    setGameSettings({
      config: {
        ...config
      },
      started: true,
    })

    setModalsControl({
      ...modalsControl,
      Intro: false
    })

    const citiesByLevel = getCities(config.cities[0])
    const missingCities = [];

    for(let i=0; i < 10; i++){
      const randomCity = getRandomCity(citiesByLevel)
      missingCities.push(randomCity)
    }

    setCities({
      missing: missingCities,
      all: citiesByLevel
    })

    setGameMoves({
      move: 1,
      points: 0,
      movesStatistics: []
    })

    setMapState({})
  }

  function endGame(){
    setModalsControl({...modalsControl, EndGame: false,  Intro: true})
    setGameSettings({
      config: {
        mapType: ['roadmap', 'Road Map'],
        roads: [true, true, 'Roads and numbers'],
        cities: ['large', 'Large Cities Only']
      }
    })
    setCities({})
    setMapState({})
  }

  function handleMove(event){
    setMapState({
      marker: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      missingCity: {
        lat: gameSettings.started ? cities.missing[gameMoves.move - 1].Y : null,
        lng: gameSettings.started ? cities.missing[gameMoves.move - 1].X : null
      },
      zoom: 9
    })

    if(gameSettings.started){

      const distance = getAbsuluteDistance(event.latLng.lat(), event.latLng.lng(), cities.missing[gameMoves.move - 1].Y, cities.missing[gameMoves.move - 1].X )

      setGameMoves({
        ...gameMoves,
        movesStatistics:[ 
          ...gameMoves.movesStatistics,
         {
            success: distance < 6 ? true : false,
            distance: distance.toFixed(2),
            points: distance > 6 ? parseInt(100/distance) : 100
         }
        ],
        points: gameMoves.points + (distance > 6 ? parseInt(100/distance) : 100)
      })
      
      if(gameMoves.move < 10){
        setTimeout(() => setModalsControl({
          ...modalsControl,
          MoveEnd: true
        }) ,1500) 
      } else {
        setModalsControl({
          ...modalsControl,
          EndGame: true
        })
      }
    }
    
  }

  function nextMove(){
    setGameMoves({
      ...gameMoves,
      move: gameMoves.move + 1
    })

    setModalsControl({
      ...modalsControl,
      MoveEnd: false
    })

    setMapState({})
  }

  function getHint(){

    const hintCordenates = getHintCordinates(cities.missing[gameMoves.move - 1].Y, cities.missing[gameMoves.move - 1].X)
    
    setMapState({
      ...mapState,
      hint: hintCordenates,
      zoom: 9
    })

    setTimeout(() => {
      setMapState({
      })
    }, 5000)
  }

  return (
    <>
      <IntroModal 
        show={modalsControl.Intro} start_game={startGame} 
        onHide={() => setModalsControl({...modalsControl, Intro: false})}
      />
      {gameMoves.movesStatistics.length === gameMoves.move &&
        <MoveEndModal 
        show={modalsControl.MoveEnd} nextMove={nextMove}
        onHide={nextMove}
        success={gameMoves.movesStatistics[gameMoves.move - 1].success}
        distance={gameMoves.movesStatistics[gameMoves.move - 1].distance}
        points={gameMoves.movesStatistics[gameMoves.move - 1].points}
      />
      } 

      {gameMoves.move === 10 &&
        <EndGameModal 
          correct={gameMoves.movesStatistics.reduce((count, move) => move.success ? count + 1 : count, 0)}
          points={gameMoves.points}
          newGame={endGame}
          show={modalsControl.EndGame}
          onHide={endGame}
        />
      }
      

      {gameSettings.started && 
      <>
        <div className='missingCity'>
            {cities.missing[gameMoves.move - 1].MGLSDE_LOC}
        </div>
        <div className='gameStatistics'>
                <div className='movesDiv'>Moves: {gameMoves.move}/10</div>
                <div className='pointsDiv'>Points: {gameMoves.points}</div>
        </div>
      </>
      }
      <Map 
        config={gameSettings.config}
        mapState={mapState}
        handleMove={handleMove}
        zoom={mapState.zoom}
      />
      {(!modalsControl.Intro && !gameSettings.started) ? 
      <Button className='startNewGameButton' variant='success' onClick={() => setModalsControl({...modalsControl, Intro: true})}>New Game</Button>
      : <>
          <Button className='startNewGameButton' variant='danger' onClick={endGame}>End Game</Button>          
          <Button className='hintButton' variant='warning' onClick={getHint}>Hint!</Button>
        </>

    }
   </>
  );
}

export default App;
