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
      'Authorization': 'key=AAAAnGbnFjQ:APA91bHlUFbFA5f0ELSf9Qe5OYiWBg4RwMYhbZ20NmA6NdVPYr4Sahr2benC62xRMV0MuBDJHHH4ivOcFV_yJL0EgPv5IAdLqxyPdS_ACoICqwC2s9Er0-vAvaFm7dbqtl98UrWS5q3E', // <- aqui puedes pasar el resultado de tu función que calcula el token
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
