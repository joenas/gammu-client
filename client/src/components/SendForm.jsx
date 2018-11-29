import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { push } from 'react-router-redux'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'

import { sendItem} from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    sendItem: item => {
      dispatch(sendItem(item))
    },
    goToConversation: number => {
      dispatch(push(`/${number}`))
    }
  }
}

const mapStateToProps = state => {
  return {
    numberErrors: state.messages.numberErrors
  }
}

class SendForm extends Component {

  constructor(props){
    super(props);
    this.state = { message: '' };
  }

  handleChange  (e, { key, value }) {
    this.setState({ message: value })
  }

  handleSubmit (event) {
    const { message } = this.state
    const { number, sendItem, goToConversation } = this.props
    sendItem({text: message, number: number})
    goToConversation(number)
    this.setState({message: ''})
  }

  render() {
    const { message } = this.state
    const { number, numberErrors } = this.props
    const numberInvalid = (number !== '' && !number.match(/^\+?\d*$/))
    const submitDisabled = (message === '' || numberInvalid)
    const errorMessage = numberErrors[number] || (numberInvalid && 'Invalid number') || ''

    // return (
    //   <Form>
    //     <Input
    //       icon={<Form.Button as={<Icon name='arrow circle up' inverted link color='blue' size='big' style={{width: 'auto', right: '30px'}}/>}/>}
    //       placeholder='Message...'
    //       style={{width: '100%'}}
    //       onChange={this.handleChange}
    //     />
    //   </Form>
    // )

    return (
      <Form unstackable onSubmit={this.handleSubmit.bind(this)} error={errorMessage !== ''}>
        <Form.Group>
          <Message
            error
            content={errorMessage}
            size='tiny'
            style={{width: '100%'}}
          />
          <Input
            placeholder='Message...'
            style={{width: '80%'}}
            onChange={this.handleChange.bind(this)}
            value={message}
          />
          <Form.Button icon circular size='mini' style={{background: 'transparent'}} disabled={submitDisabled}>
            <Icon name='arrow circle up' inverted link color='blue' size='big' style={{width: 'auto', right: '30px'}}/>
          </Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

SendForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendForm)
export default SendForm
