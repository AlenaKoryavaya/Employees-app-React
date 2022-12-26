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
            filter: "",
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

    // Меняем значения свойств increase, raise на противоположные
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

    render() {
        const { data } = this.state;
        const employees = data.length;
        const increased = data.filter((item) => item.increase).length;

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />
                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
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
