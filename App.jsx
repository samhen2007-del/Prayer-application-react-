import Prayar from "./component/Prayar"
import {useEffect, useState} from "react"


function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}-${month}-${year}`;
}
function App() {
 
 const [prayarTimes,setPrayarTimes] =useState({})
 const [dateTimes,setDateTimes] =useState(getDate())
 const [city,setCity] =useState("algiers")

  const cities = [
    {name :"العاصمة" ,value :"algiers"},
    {name :"الطارف" ,value :"eltarf"},
    {name :"عنابة" ,value :"annaba"},
    {name :"قالمة" ,value :"guelma"},
    {name :"ام البواقي" ,value :"oum bouaghi"},
    {name :"سكيكدة" ,value :"skikda"}
  ]

  

useEffect(() => {
 const fetchPrayerTimes = async() => {
    try {
       const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${getDate()}?city=DZ&country=${city}`)
       const data_prayar =await response.json()
       console.log(data_prayar)
       setPrayarTimes(data_prayar.data.timings )
       setDateTimes(data_prayar.data.date.gregorian.date)
       console.log(data_prayar.data.date.gregorian.date )

    }catch(error){
      console.error(error)
    }
    
 }
 fetchPrayerTimes()
}, [city])




const formatTimes =(time) => {
  if(!time){
    return"00:00";
  }
  let [hours,minutes] = time.split(":").map(Number)
  const perd = hours >= 12 ? "PM":"AM";
  hours = hours % 12 || 12;
  return`${hours}:${minutes <10 ? "0"+minutes : minutes} ${perd}`

}


  return (
    
    <section>
     <div className="container">
       <div className="top_sec">
             <div className="city">
              <h3> المدينة </h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
             {cities.map((city_obj) =>
             (<option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>

             ))}
             
            </select>
            </div>
             <div className="date">
             <h3> التاريخ </h3>
             <h4> {dateTimes}</h4>

             </div>
             
       </div>
       <Prayar name="الفجر" time={formatTimes(prayarTimes.Fajr)}/>
       <Prayar name="الظهر" time={formatTimes(prayarTimes.Dhuhr)}/>
       <Prayar name="العصر" time={formatTimes(prayarTimes.Asr)}/>
       <Prayar name="المغرب" time={formatTimes(prayarTimes.Maghrib)}/>
       <Prayar name="العشاء" time={formatTimes(prayarTimes.Isha)}/>
       
     </div>
     
    </section>
    
  )
}

export default App
