import { configureStore} from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

const myLoggerMiddleware = storeAPI => next => action => {  
  console.log('Dispatching: ',action)
  console.time('dispatch')
  const result = next(action)
  console.log('Dispatch done in:')
  console.timeEnd('dispatch')
  console.log('Result: ',result)
  return result
}

export default configureStore({
  reducer: {
    posts:postsReducer,
    users:usersReducer,
    notifications:notificationsReducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().prepend(myLoggerMiddleware)
})
