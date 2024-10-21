import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id)) // Obtener ID de los participantes
    let q = m.quoted ? m.quoted : m // Si el mensaje está citado, úsalo
    let msg

    // Verificar si el mensaje tiene un tipo multimedia
    if (q && q.mtype) {
        const messageType = q.mtype // Obtener el tipo de mensaje citado

        // Verificar si el mensaje citado es multimedia (imagen, video, documento, sticker)
        if (['imageMessage', 'videoMessage', 'documentMessage', 'stickerMessage'].includes(messageType)) {
            msg = generateWAMessageFromContent(m.chat, {
                [messageType]: q.message[messageType]
            }, {
                quoted: m,
                userJid: conn.user.id,
                mentions: users
            })
        } else {
            // Si no es multimedia, enviar como texto
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
    } else {
        // Si no hay un mensaje citado válido, envía solo texto
        msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: text || 'Mensaje no reconocido',
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
