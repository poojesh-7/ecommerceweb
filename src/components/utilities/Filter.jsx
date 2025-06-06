/* eslint-disable react/prop-types */
import "./Filter.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const FilterHolder = ({ userFilterVal }) => {
  const getFilterVal = (value) => {
    userFilterVal(value);
  };
  const data = [
    {
      category: "Price",
      options: [
        { name: "High to low", val: -1 },
        { name: "Low to high", val: 1 },
      ],
    },
    // {
    //   category: "Ratings",
    //   options: [
    // { name: "below 3", val: 3 },
    //     { name: "3 to 4", val: { range1: 3, range2: 4 } },
    //     { name: "Above 4", val: { range1: 4 } },
    //   ],
    // },
  ];
  const displayFilters = data.map((filter) => (
    <Dropdown key={filter.category}>
      <Dropdown.Toggle
        className="custom_width_dp"
        variant="Info"
        id="dropdown-basic"
      >
        {filter.category}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form key={filter.category}>
          {filter.options.map((option) => (
            <Form.Check
              onChange={getFilterVal.bind(null, option)}
              key={option.name}
              type="radio"
              className="option"
              inline
              label={option.name}
              name={filter.category}
            />
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
    // <DropdownButton
    //   onSelect={getFilterVal}
    //   as={ButtonGroup}
    //   variant="Primary"
    //   title={filter.category}
    //   key={filter.category}
    //   className="custom_width_dp"
    // >
    //   <Dropdown.Menu>
    //     {filter.options.map((option) => (
    //       <Dropdown.Item
    //         className="custom_width_op"
    //         key={option.name}
    //         eventKey={option.val}
    //       >
    //         {option.name}
    //       </Dropdown.Item>
    //     ))}
    //   </Dropdown.Menu>
    // </DropdownButton>
  ));
  return (
    <div className="filters">
      <DropdownButton
        onSelect={getFilterVal}
        as={ButtonGroup}
        variant="primary"
        title="Filters"
        className="custom_width_dp"
      >
        {displayFilters}
      </DropdownButton>
      {/* <DropdownButton
        onSelect={getFilterVal}
        as={ButtonGroup}
        variant="Primary"
        size="lg"
        title="first"
      >
        <Dropdown.Item eventKey="1">decreas</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
      </DropdownButton> */}
    </div>
  );
};

export default FilterHolder;
