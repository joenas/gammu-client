import React from 'react';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container'

const AppMenu = ({children}) => {
  return (
    <div className="ui top fixed menu borderless" style={{boxShadow: 'none'}}>
      <Container>
        {children}
      </Container>
    </div>
  );
}

export default AppMenu
