import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'

import { setNumber } from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (e, {value}) => {
      dispatch(setNumber(value))
    }
  }
}

const mapStateToProps = state => {
  return {
    allItems: state.messages.items,
    number: state.messages.number
  }
}

let ToForm = ({number, handleChange}) => {

  return (
    <Form unstackable >
      <Form.Group inline>
        <label style={{marginLeft: '0.5em'}}>To:</label>
        <Input
          onChange={handleChange}
          value={number}
        />
      </Form.Group>
    </Form>
  )
}

ToForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToForm)
export default ToForm
