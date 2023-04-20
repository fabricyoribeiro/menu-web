import { useEffect } from 'react';
import { io } from 'socket.io-client'
export default function Client() {

  useEffect(
    () => {
      const socket = io('https://menu-api-fcoy.onrender.com');
      socket.connect();
    //   socket.on('request', data => {
    //   // console.log(data)
    //   setRequests(data)
    // })      
      return () => {
        socket.disconnect();
      }
    },
    []
  )


  function callWaiter() {
    const urlParams = new URLSearchParams(window.location.search)
    var number = urlParams.get('number')

    const now = new Date()
    var hour = now.getHours()

    var minutes = now.getMinutes()

    console.log(hour, minutes)

    var data = {
      num_mesa: +number,
      hour: hour,
      minutes: minutes,
      pending: true
    }

    const socket = io('https://menu-api-fcoy.onrender.com');


    socket.emit('request', data)

  }

  return (
    <div>

      <button onClick={callWaiter}>Chamar garçom</button>
    </div>
  )
}
