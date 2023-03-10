import { Component } from "react";

import "./app-info.css";

class AppInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
        };
    }

    setCompanyName = (company) => {
        this.setState({
            company: company,
        });
        this.props.setCompany(company);
    };

    // setCompanyNameOnDB = (e) => {
    //     e.preventDefault();
    //     this.props.setCompany(this.state.company);
    // };

    render() {
        const { employees, increased } = this.props;

        return (
            <div className="app-info">
                <form className="app-info__form">
                    <label className="app-info__form__title">Учет сотрудников компании</label>
                    <input
                        className="form-control app-info__form__input"
                        type="text"
                        placeholder="Введите название компании"
                        name="company"
                        value={this.state.company}
                        onChange={(e) => this.setCompanyName(e.target.value)}
                    />
                </form>
                <h2 className="app-info__subtitle">Общее число сотрудников: {employees} </h2>
                <h2 className="app-info__subtitle">Премию получат: {increased} </h2>
            </div>
        );
    }
}

export default AppInfo;
