import { Action, createReducer, on } from '@ngrx/store'
import { UserRoles } from 'src/models/user'
import { UserActions } from './user.actions'

export interface UserState {
  role: UserRoles
}

export const userInitialState: UserState = {
  role: UserRoles.NORMAL,
}

const reducer = createReducer(
  userInitialState,
  on(UserActions.setAdminUser, (state) => ({
    ...state,
    role: UserRoles.ADMIN,
  })),
  on(UserActions.setNormalUser, (state) => ({
    ...state,
    role: UserRoles.NORMAL,
  })),
  on(UserActions.toggle, (state) => ({
    ...state,
    role: state.role === UserRoles.NORMAL ? UserRoles.ADMIN : UserRoles.NORMAL,
  }))
)

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return reducer(state, action)
}
