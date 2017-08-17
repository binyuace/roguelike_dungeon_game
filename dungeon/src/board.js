import React,{Component} from 'react'
import construction from './construction'


class Board extends Component {
  render() {
    let toggle = this.props.toggle
    let pos = this.props.position
    let x = pos[0], y = pos[1]
    const grids = this.props.board.map(
      (arr,idx) => arr.map( function(item,j){
        const style = Object.assign({},
          construction.gridPosition(idx,j),
          construction.gridStyle())
        if ( toggle 
          && (idx-x)*(idx-x) + (j-y)*(j-y) >= 25) return null
        if ( toggle 
          && (idx-x)*(idx-x) + (j-y)*(j-y) < 25 
          && item === 0) return (<div className='white' style = {style}></div>)
        if (item === 0) return null
        if (item === 1) return (<div className='grid' style = {style}></div>)
        return (<div className = {item.name} style = {style}></div>)
      }))
    return <div>{grids}</div>
  }
}
export default Board