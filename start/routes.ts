/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import NotesController from '#controllers/notes_controller'
import router from '@adonisjs/core/services/router'

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
router.resource('/notes', NotesController)
