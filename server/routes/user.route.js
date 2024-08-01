import express from 'express'
import { deleteUser, signout, test, updateUser, getUsers, getPublicUserInfo } from '../controllers/user.controller.js'
import { checkUser } from '../utils/checkUser.js'

const router = express.Router()

router.get('/test', test)
router.patch('/update/:userId', checkUser, updateUser)
router.delete('/delete/:userId', checkUser, deleteUser)
router.post('/signout', signout)
// Protected for Admin dashboard
router.get('/getUsers', checkUser, getUsers);
// Non protected
router.get('/public/:userId', getPublicUserInfo);

export default router