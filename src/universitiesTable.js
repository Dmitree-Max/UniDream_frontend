import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';


const UniversityTable = () => {
  const [data, setData] = useState([]);
  const URI = "http://localhost:8080/v0/universities"

  useEffect(() => {
    axios.get(URI, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }})
    .then(response => setData(response.data))
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'University',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
      {
        accessorKey: 'students',
        header: 'Students',
      },
      {
        accessorKey: 'major_field',
        header: 'Major field',
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};


export default UniversityTable;