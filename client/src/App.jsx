import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch} from 'react-router-dom'
import ReactInterval from 'react-interval'
import { ConnectedRouter } from 'react-router-redux'

import { checkForNewItems } from './actions'

import ConversationsList from './containers/ConversationsList'
import NewConversation from './containers/NewConversation'
import Conversation from './containers/Conversation'

//const CHECK_NEW_INTERVAL = 5000
const CHECK_NEW_INTERVAL = 60000

class App extends Component {

  componentDidMount() {
    this.checkForNewItems()
  }

  checkForNewItems() {
   const { dispatch } = this.props
   dispatch(checkForNewItems())
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <ReactInterval
            timeout={CHECK_NEW_INTERVAL}
            enabled={true}
            callback={() => this.checkForNewItems()}
          />
          <Switch>
            <Route exact path="/" component={ConversationsList}/>
            <Route path="/new" component={NewConversation}/>
            <Route path="/:id" component={Conversation}/>
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

export default connect()(App)
