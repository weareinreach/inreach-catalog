import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {InformationIcon} from './icons';

const styles = (theme) => ({
  disclaimerContainer: (props) => ({
    border: '1px solid',
    borderColor: theme.palette.secondary[900],
    backgroundColor: theme.palette.common.separator,
    marginBottom: props?.marginBottom || theme.spacing(5),
    width: '100%',
  }),
  iconContainer: {
    position: 'absolute',
    height: '14px',
    width: '14px',
    top: '26px',
    left: '40px',
  },
  textContainer: {
    margin: 'auto',
    position: 'relative',
  },
  textParagraph: (props) => ({
    padding: props?.padding || '24px 40px 24px 62px',
    color: theme.palette.secondary[900],
  }),
  moreInfo: {},
});

const Disclaimer = (props) => {
  const {
    disclaimerContainer,
    iconContainer,
    textContainer,
    textParagraph,
  } = props.classes;
 const {icon} = props
  return (
    <div className={disclaimerContainer}>
      <Grid container>
        <Grid item xs={12} className={textContainer}>
          <Typography className={textParagraph} align="left">
            <span className={iconContainer}>
              {icon ? icon : <InformationIcon />}
            </span>
            {props.children || props.text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Disclaimer);
