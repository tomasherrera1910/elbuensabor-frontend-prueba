import React, { useEffect, useState } from 'react';
import postMercadopago from '../../utils/mercadopago';



export default function MercadopagoCheckOut({data, id}){
 
 const [preferenceId, setPreferenceId] = useState(null)
 useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    postMercadopago(data)
    .then((order) => {
      setPreferenceId(order.preferenceId)
    })
  }, [id, data])

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
      script.setAttribute('data-preference-id', preferenceId)
      const form = document.getElementById(id)
      form.appendChild(script)
    }
  }, [preferenceId, id])

  return (
    <form id={id} method="GET" target='_blank'/>
  )
}
