import React from 'react';
import { Link } from 'react-router-dom'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import { Segment } from 'semantic-ui-react'
import moment from 'moment'

const ConversationsListItem = ({item}) => {

  const timeAgo = moment(item.datetime).fromNow()
  const style = {
    header: {
      marginBottom: '0.25em'
    },
    subHeader: {
      float: 'right'
    }
  }

  return (
    <Segment vertical>
      <Link
        key={item.number}
        to={{
          pathname: `/${item.number}`,
        }}
      >
        <Header as='h4' style={style.header}>
          {item.number}
          <Header.Subheader style={style.subHeader}>
            {timeAgo}
          </Header.Subheader>
        </Header>
        <span>{item.text}</span>
      </Link>
    </Segment>
  );
}

export default ConversationsListItem
