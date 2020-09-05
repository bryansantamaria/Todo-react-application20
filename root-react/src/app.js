import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/styles.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './middlewares/privateRoute';
import PrivateRouteCreate from './middlewares/privateRouteCreate';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';

import {
	getToDo,
	postToDo,
	getItems,
	postItem,
	patchItem,
	getOrderBy,
	delItem,
	getUser,
	updateCompleted,
} from './utils/api';

import ItemContainer from './components/ToDoContainer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			items: [],
			selectedItem: null,
			inputField: '',
			editBtnState: false,
			toggleCreateOrder: false,
			toggleUpdatedOrder: false,
			isAuthenticated: false,
			token: localStorage.getItem('token'),
			users: {},
		};
		this.limit = 0;
	}

	//Application has rendered on the client side
	async componentDidMount() {
		console.log('component did mount');
		try {
			if (this.state.token) {
				const toDo = await getToDo('http://localhost:8080/todos/', this.state.token);
				const items = await getItems('http://localhost:8080/items/', this.state.token);
				const user = await getUser('http://localhost:8080/users', this.state.token);
				this.setState({ todos: toDo.data, items: items.data, users: user.data });
				console.log(this.state.todos);
				window.localStorage.setItem('role', user.data.role);
			}
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}

	createToDo = async (title) => {
		const res = await postToDo('http://localhost:8080/toDos/create', title, this.state.token);
		console.log(res);
		this.setState({ todos: [...this.state.todos, res.data] });
	};

	//Body posts title & done, then recieves data from end point and updates state.
	createItem = async (title) => {
		const res = await postItem('http://localhost:8080/items/create', title, this.state.token);
		this.setState({ items: [...this.state.items, res.data] });
	};

	//Copy current items array, filter out item being deleted and update state.
	delete = async (id) => {
		const ItemList = [...this.state.items];
		const newItems = ItemList.filter((Item) => Item._id !== id);
		await delItem(`http://localhost:8080/items/delete/${id}`, this.state.token);
		this.setState({ items: newItems });
	};

	update = async (title) => {
		await patchItem(
			`http://localhost:8080/items/update/${this.state.selectedItem}`,
			title,
			this.state.token
		);
		const index = this.state.items.findIndex((Item) => Item._id === this.state.selectedItem);
		const oldState = [...this.state.items];
		oldState[index].title = title;

		this.setState({
			items: oldState,
			selectedItem: null,
		});
	};

	orderByCreated = async () => {
		if (this.state.toggleCreateOrder) {
			const res = await getOrderBy(
				`http://localhost:8080/items/sort/created${-1}`,
				this.state.token
			);
			let oldState = [...this.state.items];
			oldState = res.data;
			this.setState({
				items: oldState,
				toggleCreateOrder: false,
			});
		} else if (!this.state.toggleCreateOrder) {
			const res = await getOrderBy(
				`http://localhost:8080/items/sort/created${1}`,
				this.state.token
			);
			let oldState = [...this.state.items];
			oldState = res.data;
			this.setState({
				items: oldState,
				toggleCreateOrder: true,
			});
		}
	};

	orderByUpdated = () => {
		if (this.state.toggleUpdatedOrder) {
			axios
				.get(`http://localhost:8080/items/sort/lastUpdated${-1}`, {
					headers: {
						Authorization: 'Bearer ' + this.state.token,
					},
				})
				.then((res) => {
					let oldState = [...this.state.items];
					oldState = res.data;
					this.setState({
						items: oldState,
						toggleUpdatedOrder: false,
					});
				});
		} else if (!this.state.toggleUpdatedOrder) {
			axios
				.get(`http://localhost:8080/items/sort/lastUpdated${1}`, {
					headers: {
						Authorization: 'Bearer ' + this.state.token,
					},
				})
				.then((res) => {
					let oldState = [...this.state.items];
					oldState = res.data;
					this.setState({
						items: oldState,
						toggleUpdatedOrder: true,
					});
				});
		}
	};

	paginateFwrd = () => {
		axios
			.get(`http://localhost:8080/items/limit/${this.limit}`, {
				headers: {
					Authorization: 'Bearer ' + this.state.token,
				},
			})
			.then((res) => {
				let oldState = [...this.state.items];
				oldState = res.data;
				this.setState({
					items: oldState,
				});
			});
		this.limit++;
	};

	paginateBckwrd = () => {
		if (this.limit !== 0) {
			this.limit--;
		}
		axios
			.get(`http://localhost:8080/items/limit/${this.limit}`, {
				headers: {
					Authorization: 'Bearer ' + this.state.token,
				},
			})
			.then((res) => {
				let oldState = [...this.state.items];
				oldState = res.data;
				this.setState({
					items: oldState,
				});
			});
	};

	selectItem = (id) => {
		const editItem = this.state.items.find((Item) => Item._id === id);
		this.setState({
			selectedItem: id,
			inputField: editItem.title,
			editBtnState: true,
		});
		let input = document.getElementById('standard-basic');
		input.focus();
	};

	handleBtnState = (editBtnState) => {
		this.setState({ editBtnState });
	};

	complete = async (id) => {
		this.setState({
			items: this.state.items.map((Item) => {
				if (Item._id === id) {
					Item.done = !Item.done;
				}
				return Item;
			}),
		});
		const index = this.state.items.findIndex((Item) => Item._id === id);
		const { title, done } = this.state.items[index];
		await updateCompleted(
			`http://localhost:8080/items/update/${id}`,
			title,
			done,
			this.state.token
		);
	};

	isAuthenticated = (auth) => {
		const isAuthenticated = localStorage.getItem('token');

		if (auth === isAuthenticated) {
			console.log('Authorized');
			this.setState({ isAuthenticated: true, token: isAuthenticated });
		}
		window.location.href = 'http://localhost:3000/items';
	};

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<BrowserRouter>
						<Switch>
							<Route
								path='/auth'
								render={(props) => <Login {...props} auth={this.isAuthenticated} />}
							/>

							<PrivateRouteCreate
								exact
								path='/create'
								component={CreateAccount}
								token={this.state.token}
							/>

							<PrivateRoute
								exact
								path={'/items'}
								component={ItemContainer}
								isAuthenticated={this.state.token}
								users={this.state.users}
								items={this.state.items}
								todos={this.state.todos}
								createToDo={this.createToDo}
								complete={this.complete}
								delete={this.delete}
								selectItem={this.selectItem}
								orderByCreated={this.orderByCreated}
								toggleCreateOrder={this.state.toggleCreateOrder}
								orderByUpdated={this.orderByUpdated}
								toggleUpdatedOrder={this.state.toggleUpdatedOrder}
								paginateFwrd={this.paginateFwrd}
								paginateBckwrd={this.paginateBckwrd}
								createItem={this.createItem}
								update={this.update}
								selectedItem={this.state.selectedItem}
								inputField={this.state.inputField}
								editBtnState={this.state.editBtnState}
								handleBtnState={this.handleBtnState}
							/>
							<Redirect to={{ pathname: '/auth' }} />
						</Switch>
					</BrowserRouter>
				</header>
			</div>
		);
	}
}

export default App;
