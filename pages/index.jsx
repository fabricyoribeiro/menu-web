import { Inter, Averia_Sans_Libre } from 'next/font/google'
import {useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
import { io } from 'socket.io-client'
const avaria = Averia_Sans_Libre({
  subsets: ['latin'], 
  weight: ['300', '400', '700']
})
// import _ from 'lodash';


export default function Home() {
  const [requests, setRequests] = useState([])

  useEffect(
    () => {
      const socket = io('https://menu-api-fcoy.onrender.com');
      socket.connect();
      socket.on('request', data => {
      // console.log(data)
      setRequests(data)
    })      
      return () => {
        socket.disconnect();
      }
    },
    []
  )

  
  
//   const sendMessage = _.throttle((message) => {

//     const socket = io('http://localhost:4000')
//   // envia a mensagem para o servidor
//     socket.on('request', data => {
//       // console.log(data)
//       setRequests(data)
//     })
//   }, 1000); // limite de 1 envio por segundo

// // chamando a função
// sendMessage('Olá!');



  function updateStatus(num_mesa) {
    socket.emit('update', num_mesa)
  }

  return (
    <div
      className="w-full max-w-xl h-screen mx-auto
     bg-[#DBD5C6]"
    >
      <header className="bg-[#DBB44F] h-16 flex items-center justify-center text-5xl font-bold text-[#57471C] font-manuscrita">
        Catulé
      </header>
      <h1 className={`h-32 flex justify-center items-center text-[#57471C] text-2xl ${avaria.className}`}>
        SOLICITAÇÕES DE GARÇOM
      </h1>
      <ul className="divide-y divide-[#9F8D60]">
        {requests.map(request => {
          if (request.pending) {
            return (
              <li
                className={`${avaria.className} odd:bg-[#DBCFAF] even:bg-[#DBD5C6] pl-4 text-[#57471C] text-2xl flex justify-between`}
                key={request.num_mesa}
              >
                <span className='py-4 '> Mesa {request.num_mesa} </span>
                <span className='py-4 '>
                  {request.hour}:{request.minutes}
                </span>

                <button
                  className='bg-[#EAC669] w-[25%] flex items-center justify-center pl-5  rounded-l-full '
                  onClick={() => {
                    updateStatus(request.num_mesa)
                  }}
                >
                  <div className='w-full'>
                    <svg
                    className='w-full h-full '
                    version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="676.000000pt" height="415.000000pt" viewBox="0 0 676.000000 415.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g  transform="translate(0.000000,415.000000) scale(0.100000,-0.100000)"
                    fill="#453814" stroke="none">
                    <path d="M2610 3989 c-114 -23 -221 -105 -268 -207 -24 -50 -27 -69 -27 -157
                    0 -87 4 -107 27 -157 72 -154 246 -240 415 -204 79 16 133 46 194 107 115 115
                    132 321 38 463 -76 115 -243 183 -379 155z"/>
                    {/* <path d="M6710 3591 c-5 -11 -10 -29 -10 -40 0 -31 38 -28 46 4 12 47 -15 74
                    -36 36z"/> */}
                    <path d="M1755 3244 c-273 -37 -426 -116 -648 -333 -139 -136 -172 -191 -172
                    -286 1 -147 99 -245 245 -245 97 0 132 22 283 168 144 140 175 162 256 186 60
                    18 151 21 151 6 0 -17 -182 -565 -190 -570 -4 -3 -98 -211 -210 -462 l-203
                    -458 -247 0 c-268 0 -312 -6 -374 -54 -117 -89 -113 -310 6 -396 65 -47 112
                    -52 468 -48 l325 3 67 33 c114 56 151 107 262 368 53 122 99 229 102 237 3 9
                    -2 18 -13 21 -10 4 -34 20 -53 37 l-35 31 45 -31 c25 -16 191 -121 370 -233
                    l326 -203 -102 -350 c-114 -388 -122 -437 -83 -520 44 -93 117 -139 224 -139
                    101 0 179 45 221 126 8 15 67 216 131 445 103 368 117 428 117 498 1 70 -3 88
                    -30 145 -52 108 -91 142 -346 300 l-234 144 113 301 c143 379 128 347 142 310
                    94 -250 299 -443 531 -500 87 -21 338 -31 411 -16 117 25 189 116 189 240 -1
                    105 -43 176 -131 222 -38 19 -65 23 -194 28 -225 9 -267 36 -344 220 -54 128
                    -129 251 -203 334 -98 111 -254 215 -403 270 -114 42 -383 125 -475 146 -85
                    20 -238 33 -295 25z"/>
                    </g>
                    </svg>
                  </div>
                </button>
              </li>
            )
          }
          return ''
        })}
      </ul>
    </div>
  )
}
