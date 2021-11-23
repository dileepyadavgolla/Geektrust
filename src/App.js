import { Component } from "react";
import EachItem from "./components/EachItem";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import "./App.css";

class App extends Component {
  state = {
    searchInput: "",
    list: [],
    checkList: "",
    isChecked: false,
    limit: 10,
    buttonActive: 1,

    CurrentPage: 1,
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();

    this.setState({ list: data });
  };

  setSelected = (id1) => {
    const { list, checkList } = this.state;

    const filtered = list.filter((each) => each.id === id1);
    const { id, name, email, role } = filtered[0];

    this.setState((prev) => ({
      checkList: [
        ...checkList,
        { id: id, name: name, email: email, role: role },
      ],
    }));
  };

  deleteItem = (id) => {
    const { list } = this.state;
    const filtered = list.filter((each) => each.id !== id);
    this.setState({ list: filtered });
  };

  editTask = (id1, name, role, email) => {
    const { list } = this.state;
    console.log(id1);
    console.log("gggg");
    console.log(role);
    console.log(name);

    console.log(email);

    const ind = list.findIndex((each) => each.id === id1);
    list[ind] = { id: id1, name, role, email };

    this.setState({ list: list });
  };

  clickButton = () => {
    const { list, checkList } = this.state;
    const ids = checkList.map((each) => each.id);

    const diff = list.filter((x) => {
      return !ids.includes(x.id);
    });
    console.log(diff);
    this.setState({ list: diff });
  };

  onclickNxt = () => {
    const { CurrentPage } = this.state;

    if (CurrentPage <= 4) {
      this.setState((prev) => ({
        CurrentPage: prev.CurrentPage + 1,
        buttonActive: prev.CurrentPage + 1,
      }));
    } else {
      this.setState({ CurrentPage: 5 });
    }
  };

  onClickPrev = () => {
    const { CurrentPage } = this.state;
    if (CurrentPage > 1) {
      this.setState((prev) => ({ CurrentPage: prev.CurrentPage - 1 }));
    } else {
      this.setState({ CurrentPage: 1 });
    }
  };

  onChangeInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  changePage = (event) => {
    this.setState({
      CurrentPage: Number(event.target.id),
      buttonActive: Number(event.target.id),
    });
  };

  render() {
    const { searchInput, list, limit, CurrentPage } = this.state;
    const indexofLast = CurrentPage * limit;
    const indexOfFirst = indexofLast - limit;
    console.log(indexOfFirst);
    console.log(indexofLast);
    let currentList = list.slice(indexOfFirst, indexofLast);
    console.log(list);

    const renderDetails = () => {
      const { searchInput } = this.state;

      const searchResults = currentList.filter(
        (eachUser) =>
          eachUser.name.includes(searchInput) ||
          eachUser.email.includes(searchInput) ||
          eachUser.role.includes(searchInput)
      );

      return (
        <ul className="unordered">
          {searchResults.map((each, i) => (
            <EachItem
              each={each}
              key={each.id}
              editTask={this.editTask}
              setSelected={this.setSelected}
              deleteItem={this.deleteItem}
            />
          ))}
        </ul>
      );
    };

    const pageNo = [];

    for (let i = 1; i <= Math.ceil(list.length / Number(limit)); i++) {
      pageNo.push(i);
    }
    console.log(pageNo);

    const renderPages = () => {
      const { CurrentPage } = this.state;
      console.log(CurrentPage);
      return (
        <>
          {pageNo.map((each) => (
            <li
              key={each}
              id={each}
              className={Number(CurrentPage) === each ? "res" : "pageItem"}
              onClick={this.changePage}
              color="primary"
            >
              {each}
            </li>
          ))}
        </>
      );
    };

    return (
      <div className="appContainer">
        <input
          type="text"
          value={searchInput}
          onChange={this.onChangeInput}
          className="input"
          placeholder="search by name or email or role"
        />
        <div className="topCon">
          <input type="checkbox" className="check" />
          <h1 className="head">Name</h1>
          <h1 className="head">Email</h1>
          <h1 className="head">Role</h1>
          <h1 className="head">Actions</h1>
        </div>
        <hr className="line" />
        {renderDetails()}
        <div className="con">
          <button type="button" className="button" onClick={this.clickButton}>
            Delete Selected
          </button>
          <button onClick={this.onclickNxt} className="buttonIcon">
            <FaAngleDoubleRight className="icons" />
          </button>
          <ul className="pageList">{renderPages()}</ul>
          <button onClick={this.onClickPrev} className="buttonIcon">
            <FaAngleDoubleLeft />
          </button>
        </div>
      </div>
    );
  }
}

export default App;
