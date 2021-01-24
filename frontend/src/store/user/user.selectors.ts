import { createFeatureSelector, createSelector } from '@ngrx/store'
import { StateKey } from 'src/models/state'
import { UserRoles } from 'src/models/user'
import { UserState } from './user.reducer'

export namespace fromUser {
  const state = createFeatureSelector<UserState>(StateKey.USER)

  export const isAdmin = createSelector(state, s => s.role === UserRoles.ADMIN)
  export const isNormal = createSelector(state, s => s.role === UserRoles.NORMAL)
}
