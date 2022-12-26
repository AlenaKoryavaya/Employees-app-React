import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employee-list.css";

const EmployeesList = ({ data, onDelete, onToggleProp }) => {
    const elements = data.map((item) => {
        const { id, ...itemProps } = item; // ...itemProps - идентично записи name={item.name}, salary={item.salary}  и т.д. развертывает объект

        return (
            <EmployeesListItem
                key={id}
                {...itemProps} // name={item.name} salary={item.salary} increase={item.increase}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))}
            />
        );
    });

    return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployeesList;
