/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import NotesController from '#controllers/notes_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', () => 'Hello World')

// CRUD
// Create
// router.post('/notes', [NotesController, 'create'])
// Read
// router.get('/notes', [NotesController, 'index'])
// Update
// router.put('/notes', [NotesController, 'update'])
// Delete
// router.delete('/notes', [NotesController, 'destroy'])

// Resource
router.group(()=>{
    router.resource('/notes', NotesController)
}).use(
    // Middleware akan dieksekusi sebelum controller dieksekusi 
    middleware.auth({guards: ['api']})
)


router.group(()=>{
    // /users/register
    router.post('/register', [UsersController, 'register'])

    // /users/login
    router.post('/login', [UsersController, 'login'])

}).prefix('/users')

