import React, { Component } from "react";
import axios from "axios";
import "./stylesheets/styles.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from "./middlewares/protectedRoute";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";

import { getTodos, postToDo, patchToDo, getOrderBy } from "./utils/api";
import { delToDo } from "./utils/api";

import CreateToDo from "./components/CreateToDo";
import ToDoContainer from "./components/ToDoContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      selectedTodo: null,
      inputField: "",
      editBtnState: false,
      toggleCreateOrder: false,
      toggleUpdatedOrder: false,
    };
    this.limit = 0;
    this.localHost = "http://localhost:8080/todo/";
  }

  //Application has rendered on the client side
  async componentDidMount() {
    const res = await getTodos(this.localHost);
    this.setState({ todos: res.data });
  }

  //Body posts title & done, then recieves data from end point and updates state.
  createToDo = async (title) => {
    const res = await postToDo(`${this.localHost}create`, title);
    this.setState({ todos: [...this.state.todos, res.data] });
  };

  //Copy current todos array, filter out item being deleted and update state.
  delete = async (id) => {
    const toDoList = [...this.state.todos];
    const newTodos = toDoList.filter((todo) => todo._id !== id);
    await delToDo(`${this.localHost}delete/${id}`);
    this.setState({ todos: newTodos });
  };

  update = async (title) => {
    await patchToDo(
      `${this.localHost}update/${this.state.selectedTodo}`,
      title
    );
    const index = this.state.todos.findIndex(
      (todo) => todo._id === this.state.selectedTodo
    );
    const oldState = [...this.state.todos];
    oldState[index].title = title;

    this.setState({
      todos: oldState,
      selectedTodo: null,
    });
  };

  orderByCreated = async () => {
    if (this.state.toggleCreateOrder) {
      const res = await getOrderBy(`${this.localHost}sort/created${-1}`);
      let oldState = [...this.state.todos];
      oldState = res.data;
      this.setState({
        todos: oldState,
        toggleCreateOrder: false,
      });
    } else if (!this.state.toggleCreateOrder) {
      const res = await getOrderBy(`${this.localHost}sort/created${1}`);
      let oldState = [...this.state.todos];
      oldState = res.data;
      this.setState({
        todos: oldState,
        toggleCreateOrder: true,
      });
    }
  };

  orderByUpdated = () => {
    if (this.state.toggleUpdatedOrder) {
      axios.get(`${this.localHost}sort/lastUpdated${-1}`).then((res) => {
        let oldState = [...this.state.todos];
        oldState = res.data;
        this.setState({
          todos: oldState,
          toggleUpdatedOrder: false,
        });
      });
    } else if (!this.state.toggleUpdatedOrder) {
      axios.get(`${this.localHost}sort/lastUpdated${1}`).then((res) => {
        let oldState = [...this.state.todos];
        oldState = res.data;
        this.setState({
          todos: oldState,
          toggleUpdatedOrder: true,
        });
      });
    }
  };

  paginateFwrd = () => {
    axios.get(`${this.localHost}limit/${this.limit}`).then((res) => {
      let oldState = [...this.state.todos];
      oldState = res.data;
      this.setState({
        todos: oldState,
      });
    });
    this.limit++;
  };

  paginateBckwrd = () => {
    if (this.limit !== 0) {
      this.limit--;
    }
    axios.get(`${this.localHost}limit/${this.limit}`).then((res) => {
      let oldState = [...this.state.todos];
      oldState = res.data;
      this.setState({
        todos: oldState,
      });
    });
  };

  selectTodo = (id) => {
    const editItem = this.state.todos.find((todo) => todo._id === id);
    this.setState({
      selectedTodo: id,
      inputField: editItem.title,
      editBtnState: true,
    });
    let input = document.getElementById("standard-basic");
    input.focus();
  };

  handleBtnState = (editBtnState) => {
    this.setState({ editBtnState });
  };

  complete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo._id === id) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/create" component={CreateAccount} />
              <ProtectedRoute
                exact={true}
                path="/"
                component={
                  ((
                    <ToDoContainer
                      todos={this.state.todos}
                      complete={this.complete}
                      delete={this.delete}
                      selectTodo={this.selectTodo}
                      orderByCreated={this.orderByCreated}
                      toggleCreateOrder={this.state.toggleCreateOrder}
                      orderByUpdated={this.orderByUpdated}
                      toggleUpdatedOrder={this.state.toggleUpdatedOrder}
                      paginateFwrd={this.paginateFwrd}
                      paginateBckwrd={this.paginateBckwrd}
                    />
                  ),
                  (
                    <CreateToDo
                      createToDo={this.createToDo}
                      update={this.update}
                      selectedTodo={this.state.selectedTodo}
                      inputField={this.state.inputField}
                      editBtnState={this.state.editBtnState}
                      handleBtnState={this.handleBtnState}
                    />
                  ))
                }
              />
              <ProtectedRoute component={Login} />

              {/* <ToDoContainer
                todos={this.state.todos}
                complete={this.complete}
                delete={this.delete}
                selectTodo={this.selectTodo}
                orderByCreated={this.orderByCreated}
                toggleCreateOrder={this.state.toggleCreateOrder}
                orderByUpdated={this.orderByUpdated}
                toggleUpdatedOrder={this.state.toggleUpdatedOrder}
                paginateFwrd={this.paginateFwrd}
                paginateBckwrd={this.paginateBckwrd}
              />

              <CreateToDo
                createToDo={this.createToDo}
                update={this.update}
                selectedTodo={this.state.selectedTodo}
                inputField={this.state.inputField}
                editBtnState={this.state.editBtnState}
                handleBtnState={this.handleBtnState}
              /> */}
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
