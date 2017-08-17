import React,{Component} from 'react'
import construction from './construction'


class Board extends Component {
  render() {
    const grids = this.props.board.map(
      (arr,idx) => arr.map( function(item,j){
        const style = Object.assign({},
          construction.gridPosition(idx,j),
          construction.gridStyle())
        if (item === 0) return
        if (item === 1) return (<div className='grid' style = {style}></div>)
        return (<div className = {item.name} style = {style}></div>)
      }))
    return <div>{grids}</div>
  }
}
export default Board