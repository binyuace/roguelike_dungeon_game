
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
export default Dungeon
