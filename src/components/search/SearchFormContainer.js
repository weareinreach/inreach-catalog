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

const styles = theme => ({
  title: {
    marginBottom: '0.7rem'
  },
  subheading: {
    marginBottom: '4rem'
  },
  container: {
    minHeight: '500px',
  },
  infographicSpacing: {},
  [theme.breakpoints.down('sm')]: {
    title: {
      color: theme.palette.common.white
    },
    subheading: {
      color: theme.palette.common.white,
      marginBottom: '2rem'
    },
    container: {
      height: "100%",
      backgroundColor: theme.palette.primary[500]
    },
    containerSearchForm: Object.assign(mobilePadding(theme), {
      paddingTop: "60px",
      paddingBottom: "60px"
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
    const { container, title, subheading, backButton, backButtonLabel, containerSearchForm, infographicSpacing } = this.props.classes;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container alignItems='center' justify={this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'} spacing={0} className={container}>
        <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
          <Grid container spacing={0} className={containerSearchForm} >
            {isMobile ? 
              <Button href="http://asylumconnect.org" classes={{root: backButton, label: backButtonLabel }}>
                <ArrowBackIcon />&nbsp;Back to AsylumConnect Home Site
              </Button>
            : null}
            <Grid item xs={12}>
              <Typography type="title" className={title}>
                Welcome to the AsylumConnect catalog!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography type="subheading" className={subheading}>
                Search for LGBTQ- and asylum-friendly resources near you
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SearchForm {...this.props} classes={null}/>
            </Grid>
            {this.props.infographic ? 
              <Grid item xs={12} className={infographicSpacing}>
                <AsylumConnectInfographicButton url={this.props.infographic.url ? this.props.infographic.url : null} list={this.props.infographic.list ? this.props.infographic.list : null} text={"Asylum Seeker's Guide to "+this.props.infographic.name} />
              </Grid>
            : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default withWidth(withStyles(styles)(SearchFormContainer));
