import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import vine, { errors } from '@vinejs/vine'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}


  /**
   * Handle form submission for the create action
   */
  async register({ request, response }: HttpContext) {
    try {
      // Belum Divalidasi
      const data = request.all()
      
      // Sudah divalidasi
      const validator = vine.compile(registerValidator)
      const validatedData = await validator.validate(data)
      
      // Cek apakah user ada
      const isUserExist = await User.query().where('email', validatedData.email).first()

      // Kalau user sudah ada
      if (isUserExist) {
        return response.abort({message: "User sudah ada"})
      }

      // Buat hash untuk password 
      validatedData.password = await hash.make(validatedData.password)
      
      // Kalau user belum ada, buat usernya.
      var user = await User.create(validatedData)
      const token = await User.accessTokens.create(user)

      return response.ok({ message: 'Berhasil buat akun', data: token.value!.release() })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest({ messages: error.messages })
      }
      return response.badRequest("Something wen't wrong")
    }
  }


  async login({ request, response }: HttpContext) {
    try {
      // Belum Divalidasi
      const data = request.all()
      
      // Sudah divalidasi
      const validator = vine.compile(loginValidator)
      const validatedData = await validator.validate(data)
      
      // Cek apakah user ada
      const user = await User.query().where('email', validatedData.email).first()

      // Kalau user gak ada
      if (!user) {
        return response.json({message: "User tidak ditemukan"})
      }

      // Cek apakah password yang ada ditabase sama dengan password yang dikirim oleh user.
      if (!(await hash.verify(user.password, validatedData.password))) {
        return response.unauthorized({message: "Password salah"})

      }
      const token = await User.accessTokens.create(user)

      return response.ok({ message: 'Berhasil login', data: token.value!.release() })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest({ messages: error.messages })
      } else if (error.message != null) {
        return response.json({message: error.message})
      }

      return response.badRequest({message: "Something wen't wrong"})
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({  }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}