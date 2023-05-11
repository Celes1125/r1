import React, { useState, useEffect } from 'react'

const Lifecicle = () => {
  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)
  useEffect(
    () => {
      console.log('USEEFFECT SIN DEPENDENCIAS: la función se va a ejecutar cada vez que se cargue o cambie un estado del componente')
    }
  )
  useEffect(
    () => {
      console.log('USEEFFECT []: la función se va a ejecutar la primera vez que se cargue el componente y nunca más')
    },
    []
  )

  useEffect(
    () => {
      console.log('USEEFFECT [counter1]: la función se va a ejecutar en la primera carga del componente y cada vez que cambie el estado counter1')
    },
    [counter1]
  )

  useEffect(
    () => {
      console.log('USEEFFECT [counter2]: la función se va a ejecutar en la primera carga del componente y cada vez que cambie el estado counter2')
    },
    [counter2]
  )

  useEffect(
    () => {
      console.log('USEEFFECT [counter1, counter2]: la función se va a ejecutar en la primera carga del componente y cada vez que cambie el estado counter1 o el counter2')
    },
    [counter1, counter2]
  )

  return (
    <div>
        <h1>Clicks C1 : {counter1}</h1>
        <h1>Clicks C2 : {counter2}</h1>
        <button onClick={() => setCounter1(counter1 + 1)}
        >Increment C1</button>
        <button onClick={() => setCounter2(counter2 + 1)}
        >Increment C2</button>
    </div>
  )
}

export default Lifecicle
