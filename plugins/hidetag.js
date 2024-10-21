import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id)) // Obtener ID de los participantes
    let q = m.quoted ? m.quoted : m // Si el mensaje está cotizado, úsalo
    let c = m.quoted ? m.quoted : m.msg // Mensaje cotizado o mensaje original
    
    // Verifica si el mensaje cotizado tiene contenido multimedia
    const contentType = q.mtype // Tipo de contenido
    let msg

    if (contentType === 'imageMessage' || contentType === 'videoMessage' || contentType === 'documentMessage') {
        // Si es imagen, video o documento, genera el mensaje con el contenido multimedia
        msg = conn.cMod(m.chat,
            generateWAMessageFromContent(m.chat, {
                [q.mtype]: q.toJSON() // Serializar el contenido multimedia
            }, {
                quoted: m, // Citar el mensaje original
                userJid: conn.user.id, // ID del bot
            }),
            text || q.text, conn.user.jid, { mentions: users }
        )
    } else {
        // Si es texto, simplemente usa el mensaje de texto
        msg = conn.cMod(m.chat,
            generateWAMessageFromContent(m.chat, {
                [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
                    text: c || ''
                }
            }, {
                quoted: m,
                userJid: conn.user.id,
            }),
            text || q.text, conn.user.jid, { mentions: users }
        )
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
