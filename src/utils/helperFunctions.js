export const sortDataByDate = (data, state) => {
  const newData = { ...data[state]["dates"] };
  const dates = [];
  const formattedDates = [];
  const deceasedTotal = [];
  const recoveredTotal = [];
  const confirmedTotal = [];
  const deceasedDaily = [];
  const recoveredDaily = [];
  const confirmedDaily = [];
  Object.keys(newData).map((date, i) => {
    formattedDates.unshift(date.split("-").splice(1).reverse().join("-"));
    dates.unshift(date);
    if (!newData[date].total)
      newData[date]["total"] = { confirmed: 0, deceased: 0, recoverd: 0 };
    if (!newData[date].delta)
      newData[date]["delta"] = { confirmed: 0, deceased: 0, recoverd: 0 };
    if (newData[date].total.confirmed)
      confirmedTotal.unshift(newData[date].total.confirmed);
    else confirmedTotal.unshift(0);
    if (newData[date].total.deceased)
      deceasedTotal.unshift(newData[date].total.deceased);
    else deceasedTotal.unshift(0);
    if (newData[date].total.recovered)
      recoveredTotal.unshift(newData[date].total.recovered);
    else recoveredTotal.unshift(0);
    if (newData[date].delta.confirmed)
      confirmedDaily.unshift(newData[date].delta.confirmed);
    else confirmedDaily.unshift(0);
    if (newData[date].delta.deceased)
      deceasedDaily.unshift(newData[date].delta.deceased);
    else deceasedDaily.unshift(0);
    if (newData[date].delta.recovered)
      recoveredDaily.unshift(newData[date].delta.recovered);
    else recoveredDaily.unshift(0);
  });
  // let newDates = dates.reverse()
  return {
    formattedDates,
    dates,
    deceasedTotal,
    recoveredTotal,
    confirmedTotal,
    deceasedDaily,
    recoveredDaily,
    confirmedDaily,
  };
};

export const sortDataByState = (data) => {
  const stateDataArr = [];
  const stateCodeArr = [];
  Object.keys(data).map((state, i) => {
    let tempObj = {};
    tempObj[state] = { ...data[state]["total"] };
    if (!tempObj[state]["deceased"]) tempObj[state]["deceased"] = 0;
    if (!tempObj[state]["confirmed"]) tempObj[state]["confirmed"] = 0;
    if (!tempObj[state]["recovered"]) tempObj[state]["recovered"] = 0;
    if (state === "TT") {
      stateDataArr.unshift(tempObj);
      stateCodeArr.unshift(state);
    } else {
      stateDataArr.push(tempObj);
      stateCodeArr.push(state);
    }
  });
  return { stateDataArr, stateCodeArr };
};

export const sortDataByDistricts = (data, stateId) => {
  const stateObj = data[stateId];
  const districtObj = stateObj["districts"];
  const districtsDataArr = [];
  const districtsCodeArr = [];
  Object.keys(districtObj).map((district, i) => {
    let tempObj = {};
    tempObj[district] = { ...districtObj[district]["total"] };
    if (!tempObj[district]["deceased"]) tempObj[district]["deceased"] = 0;
    if (!tempObj[district]["confirmed"]) tempObj[district]["confirmed"] = 0;
    if (!tempObj[district]["recovered"]) tempObj[district]["recovered"] = 0;
    districtsCodeArr.push(district);
    districtsDataArr.push(tempObj);
  });
  return { districtsDataArr, districtsCodeArr };
};
