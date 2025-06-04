

async function calenderRollingYearsDate() {

    const currentDate = new Date();
    /*const calenderyearDate = new Date(currentDate);
    calenderyearDate.setFullYear(currentDate.getFullYear() - 6);
    calenderyearDate.setMonth(11); 
    calenderyearDate.setDate(31);
    //const dateSixCalenderYearsBefore = formatDateForOracle(calenderyearDate);
    //console.log(' 6 calender years ago date is:', dateSixCalenderYearsBefore);*/
    const rollingyearDate = new Date(currentDate);
    rollingyearDate.setFullYear(currentDate.getFullYear() - 7);
    //const dateTwoRollingYearBefore = formatDateForOracle(rollingyearDate);
    //console.log(' 2 rolling years years ago date is:', dateTwoRollingYearBefore);

    const playuserdate = new Date(currentDate);
    playuserdate.setMonth(currentDate.getMonth() - 13);
    //const playerUserDateToUpdate = formatDateForOracle(playuserdate);
    //console.log('13 months ago date is :',playerUserDateToUpdate);
    //playeuser days= 395 days
    // real user calenderdays= 2192 days 
    const userlastactivitybackdate= new Date(currentDate.getTime() - (397 * 24 * 60 * 60 * 1000)+(14*60*60*1000));
    //userlastactivitybackdate.setDate(currentDate.getTime()-(395*24*60*60*1000));
    console.log('Current date is :',currentDate);
    console.log('user lastactivity back date is :',userlastactivitybackdate);

    const pastdates=[];
   // pastdates.push(calenderyearDate);
    pastdates.push(rollingyearDate);
    pastdates.push(playuserdate);
    pastdates.push(userlastactivitybackdate);
    return pastdates;
}

module.exports={calenderRollingYearsDate};

//calenderRollingYearsDate();
