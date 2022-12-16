import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employee-list.css";

const EmployeesList = () => {
    return (
        <lu className="app-list list-group">
            <EmployeesListItem />
            <EmployeesListItem />
            <EmployeesListItem />
        </lu>
    );
};

export default EmployeesList;
