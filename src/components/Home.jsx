import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Todo from './partials/Todo'
import AddTodo from './partials/AddTodo'
import { useNavigate } from 'react-router-dom';
import { getTodoListApi, getToken } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

function Home() {

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if(searchText === '') {
      setFilteredList(list);
    } else {
      const filterList = list.filter(todo => todo.desc.includes(searchText.trim()));
      setFilteredList(filterList);
    }
  },[list, searchText])

  useEffect(() => {
    if(!getToken()) {
      navigate('/login');
    }
    fetchTodoList()
  },[refreshList]);

  async function fetchTodoList() {
    const result = await getTodoListApi()
    if(result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse())
    }
  }

  return (
    <>
      <Header searchText = {searchText} setSearchText = {setSearchText} />
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {
            filteredList.map((todo) => <Todo todo = {todo} key={todo._id} setRefreshList={setRefreshList} />)
          }
          {
            filteredList.length === 0 && <div className="notFound">
              No todo Found
            </div>
          }
        </div>
      </div>
      <div className='' style={{position: 'fixed', right: 50, bottom: 50, zIndex: 1030}}>
        <button type='button'
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className='btn btn-outline-light'
        >
            Add
        </button>
      </div>
    <AddTodo setRefreshList={setRefreshList}/>
    </>
  )
}

export default Home
