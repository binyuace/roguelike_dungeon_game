import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var Weapons = [
  {
    'name' : 'wood',
    'attack' : '10',
    'color' : 'brown',
  },
  {
    'name' : 'silver',
    'attack' : '20',
    'color' : 'silver',
  },
    {
    'name' : 'gold',
    'attack' : '30',
    'color' : 'gold',
  },
]
class Grid extends Component {
  render() {
    let color = ''
    switch(this.props.color) {
    case 0:
        color = "white"
        break;
    case 1:
        color = "grey"
        break;
    case 2:
        color = "blue"
    }
    const divStyle = {backgroundColor:color}
    return <div className = "grid" style = {divStyle}></div>
  }
}
class Board extends Component {
  renderGrids() {
    const board = this.props.board
    console.log(board)
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
    <div className = "board">
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
      position:[40,50],
    }
  },

  initialBoard() {
    let a =  Array(80).fill(Array(100).fill(0))
    a = a.map(arr => arr.map(i=>Math.floor(Math.random()*2)))
    a[40][50] = 2
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
class App extends Component {
  constructor() {
    super()
    this.state = {
      player:construction.initialPlayer(),
      board:construction.initialBoard(),
    }
    this.handleKeyDown.bind(this)
  }
  moveUp(){return}
  moveDown(){return}
  moveRight(){return}
  moveLeft(){return}
  handleKeyDown(event) {
    console.log(event)
    console.log(this.state)
    switch(event.key){
      case 'ArrowUp':
        this.moveUp()
        break
      case 'ArrowRight':
        this.moveRight()
        break
        case 'ArrowDown':
        this.moveDown()
        break
      case 'ArrowLeft':
        this.moveLeft()
        break
      default :
        event.preventDefault()
    }
  }
  componentDidMount(){
    document.addEventListener("keydown",(event)=>this.handleKeyDown(event));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to The Dungeon</h2>
          <Info player = {this.state.player}/>
        </div>
        <div className ="container">
          <Board board = {this.state.board}/>
        </div>
      </div>
    );
  }
}

export default App;
