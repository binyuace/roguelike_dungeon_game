import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board'
import construction from './construction'
import Info from './info'
var log = console.log.bind(console)

class Player extends Component {
  render() {
    let x = this.props.position[0], y = this.props.position[1]
    const style = Object.assign({},construction.gridPosition(x,y),construction.gridStyle())
    return <div className="player" style ={style}> </div>
  }
}
class App extends Component { 
  constructor() {
    super()
    this.state = {
      player:construction.initialPlayer(),
      playerPosition:construction.initialPlayer().position,
      board : construction.initialBoard(1),
      title:'Welcome to The Dungeon',
      toggle:true,
    }
    this.handleKey = this.handleKey.bind(this)
    this.move = this.move.bind(this)
    this.handleClick = this.handleClick.bind(this)
    console.log(this)
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
    let player = this.state.player
    const board = this.state.board
    let move = true
    let x = position[0], y = position[1]
    if (this.up && board[x-1][y] !== 1) x--
    if (this.down && board[x+1][y] !== 1) x++
    if (this.left && board[x][y-1] !== 1) y--
    if (this.right && board[x][y+1] !== 1) y++    
    if (position[0] !==  x|| position[1] !== y) {  
      let go = board[x][y] 
      // floor
      if (go === 0){
        this.setState({playerPosition:[x,y]})
      }
      // enmey
      else if (go.name === 'enemy'){
          player.fight(board[x][y])
          if (go.hp <= 0 ) {
            board[x][y] = 0
            player.xp += 10
          } else if (player.hp <= 0) {
            this.restart(false)
          } 
          else this.setState({player:player})
      }
      // boss
      else if (go.name === 'boss') {
        player.fight(board[x][y])
        if (go.hp <= 0) {
          this.restart(true)
        } else if (player.hp <= 0){
          this.restart(false)
        } else if (player.hp > 0) {
          this.setState({player:player})
        }
      }
      // food
      else if (go.name === 'food') {
        player.hp += go.hp
        board[x][y] = 0
        this.setState({playerPosition:[x,y]})
      }
      // weapon
      else if (go.name === 'weapon') {
        player.weapon = go
        board[x][y] = 0
        this.setState({playerPosition:[x,y]})
      } 
      else if (go.name === 'gate') {
        player.floor++
        this.setState({player:player})
        this.setState({
          title:'you have entered a new Dungeon',
          playerPosition:construction.initialPlayer().position,
          board:construction.initialBoard(player.floor),
        })
      }

    }
  }
  handleClick() {
    this.setState({toggle:!this.state.toggle})
  }
  restart(win) {
    if (win) {this.setState({title:'you win! Congratulations!'})}
      else {this.setState({title:'you lose'})}
    this.setState({
        player:construction.initialPlayer(),
        playerPosition:construction.initialPlayer().position,
        board:construction.initialBoard(1),
      })
    let This = this
    setTimeout(function() {This.setState({title:'Welcome to The Dungeon'})}, 2000);
    }
  componentWillMount(){
    this.update = setInterval(this.move,100)
    document.addEventListener("keydown",(event)=>this.handleKey(event,true));
    document.addEventListener("keyup",(event)=>this.handleKey(event,false));
  }
  render() {
    const boardStyle = {height:this.state.board.length*construction.gridSize,width:this.state.board[0].length*construction.gridSize}
    let title = this.state.title
    return (
      <div className="App">
        <div className="App-header">
          <h2>{title}</h2>
           <button onClick = {this.handleClick}> Toggle</button>
        </div>
        <div className ="container">
         
          <div className = "board" style ={boardStyle}>
            <Board
            board = {this.state.board} 
            toggle = {this.state.toggle}
            position = {this.state.playerPosition}
            />
            <Player position = {this.state.playerPosition}/>
          </div>
          <Info player = {this.state.player}/>
        </div>
      </div>
    );
  } 
}
export default App;
