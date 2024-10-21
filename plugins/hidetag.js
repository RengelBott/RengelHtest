import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id)) // Obtener ID de los participantes
    let q = m.quoted ? m.quoted : m // Si el mensaje está cotizado, úsalo
    let msg

    // Verifica si el mensaje cotizado tiene contenido multimedia o es texto
    if (q.mtype === 'imageMessage' || q.mtype === 'videoMessage' || q.mtype === 'documentMessage' || q.mtype === 'stickerMessage') {
        // Si es imagen, video, documento o sticker, envía el contenido multimedia
        msg = generateWAMessageFromContent(m.chat, {
            [q.mtype]: q.message[q.mtype]
        }, {
            quoted: m,
            userJid: conn.user.id,
            mentions: users
        })
    } else {
        // Si es texto, utiliza la estructura de mensaje de texto
        msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: text || q.text || '',
                mentions: users
            }
        }, {
            quoted: m,
            userJid: conn.user.id,
        })
    }

    // Enviar el mensaje
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['hidetag']
handler.tags = ['group']
handler.command = ['hidetag', 'n', 'noti', 'aviso', 'notify'] 
handler.group = true
handler.admin = true

export default handler
