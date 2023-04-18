import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [requests, setRequests] = useState([])
  const [status, setStatus] = useState(true)

  setInterval(()=> {
    alterStatus()
  }, 2000)

  useEffect(() => {
    axios.get('https://menu-api-hosz.onrender.com/requests')
    .then(response => setRequests(response.data))
  }, [status])

  function alterStatus(){
    status? setStatus(false) : setStatus(true)
  }

  function updateStatus(num_mesa){
    axios.put('https://menu-api-hosz.onrender.com/update', {
      num_mesa: num_mesa
    })
  }

  return (
    <ul>
      <li>Pedidos</li>
      {
        requests.map((request) => {
          if(request.pending){
            return (
              <li key={request.num_mesa}>Novo chamado: Mesa {request.num_mesa} | {request.hour}:{request.minutes} Pendente: {request.pending? 'Sim' : 'Não'} 
              <button onClick={() => {
                updateStatus(request.num_mesa)
              }}>Ok</button></li>
            )
          }
          return ''
        })
      }
    </ul>
  )
}
