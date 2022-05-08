
export const  getDateString =  (value) => {

  let date = new Date(value).toDateString()
  let day = new Date(date).getDate()
  let day_week = ''
  let month = ''

    if (date.substr(0,3) == 'Sun') {
      day_week = 'DOM'
    }
    if (date.substr(0,3) == 'Mon') {
      day_week = 'LUN'
    }
    if (date.substr(0,3) == 'Tue') {
      day_week = 'MAR'
    }
    if (date.substr(0,3) == 'Wed') {
      day_week = 'MIE'
    }
    if (date.substr(0,3) == 'Thu') {
      day_week = 'JUE'
    }
    if (date.substr(0,3) == 'Fri') {
      day_week = 'VIE'
    }
    if (date.substr(0,3) == 'Sat') {
      day_week = 'SAB'
    }

    if (new Date(value).getMonth()+1 == 1) {
      month = 'ENERO'
    }
    if (new Date(value).getMonth()+1 == 2) {
      month = 'FEBRERO'
    }
    if (new Date(value).getMonth()+1 == 3) {
      month = 'MARZO'
    }
    if (new Date(value).getMonth()+1 == 4) {
      month = 'ABRIL'
    }
    if (new Date(value).getMonth()+1 == 5) {
      month = 'MAYO'
    }
    if (new Date(value).getMonth()+1 == 6) {
      month = 'JUNIO'
    }
    if (new Date(value).getMonth()+1 == 7) {
      month = 'JULIO'
    }
    if (new Date(value).getMonth()+1 == 8) {
      month = 'AGOSTO'
    }
    if (new Date(value).getMonth()+1 == 9) {
      month = 'SEPTIEMBRE'
    }
    if (new Date(value).getMonth()+1 == 10) {
      month = 'OCTUBRE'
    }
    if (new Date(value).getMonth()+1 == 11) {
      month = 'NOVIEMBRE'
    }
    if (new Date(value).getMonth()+1 == 12) {
      month = 'DICIEMBRE'
    }

  return day_week +'. '+day+', '+month
}

export const getDayWeekString =  (value,day)  =>{

  let date = new Date(value).toDateString()
  let day_week = ''


  if (date.substr(0,3) == 'Sun') {
    day_week = 'Domingo'
  }
  if (date.substr(0,3) == 'Mon') {
    day_week = 'Lunes'
  }
  if (date.substr(0,3) == 'Tue') {
    day_week = 'Martes'
  }
  if (date.substr(0,3) == 'Wed') {
    day_week = 'Miércoles'
  }
  if (date.substr(0,3) == 'Thu') {
    day_week = 'Jueves'
  }
  if (date.substr(0,3) == 'Fri') {
    day_week = 'Viernes'
  }
  if (date.substr(0,3) == 'Sat') {
    day_week = 'Sábado'
  }

  return day_week+' '+day;
}


export const getTimeString =  (value)  =>{
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    let TimeString = new Date(value).toLocaleTimeString()
    let day_week = ''
    let time = TimeString.split(':')
    let response;

    if (parseInt(time[0]) > 12) {
        response = parseInt(time[0]) - 12+' PM'
    }else{
        response = time[0] +' AM'
    }

    return response;
}

