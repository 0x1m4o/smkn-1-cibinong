import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const noteValidator = vine.object({
  judul: vine.string(),
  isi: vine.string(),
})

vine.messagesProvider = new SimpleMessagesProvider({
  required: 'Mohon untuk tidak mengkosongkan field {{ field }}',
  string: 'Field {{ field }} harus bertipe data string',
})
