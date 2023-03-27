import React, { Fragment, useEffect , useState} from 'react'
import axios from "axios"

const Transactions = () => {
  const [rides,setRides] = useState([])

  useEffect(()=>{
    const fetchRides = async () => {
      const {data} = await axios.get("http://127.0.0.1:5000/api/ride/getrides")
      console.log(data)
      setRides(data)
    }
    fetchRides()
  },[])

  console.log(rides)
  return (
    <div>
      {
        rides.map((ride)=>{
          return (
            <Fragment>
            <div>{ride.name}</div>
            <div>{ride.source}</div>
            <div>{ride.destination}</div>
            <div>rideFair :{ride.rideFair}</div>
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default Transactions