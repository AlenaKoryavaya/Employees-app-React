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
            data: [
                { name: "Anna Grayes", salary: 500, increase: false, raise: true, id: 1 },
                { name: "Ivan Filipov", salary: 3500, increase: true, raise: true, id: 2 },
                { name: "Colin Farel", salary: 900, increase: false, raise: false, id: 3 },
                { name: "Sveta Aksert", salary: 5000, increase: false, raise: true, id: 4 },
                { name: "Kris Ostin", salary: 2000, increase: false, raise: false, id: 5 },
            ],
            term: "",
            filter: "all",
        };
        this.id = this.state.data.length + 1;
    }

    // Delete a certain item
    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter((elem) => elem.id !== id),
            };
        });
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
                <AppInfo employees={employees} increased={increased} />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter onUpdateFilter={this.onUpdateFilter} filter={filter} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;
