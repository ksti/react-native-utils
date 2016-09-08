
var DateSource= {};
for(let i=2010;i<2050;i++){
    let month = {};
    for(let j = 1;j<13;j++){
        let day = [];
        if(j === 2){
            if (((i % 4)==0) && ((i % 100)!=0) || ((i % 400)==0)){
                for(let k=1;k<30;k++){
                    day.push(k+'日');
                }
            }else {
                for(let k=1;k<29;k++){
                    day.push(k+'日');
                }
            }
        }
        else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
            for(let k=1;k<32;k++){
                day.push(k+'日');
            }
        }
        else{
            for(let k=1;k<31;k++){
                day.push(k+'日');
            }
        }
        month[j+'月'] = day;
    }
    DateSource[i+'年'] = month;
}
module.exports = DateSource;