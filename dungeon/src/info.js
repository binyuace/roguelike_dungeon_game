import React, { Component } from 'react';
class Info extends Component {
  render() {
    return <div> 
        HP: {this.props.player.HP}<br/>
        weapon:{this.props.player.weapon}<br/>
        Attack: {this.props.player.Attack}
      </div>
  }
}
export default Info