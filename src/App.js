import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList} from './features/posts/PostsList'
import {AddPostFrom} from './features/posts/AddPostForm'
import {SinglePostPage} from './features/posts/SinglePostPage'
import {EditPostForm} from './features/posts/EditPostForm'
import {UsersList} from './features/users/UsersList'
import {UserPage} from './features/users/UserPage'
import {NotificationsList} from './features/notifications/NotificationsList'
import {AddUserPage} from './features/users/AddUserPage'
import {UpdateUser} from './features/users/UpdateUser'
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostFrom/>
                <PostsList/>
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage}/>
          <Route exact path="/editPost/:postId" component={EditPostForm}/>
          <Route exact path="/users" component={UsersList}/>
          <Route exact path="/addUser" component={AddUserPage}/>
          <Route exact path="/users/:userId" component={UserPage}/>
          <Route exact path="/updateUser/:userId" component={UpdateUser}/>
          <Route exact path="/notifications" component={NotificationsList}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
