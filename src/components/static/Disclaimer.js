import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withStylesProps from '../withStylesProps';
import infoIcon from '../../../public/img/information_icon.svg';

const styles = (theme, props) => ({
  disclaimerContainer: {
    border: '1px solid',
    borderColor: theme.palette.secondary[900],
    backgroundColor: theme.palette.common.separator,
    marginBottom: props.marginBottom || theme.spacing.unit * 5
  },
  texContainer: {
    margin: 'auto',
    position: 'relative',
    '&:before': {
      content: `url(${infoIcon})`,
      position: 'absolute',
      height: '14px',
      width: '14px',
      top: '26px',
      left: '40px'
    }
  },
  textParagraph: {
    padding: props.padding || '24px 40px 24px 62px',
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

export default withStylesProps(styles)(Disclaimer);
