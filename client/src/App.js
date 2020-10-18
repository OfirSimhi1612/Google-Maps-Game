import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import './App.css';
import Map from './Maps/Map'
import IntroModal from './Modals/IntroModal'
import { getCities, getRandomCity, getAbsuluteDistance, getHintCordinates, getPolylinePath } from './Game/GameManager'
import MoveEndModal from './Modals/MoveEndModal';
import EndGameModal from './Modals/EndGameModal'
import swal from 'sweetalert'


function App() {

  const [modalsControl, setModalsControl] = useState({Intro: false, MoveEnd: false})
  const [gameSettings, setGameSettings] = useState({
      config: {
        gameType: ['air', 'Air Distance'],
        mapType: ['roadmap', 'Road Map'],
        roads: [true, true, 'Roads and numbers'],
        cities: ['large', 'Large Cities Only']
      }
  })
  const [mapState, setMapState] = useState({zoom: 8, polyline: [], marker: [], missingCity: []})
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

    setCities({
      all: citiesByLevel
    })

    let missingCities = [];

    for(let j = 0; j < config.participants[0]; j++){

      missingCities[j] = [];

      for(let i=0; i < 10; i++){
        const randomCity = getRandomCity(citiesByLevel)
        missingCities[j].push(randomCity)
      }

    }

    setCities({
      missing: missingCities,
    })

    const points = []

    for(let i =0; i < config.participants[0]; i++){
      points.push(0)
    }

    setGameMoves({
      move: 1,
      points,
      movesStatistics: [],
      turn: 1
    })

    setMapState({
      marker: [],
      missingCity: [],
      polyline: []
    })
  }

  function endGame(){
    setModalsControl({...modalsControl, EndGame: false,  Intro: true})
    setGameSettings({
      config: {
        gameType: ['air', 'Air Distance'],
        mapType: ['roadmap', 'Road Map'],
        roads: [true, true, 'Roads and numbers'],
        cities: ['large', 'Large Cities Only']
      }
    })
    setCities({})
    setMapState({zoom: 8, polyline: [], marker: [], missingCity: []})
  }

  async function handleMove(event){

    const player = gameMoves.turn - 1;
    const move = gameMoves.move - 1;

    const markers = [...mapState.marker] 
    const missing = [...mapState.missingCity]

    markers[player] = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }

    missing[player] = {
      lat: gameSettings.started ? cities.missing[player][move].Y : null,
      lng: gameSettings.started ? cities.missing[player][move].X : null
    }

    let distance = 0;

    if(gameSettings.config.gameType[0] === 'air'){

      setMapState({
        ...mapState,
        marker: markers,
        missingCity: missing,
        zoom: 8
      })
    } else {

      const polyPath = await getPolylinePath(markers[player], missing[player])

      if(polyPath === 'error'){
        swal({
          text: 'Invalid Place! \nPick another one...',
          icon: "error",
          button: "ok",
      })
        return 
      }
      const polyline = [...mapState.polyline]

      polyline.push(polyPath[0])
      distance = parseInt(polyPath[1]/1000)

      setMapState({
        marker: markers,
        missingCity: missing,
        polyline: polyline,
        zoom: 8
      })
    }

    if(gameSettings.started){

      if(gameSettings.config.gameType[0] === 'air'){
        distance = getAbsuluteDistance(event.latLng.lat(), event.latLng.lng(), cities.missing[player][move].Y, cities.missing[player][move].X )
      }
      
      const statistics = [...gameMoves.movesStatistics]
      const points = [...gameMoves.points]

      statistics[player] = statistics[player] ? statistics[player] : [];
    
      points[player] = points[player] + (distance > 6 ? parseInt(106 - distance) : 100)

      statistics[player].push({
          success: distance < 6 ? true : false,
          distance: distance.toFixed(2),
          points: distance > 6 ? parseInt(106 - distance) : 100
      })

      
      if(player + 1 === gameSettings.config.participants[0]){

        setGameMoves({
          ...gameMoves,
          movesStatistics: statistics,
          points: points,
        })

        if(gameMoves.move < 10 || gameMoves.turn < gameSettings.config.participants[0]){
          
          setTimeout(() => setModalsControl({
            ...modalsControl,
            MoveEnd: true
          }) ,1000) 
        } else {
          setModalsControl({
            ...modalsControl,
            EndGame: true
          })
        }
      } else {
        setGameMoves({
          ...gameMoves,
          movesStatistics: statistics,
          points: points,
          turn: gameMoves.turn + 1
        })
      }
    }
    
  }

  function nextMove(){
    setGameMoves({
      ...gameMoves,
      move: gameMoves.move + 1,
      turn: 1
    })

    setModalsControl({
      ...modalsControl,
      MoveEnd: false
    })

    setMapState({
      marker: [],
      missingCity: [],
      polyline: []
    })
  }

  function getHint(){

    const hintCordenates = getHintCordinates(cities.missing[gameMoves.turn - 1][gameMoves.move - 1].Y, cities.missing[gameMoves.turn - 1][gameMoves.move - 1].X)
    
    setMapState({
      ...mapState,
      hint: hintCordenates,
      zoom: 9
    })

    setTimeout(() => {
      setMapState({
        ...mapState,
        hint: null
      })
    }, 5000)
  }

  return (
    <>
      <IntroModal 
        show={modalsControl.Intro} start_game={startGame} 
        onHide={() => setModalsControl({...modalsControl, Intro: false})}
      />
      {modalsControl.MoveEnd &&
        <MoveEndModal 
        show={modalsControl.MoveEnd} 
        onHide={nextMove}
        nextMove={nextMove}
        success={gameMoves.movesStatistics.map(player => player[gameMoves.move - 1].success)}
        points={gameMoves.movesStatistics.map(player => player[gameMoves.move - 1].points)}
        distance={gameMoves.movesStatistics.map(player => player[gameMoves.move - 1].distance)}
      />
      } 

      {modalsControl.EndGame &&
        <EndGameModal 
          show={modalsControl.EndGame}
          onHide={endGame}
          newGame={endGame}
          points={gameMoves.points}
        />
      }
      

      {gameSettings.started && 
      <>
        <div className='missingCity'>
            {cities.missing[gameMoves.turn - 1][gameMoves.move - 1].MGLSDE_LOC}
        </div>
        <div className='gameStatistics'>
                {gameSettings.config.participants > 1 &&<div className='turnDiv'>Turn: Player {gameMoves.turn}</div>}
                <div className='movesDiv'>Moves: {gameMoves.move}/10</div>
                <div className='pointsDiv'>
                  {gameSettings.config.participants[0] === 1 ?
                    <div>Points: {gameMoves.points[0] ? gameMoves.points[0] : 0}</div>
                    :
                    <div>
                      <h3>Points</h3>
                      {
                        gameMoves.points.map((player, index) => {
                          return <div>
                            Player {index + 1}: {player}
                          </div>
                        })
                      }
                    </div>
                  }
                </div>
        </div>
      </>
      }
      <Map 
        config={gameSettings.config}
        mapState={mapState}
        gameType={gameSettings.config.gameType[0]}
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
