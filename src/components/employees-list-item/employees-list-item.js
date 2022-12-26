import "./employees-list-item.css";

const EmployeesListItem = (props) => {
    const { name, salary, increase, raise, onDelete, onToggleProp } = props;

    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
        classNames += " increase";
    }
    if (raise) {
        classNames += " like";
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label" data-toggle="raise" onClick={onToggleProp}>
                {name}
            </span>
            <input type="text" className="list-group-item-input" defaultValue={salary + ` $`} />
            <div className="d-flex justify-content-center aligh-items-center">
                <button
                    className="btn-cookie btn-sm"
                    title="на повышение"
                    data-toggle="increase"
                    onClick={onToggleProp}
                >
                    <i className="fas fa-cookie"></i>
                </button>

                <button className="btn-trash btn-sm" onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
};

export default EmployeesListItem;
