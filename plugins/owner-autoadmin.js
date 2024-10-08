let handler = async (m, { conn, participants }) => {
    // Dar admin al usuario
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')

    // Enviar mensaje indicando que ahora eres admin
    await conn.sendMessage(m.chat, 'Creador, ahora es admin', { quoted: m })
}

handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = /^(darmeadmin|autoadmin)$/i

handler.rowner = true
handler.group = true
handler.botAdmin = true

export default handler
