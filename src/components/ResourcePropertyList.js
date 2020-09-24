import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// TODO: move to utils and test
const replaceValue = (target, value) => {
  return target.replace(/\[value\]/, value);
};

const styles = (theme) => ({
  listRoot: {
    margin: '0',
    paddingLeft: theme.spacing(3),
  },
});

class DetailPropertyList extends React.Component {
  render() {
    const {list, classes} = this.props;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {list.length ? (
              <ul className={classes.listRoot}>
                {list.map((item, index) => {
                  return (
                    <li key={index}>
                      <Typography variant="body2">
                        {replaceValue(item.text, item.value)}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DetailPropertyList);
