import { useEffect, useState } from "react";
import axios from "axios";

export default function TablesPage() {
    const [tables, setTables] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8808/api/table")
        .then(res => setTables(res.data.tables))
        .catch(err => console.log(err));
    },[]);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Tables</h1>
      <div className="bg-white rounded-xl shodow overflow-x-auto">
        <table className="w-full">
            <thead className="bg-black text-white">
                <tr>
                    <th className="p-3">Table no</th>
                    <th>Capacity</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {tables?.map((t) => (
                    <tr key={t.id} className="border-b text-center">
                        <td className="p-3">{t.table_no}</td>
                        <td>{t.capacity}</td>
                        <td>{t.status}</td>
                    </tr>
                ))};
            </tbody>
        </table>
      </div>
    </>
  );
}
