import React, { Component } from "react";
import { connect } from "react-redux";
import { addContact, deleteContact, searchContact } from "../redux/actions";
import shortId from "shortid";
import { Link } from "react-router-dom";

class Contacts extends Component {
  state = {
    name: "",
    phone: "",
    searchValue: ""
  };
  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };
  addNewContact = e => {
    e.preventDefault();
    this.props.addContact({
      name: this.state.name,
      phone: this.state.phone,
      id: shortId()
    });
  };

  searchNewContact = e => {
    this.props.searchContact(e.target.value);
    this.setState({ searchValue: e.target.value });
  };
  hs = () => {
    return this.props.searchContact;
  };
  render() {
    console.log("hs()", this.hs());
    const renderContacts =
      this.state.searchValue !== ""
        ? this.props.filteredContacts
        : this.props.contacts;
    const { name, phone } = this.state;
    return (
      <div>
        <Link to="/">Back home</Link>
        <button type="button" onClick={() => this.props.history.push("/")}>
          {" "}
          Back home{" "}
        </button>

        {console.log("props", this.props)}
        <h2>Contacts</h2>
        <form onSubmit={this.addNewContact}>
          <input
            type="text"
            placeholder="name"
            name="name"
            required
            autoFocus
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="tel"
            placeholder="phone"
            name="phone"
            required
            value={phone}
            onChange={this.handleChange}
          />
          <button type="submit">Add to list</button>
        </form>
        <h3>Filter</h3>
        <input
          type="search"
          placeholder="search name"
          name="search"
          onChange={this.searchNewContact}
          value={this.state.searchValue}
        />
        <h3>Contact list</h3>
        <ul>
          {console.log(this.props.searchNewContact)}

          {renderContacts.map(contact => (
            <li key={contact.id} id={contact.id}>
              <span>Name:{contact.name}</span>
              <br></br>
              <span>Phone:{contact.phone}</span>
              <button
                type="button"
                onClick={() => this.props.deleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// const Contacts = props => (
// );

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    filteredContacts: state.filteredContacts
  };
};
const mapDispatchToProps = {
  addContact,
  deleteContact,
  searchContact
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
