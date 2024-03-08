import Note from '#models/note'
import type { HttpContext } from '@adonisjs/core/http'

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
    const data = request.body()

    var notes = await Note.create({
      judul: data.judul,
      isi: data.isi,
    })

    return response.ok({ message: 'Berhasil buat notes', data: notes })
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
    const data = request.body()

    var notes = await Note.findByOrFail('id', params.id)

    notes.merge(data).save()

    return response.ok({ message: `Berhasil Update Notes ke ${params.id}`, data: notes })
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
