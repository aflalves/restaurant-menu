import { UserRoles } from 'src/models/user'
import { fromUser } from './user.selectors'

describe('User Selectors', () => {
  describe('isAdmin', () => {
    it('should return true if user role is admin', () => {
      expect(fromUser.isAdmin.projector({ role: UserRoles.ADMIN })).toEqual(true)
    })

    it('should return false if user role is not admin', () => {
      expect(fromUser.isAdmin.projector({ role: UserRoles.NORMAL })).toEqual(false)
    })
  })

  describe('isNormal', () => {
    it('should return true if user role is normal', () => {
      expect(fromUser.isNormal.projector({ role: UserRoles.NORMAL })).toEqual(true)
    })

    it('should return false if user role is not normal', () => {
      expect(fromUser.isNormal.projector({ role: UserRoles.ADMIN })).toEqual(false)
    })
  })
})
