/*
界面功能：筛选列表
相关界面：会议室预定-职能中心列表
props：
    1.职能列表数据源
    2.被选项

项目中集成进了redux框架，每个页面只负责展示数据，更新UI。有任何交互和操作应用中的临时数据时，只管调用action函数，即可触发reducer，所有数据的更改交给reducer。项目中有例子，有问题随时沟通。

这样做其实很麻烦，对开发约束较多，但是后期维护就好点了，也能应对复杂的数据流问题，希望大家尽量依照redux框架进行设计。

package.json 文件中怎加了 "react-native-storage": "^0.1.2"，
common—>storage.js 封装了数据持久化的操作（对应原生的本地应用中存的数据（iOS是指 NSUserDefaults））
App.js中做了测试，可以看下用法，后面会删掉或者注释掉
存放在全局变量中，global.storageUtil = storageUtil;
然后应用中都可以通过 global.storageUtil 使用了。
这个类库有一个限制是：
//注意:请不要在key中使用_下划线符号!
  storageUtil.setKeyValue('hello', 'world');
  storageUtil.setKeyValue('helloWorld', {'say':'hello world'});
  更新了代码，修正了reducer，之前对其理解有误，已更正。
编写reducer的示例：
var workHomeState = function(state, action) {

	state = state || {
		type: ActionConstants.INITIAL_TODOS,
		todos: []
	}

	var todos = Object.assign({}, state.todos)

	switch(action.type) {

		case ActionConstants.LOAD_DEFAULT_TODOS: {
			todos = defaultTodos;
			return {
				...state,
				todos,
			}
		}

		case ActionConstants.TODO_CREATE: {
			todos.unshift(action.todo);
			return {
				...state,
				todos,
			}
		}

		case ActionConstants.TODO_COMPLETE: {
			var selected = action.selected;
			var index = todos.indexOf(selected);

			if(todos[index].selected) {
				todos[index] = { text: todos[index].text }
			}else {
				todos[index] = { text: todos[index].text, selected: true }
			}

			return {
				...state,
				todos,
			}
		}

		default: return {
			...state
		}

	}
}

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case ActionConstants.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

module.exports = {workHomeState, visibilityFilter};
几点需要注意的事项
1、统一一下编写reducer的命名规范：目前划分了两个大的state：分别在workHomeReducer.js和mySettingsReducer.js文件里，其实目前只用到了workHomeState（缓存“工作通”里的应用数据），也就是说工作通里的所有事件更改数据都交给workHomeState这个(reducer)函数处理，比方说有个模块需要todos数据，在后面添加(或修改)todos，有个模块需要news数据，在后面添加(或修改)news，… …目前已在工作通的顶层容器连接了store（参考代码在WorkHomeContainer.js里），所以其后的子组件在初始化的时候传定制信息：(示例在WorkHome.js里)
const { workHomeState, dispatch } = this.props;
const action = bindActionCreators(actions, dispatch);
<FlowListView
                        style={[{flex:1},{marginBottom:49}]}
                        state={workHomeState}
                        actions={action} />
这样在FlowListView里就可以通过this.props.state获得workHomeState（保存工作通的应用数据比如：todos、news），假设FlowListView要用todos数据：this.props.state.todos就可以获得。

2、action不能重复，因为触发actionCreator函数（即产生action的工厂函数）会通过store将产生的action发送给所有的reducer，所有reducer通过switch case 语句判断是否是各自的事件,所以case里面不能重复，不然都会处理。所以这里将所有action的type定义在ActionConstants.js文件夹里（常量）。

3、不同的reducer只会收到自己处理的state（自己定义自己处理），不用担心state的混乱。
*/
