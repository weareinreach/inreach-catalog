import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Fa from 'react-fontawesome';

const styles = {
  disclaimerContainer: {
    border: '3px solid #23386c',
    backgroundColor: '#cad3e8',
    marginBottom: '40px'
  },
  textParagraph: {
    padding: '15px 30px'
  },
  moreInfo: {
    fontWeight: '600',
    color: '#23386c',
    paddingRight: '5px'
  }
};

const Disclaimer = props => {
  const {disclaimerContainer, textParagraph, moreInfo} = props.classes;
  return (
    <div className={disclaimerContainer}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={textParagraph} align="left">
            <Fa name="info-circle" className={moreInfo} />
            {props.text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Disclaimer);
