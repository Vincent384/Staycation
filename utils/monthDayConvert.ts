export function convertMonthAndDay(month:string){
    let monthNumber = ''
    switch (month) {
      case 'Janauri':
        monthNumber = '01'
        break
      case 'Februari':
        monthNumber = '02'
        break
      case 'Mars':
        monthNumber = '03'
        break
      case 'April':
        monthNumber = '04'
        break
      case 'Maj':
        monthNumber = '05'
        break
      case 'Juni':
        monthNumber = '06'
        break
      case 'Juli':
        monthNumber = '07'
        break
      case 'Augusti':
        monthNumber = '08'
        break
      case 'September':
        monthNumber = '09'
        break
      case 'Oktober':
        monthNumber = '10'
        break
      case 'November':
        monthNumber = '11'
        break
      case 'December':
        monthNumber = '12'
        break
      default:
        break;
    }

    return monthNumber
}