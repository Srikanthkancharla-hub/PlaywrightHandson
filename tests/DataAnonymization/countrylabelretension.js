

async function calenderRollingYearsDate() {

    const currentDate = new Date();
    const rollingyearDate = new Date(currentDate);
    rollingyearDate.setFullYear(currentDate.getFullYear() - 2);
    //const dateTwoRollingYearBefore = formatDateForOracle(rollingyearDate);
    //console.log(' 2 rolling years years ago date is:', dateTwoRollingYearBefore);

    const playuserdate = new Date(currentDate);
    playuserdate.setMonth(currentDate.getMonth() - 13);
    //playeuser days= 395 days
    // real user calenderdays= 2192 days 
    //below is playuser last activity time back dated days
    const playuserlastactivitybackdate= new Date(currentDate.getTime() - (397 * 24 * 60 * 60 * 1000)+(14*60*60*1000));

    //below is real user activity time back dated days
    const realuserlastactivitybackdate= new Date(currentDate.getTime() - (2500 * 24 * 60 * 60 * 1000)+(14*60*60*1000));

    //below is updating eligibility time back dated days
    var backdatedeligibilityTime = new Date(currentDate.getTime() - 70 * 24 * 60 * 60 * 1000);

    const sysdateeligibilitydate= new Date();
    const pastdates=[];
   // pastdates.push(calenderyearDate);
    pastdates.push(sysdateeligibilitydate);
    pastdates.push(realuserlastactivitybackdate);
    pastdates.push(playuserlastactivitybackdate);
    pastdates.push(backdatedeligibilityTime);
    return pastdates;
}

module.exports={calenderRollingYearsDate};

//calenderRollingYearsDate();
