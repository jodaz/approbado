import request from 'request'
import { Fcm } from '../models'

export const sendNotification = async (data,ids) => {

  const tokens = await Fcm.query().select('fcms.token').whereIn('user_id',ids)

  if (tokens === undefined ) {
    return false
  }
  
  let fcms = []

  tokens.forEach(token => {
    fcms.push(token.token)
  })
  
  let send = {
        'notification': {
          'title': data.title,
          'body': data.body 
        },
        data : data.data,
        'registration_ids': fcms,
        "priority": "high"
      }

  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': 'key=AAAAnGbnFjQ:APA91bEWjTs4SwVAgHvvU5kOWn3TpUDyT-QZ7DQKUjMhYdrXMaL3cJK9u_o8ihkOUQFGkLFgKd2XD5kPaCwXppBpEGdGDVGJH6pHp5VZUdDTv_QEuW5qQry62myDZfjMQjybZ78Ei7Lo', // <- aqui puedes pasar el resultado de tu función que calcula el token
    },
    body: JSON.stringify(send)
  }, function(error, response, body) {
    if (error) { 
      console.error(error, response, body); 
    }
    else if (response.statusCode >= 400) { 
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
    }
    else {
      console.log(response)
    }
  })
}
