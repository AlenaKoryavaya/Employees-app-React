import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
            data: [],
            term: "",
            filter: "all",
        };
        this.id = this.state.data.length + 1;
    }

    setCompany = (name) => {
        this.setState({
            company: name,
        });
    };

    // Delete a certain item
    deleteItem = (employee, id) => {
        let question = window.confirm(
            `Вы точно хотите удалить сотрудника ${employee} ?  После удаления вся информация о сотруднике будет также удалена.`
        );

        if (question) {
            this.setState(({ data }) => {
                return {
                    data: data.filter((elem) => elem.id !== id),
                };
            });
        }
    };

    onSalaryChange = (id, value) => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return { ...item, salary: value };
                } else {
                    return item;
                }
            }),
        }));
    };
    // Меняем значения свойств increase, raise на противоположные (печенька, звездочка)
    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }; // prop в [], чтобы избежать багов
                } else {
                    return item;
                }
            }),
        }));
    };

    addItem = (name, salary) => {
        // создаем шаблон для нов. элемента (newItem)
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            raise: false,
            id: this.id++,
        };

        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr,
            };
        });
    };

    // Search the needed employee (items - in this case is the data array)
    // Ищем не по первой букве, а как при нажатии Ctrl+f (по совпадению)
    searchEmployee = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.indexOf(term) > -1;
        });
    };

    // для обновления state от /search-panel.js подучаем данные из нижнего уровня на верхний и устанавливаем state (поднятие локального состояния родителю)
    onUpdateSearch = (term) => {
        this.setState({
            term, // term === term: term,
        });
    };

    onUpdateFilter = (filterName) => {
        this.setState({
            filter: filterName,
        });
    };

    filterPost = (items, filter) => {
        switch (filter) {
            case "raise":
                return items.filter((item) => item.raise);
            case "moreThan1000":
                return items.filter((item) => item.salary > 1000);
            default:
                return items;
        }
    };

    render() {
        const { data, term, filter } = this.state;
        const employees = data.length;
        const increased = data.filter((item) => item.increase).length;
        const visibleData = this.filterPost(this.searchEmployee(data, term), filter); // для комбинации поиска и фильтров

        return (
            <div className="app">
                <AppInfo setCompany={this.setCompany} employees={employees} increased={increased} />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter onUpdateFilter={this.onUpdateFilter} filter={filter} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onSalaryChange={this.onSalaryChange}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;
