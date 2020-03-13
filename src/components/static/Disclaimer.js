import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import infoIcon from '../../../public/img/information_icon.svg';

const styles = theme => ({
  disclaimerContainer: {
    border: '1px solid',
    borderColor: theme.palette.secondary[900],
    backgroundColor: theme.palette.common.separator,
    marginBottom: theme.spacing.unit * 5
  },
  texContainer: {
    margin: 'auto',
    position: 'relative',
    '&:before': {
      content: `url(${infoIcon})`,
      position: 'absolute',
      height: '14px',
      width: '14px',
      top: '18px',
      left: '38px'
    }
  },
  textParagraph: {
    padding: '15px 60px',
    color: theme.palette.secondary[900]
  },
  moreInfo: {}
});

const Disclaimer = props => {
  const {disclaimerContainer, textParagraph, texContainer} = props.classes;
  return (
    <div className={disclaimerContainer}>
      <Grid container>
        <Grid item xs={12} className={texContainer}>
          <Typography className={textParagraph} align="left">
            {props.text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Disclaimer);
