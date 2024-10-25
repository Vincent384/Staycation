export function calculateDaysBetween(checkinDate1:string, checkoutDate2:string):number{

    let checkin = new Date(checkinDate1)
    let checkout = new Date(checkoutDate2)

    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
      console.error('Ogiltigt datum');
      return 0;
    }

    const timeDifference = checkout.getTime() - checkin.getTime()

    const dayDifference = timeDifference / (1000 * 60 * 60 * 24)

    return Math.round(dayDifference)
  }