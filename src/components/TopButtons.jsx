import React from 'react'

function TopButtons({ setQuery }) {
    const cities = [
        {
            id:1,
            title: 'Bangkok'
        },
        {
            id:2,
            title: 'Chiang Mai'
        },
        {
            id:3,
            title: 'Chonburi'
        },
    ]
  return  <div className="flex items-center justify-around my-6">
    {cities.map((cities) => (

        <button key={cities.id} className="text-white text-lg font-medium"  onClick={() => setQuery({ q: cities.title })}>
           {cities.title}
        </button>
    ))}
  </div>
        
 
}

export default TopButtons
