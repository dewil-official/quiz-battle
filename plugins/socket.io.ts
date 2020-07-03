import io from 'socket.io-client'
let hostUrl: string = process.env.WS_URL as string
let socket = io(hostUrl)

export default socket
