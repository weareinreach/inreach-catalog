import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
  listRoot: {
    margin: "0",
    paddingLeft: theme.spacing.unit * 3
  }
})

class DetailPropertyList extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  replaceValue(target, value) {
    return target.replace(/\[value\]/, isNaN(parseFloat(value)) ? value : parseFloat(value) );
  } 

  render() {
    const self = this;
    const { list, classes } = this.props;
    
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
          {list.length ?
            <ul className={classes.listRoot}>
              {list.map((item, index) => {
                return (
                  <li key={index}>
                    <Typography variant="body2">
                      {self.replaceValue(item.text, item.value)}
                    </Typography> 
                  </li>
                );
              })}
            </ul>
          : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DetailPropertyList);