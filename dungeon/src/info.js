import React, { Component } from 'react';
class Info extends Component {
  render() {
    return <div className = 'info'> 
        HP: {this.props.player.hp}<br/>
        Weapon: {this.props.player.weapon.weaponName}<br/>
        Attack: {this.props.player.attack()}<br/>
        Level: {this.props.player.level()}<br/>
        XP: {this.props.player.xp}
	      </div>
        }
 }
export default Info