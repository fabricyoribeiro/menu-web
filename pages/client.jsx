import { io } from 'socket.io-client'
export default function Client() {

  useEffect(
    () => {
      const socket = io('https://menu-api-fcoy.onrender.com:4000');
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


    socket.emit('request', data)

  }

  return (
    <div>
      <label htmlFor="">Digite o número da mesa:</label>
      <input
        className="border-2 border-black"
        type="number"
        name=""
        id=""
        onChange={e => {
          setNumberMesa(e.target.value)
        }}
      />
      <button onClick={callWaiter}>Chamar garçom</button>
    </div>
  )
}
