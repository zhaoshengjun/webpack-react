import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoList from '../components/TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos, getIsFetching } from '../reducers';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }
  
  fetchData() {
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter).then(() => console.log('done!'));
  }

  render() {
    const { toggleTodo, todos, isFetching} = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    return (
      <TodoList 
        todos={todos}
        onTodoClick={toggleTodo} 
        />
    );
  }
}

const mapStateToProps = (state, {params}) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter  
  }};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;