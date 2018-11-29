import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

import AppMenuNewConversation from '../components/AppMenuNewConversation'
import Message from '../components/Message'
import SendForm from '../components/SendForm'
import ToForm from '../components/ToForm'


const mapStateToProps = state => {
  return {
    allItems: state.messages.items,
    ids: state.messages.ids,
    number: state.messages.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

let NewConversation = ({ location, ...rest }) => {
  const { number, allItems, ids } = rest
  var conversation = null
  if (ids.includes(number)) {
    conversation = (<Grid container>{allItems[number].map(item => <Message key={item.id} item={item}/>)}</Grid>)
  }
  return (
    <div className="site">
      <AppMenuNewConversation/>
      <main className="site-content" style={{paddingTop: '5em'}}>
        <ToForm/>
        {conversation}
      </main>
      <footer>
        <SendForm number={number}/>
      </footer>
    </div>
  )
};

NewConversation = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewConversation))
export default NewConversation
