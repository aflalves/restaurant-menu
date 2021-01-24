import { Action, ActionReducer } from '@ngrx/store'
import { StateKey } from 'src/models/state'
import { AppState } from './app.store'

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: AppState, action: Action): ActionReducer<any> => {
    console.groupCollapsed(`%c[ACTION] ${action.type}`, getActionColor(action.type))

    console.log('%cAction', 'font-weight: 700', action)
    console.log('%cState', 'font-weight: 700', state)
    console.groupEnd()

    return reducer(state, action)
  }
}

function getActionColor(actionType: string): string {
  if (actionType.includes('@ngrx')) {
    return 'color: #b527c2;'
  }

  if (actionType.includes(StateKey.USER)) {
    return 'color: #d6330b;'
  }

  if (actionType.includes(StateKey.CATEGORIES)) {
    return 'color: #25c438;'
  }

  if (actionType.includes(StateKey.ITEMS)) {
    return 'color: #3e6db5;'
  }
}
