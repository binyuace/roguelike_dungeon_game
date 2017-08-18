  
import {NewDungeon} from 'random-dungeon-generator'

const options = {
    width: 80,
    height: 40,
    minRoomSize: 20,
    maxRoomSize: 25,
};
var Dungeon
var newDungeon = function() {
  return NewDungeon(options).map(arr=>arr.map(
    function(x){
        if(x > 1||x===0){return 0} else{return 1}
    }
  ))
}


var construction  = {
  weapons : [
    {
      'key' : 0,
      'name':'weapon',
      'weaponName' : 'wood',
      'attack' : 20,
      'color' : 'brown',
    },
    {
      'key' : 1,
      'name':'weapon',
      'weaponName' : 'silver',
      'attack' : 30,
      'color' : 'silver',
    },
    { 
      'key' : 2,
      'name':'weapon',
      'weaponName' :'gold',
      'attack' : 50,
      'color' : 'gold',
    },
    {
      'key' : 3,
      'name':'weapon',
      'weaponName' :'diamond',
      'attack' : 80,
      'color' : 'diamond',
    },
    {
      'key' : 4,
      'name':'weapon',
      'weaponName' :'Ultimate Sword',
      'attack' : 100,
      'color' : 'red',
    }
  ],
  initialEnemies(floor) {  
    let a = Array(randomInt(10)+2).fill(null)
    a.forEach( function(arr,idx){ 
        const temp =  { 
          key:idx,
          name:'enemy',
          hp:randomInt(20*floor)+30,
          hurt:randomInt(8*floor)+5,
        } 
        place(temp)
      }
    )
  },
  gridSize:15,
  gridStyle(){
    return  {height:this.gridSize,width:this.gridSize}
  },
  gridPosition(x,y) {
    return {left:this.gridSize*y,top:this.gridSize*x}
  },
  initialPlayer() {
    return {
      name:'player',
      hp:100,
      weapon:construction.weapons[0],
      position:[2,2],
      floor:1,
      attack() {
        return this.weapon.attack + this.level() * 10 - 10
      },
      level() {
        return Math.floor(this.xp/50)+1
      },
      xp:0,
      fight(enemy) {
        let attack = this.attack()
        enemy.hp -= randomInt(attack) 
        if (enemy.hp > 0){
          this.hp -= enemy.hurt
        }
      }
    }
  },
  initialBoard(floor){ 
    Dungeon = newDungeon()
    if(floor === 4) {this.initialBoss()}
    this.initialEnemies(floor)
    this.initialFoods(floor)
    this.initialWeapon(floor)
    if (floor < 4) {this.initialGate()}
    return Dungeon
  },
  initialGate() {
    let gate = {
      name : 'gate',
    }
    place(gate)
  },
  initialFoods(floor){
    let a = Array(10).fill(0)
    a.forEach(function(a,idx) {
      let temp = {
        key : idx,
        name:'food',
        hp:randomInt(10*floor)+5,
      } 
      place(temp)
    })
  },
  initialWeapon(floor){
    let weapon = this.weapons[floor]
    place(weapon)
  },
  initialBoss(){
    let boss = { 
          name:'boss',
          hp:randomInt(200)+800,
          hurt:randomInt(20)+30,
        }
    while(true) {
      let pos = randomPosition()
      let x = pos[0], y = pos[1]
      if (Dungeon[x][y] === 0 
        && Dungeon[x+1][y]=== 0
        && Dungeon[x+1][y+1] === 0 
        && Dungeon[x][y+1] === 0) {
          Dungeon[x][y] = boss
          Dungeon[x+1][y] = boss
          Dungeon[x][y+1] = boss
          Dungeon[x+1][y+1] = boss
          break
      }
    }    
  },
}
var randomInt = function(x) {
  return Math.floor(Math.random()*x)
}
var isFloor = function(position){
  return Dungeon[position[0]][position[1]] === 0
} 
var randomPosition = function(){
  return [randomInt(Dungeon.length),randomInt(Dungeon[0].length)]
}
var place = function(item){
  let count = 0
  while (count < 20){
    let position = randomPosition()
    if (isFloor(position)){
      Dungeon[position[0]][position[1]] = item
      return
    }
    count++
  }
}
export default construction








