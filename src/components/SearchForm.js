import React from 'react';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import LocaleSelector from './LocaleSelector';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';
import SearchBar from './SearchBar';
import withWidth from './withWidth';
import {breakpoints} from '../theme';

const styles = (theme) => ({
  formRow: {
    marginBottom: theme.spacing(3),
  },
  callout: {
    color: theme.palette.primary[500],
  },
  underline: {
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary[900],
    },
  },
  [theme.breakpoints.down('xs')]: {
    nationalOrgCheckboxContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    searchButtonContainer: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(10),
    },
    searchButton: {
      textAlign: 'center',
    },
    body2: {
      color: theme.palette.common.white,
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'underline',
    },
  },
  [theme.breakpoints.down('xl')]: {
    nationalOrgCheckboxContainer: {
      paddingBottom: theme.spacing(3),
    },
    lowerButton: {
      marginTop: theme.spacing(53),
      marginBottom: theme.spacing(3),
    },
  },
});

class SearchForm extends React.Component {
  constructor() {
    super();

    this.state = {
      moveButton: false,
    };
    this.onMoveSearchButton = this.onMoveSearchButton.bind(this);
  }

  onMoveSearchButton(newPosition) {
    if (newPosition !== this.state.moveButton) {
      this.setState({
        moveButton: !this.state.moveButton,
      });
    } else if (newPosition === this.state.moveButton) {
      this.setState({
        moveButton: !this.state.moveButton,
      });
    }
  }
  render() {
    const {
      nationalOrgCheckboxContainer,
      searchButton,
      searchButtonContainer,
      lowerButton,
    } = this.props.classes;
    const variant = 'primary';
    const localeLabel = 'Select country';
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div>
        {isMobile ? (
          <Grid container>
            <Grid item xs={12}>
              <LocaleSelector
                label={localeLabel}
                setOnChange={true}
                handleSelectLocale={this.props.onLocaleSelect}
                changeLocale={this.props.changeLocale}
              />
            </Grid>
          </Grid>
        ) : null}
        <SearchBar
          {...this.props}
          classes={null}
          moveSearchButton={this.onMoveSearchButton}
        />
        <Grid container spacing={0} className={nationalOrgCheckboxContainer}>
            <Grid item>
              <AsylumConnectCheckbox
                label = {this.props.locale
                  ? this.props.t(
                      'Show me national organizations who can help anyone located in the United States'
                    )
                  : this.props.t('Show me national organizations who can help anyone located in the country')}
                checked = {this.props.isNational}
                onChange= {this.props.handleNationalCheckBox}
              />
            </Grid>
        </Grid>
        <Grid container spacing={0} className={searchButtonContainer}>
          <Grid
            item
            xs={12}
            md={4}
            className={searchButton}
            style={{paddingBottom: '10px'}}
          >
            <AsylumConnectButton
              variant={variant}
              onClick={this.props.handleSearchButtonClick}
              disabled={this.props.searchDisabled}
              className={this.state.moveButton ? lowerButton : null}
            >
              Search
              {this.props.searchDisabled ? (
                <Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
              ) : null}
            </AsylumConnectButton>
          </Grid>
          {this.props.infographic ? (
            <Grid item xs={12} sm={12} md={8} className={searchButton}>
              <AsylumConnectInfographicButton
                type="link"
                url={
                  this.props.infographic.url ? this.props.infographic.url : null
                }
                list={
                  this.props.infographic.list
                    ? this.props.infographic.list
                    : null
                }
                text={this.props.t(
                  'Download Legal Guides on LGBTQ Asylum in the U.S.'
                )}
              />
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withWidth(SearchForm));
