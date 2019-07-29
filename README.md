# 基于create-react-app引入redux的脚手架搭建

## 一、背景介绍
我们知道`react`可以帮我们管理应用和组件的状态，但是当多个组件要访问同一个状态的时候，子组件要使用到向上很多层父组件的状态，那么`react`只能一层层向下传递了，很麻烦，这时候就可以用redux来解决这种**“共享状态”**的问题了。redux就是为了解决`react`组件间通信和组件间状态共享而提出的一种解决方案，主要涉及了三个部分：**`store 、 action 、 reducer`**。

下面我们通过创建项目引入redux搭建脚手架，以计数器的例子来说明redux的作用。

## 二、实现步骤

### 1、创建项目
选择你想要存放项目的路径，假定当前所在的文件目录为` D:\work\workspace\react` ，在目录空白处按住键盘shift键，同时鼠标右键，选择“在此处打开命令窗口”，在打开的命令行窗口中输入命令

	create-react-app react-redux-demo

![创建项目](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/createApp.png "创建项目")

,其中`react-redux-demo`是你想创建的项目名字，输入完全后，按回车，可以看到命令行窗口一直在跳动，这样`create-react-app`就会自动帮我们下载项目所要依赖的文件了，我们只要等待项目创建完成就可以了。当命令行窗口出现`Happy hacking!`，即项目创建完成，我们可以在`D:\work\workspace\react`目录下发现该目录下多了一个`react-redux-demo`的文件夹，这就是我们创建的项目了。



### 2、项目文件目录结构
	├── node_modules                            // 项目第三方依赖文件
	├── public                                  // 放静态资源
	├── src                                     // 源码目录
	│   ├── App.css                             // 组件样式
	│   ├── App.js                              // 组件文件
	│   ├── App.test.js                         // 组件测试文件
	│   ├── index.css                           // 项目入口文件样式
	│   ├── index.js                            // 项目入口文件
	│   ├── logo.svg                            // 项目图标文件
	│   ├── serviceWorker.js                    // 资源缓存
	├── .gitignore                              // 告诉Git哪些文件不需要添加到版本管理中
	├── package-lock.json                       // 锁定安装时的包的版本号
	├── package.json                            // 项目配置文件，项目依赖包版本号
	├── README.md                               // 项目的说明文件

