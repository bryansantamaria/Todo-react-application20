import React, { Component } from 'react';
import ToDoItem from './ToDoItem';
import CreateItem from './CreateItem';
import CreateToDo from './CreateTodo';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	NativeSelect,
} from '@material-ui/core';

class ItemContainer extends Component {
	state = { value: '', toDoId: '' };

	toggleCreatedArrow = () => {
		return this.props.toggleCreateOrder ? (
			<span className='arrow'>&uarr;</span>
		) : (
			<span className='arrow'>&darr;</span>
		);
	};
	toggleUpdatedArrow = () => {
		return this.props.toggleUpdatedOrder ? (
			<span className='arrow'>&uarr;</span>
		) : (
			<span className='arrow'>&darr;</span>
		);
	};

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

	render() {
		return (
			<div className='ItemContainer'>
				<div id='ItemHeader'>
					<i className='fas fa-user userIcons' id='user'>
						{' '}
					</i>
					<span id='userOnline'>
						{' '}
						Hi {this.props.users.name} ({this.props.users.role})
					</span>
					<CreateToDo createToDo={this.props.createToDo} />
					<div id='selectContainer'>
						<label htmlFor='select' id='selectLabel'>
							Select Todo-list
							<NativeSelect
								id='select'
								value={this.state.title}
								onChange={this.handleSelectedToDo}
								selected='selected'
							>
								{' '}
								{this.props.todos.map((todo) => (
									<option key={todo._id} value={todo.title} id={todo._id}>
										{todo.title}
									</option>
								))}
							</NativeSelect>
						</label>
					</div>
					<div id='userGrid'>
						{this.addUserIfAdmin()}
						<a id='logoutBtn' href='/auth'>
							<i className='fas fa-sign-out-alt'></i>
						</a>
						<span id='logout'>Logout</span>
					</div>
				</div>

				<Paper id='container'>
					<TableContainer component={Paper} style={{ maxHeight: '70vh' }}>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									<TableCell>
										<h3>Title</h3>
									</TableCell>
									<TableCell align='right'>
										<span className='orderBy' onClick={() => this.props.orderByCreated()}>
											<h3>Created {this.toggleCreatedArrow()}</h3>
										</span>
									</TableCell>
									<TableCell align='right'>
										<span className='orderBy' onClick={() => this.props.orderByUpdated()}>
											<h3>Last Updated {this.toggleUpdatedArrow()}</h3>
										</span>
									</TableCell>
									<TableCell align='right'></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.toDoItems.map((Item) => (
									<ToDoItem
										key={Item._id}
										Item={Item}
										complete={this.props.complete}
										delete={this.props.delete}
										selectItem={this.props.selectItem}
									/>
								))}
							</TableBody>
						</Table>
						<div className='bottomNavigator'>
							<span className='paginationSpan'>{this.props.toDoItems.length} items</span>
							<button type='button' className='paginationBtn' onClick={this.props.paginateFwrd}>
								&rarr;
							</button>
							<button type='button' className='paginationBtn' onClick={this.props.paginateBckwrd}>
								&larr;
							</button>
						</div>
					</TableContainer>
					<CreateItem
						createItem={this.props.createItem}
						update={this.props.update}
						selectedItem={this.props.selectedItem}
						inputField={this.props.inputField}
						editBtnState={this.props.editBtnState}
						handleBtnState={this.props.handleBtnState}
					/>
				</Paper>
			</div>
		);
	}
}

export default ItemContainer;
