import { createAction } from '@ngrx/store'
import { StateKey } from 'src/models/state'

const STORE = StateKey.CATEGORIES

export namespace UserActions {
  export const setNormalUser = createAction(`[${STORE}] Set Normal User`)
  export const setAdminUser = createAction(`[${STORE}] Set Admin User`)
  export const toggle = createAction(`[${STORE}] Toggle User Role`)
}
