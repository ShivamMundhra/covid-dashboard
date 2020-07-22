import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles.module.css";

import Switch from "react-switch";
import BarGraph from "../../components/BarGraph/BarGraph";

import { getData, getStateTimeSeries } from "../../services/covidData.service";
import {
  sortDataByDate,
  sortDataByDistricts,
} from "../../utils/helperFunctions";
import { COMMON_THEME, DARK_THEME, STATE_NAMES } from "../../utils/constants";
const State = (props) => {
  const stateId = useParams().stateId.toUpperCase();
  const [data, setData] = useState(null);
  // const [timeSeries, setTimeSeries] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [showDaily, setShowDaily] = useState(true);
  const [districtCodes, setDistrictCodes] = useState(null);
  // console.log(STATE_CODES);
  // console.log(STATE_CODES_ARRAY);
  useEffect(() => {
    window.scrollTo(0, 0);
    let data = null;
    let timeSeries = null;
    const fetchData = async () => {
      data = await getData();
      timeSeries = await getStateTimeSeries(stateId);
      const sortedData = sortDataByDate(timeSeries, stateId);
      const stateDa = sortDataByDistricts(data, stateId);
      setDistrictData(stateDa.districtsDataArr);
      setDistrictCodes(stateDa.districtsCodeArr);
      setData(data);
      // setTimeSeries(timeSeries);
      setSortedData(sortedData);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [stateId]);
  // const handleClick = () => {
  //   console.log(timeSeries);
  //   console.log(data);
  //   console.log(sortedData);
  //   // setShowDaily((showDaily) => !showDaily);
  //   console.log(districtCodes);
  //   console.log(districtData);
  // };
  const handleSwitch = (checked) => {
    setShowDaily(checked);
  };
  return (
    <div className={styles.State} style={{ backgroundColor: DARK_THEME.test }}>
      <div className={styles.Heading}>Covid India DashBoard</div>

      {data && districtData && districtCodes ? (
        <div className={styles.list}>
          <div className={styles.HeadingState}>Distribution</div>
          <div className={styles.row1}>
            <div className={styles.Name}>&nbsp;</div>
            <div className={styles.confirmed}>Confirmed</div>
            <div className={styles.recovered}>Recoverd</div>
            <div className={styles.deceased}>Deceased</div>
          </div>
          <div className={styles.rowIndia}>
            <div className={styles.Name}>{STATE_NAMES[stateId]}</div>
            <div className={styles.confirmed}>
              {data[stateId]["total"].confirmed}
            </div>
            <div className={styles.recovered}>
              {data[stateId]["total"].recovered}
            </div>
            <div className={styles.deceased}>
              {data[stateId]["total"].deceased}
            </div>
          </div>
          <div className={styles.row1}>
            <div className={styles.Name}>Districts</div>
            <div className={styles.confirmed}>&nbsp;</div>
            <div className={styles.recovered}>&nbsp;</div>
            <div className={styles.deceased}>&nbsp;</div>
          </div>
          {districtData.map((state, i) => {
            return (
              <div
                className={`${i % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
              >
                <div className={styles.Name}>{districtCodes[i]}</div>
                <div className={styles.confirmed}>
                  {districtData[i][districtCodes[i]].confirmed}
                </div>
                <div className={styles.recovered}>
                  {districtData[i][districtCodes[i]].recovered}
                </div>
                <div className={styles.deceased}>
                  {districtData[i][districtCodes[i]].deceased}
                </div>
              </div>
            );
          })}
        </div>
      ) : // {stateData}
      null}
      {/* {sortedData?()} */}
      {sortedData ? (
        <div className={styles.row}>
          <div className={styles.graphHeading}>Visualise</div>
          <div className={styles.switchBox}>
            <label htmlFor="small-radius-switch" className={styles.switch}>
              <span
                className={styles.switchTitle}
                style={{
                  color: !showDaily ? DARK_THEME.label : DARK_THEME.switch,
                }}
              >
                Cummalative
              </span>
              <Switch
                checked={showDaily}
                onChange={handleSwitch}
                handleDiameter={14}
                offColor={DARK_THEME.switch}
                onColor={DARK_THEME.switch}
                offHandleColor={DARK_THEME.label}
                onHandleColor={DARK_THEME.label}
                height={20}
                width={35}
                className="react-switch"
                id="small-radius-switch"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span
                className={styles.switchTitle}
                style={{
                  color: showDaily ? DARK_THEME.label : DARK_THEME.switch,
                }}
              >
                Daily
              </span>
            </label>
          </div>
          <div className={styles.graphBox1}>
            <span
              className={styles.graphTitle}
              style={{ color: COMMON_THEME.total }}
            >
              Confirmed cases
            </span>
            <BarGraph
              data={{
                labels: sortedData.formattedDates,
                dataArr: !showDaily
                  ? sortedData.confirmedTotal
                  : sortedData.confirmedDaily,
              }}
              borderColor={COMMON_THEME.total}
              label="Total Confirmed cases"
              barColor={COMMON_THEME.totalBar}
            />
          </div>

          <div className={styles.graphBox2}>
            <span
              className={styles.graphTitle}
              style={{ color: COMMON_THEME.greenSecondary }}
            >
              Recovered cases
            </span>
            <BarGraph
              data={{
                labels: sortedData.formattedDates,
                dataArr: !showDaily
                  ? sortedData.recoveredTotal
                  : sortedData.recoveredDaily,
              }}
              borderColor={COMMON_THEME.recoverd}
              label="Total Recoverd cases"
              barColor={COMMON_THEME.greenSecondary}
            />
          </div>

          <div className={styles.graphBox3}>
            <span
              className={styles.graphTitle}
              style={{ color: COMMON_THEME.active }}
            >
              Deceased cases
            </span>
            <BarGraph
              data={{
                labels: sortedData.formattedDates,
                dataArr: !showDaily
                  ? sortedData.deceasedTotal
                  : sortedData.deceasedDaily,
              }}
              borderColor={COMMON_THEME.deceased}
              label="Total Recoverd cases"
              barColor={COMMON_THEME.active}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default State;

// import {
//   COMMON_THEME,
//   DARK_THEME,
//   STATE_NAMES,
//   STATE_CODES,
//   STATE_CODES_ARRAY,
// } from "../../utils/constants";

// const Home = (props) => {
//   const [data, setData] = useState(null);
//   const [timeSeries, setTimeSeries] = useState(null);
//   const [sortedData, setSortedData] = useState(null);
//   const [stateData, setStateData] = useState(null);
//   const [showDaily, setShowDaily] = useState(true);
//   const [stateCodes, setStateCodes] = useState(null);
//   // console.log(STATE_CODES);
//   // console.log(STATE_CODES_ARRAY);
//   useEffect(() => {
//     let data = null;
//     let timeSeries = null;
//     const fetchData = async () => {
//       data = await getData();
//       timeSeries = await getStateTimeSeries(id);
//       const sortedData = sortDataByDate(timeSeries, "TT");
//       const stateDa = sortDataByState(data);
//       setStateData(stateDa.stateDataArr);
//       setStateCodes(stateDa.stateCodeArr);
//       setData(data);
//       setTimeSeries(timeSeries);
//       setSortedData(sortedData);
//     };
//     try {
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
//   const handleClick = () => {
//     // console.log(timeSeries);
//     // console.log(data);
//     // console.log(sortedData);
//     // setShowDaily((showDaily) => !showDaily);
//     console.log(stateCodes);
//   };
//   const handleSwitch = (checked) => {
//     setShowDaily(checked);
//   };
//   return (
//     <div className={styles.Home}>
//       <div className={styles.Heading} onClick={handleClick}>
//         Covid India DashBoard
//       </div>
//       <div className={styles.HeadingState} onClick={handleClick}>
//         Distribution
//       </div>
//       {stateData && stateCodes ? (
//         <div className={styles.list}>
//           <div className={styles.row1}>
//             <div className={styles.Name}>&nbsp;</div>
//             <div className={styles.confirmed}>Confirmed</div>
//             <div className={styles.recovered}>Recoverd</div>
//             <div className={styles.deceased}>Deceased</div>
//           </div>
//           <div className={styles.rowIndia}>
//             <div className={styles.Name}>{STATE_NAMES["TT"]}</div>
//             <div className={styles.confirmed}>
//               {stateData[0]["TT"].confirmed}
//             </div>
//             <div className={styles.recovered}>
//               {stateData[0]["TT"].recovered}
//             </div>
//             <div className={styles.deceased}>{stateData[0]["TT"].deceased}</div>
//           </div>
//           <div className={styles.row1}>
//             <div className={styles.Name}>States</div>
//             <div className={styles.confirmed}>&nbsp;</div>
//             <div className={styles.recovered}>&nbsp;</div>
//             <div className={styles.deceased}>&nbsp;</div>
//           </div>
//           {stateData.map((state, i) => {
//             if (i === 0) {
//               return null;
//             } else
//               return (
//                 <Link
//                   to={`/state/${stateCodes[i]}`}
//                   className={`${i % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
//                 >
//                   <div className={styles.Name}>
//                     {STATE_NAMES[stateCodes[i]]}
//                   </div>
//                   <div className={styles.confirmed}>
//                     {stateData[i][stateCodes[i]].confirmed}
//                   </div>
//                   <div className={styles.recovered}>
//                     {stateData[i][stateCodes[i]].recovered}
//                   </div>
//                   <div className={styles.deceased}>
//                     {stateData[i][stateCodes[i]].deceased}
//                   </div>
//                 </Link>
//               );
//           })}
//         </div>
//       ) : // {stateData}
//       null}
//       {/* {sortedData?()} */}
//       {sortedData ? (
//         <div className={styles.row}>
//           <div className={styles.graphHeading}>Visualise</div>
//           <div className={styles.switchBox}>
//             <label htmlFor="small-radius-switch" className={styles.switch}>
//               <span
//                 className={styles.switchTitle}
//                 style={{
//                   color: !showDaily ? DARK_THEME.label : DARK_THEME.switch,
//                 }}
//               >
//                 Cummalative
//               </span>
//               <Switch
//                 checked={showDaily}
//                 onChange={handleSwitch}
//                 handleDiameter={14}
//                 offColor={DARK_THEME.switch}
//                 onColor={DARK_THEME.switch}
//                 offHandleColor={DARK_THEME.label}
//                 onHandleColor={DARK_THEME.label}
//                 height={20}
//                 width={35}
//                 className="react-switch"
//                 id="small-radius-switch"
//                 uncheckedIcon={false}
//                 checkedIcon={false}
//               />
//               <span
//                 className={styles.switchTitle}
//                 style={{
//                   color: showDaily ? DARK_THEME.label : DARK_THEME.switch,
//                 }}
//               >
//                 Daily
//               </span>
//             </label>
//           </div>
//           <div className={styles.graphBox1}>
//             <span
//               className={styles.graphTitle}
//               style={{ color: COMMON_THEME.total }}
//             >
//               Confirmed cases
//             </span>
//             <BarGraph
//               data={{
//                 labels: sortedData.formattedDates,
//                 dataArr: !showDaily
//                   ? sortedData.confirmedTotal
//                   : sortedData.confirmedDaily,
//               }}
//               borderColor={COMMON_THEME.total}
//               label="Total Confirmed cases"
//               barColor={COMMON_THEME.totalBar}
//             />
//           </div>

//           <div className={styles.graphBox2}>
//             <span
//               className={styles.graphTitle}
//               style={{ color: COMMON_THEME.greenSecondary }}
//             >
//               Recovered cases
//             </span>
//             <BarGraph
//               data={{
//                 labels: sortedData.formattedDates,
//                 dataArr: !showDaily
//                   ? sortedData.recoveredTotal
//                   : sortedData.recoveredDaily,
//               }}
//               borderColor={COMMON_THEME.recoverd}
//               label="Total Recoverd cases"
//               barColor={COMMON_THEME.greenSecondary}
//             />
//           </div>

//           <div className={styles.graphBox3}>
//             <span
//               className={styles.graphTitle}
//               style={{ color: COMMON_THEME.active }}
//             >
//               Deceased cases
//             </span>
//             <BarGraph
//               data={{
//                 labels: sortedData.formattedDates,
//                 dataArr: !showDaily
//                   ? sortedData.deceasedTotal
//                   : sortedData.deceasedDaily,
//               }}
//               borderColor={COMMON_THEME.deceased}
//               label="Total Recoverd cases"
//               barColor={COMMON_THEME.active}
//             />
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Home;
