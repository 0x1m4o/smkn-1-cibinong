import Note from '#models/note'
import { noteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'
import vine, { errors } from '@vinejs/vine'

export default class NotesController {
  /**
   * Display a list of resource (Read All)
   */
  async index({ response }: HttpContext) {
    var notes = await Note.query()

    return response.ok({ data: notes })
  }

  /**
   * Handle form submission for the create action (Create)
   */
  async store({ request, response }: HttpContext) {
    try {
      // Belum Divalidasi
      const data = request.all()

      // Sudah divalidasi
      const validator = vine.compile(noteValidator)
      const validateData = await validator.validate(data)

      var notes = await Note.create({
        judul: validateData.judul,
        isi: validateData.isi,
      })

      return response.ok({ message: 'Berhasil buat notes', data: notes })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // var errorMessages = []
        // for (let index = 0; index < error.messages.length; index++) {
        //   errorMessages.push(error.messages[index].message)
        // }

        // return response.badRequest({ messages: errorMessages })

        return response.badRequest({ messages: error.messages })
      }
      return response.badRequest("Something wen't wrong")
    }
  }

  /**
   * Show individual record (Read Single)
   */
  async show({ response, params }: HttpContext) {
    var notes = await Note.findByOrFail('id', params.id)
    return response.ok({ data: notes })
  }

  /**
   * Handle form submission for the edit action (Update)
   */
  async update({ request, response, params }: HttpContext) {
    try {
      const data = request.all()

      // Sudah divalidasi
      const validator = vine.compile(noteValidator)
      const validateData = await validator.validate(data)

      var notes = await Note.findByOrFail('id', params.id)

      notes.merge(validateData).save()

      return response.ok({ message: `Berhasil Update Notes ke ${params.id}`, data: notes })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest({ messages: error.messages })
      }

      return response.badRequest({ messages: "Something wen't wrong" })
    }
  }

  /**
   * Delete record
   */
  async destroy({ response, params }: HttpContext) {
    var notes = await Note.findByOrFail('id', params.id)

    await notes.delete()

    return response.ok({ message: `Berhasil Delete Notes ke ${params.id}` })
  }
}
