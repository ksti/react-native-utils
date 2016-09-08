
var TimeSplitSource= {};
for(let i=0;i<24;i++){
    let minutes = [];
    for(let j = 0;j<4;j++){
        minutes.push(((j==0)?'00':(j*15))+'分');
    }
    TimeSplitSource[((i==0)?'00':i)+'时'] = minutes;
}
module.exports = TimeSplitSource;