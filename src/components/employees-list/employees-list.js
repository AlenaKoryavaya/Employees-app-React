import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employee-list.css";

const EmployeesList = ({ data, onSalaryChange, onDelete, onToggleProp }) => {
    const elements = data.map((item) => {
        const { id, name, ...itemProps } = item; // ...itemProps - идентично записи name={item.name}, salary={item.salary}  и т.д. развертывает объект

        return (
            <EmployeesListItem
                key={id}
                name={name}
                {...itemProps} // name={item.name} salary={item.salary} increase={item.increase}
                onSalaryChange={(e) => onSalaryChange(id, e.target.value)}
                onDelete={() => onDelete(name, id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))}
            />
        );
    });

    const content = !data.length ? (
        <ul className="app-list_empty">Добавьте ваших сотрудников</ul>
    ) : (
        <ul className="app-list list-group">{elements}</ul>
    );

    return content;
};

export default EmployeesList;
