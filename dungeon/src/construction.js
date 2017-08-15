
import {NewDungeon} from 'random-dungeon-generator'

const options = {
    width: 50,
    height: 40,
    minRoomSize: 20,
    maxRoomSize: 25,
};
var Dungeon = NewDungeon(options)
Dungeon = Dungeon.map(arr=>arr.map(
    function(x){
        if(x > 1||x===0){return 0} else{return 1}
    }
))

var construction  = {
  weapons : [
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
  ],
  initialEnemies() {
    var enemy = {
      hp(){return Math.floor(Math.random()*30)},
      hurt(){return Math.floor(Math.random()*10)},
      amount(){return Math.floor(Math.random()*10)},
      postition(){
        
      }
    }
    return Array(enemy.amount()).map(arr => 
        { 
          hp:enemy.hp(),
          hurt:enemy.hurt(),
          position:enemy.position(),
        } 
    )
  },
  gridSize:15,
  gridStyle(){
    return  {height:this.gridSize,width:this.gridSize}
  },
  initialPlayer() {
    return {
      HP:100,
      weapon:'Stick',
      Attack:this.weapons[0].attack,
      position:[2,2],
    }
  },
  initialBoard(){ return Dungeon},
}
export default construction