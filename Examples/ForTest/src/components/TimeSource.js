
var TimeSource= {};
for(let i=0;i<23;i++){
    let minutes = [];
    for(let j = 0;j<59;j++){
        minutes.push(j+'分');
    }
    TimeSource[i+'时'] = minutes;
}
module.exports = TimeSource;