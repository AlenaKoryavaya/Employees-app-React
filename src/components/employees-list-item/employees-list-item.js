import { Component } from "react";

import "./employees-list-item.css";

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: "",
        };
    }

    render() {
        const { name, salary, increase, raise, onSalaryChange, onDelete, onToggleProp } =
            this.props;

        let salaryStyle = "list-group-item d-flex justify-content-between";
        let dollarStyle = null;

        if (increase) {
            salaryStyle += " increase";
            dollarStyle = "list-group-item-dollar";
        }
        if (raise) {
            salaryStyle += " like";
        }

        return (
            <li className={salaryStyle}>
                <span className="list-group-item-label" data-toggle="raise" onClick={onToggleProp}>
                    {name}
                </span>
                <form className="salary-form">
                    <input
                        type="text"
                        className="list-group-item-input"
                        name="salary"
                        value={salary}
                        onChange={onSalaryChange}
                    />
                    <label className={dollarStyle} htmlFor="">
                        $
                    </label>
                </form>

                <div className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn-cookie btn-sm"
                        title="премировать"
                        data-toggle="increase"
                        onClick={onToggleProp}
                    >
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button
                        className="btn-trash btn-sm"
                        title="удалить сотрудника"
                        onClick={onDelete}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star" title="на повышение"></i>
                </div>
            </li>
        );
    }
}

export default EmployeesListItem;
