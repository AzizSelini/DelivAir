import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react'
const data = [
  { month: 'Jan', users: 1000 },
  { month: 'Feb', users: 800 },
  { month: 'Mar', users: 600 },
  { month: 'Apr', users: 700 },
  { month: 'May', users: 900 },
  { month: 'Jun', users: 1200 },
  { month: 'Jul', users: 1500 },
  {month: 'Aug', users:1600},
  { month: 'Sep', users:1200},
  { month: 'Oct', users:2000},
  { month: 'Nov', users:1200},
  { month: 'Dec', users:900},

];
const data2 = [
  { month: 'Jan', transactions: 500 },
  { month: 'Feb', transactions: 400 },
  { month: 'Mar', transactions: 300 },
  { month: 'Apr', transactions: 350 },
  { month: 'May', transactions: 450 },
  { month: 'Jun', transactions: 550 },
  { month: 'Jul', transactions: 600 },
  { month: 'Aug', transactions:499},
  { month: 'Sep', transactions:322},
  { month: 'Oct', transactions:521},
  { month: 'Nov', transactions:422},
  { month: 'Dec', transactions:389}
];


const home = () => {
  return (
    <div>
      <h2>Number of Users per Month</h2>
      <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="month"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="users" fill="#8884d8" />
      </BarChart>
      
       <h2>Number of Transactions per Month</h2>
      <BarChart width={600} height={300} data={data2}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="month"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="transactions" fill="#8884d8" />
      </BarChart>
    </div>
  
  )
}

export default home;