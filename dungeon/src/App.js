import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dungeon from './map';
var Weapons = [
  {
    'name' : 'wood',
    'attack' : '10',
    'color' : 'brown',
  },
  {
    'name' : 'silver',
    'attack' : 'gridSize',
    'color' : 'silver',
  },
    {
    'name' : 'gold',
    'attack' : '30',
    'color' : 'gold',
  },
]
var gridSize = 15
const gridStyle = {height:gridSize,width:gridSize}
class Grid extends Component {
  render() {
    let color = ''
    switch(this.props.color) { 
    case 0:
      // 0 is room floor
        color = "black"
        break;
      //  1 is wall
    case 1:
        color = "grey"
        break;
      //  2 is player
    case 2:
        color = "blue"
    }
    const divStyle = Object.assign({},{backgroundColor:color},gridStyle)
    return <div className = "grid" style = {divStyle}></div>
  }
}
class Board extends Component {
  renderGrids() {
    const board = this.props.board
    let grids = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          grids.push((<Grid 
            key = {i*board[0].length+j}
            color = {this.props.board[i][j]}
            />))
      }
    }
    return grids
  }
  render() {
    const grids = this.renderGrids();
    return (
    <div>
      {grids}
    </div>
    )
  }  
}
var construction  = {
  initialPlayer() {

    return {
      HP:100,
      Weapon:'Stick',
      Attack:Weapons[1].attack,
      position:[2,2],
    }
  },

  initialBoard() {
    let a = Dungeon
    return a
  }

}
class Info extends Component {
  render() {
    return <div> 
        HP: {this.props.player.HP}<br/>
        Weapon:{this.props.player.Weapon}<br/>
        Attack: {this.props.player.Attack}
      </div>
  }
}
class Player extends Component {
  render() {
    let x = this.props.position[0], y = this.props.position[1]
    let style = {left:gridSize*y,top:gridSize*x}
    style = Object.assign({},style,gridStyle)
    return <div className="player" style ={style}> </div>
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      player:construction.initialPlayer(),
      playerPosition:construction.initialPlayer().position
    }
    this.board = construction.initialBoard(),
    this.handleKey = this.handleKey.bind(this)
    this.move = this.move.bind(this)
  }
  handleKey(event,keydown) {
    // let position = this.state.player.position
    // let x = position[0],y = position[1]
    switch(event.key){
      case 'ArrowUp':
        event.preventDefault()
        this.up = keydown?true:false
        break
      case 'ArrowRight':
        event.preventDefault()
        this.right = keydown?true:false
        break
        case 'ArrowDown':
        event.preventDefault()
        this.down = keydown?true:false
        break
      case 'ArrowLeft':
        event.preventDefault()
        this.left = keydown?true:false
        break
    }
  }
  move() {
    let position = this.state.playerPosition
    const board = this.board
    let x = position[0], y = position[1]
    if (this.up && board[x-1][y] === 0) x--
    if (this.down && board[x+1][y] === 0) x++
    if (this.left && board[x][y-1] === 0) y--
    if (this.right && board[x][y+1] === 0) y++    
    if (position[0] !==  x|| position[1] !== y) {  
      this.setState({playerPosition:[x,y]})
    }
  }
  
  componentWillMount(){
    this.update = setInterval(this.move,100)
    document.addEventListener("keydown",(event)=>this.handleKey(event,true));
    document.addEventListener("keyup",(event)=>this.handleKey(event,false));
  }
  componentWillUnmount() {
    clearInterval(this.update)
  }
  render() {
    const boardStyle = {height:this.board.length*gridSize,width:this.board[0].length*gridSize}
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to The Dungeon</h2>
          <Info player = {this.state.player}/>
        </div>
        <div className ="container">
          <div className = "board" style ={boardStyle}>
            <Board board = {this.board} />
            <Player position = {this.state.playerPosition}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
