let hour = [];
for(let i=8;i<20;i++){
	hour.push(i+'时'+'00分');
	hour.push(i+'时'+'30分');
}

hour.push('20时'+'00分');
var DateTimeSource = {};
for(let i=new Date().getFullYear();i<new Date().getFullYear()+2;i++){
	for(let j = 1;j<13;j++){
		let day = {};
		if(j === 2){
			if (((i % 4)==0) && ((i % 100)!=0) || ((i % 400)==0)){
				for(let k=1;k<30;k++){
					k=k<10?'0'+k:k;
					day[k+'日'] =hour;
				}
			}else {
				for(let k=1;k<29;k++){
					k=k<10?'0'+k:k;
					day[k+'日'] =hour;
				}
			}
		}

		else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
			for(let k=1;k<32;k++){
				k=k<10?'0'+k:k;
				day[k+'日'] =hour;
			}
		}
		else{
			for(let k=1;k<31;k++){
				k=k<10?'0'+k:k;
				day[k+'日'] =hour;
			}
		}
		DateTimeSource[i+'年'+(j<10?'0'+j:j)+'月'] = day;
	}

}
module.exports = DateTimeSource;