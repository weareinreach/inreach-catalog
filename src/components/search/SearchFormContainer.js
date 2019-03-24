import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import SearchForm from './SearchForm';
import AsylumConnectInfographicButton from "../AsylumConnectInfographicButton";
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import {mobilePadding} from '../../theme/sharedClasses';
import SubAnnouncement from '../SubAnnouncement';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit
  },
  subheading: {
    marginBottom: theme.spacing.unit * 4
  },
  container: {
    minHeight: '500px',
    paddingTop: theme.spacing.unit * 16,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0
    }
  },
  subAnnouncement: {
    backgroundColor: '#e9e9e9',
    marginLeft: '-34px',
    paddingLeft: '34px',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    position: 'absolute',
    top: '0',
    left:'0',
    right: '0',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      position: 'static',
      paddingTop: "80px",
      marginLeft: '0'
    }),
  },
  infographicSpacing: {},
  [theme.breakpoints.down('xs')]: {
    title: {
      color: theme.palette.common.white
    },
    subheading: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 4
    },
    container: {
      height: "100%",
      backgroundColor: theme.palette.secondary[500]
    },
    containerSearchForm: Object.assign(mobilePadding(theme), {
      paddingTop: "1rem",
      paddingBottom: "60px",
      backgroundColor: theme.palette.secondary[500]
    }),
    infographicSpacing: {
      marginTop: '1rem'
    }
  },
  backButton: {
    position: 'fixed',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.darkBlack,
    top: '0',
    left: '0',
    right: '0',
    height: '60px',
    zIndex: '200',
    '&:hover, &:active': {
      backgroundColor: theme.palette.common.white
    }
  },
  backButtonLabel: {
    textTransform: "none",
    fontWeight: "600",
    justifyContent: "left",
    fontFamily: theme.typography.title.fontFamily
  }
});

class SearchFormContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { 
      container, 
      title, 
      subheading, 
      backButton, 
      backButtonLabel, 
      containerSearchForm, 
      infographicSpacing, 
      subAnnouncement} = this.props.classes; console.log(this.props.width, breakpoints['sm']);
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div style={{position: 'relative'}}>
        {! isMobile ? <div className={subAnnouncement} style={{marginLeft: '-'+(this.props.width - 1300)/2 + 'px', paddingLeft: (this.props.width - 1300)/2 + 'px'}}>
          <Grid container alignItems='center' justify={this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'} spacing={0}>
            <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
              <SubAnnouncement />
            </Grid>
          </Grid>
        </div> 
        : null}
        {isMobile ? 
          <Button href="http://asylumconnect.org" classes={{root: backButton, label: backButtonLabel }}>
            <ArrowBackIcon />&nbsp;Back to AsylumConnect Home Site
          </Button>
        : null}
        <Grid container alignItems='flex-start' justify={this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'} spacing={0} className={container}>
          <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
            {isMobile ? 
              <Grid item xs={12} className={subAnnouncement} >
                <SubAnnouncement />
              </Grid>
            : null}
            <Grid container spacing={0} className={containerSearchForm} >
              <Grid item xs={12}>
                <Typography variant="title" className={title}>
                  Welcome to the AsylumConnect catalog!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading" className={subheading}>
                  Search for LGBTQ- and asylum-friendly resources near you
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <SearchForm {...this.props} classes={null}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(SearchFormContainer));
