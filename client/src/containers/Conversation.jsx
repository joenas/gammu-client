import React from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import AppMenuConversation from '../components/AppMenuConversation'
import Message from '../components/Message'
import SendForm from '../components/SendForm'
import ScrollToBottom from '../components/ScrollToBottom'

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'


const mapStateToProps = state => {
  return {
    allItems: state.messages.items,
    ids: state.messages.ids
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

let Conversation = ({ match, allItems, ids }) => {
  const number = match.params.id

  if (ids.includes(number)) {
    const items = allItems[match.params.id].slice().reverse()

    return (
      <div className="site">
        <ScrollToBottom/>
        <AppMenuConversation number={number}/>
        <main className="site-content">
          <Grid container>
            {items.map(item => <Message key={item.id} item={item}/>)}
          </Grid>
        </main>
        <footer>
          <SendForm number={number}/>
        </footer>
      </div>
    )
  } else {
    console.log('Redirecting')
    return <Redirect to="/"/>
  }
};

Conversation = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation))
export default Conversation
