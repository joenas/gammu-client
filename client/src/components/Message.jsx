import React from 'react';

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

const Message = ({item}) => {

  const align = (item.incoming ? 'left' : 'right')
  const style = {paddingTop: '0px', paddingBottom: '0px'}

  return (
    <Grid.Column width={16} style={style} className='message'>
      <div className={"triangle-right " + align}>
        {item.text}
      </div>
    </Grid.Column>
  );
}

export default Message;
