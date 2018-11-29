import React from 'react';
import { Link } from 'react-router-dom'

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import AppMenu from './AppMenu'

const AppMenuList = () => {
  return (
    <AppMenu>
      <Menu.Item header as='h3'>
        Messages
      </Menu.Item>
      <Menu.Menu position='right'>
        <Link to='/new' className='item'>
          <Icon name='edit' color='blue' size='large'/>
        </Link>
      </Menu.Menu>
    </AppMenu>
  );
}

export default AppMenuList;
