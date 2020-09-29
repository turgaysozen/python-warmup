import React from 'react';
import './App.css';
import Login from './components/login'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        task: '',
        is_completed: false,
        user: '',
        uname:'',
        psw:'',        
        credentials: { username: '', password: '' },
      },
      activateItembyTag: {
        task: '',
        tag: ''
      },
      editing: false,
      usertoken: ''
    }

    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTagSubmit = this.handleTagSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  };

  // get cookie for csrftoken
  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  componentWillMount() {
    if (this.state.user !== undefined) {
      this.fetchTasks()
    }
  }

  // fetch tasks
  fetchTasks() {
    console.log('I fell it coming')
    fetch(`http://127.0.0.1:8000/api/task-list/${this.state.user}/`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          todoList: data,
        }),
      )
  }

  handleChange(e) {
    //var name = e.target.name
    var value = e.target.value
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        task: value
      }
    })
  }

  // submit task
  handleSubmit(e) {
    e.preventDefault()
    console.log('New Task: ', this.state.activeItem)
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/task-create/${this.state.user}/`
    if (this.state.editing) {
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`
      this.setState({
        editing: false
      })
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((res) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id: null,
          task: '',
          is_completed: false
        },
      })
    }).catch(function (err) {
      console.log('ERROR:', err)
    })
  }

  // TODO check inputs value
  handleTagChange(e) {
    var value = e.target.value
    var tag_id = parseInt(e.target.id.split('_')[1])
    this.setState({
      activateItembyTag: {
        ...this.state.activateItembyTag,
        tag: value,
        task: tag_id
      },
    })
  }

  // submit tag
  handleTagSubmit(e) {
    e.preventDefault()
    console.log('New Tag: ', this.state.activateItembyTag)
    var csrftoken = this.getCookie('csrftoken');
    var url = 'http://127.0.0.1:8000/tag/tag-create/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(this.state.activateItembyTag)
    }).then((res) => {
      this.setState({
        activateItembyTag: {
          task: '',
          tag: ''
        },
      })
      this.fetchTasks()
    }).catch(function (err) {
      console.log('ERROR:', err)
    })
  }

  // edit task
  startEdit(task) {
    this.setState({
      activeItem: task,
      editing: true
    })
  }

  // delete task
  deleteItem(task) {
    var csrftoken = this.getCookie('csrftoken');
    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    }).then((res) => {
      this.fetchTasks()
    })
  }

  // changes task status
  changeStatus(task) {
    console.log(task.is_completed)
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ 'is_completed': !task.is_completed, 'task': task.task, 'user': this.state.user })
    }).then((res) => {
      this.fetchTasks()
    }).catch(function (err) {
      console.log('ERROR:', err)
    })
  }

  userLogin = (token, username, password) => {
    this.setState({
      user: token,
      uname:username,
      psw:password,
    })
    this.fetchTasks()
  }

  // pdf button click
  printPDF(task_id) {
    window.open(`http://127.0.0.1:8000/api/pdf/${task_id}/`)    
  }

  render() {
    var tasks = this.state.todoList
    var self = this
    var token = this.state.user
    return (
      <div className="container-fluid text-dark">
        <Login userLogin={this.userLogin} />
        {token !== '' && token !== undefined ? (
          <div id="task-container">
            <div id="form-wrapper" className="row bg-light pl-5 pr-5 pt-1 pb-1 mb-3">
              <div className="col-8 offset-2">
                <form onSubmit={this.handleSubmit} id="form_task">
                  <div className="form-group mt-3">
                    <input onChange={this.handleChange} value={this.state.activeItem.task} autoComplete="off" id="task" name="task" type="text" className="form-control" placeholder="Task to be done.." />
                  </div>
                </form>
                <small className="form-text text-muted text-center"><b>🛎️ Tip:</b> Please press <kbd>↵</kbd> key to automaticly create a task.</small>
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <div id="list-wrapper" className="row">
              <div className="col-8 offset-2">
                <ul className="list-group list-group-flush">
                  {tasks.map(function (task, index) {
                    var created_time = task.created_at.split('T')[1].split(':')[0] + ':' + task.created_at.split('T')[1].split(':')[1] + ', ' + task.created_at.split('T')[0]

                    // var date_now = new Date()
                    // var date_iso = date_now.toISOString()


                    // console.log('created:', task.created_at)
                    // console.log('iso:', date_iso)

                    // var diff_date = date_iso - task.created_at

                    // console.log('diff: ', diff_date)

                    return (
                      <li key={index} className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <div className="text-center" style={{ minWidth: '80px', alignSelf: 'center' }}>
                            <input checked={task.is_completed} onChange={() => self.changeStatus(task)} type="checkbox" data-toggle="toggle" data-on="<b>&check;</b>" data-onstyle="success" data-off="&check;" data-style="fast" /></div>
                          <div id={`single_task_${task.id}`} onClick={() => self.changeStatus(task)} className="pl-3 pr-3" style={{ textAlign: 'justify', fontSize: '24px', cursor: 'pointer', maxWidth: '780px' }}>
                            {!task.is_completed ? <span>{task.task}</span> : <strike>{task.task}</strike>}
                            <div style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '15px' }}>Tags: <span style={{ color: 'red' }}>{task.tags}</span></div>
                          </div>
                          <div className="text-center" style={{ borderLeft: '1px solid whitesmoke', minWidth: '100px', alignSelf: 'center' }}>
                            <button onClick={() => self.printPDF(task.id)} style={{color:'red'}}>PDF</button><br></br>
                            <small>Created At: {created_time}</small><br />
                            <button style={{ fontSize: '18px' }} onClick={() => self.startEdit(task)} type="button" className="btn btn-sm btn-link btn-delete"><small>Edit</small></button>|<button style={{ fontSize: '18px' }} onClick={() => self.deleteItem(task)} type="button" className="btn btn-sm btn-link btn-delete"><small>Delete</small></button></div>
                        </div>
                        <form style={{ marginTop: '20px' }} onSubmit={self.handleTagSubmit}>
                          <input style={{ height: '30px', fontSize: '14px' }} value={task.id === self.state.activateItembyTag.task ? self.state.activateItembyTag.tag : ''} onChange={self.handleTagChange} autoComplete="off" id={`tag_${task.id}`} name={`tag_${task.id}`} type="text" className="form-control" placeholder="add tag (separate by comma)" />
                        </form>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : <div style={{ marginLeft: '20%', fontSize: '25px', marginTop: '30px', fontStyle: 'italic', color: 'red' }}>
            If you have an account you can LOGIN, If you don't have one you can REGISTER and create tasks.
          </div>}
      </div>
    )
  }
}

export default App;
