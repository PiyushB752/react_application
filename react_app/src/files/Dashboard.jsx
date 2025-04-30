import React, { useEffect, useState } from 'react';
import './Dashboard.css';

// Mock API for sales data
const fetchSalesData = async (startDate, endDate, category) => {
  // Simulating API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock data based on parameters
  const startTimestamp = startDate ? new Date(startDate).getTime() : new Date('2023-01-01').getTime();
  const endTimestamp = endDate ? new Date(endDate).getTime() : new Date().getTime();
  
  const days = Math.floor((endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24));
  const data = [];
  
  const categories = ['Electronics', 'Clothing', 'Food', 'Books'];
  const selectedCategories = category ? [category] : categories;
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(startTimestamp + i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    
    const dataPoint = { date: dateStr };
    
    selectedCategories.forEach(cat => {
      const baseValue = (date.getDay() + 1) * 100; // Higher sales on weekends
      const multiplier = categories.indexOf(cat) + 1;
      const randomFactor = ((date.getDate() + categories.indexOf(cat)) % 3) * 0.2 + 0.8;
      
      dataPoint[cat] = Math.round(baseValue * multiplier * randomFactor);
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

const Dashboard = () => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [category, setCategory] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async()=>{
      const salesData = await fetchSalesData(startDate,endDate,category)
      setData(salesData)
    }
    fetchData()
  }, [startDate,endDate,category])

  return (
    <div className="dashboard-container">
      <h1>Sales Dashboard</h1>

      <div className='filters-container'>
        <h4>Start Date - <input type="date" onChange={(e)=>setStartDate(e.target.value)}/></h4>
        <h4>End Date - <input type="date" onChange={(e)=>setEndDate(e.target.value)}/></h4>
        <h4>Category - <select name="categories" id="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
          </select>
        </h4>
      </div>

      <div className='chart-container'>
        <table>
          <tr>
            <th>Date</th>
            {category && <th>{category}</th>}
          </tr>
          {data.map((val,i) =>(
            <tr key={i}>
              <td>{val.date}</td>
              {category && <td>{val[category]}</td>}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Dashboard;