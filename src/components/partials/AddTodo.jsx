import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTodo } from '../../services/api';

function AddTodo({ setRefreshList }) {

    const [todoDesc, setTodo] = useState('');

    const handleTodoSubmit = async () => {
        console.log(todoDesc);
        if(todoDesc === '') {
            toast('Todo is required');
            return;
        }
        const result = await createTodo({desc: todoDesc});

        if(result.status === 200 && result.data.status === 200) {
            toast('Todo Added');
            setRefreshList(new Date());
            setTodo('');
        } else {
            toast(result.data.message);
        }
    }

  return (
    <>
      <div className="modal mt-5" id='exampleModal'>
        <div className="modal-dialog" role='document'>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">Add New Todo</div>
                    <button type='button' className='btn-close'
                    data-bs-dismiss="modal"
                    aria-label='close'>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <textarea name=""
                        className='form-control'
                        rows={3}
                        onChange={(e) => {setTodo(e.target.value)}}
                        placeholder='Write todos...'
                        ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className='btn btn-secondary'onClick={handleTodoSubmit} data-bs-dismiss = "modal">Save Todo</button>
                    <button className='btn btn-secondary' data-bs-dismiss = "modal" onClick={() => {setTodo('')}}>Close</button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default AddTodo
