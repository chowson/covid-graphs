import React from 'react';
import Select from 'react-select';
import Creatable from "react-select/creatable/";
import { components } from "react-select";
import { GetAllAreas, GetFavouriteAreas, SetFavouriteAreas } from '../utilities/userAreas';

const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 8 ? (
          props.children
        ) : (
          <div style={{ margin: 15 }}>Max of 8 areas selected.</div>
        )}
      </components.Menu>
    );
};

class AreaSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            onAreaChange: props.onAreaChange,
            defaultOptions: [],
            options: GetAllAreas().map(area => ({
                value: area.Name,
                label: area.Name
            }))
        };
    }

    componentDidMount() {
        this.setState({
            defaultOptions: GetFavouriteAreas().map(area => ({
                value: area.Name,
                label: area.Name
            })),
            loaded: true
        });
    }

    handleChange = (newValue) => {
        let areaNames = [];
        if(newValue) {
            areaNames = newValue.map(val => val.value);
        }

        SetFavouriteAreas([...areaNames]);
        this.state.onAreaChange(areaNames);
    };
    
    isValidNewOption = (inputValue, selectValue) => inputValue.length > 0 && selectValue.length < 5;

    render() {
        return (
            <div className="separator">
                <div className="max-w-screen-md mx-auto">
                    { this.state.loaded && 
                        <div className="mt-6 mb-6 flex flex-col md:flex-row items-center justify-center">
                            <span className="mr-4 font-bold">Areas:</span>
                            <Creatable
                                components={{ Menu }}
                                isMulti
                                isValidNewOption={this.isValidNewOption}
                                options={this.state.options}
                                onChange={this.handleChange}
                                className="flex-grow"
                                defaultValue={[...this.state.defaultOptions]}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default AreaSelector;