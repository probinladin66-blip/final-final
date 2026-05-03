import { useEffect, useState } from "react";

export default function App(){
  const [rams,setRams] = useState([]);

  useEffect(()=>{
    fetch("/api/rams")
      .then(res=>res.json())
      .then(setRams)
      .catch(()=>setRams([]));
  },[]);

  return (
    <div style={{padding:20}}>
      <h1>Hoof & Horn Collective</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
        gap:20
      }}>
        {rams.length===0 && <p>No rams available yet.</p>}

        {rams.map((ram,i)=>(
          <div key={i} style={{border:"1px solid #ddd",padding:12}}>
            <img src={ram.image || "https://images.unsplash.com/photo-1601758228041-f3b2795255f1"} style={{width:"100%"}}/>
            <h3>{ram.name}</h3>
            <p>{ram.price}</p>
            <p>{ram.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
