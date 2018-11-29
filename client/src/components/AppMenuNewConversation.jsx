import React from 'react';
import { Link } from 'react-router-dom'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import AppMenu from './AppMenu'

const AppMenuNewConversation = () => {

  return (
    <AppMenu>
      <Menu.Item header as='h3'>
        New Message
        </Menu.Item>
      <Menu.Menu position='right'>
        <Link to='/' className='item' style={{color: '#2185d0'}}>
          Cancel
        </Link>
      </Menu.Menu>
    </AppMenu>
  );
}

export default AppMenuNewConversation;
