import axios from 'axios'
import { useState } from 'react'

export default function Client() {
  // const [numberMesa, setNumberMesa] = useState(null)
  // const [requests, setRequests] = useState([])

  function callWaiter() {
    const urlParams = new URLSearchParams(window.location.search)
    var number = urlParams.get('number')
    // console.log(number)

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
    // axios.get('http://localhost:3003/mesas')
    //   .then(response => {
    //     setRequests(response.data)
    //     var req = response.data
    //   })

    // console.log(req)

    //fazer essa verificação na api


    // requests.forEach(request => {
    //   if(request.num_mesa == +number){
    //     if(request.pending){
    //       console.log('incluso')
    //       return
    //     }else{
          axios.post('http://localhost:3003/add', data)
    //     }
        
    //   }else{
    //     axios.post('http://localhost:3003/add', data)

    //   }
    // })
    
    

/*
    if(requests.length != 0){
      var achou = false
      console.log('1')
      requests.forEach(request => {
        // console.log('incluso ' + requests.includes(data))
  
        console.log('2')
        if(request.num_mesa == number && request.pending == true){
          console.log(requests)
          achou = true
          
          // return true
        }
        
      })
      if(!achou){
        console.log('oo')
        axios.post('http://localhost:3003/add', data)
      }
    }else{
      console.log('3')

      axios.post('http://localhost:3003/add', data)
    }
    console.log('4')



    // if(!existe){

    // }
    */

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
