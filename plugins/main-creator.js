let handler = async (m, { conn, usedPrefix, isOwner }) => {
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Rengel7;;\nFN:Rengel7\nORG:Rengel7\nTITLE:\nitem1.TEL;waid=972527282076:972527282076\nitem1.X-ABLabel:Rengel7\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Rengel7\nEND:VCARD`
    await conn.sendMessage(m.chat, { contacts: { displayName: 'Rengel7', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
