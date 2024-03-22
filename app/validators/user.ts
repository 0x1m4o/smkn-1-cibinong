import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const registerValidator = vine.object({
    fullName: vine.string(),
    email: vine.string(),
    password: vine.string(),
})

export const loginValidator = vine.object({
    email: vine.string(),
    password: vine.string(),
})

vine.messagesProvider = new SimpleMessagesProvider({
    required: 'Mohon untuk tidak mengkosongkan field {{ field }}',
    string: 'Field {{ field }} harus bertipe data string',
})