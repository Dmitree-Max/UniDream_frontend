import { View, StyleSheet, Text } from 'react-native';
import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import chroma from 'chroma-js';

function universitiesOptions () {
  const URI_ALL = "http://localhost:8080/v0/universities";


    return axios.get(URI_ALL, {headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    }})
    .then(response => {
            console.log("response " + response.data);
            return response.data;
            }
        );
}


function searchPrograms(univId) {
  const URI = "http://localhost:8080/v0/university?id=" + univId;


    return axios.get(URI, {headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    }})
    .then(response => {
            console.log("response2 " + response.data);
            return response.data;
            }
        );
}


const colourStyles  = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),
  width: '1000px',
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'black';
    return {
      ...styles,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? 'blue'
          : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
      },
    };
  },
  input: (styles) => ({ ...styles}),
  placeholder: (styles) => ({ ...styles}),
  singleValue: (styles, { data }) => ({ ...styles,}),
};



class Search extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedOption: '',
        clearable: true,
        universities: [],
        programs: [],
        univ: "0",
        columns: [
          {
            accessorKey: 'name',
            header: 'Program',
          },
          {
            accessorKey: 'description',
            header: 'Description',
          },
          {
            accessorKey: 'places',
            header: 'Places available',
          },
          {
            accessorKey: 'stage',
            header: 'Type',
          },
          {
            accessorKey: 'documents',
            header: 'Documents',
          },
          {
            accessorKey: 'documents_deadline',
            header: 'Documents application deadline',
          },
          {
            accessorKey: 'start_date',
            header: 'Start date',
          },
        ]
     }
     this.updatePrograms = this.updatePrograms.bind(this)
     this.handleChange = this.handleChange.bind(this)
   }

    findId() {
        var selected = this.state.univ;

        const found = this.state.universities.find(element => element.name === selected);
        if (found == undefined) {
            return 0;
        }
        return found.id;
    }
   updatePrograms() {
          var id = this.findId();
         searchPrograms(id)
        .then(res => {
            this.setState({
                programs: res
            })
        })
    }


  handleChange(e) {
    console.log("Univ Selected!!");
    this.setState({ univ: e.value });
  }

   componentDidMount() {
    universitiesOptions()
        .then(res => {
            this.setState({
                universities: res
            })
        })
   }
 render(){
    let options = this.state.universities.map(function (university) {
  return { value: university.name, label: university.name };
})
 return (
      <div>
       <p>
        Search all programs of university
       </p>
       <div><br/></div>
       <label>
         University:
       </label>
       <Select
            onChange={this.handleChange}
            placeholder={"University name"}
            label="Single select"
            name="form-field-name"
            value={this.state.value}
            options={options}
             styles={colourStyles}
        />
        <button onClick={this.updatePrograms}> Search </button>
        <div><br/><br/><br/><br/><br/><br/><br/></div>
        <MaterialReactTable columns={this.state.columns} data={this.state.programs} />
    </div>
  )
 }
}


export default Search;