import React from 'react';
import { connect } from 'react-redux'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

import AppMenuList from '../components/AppMenuList'
import AppLoader from '../components/AppLoader'
import ConversationsListItem from '../components/ConversationsListItem'

const mapStateToProps = state => {
  const { ids, items, isFetching } = state.messages
  return {
    items: ids.map(id => items[id][0]),
    isFetching: isFetching
  }
}

let ConversationsList = ({items, isFetching}) => {
  return (
    <div>
      <AppMenuList/>
      {(isFetching && items.length === 0) ? <AppLoader/> : null}
      <Grid container>
        <Grid.Column>
          {items.map(item => <ConversationsListItem key={item.datetime} item={item} />)}
        </Grid.Column>
      </Grid>
    </div>
  );
}

ConversationsList = connect(mapStateToProps)(ConversationsList)

export default ConversationsList
