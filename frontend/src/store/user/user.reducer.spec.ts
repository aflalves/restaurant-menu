import { UserRoles } from 'src/models/user'
import { UserActions } from './user.actions'
import { userInitialState, userReducer, UserState } from './user.reducer'

describe('User Reducer', () => {
  let initialState: UserState

  beforeEach(() => {
    initialState = userInitialState
  })

  it('should set the role to admin on setAdminUser', () => {
    const newState = userReducer(initialState, UserActions.setAdminUser())

    expect(newState).toEqual({
      ...initialState,
      role: UserRoles.ADMIN,
    })
  })

  it('should set the role to normal user on setNormalUser', () => {
    const newState = userReducer({ ...initialState, role: UserRoles.ADMIN }, UserActions.setNormalUser())

    expect(newState).toEqual({
      ...initialState,
      role: UserRoles.NORMAL,
    })
  })
})
