import React, { Component } from 'react';
class Info extends Component {
  render() {
    return <div> 
        HP: {this.props.player.hp}
        &nbsp;&nbsp;
        Weapon: {this.props.player.weapon.weaponName}
        &nbsp;&nbsp;
        Attack: {this.props.player.weapon.attack}
      </div>
  }
}
export default Info