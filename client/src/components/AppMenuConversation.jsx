import React from 'react';
import { Link } from 'react-router-dom'

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import AppMenu from './AppMenu'

const AppMenuConversation = ({number}) => {

  return (
    <AppMenu>
      <Link to='/' className='item'>
        <Icon name='chevron left' color='blue' size='large'/>
      </Link>
      <h3 className='header item'>
        {number}
      </h3>
    </AppMenu>
  );
}

export default AppMenuConversation;
