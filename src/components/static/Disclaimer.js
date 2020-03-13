import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import infoIcon from '../../../public/img/information_icon.svg';

const styles = {
  disclaimerContainer: {
    border: '1px solid #2D4A80',
    backgroundColor: '#D3DCEC',
    marginBottom: '40px'
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
    color: '#2D4A80'
  },
  moreInfo: {}
};

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
