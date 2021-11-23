import { Component } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import "./index.css";

class EachItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      each: this.props.each,
      setSelected: this.props.setSelected,
      isChecked: false,
      deleteItem: this.props.deleteItem,
      clicked: false,
      email1: "",
      name1: "",
      role1: "",
      editTask: this.props.editTask,
    };
  }

  checkItem = () => {
    const { each, isChecked, setSelected } = this.state;
    const { id } = each;

    this.setState((prev) => ({ isChecked: !prev.isChecked }));

    if (isChecked === false) {
      setSelected(id);
    }
  };

  onClickDel = () => {
    const { each, deleteItem } = this.state;
    const { id } = each;
    deleteItem(id);
  };

  onClickEdit = (event) => {
    this.setState((prev) => ({ clicked: !prev.clicked }));
  };

  saveData = () => {
    const { role1, name1, email1, editTask, id } = this.state;

    console.log(role1);
    console.log(name1);
    console.log(email1);
    this.setState((prev) => ({ clicked: !prev.clicked }));
    editTask(id, email1, role1, name1);
  };

  renderlines = () => {
    const { each } = this.state;
    const { name, email, role } = each;
    return (
      <div className="lines-con">
        <p className="para">{name}</p>
        <p className="para">{email}</p>
        <p className="para">{role}</p>
      </div>
    );
  };

  onChangeName = (event) => {
    this.setState({ name1: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email1: event.target.value });
  };

  onChangeRole = (event) => {
    this.setState({ role1: event.target.value });
  };

  renderInputs = () => {
    const { each, name1, email1, role1 } = this.state;
    const { name, email, role } = each;
    return (
      <div className="lines-con">
        <input
          type="text"
          className="para"
          onChange={this.onChangeName}
          value={name1}
          defaultValue={name}
        />
        <input
          type="text"
          className="para"
          onChange={this.onChangeEmail}
          value={email1}
          defaultValue={email}
        />
        <input
          type="text"
          className="para"
          onChange={this.onChangeRole}
          value={role1}
          defaultValue={role}
        />
      </div>
    );
  };

  render() {
    const { each, clicked } = this.state;

    const { isChecked } = each;
    console.log(isChecked);

    return (
      <>
        <li className="list-item">
          <input type="checkbox" className="check" onChange={this.checkItem} />
          {clicked ? this.renderInputs() : this.renderlines()}
          <div className="btnCon">
            {clicked ? (
              <button type="button" onClick={this.saveData}>
                Save
              </button>
            ) : (
              <button
                type="button"
                className="button1"
                onClick={this.onClickEdit}
              >
                <FaEdit className="edit" />
              </button>
            )}
            <button type="button" className="button1" onClick={this.onClickDel}>
              <AiOutlineDelete className="del" />
            </button>
          </div>
        </li>
        <hr className="line" />
      </>
    );
  }
}
export default EachItem;
