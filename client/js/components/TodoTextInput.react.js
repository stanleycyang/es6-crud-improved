import React from 'react';

let ReactPropTypes = React.PropTypes;
const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    }
  }

  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this.save.bind(this)}
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        value={this.state.value}
        autoFocus={true}
      />
    );
  }

  save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onKeyDown(event) {
    if(event.keyCode === ENTER_KEY_CODE) {
      this.save();
    }
  }
}

TodoTextInput.propTypes = {
  className: ReactPropTypes.string,
  id: ReactPropTypes.string,
  placeholder: ReactPropTypes.string,
  onSave: ReactPropTypes.func.isRequired,
  value: ReactPropTypes.string
}

