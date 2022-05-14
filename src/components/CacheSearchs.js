import { useEffect, useState } from "react";

export default function CacheSearchs({ suggestions }) {

    const [searchs,setSearchs] = useState([`casa`]);
    const getSearchs = () => {
        let data = localStorage.getItem('searchs');
        let queries;
        try {
          let temp = JSON.parse(data);
          if(Array.isArray(temp)){
            queries = temp;
          } else {
            queries = [];
          }
        } catch {
          queries = [];
        }
        setSearchs(queries);
      }

    useEffect(()=>{
        getSearchs();
    },[])
    return (
        <ul className="flex flex-wrap">
            {searchs.map((search,i)=> (
                <li key={search} className="p-1">
                    <span>{search}</span>
                </li>
            ))}
        </ul>
    )

}