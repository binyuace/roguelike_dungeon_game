import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board'
import construction from './construction'
import Info from './info'

class Player extends Component {
  render() {
    let x = this.props.position[0], y = this.props.position[1]
    let style = {left:construction.gridSize*y,top:construction.gridSize*x}
    style = Object.assign({},style,construction.gridStyle())
    return <div className="player" style ={style}> </div>
  }
}
class Enemies extends Component {
  render() {
    return this.props.enemies.map(function(arr){
      let style = {left:construction.gridSize*arr.y,top:construction.gridSize*arr.x}
      style = Object.assign({},style,construction.gridStyle())
      return <div className = 'enemy' style = {style}></div>
    })
    }
}
class App extends Component { 
  constructor() {
    super()
    this.state = {
      player:construction.initialPlayer(),
      playerPosition:construction.initialPlayer().position,
      enemies:construction.initialEnemies(),
      Weapons:construction.initialWeapons(),
      Food:construction.initialFood(),
      Boss:construction.initialBoss(),
    }
    this.board = construction.initialBoard(),
    this.handleKey = this.handleKey.bind(this)
    this.move = this.move.bind(this)
  }
  handleKey(event,keydown) {
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
  // componentWillUnmount() {
  //   clearInterval(this.update)
  // }
  render() {
    const boardStyle = {height:this.board.length*construction.gridSize,width:this.board[0].length*construction.gridSize}
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
            <Enemies enemies = {this.state.enemies}/>
          </div>
        </div>
      </div>
    );
  } 
}
export default App;
