import { View, StyleSheet, Text } from 'react-native';
import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import chroma from 'chroma-js';

function tagsOptions () {
  const URI_ALL = "http://localhost:8080/v0/tags";

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

class TagSearch extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedOption: '',
        clearable: true,
        allTags: [],
        programs: [],
        tags: [],
        columns: [
          {
            accessorKey: 'name',
            header: 'Program',
          },
          {
            accessorKey: 'university',
            header: 'University',
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
     this.searchPrograms = this.searchPrograms.bind(this)
   }

    findId() {
        var selected = this.state.tags;

        const found = this.state.allTags.find(element => element.name === selected);
        if (found == undefined) {
            return 0;
        }
        return found.id;
    }

    searchPrograms(univId) {
        var options = this.state.tags;
        var URI = "http://localhost:8080/v0/programs?tags=";

        for (var i = 0, l = options.length; i < l; i++) {
            URI = URI + options[i].value;
            if (i < options.length - 1) {
                URI = URI + ",";
            }
        }

        return axios.get(URI, {headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        }})
        .then(response => {
                return response.data;
        });
    }

   updatePrograms() {
         this.searchPrograms()
        .then(res => {
            this.setState({
                programs: res
            })
        })
    }

    handleChange(e) {
        this.setState({ tags: e });
    }

   componentDidMount() {
    tagsOptions()
        .then(res => {
            this.setState({
                allTags: res
            })
        })
   }

 render(){
    let options = this.state.allTags.map(function (tag) {
        return { value: tag.id, label: tag.name};
    })
 return (
      <div>
       <p>
        Search programs by tags
       </p>
       <div><br/></div>
       <label>
         University:
       </label>
       <Select
            isMulti
            onChange={this.handleChange}
            placeholder={""}
            label="Multi select"
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


export default TagSearch;