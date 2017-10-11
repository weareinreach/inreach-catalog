import React from 'react';

import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';

const styles = theme => ({
  searchInput: {
    border: 'none',
    boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',//0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)
    padding: '0.8rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize
  },
});

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    //this.state = { dialog: 'none' };
  }

  render() {
    const { searchInput } = this.props.classes;
    return (
      <div>
        <Input className={searchInput} disableUnderline={true} placeholder="Start typing address, city or zip code in the US&elip;"/>
        {/*<ResourceTypeSelector />*/}
      </div>
    );
  }
};

export default withStyles(styles)(SearchForm);
