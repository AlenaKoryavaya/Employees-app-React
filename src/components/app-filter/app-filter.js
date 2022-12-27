import "./app-filter.css";

const AppFilter = ({ onUpdateFilter, filter }) => {
    const buttonsData = [
        { name: "all", label: "Все сорудники" },
        { name: "raise", label: "На повышение" },
        { name: "moreThan1000", label: "З/П больше 1000$" },
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const active = filter === name;
        const clazz = active ? "btn-light" : "btn-outline-light";

        return (
            <button
                key={name}
                className={`btn ${clazz}`}
                type="button"
                onClick={() => onUpdateFilter(name)}
            >
                {label}
            </button>
        );
    });
    return <div className="btn-group">{buttons}</div>;
};

export default AppFilter;
