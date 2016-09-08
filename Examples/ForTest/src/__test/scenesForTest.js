
import React,{Component} from 'react'
import {Scene} from 'react-native-router-flux';

// test list
import TestsListView from './testsListView'
// test pages
// import TestFile from './testFile'
import TestImagePicker from './testImagePicker'
import TestPopupPage from './testPopupPage'
import TestPopupSelecter from './testPopupSelecter'

let scenes = [
        {
            key: 'TestImagePicker',
            comp: TestImagePicker,
        },
        {
            key:'TestPopupPage',
            comp:TestPopupPage,
        },
        {
            key: 'TestPopupSelecter',
            comp: TestPopupSelecter,
        },
    ];

// module.exports = <Scene key="tabbar" tabs={true}>
//    // scenes here
// </Scene>;

// module.exports = <Scene key="test">
//    	<Scene key='testsListView' /*initial={true}*/ hideNavBar={true} component={TestsListView} />
// 	{
// 	    scenes.map(item =>
// 	        <Scene key={item.key} component={item.comp} />)
// 	}
// </Scene>;

module.exports =
(
    <Scene key="test">
       	<Scene key='testsListView' /*initial={true}*/ hideNavBar={true} component={TestsListView} />
    	{
    	    scenes.map(item =>
    	        <Scene key={item.key} component={item.comp} />)
    	}
    </Scene>
);

// export default class testsScenes extends Component{
//   constructor(props){
//     super(props);
//   }

//   render() {
//       return (
//         <Scene key="test">
// 		   	<Scene key='testsListView' initial={true} hideNavBar={true} component={TestsListView} />
// 			{
// 			    scenes.map(item =>
// 			        <Scene key={item.key} component={item.comp} />)
// 			}
// 		</Scene>
//       );
//   }

// }
