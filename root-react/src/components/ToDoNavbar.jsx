import React, { Component } from 'react';
import CreateToDo from './CreateTodo';
import { NativeSelect, Button } from '@material-ui/core';

class ToDoNavbar extends Component {
	state = { value: '', toDoId: '' };
	addUserIfAdmin = () => {
		return this.props.users.role === 'admin' ? (
			<span>
				<a className='addUserIcon' href='/create'>
					<i className='fas fa-user-plus userIcons' href='/create'></i>
				</a>{' '}
				<span id='add'>Add</span>
			</span>
		) : (
			<span></span>
		);
	};
	handleSelectedToDo = (e) => {
		let select = document.getElementById('select');
		var options = select.options;
		var id = options[options.selectedIndex].id;
		this.props.getToDoWithId(id);
		this.setState({
			value: e.target.value,
			toDoId: id,
		});
		return id;
	};

	deleteToDo = (id) => {
		try {
			console.log('WHYYY BRUH');
			console.log(this.props.todos);

			if (this.props.todos !== undefined) {
				console.log('WHY WOULD U ENTER?');
				id ? this.props.deleteToDo(id) : this.props.deleteToDo(this.props.todos[0]._id);
			}
		} catch (error) {
			console.log('ERR');
		}
	};

	render() {}
}

export default ToDoNavbar;