![项目目录结构](https://github.com/LiJinLan/react-router-demo/raw/master/docImages/file_structure.png "项目目录结构")

### 3、启动项目
创建好项目后，需要先启动项目查看项目是否能够正常运行。在命令行窗口中输入命令

	cd react-redux-demo

进入项目，再输入命令

	npm start

启动项目，项目启动后会自动打开一个浏览器窗口加载页面，则项目启动完成。当浏览器加载页面情况如下图代表启动成功。

![启动](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/start.png "启动")


### 4、下载redux依赖
打开`package.json`文件，发现在`dependencies`中没有`redux`的依赖文件，所以要下载`redux`依赖。先关闭刚才启动的项目，在命令行窗口，同时按住键盘`ctrl+C`按键，在显示的命令处输入“y”即可关闭项目。在命令行窗口输入

	npm install react-redux --save

,回车，即下载`router`依赖文件。其中`--save`代表默认将依赖安装到`dependencies`。等待下载完成后，由于创建createStore()是要依赖redux,所以要把redux的依赖也下载下来。在命令行窗口输入命令：

	npm install redux --save

下载完成后，打开`package.json`文件，即可发现在`dependencies`中多了`redux和react-redux`的依赖版本号。

![添加依赖成功](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/package.png "添加依赖成功")

下载完依赖，就可以启动项目了，在命令行窗口输入:

	npm start


### 5、redux数据流

![数据流](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/shujuliu.png "数据流")

redux数据流首先从UI组件`dispatch`出`actions`，在`createStore`时是根据`reducer`创建的，所以`reducer`监听到UI组件发出的`antion`,就会去匹配相应的`action.type`,做相应的操作，并返回给`store`,`store`监听到`state`发生了改变，就会启动`react`生命周期进行更新渲染，引起界面的变化。



### 6、引入redux
#### (1)定义组件，确定效果
我们要做的是一个计数器，由一个显示数字的地方和两个按钮构成，所以我们可以修改`App.js`的代码，再根据实际情况写出对应的样式，达到我们想要的效果。

`App.js`代码如下

	import React, { Component } from 'react';
	import './App.css';

	class Counter extends Component {
	  render() {
		return (
		  <div className="counter">
			<h1>0</h1>
			<button>增加</button>
			<button>减少</button>
		  </div>
		);
	  }
	}
	export default Counter;





`App.css`代码如下：

	.counter {
		height: 300px;
		width: 500px;
		text-align: center;
		margin: 0 auto;
	}

	.counter button {
		margin-left: 27px;
		background-color: rgba(81,182,254,.7); 
		width: 85px;
		height: 42px;
		border-radius: 5px;
		color: white;
		font-size: 18px;
		margin-top: 30px;
	}




查看页面的效果：

![页面效果](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/couterShow1.png "页面效果")

我们可以看到，页面中已经出现了我们想要的效果，计数器居中显示，并且初始值为0，还有两个可以操作的按钮。

#### (2)事件处理，将组件与store树建立连接
由`react`我们知道，要页面发生改变，只能通过修改`state`或`props`,而由`redux`的数据流我们可以知道，要修改页面是要`dispatch`一个`action`,并且组件要与`store`树建立连接，这样才可以方便拿到`state`的值进行修改。所以我们要想计数器的数字随着按钮的点击而改变，需要给按钮添加点击事件，并`dispatch`一个`action`给`reducer`进行处理。

首先在组件中导入connect

	import { connect } from 'react-redux';



然后将组件与`store`建立连接，`connect`的第一参数`mapStateToProps`是将`state`的值拿到，而且返回的是一个对象，如下所示，其中`handleCounter`是对数据进行处理的`reducer`。


	const mapStateToProps = ( state ) => {
	  return ({
		counterNum: state.handleCounter
	  });
	}

	export default connect( mapStateToProps )(Counter);




建立连接后，给按钮添加点击事件处理，`dispatch`一个`action`对象，且该`action`对象要有一个type属性，



	<button onClick={this.handleAdd.bind(this)}>增加</button>
	<button onClick={this.handleSub.bind(this)}>减少</button>

	handleAdd() {
		this.props.dispatch({ type: 'ADD'});
	  }

	  handleSub() {
		this.props.dispatch({ type: 'SUB'});
	  }



注意，在事件处理时，由于我们自定义的函数里面用到的`this`不会自动绑定到组件这个实例上，所以我们要通过`.bind(this)`进行绑定，或者也可以通过箭头函数进行绑定，比如，上面的代码也可以写成这样：

	<button onClick={this.handleAdd}>增加</button>
	<button onClick={this.handleSub}>减少</button>

	handleAdd = () => {
		this.props.dispatch({ type: 'ADD'});
	  }

	  handleSub = () => {
		this.props.dispatch({ type: 'SUB'});
	  }



在src文件夹下新建一个文件，命名为`reducer.js`，编写`handleCounter`函数，对组件发出的`action.type`进行判断，执行相应的操作。导出时使用到了`combineReducers`，这是方便将多个`reducer`一起导出，当然这里只有一个`reducer`,也可以不用`combineReducers`。



`reducer.js`文件的代码如下：

	import { combineReducers } from 'redux';

	function handleCounter(state = 0, action ) {
		switch( action.type) {
			case 'ADD':
				return state + 1;
			case 'SUB':
				return state - 1;
			default:
				return state;
		}
	}

	export default combineReducers({
		handleCounter
	});




#### (4)创建store树
在入口文件`index.js`中创建唯一的store树，并使组件可以拿到store的值，所以要用到`Provider`。

`index.js`代码如下：

	import React from 'react';
	import ReactDOM from 'react-dom';
	import './index.css';
	import App from './App';
	import * as serviceWorker from './serviceWorker';
	import reducer from './reducer.js';
	import { createStore } from 'redux';
	import { Provider } from 'react-redux';

	const store = createStore( reducer );

	ReactDOM.render(
		<Provider store={ store }>
			<App />
		</Provider>,
		document.getElementById('root')
	);

	serviceWorker.unregister();


#### (5)从store树上拿到数据，并显示在计数器上

`App.js`最终代码如下：

	import React, { Component } from 'react';
	import './App.css';
	import { connect } from 'react-redux';

	class Counter extends Component {
	  constructor( props) {
		super( props );
		this.state = {
		  counterNum: 0
		}
	  }

	  handleAdd() {
		this.props.dispatch({ type: 'ADD'});
	  }

	  handleSub() {
		this.props.dispatch({ type: 'SUB'});
	  }

	  render() {
		return (
		  <div className="counter">
			<h1> { this.props.counterNum ?  this.props.counterNum : this.state.counterNum} </h1>
			<button onClick={this.handleAdd.bind(this)}>增加</button>
			<button onClick={this.handleSub.bind(this)}>减少</button>
		  </div>
		);
	  }
	}
	const mapStateToProps = ( state ) => {
	  return ({
		counterNum: state.handleCounter
	  });
	}

	export default connect( mapStateToProps )(Counter);


## 三、效果展示
这样就可以使用redux实现计数器的效果了，当点击增加按钮时，计数器的数字就会加一，而点击减少按钮时，计数器的数字就会减一。

![增加](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/addResoult.png "增加")


![减少](https://github.com/LiJinLan/react-redux-demo/raw/master/reduxImages/subResoult.png "减少")















