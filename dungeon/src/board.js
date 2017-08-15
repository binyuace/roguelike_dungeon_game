import React,{Component} from 'react'
import construction from './construction'
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
    const divStyle = Object.assign({},{backgroundColor:color},construction.gridStyle())
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
            color = {board[i][j]}
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
export default Board