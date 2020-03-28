import React from 'react';

import Fa from 'react-fontawesome';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import AsylumConnectInfographicButton from '../AsylumConnectInfographicButton';
import AsylumConnectButton from '../AsylumConnectButton';
import LocaleSelector from '../locale/LocaleSelector';
import SearchBar from './SearchBar';
import withWidth from '../withWidth';
import {breakpoints} from '../../theme';

import Disclaimer from '../static/Disclaimer';

const styles = theme => ({
  formRow: {
    marginBottom: theme.spacing.unit * 3
  },
  callout: {
    color: theme.palette.primary[500]
  },
  underline: {
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary[900]
    }
  },
  [theme.breakpoints.down('xs')]: {
    searchButtonContainer: {
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 10
    },
    searchButton: {
      textAlign: 'center'
    },
    body2: {
      color: theme.palette.common.white
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'underline'
    }
  },
  [theme.breakpoints.down('xl')]: {
    lowerButton: {
      marginTop: theme.spacing.unit * 53,
      marginBottom: theme.spacing.unit * 3
    }
  }
});

const BannerContainer = props => {
  const {locale} = props;
  const disclaimerProps = {};
  if (locale === 'en_US') {
    disclaimerProps.children = (
      <span>
        <strong>United States Borders Close Due to Coronavirus:</strong> On
        March 20, 2020, the United States announced the borders with mexico and
        Canada will be closed. Asylum seekers will be turend back from all
        borders.
      </span>
    );
  } else if (locale === 'en_CA') {
    disclaimerProps.children = (
      <span>
        <strong>United States-Canada Border Closes Due to Coronavirus:</strong>{' '}
        On March 20, 2020, the US announced that travel across the border with
        Canada will be stopped. Canada will turn back asylum seekers who cross
        the US border. For more information on how COVID-19 is impacting refugee
        claims in Canada, see{' '}
        <a href="https://asylumconnect.org/information-on-how-covid-19-is-impacting-refugee-claims-in-canada">
          this blog post
        </a>
        .
      </span>
    );
  }

  return (
    <div>
      <Disclaimer {...disclaimerProps} />
    </div>
  );
};

class SearchForm extends React.Component {
  constructor() {
    super();

    this.state = {
      moveButton: false
    };
    this.onMoveSearchButton = this.onMoveSearchButton.bind(this);
  }

  onMoveSearchButton(newPosition) {
    if (newPosition !== this.state.moveButton) {
      this.setState({
        moveButton: !this.state.moveButton
      });
    } else if (newPosition === this.state.moveButton) {
      this.setState({
        moveButton: !this.state.moveButton
      });
    }
  }

  render() {
    const bannerProps = {locale: this.props.locale};
    const {
      searchButton,
      searchButtonContainer,
      lowerButton
    } = this.props.classes;
    const variant =
      /*this.props.width < breakpoints['sm'] ?  "secondary" :*/ 'primary';
    const localeLabel = 'Select country';
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div>
        {/*<Grid container spacing={0} >
          <Grid item xs={12} className={formRow}>
            <Typography variant="body2" className={body2+' '+callout}>
              Are you in Mexico waiting to seek LGBTQ asylum in the U.S.? <a href={"/"+locale+"/page/Mexico/#googtrans(es)"} className={link+' '+callout+' '+underline}>Click here.</a>
            </Typography>
          </Grid>
          <Grid item xs={12} className={formRow}>
            <Typography variant="body2" className={body2}>
              Are you outside of the United States and Canada? <Link to={"/"+locale+"/page/outside-US-and-Canada"} className={link}>Click here.</Link>
            </Typography>
          </Grid>
        </Grid>*/}
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
        <BannerContainer {...bannerProps} />
        <SearchBar
          {...this.props}
          classes={null}
          moveSearchButton={this.onMoveSearchButton}
        />
        <Grid container spacing={0} className={searchButtonContainer}>
          {/*<Grid item xs={12} className={formRow}>
            <Typography variant="body2" className={body2}>
              Are you outside of the United States and Canada? <Link to="/page/outside-US-and-Canada" className={link}>Click here.</Link>
            <FormControlLabel
              control={
                <Checkbox
                  value="checkedA"
                />
              }
            label="Include remote resources"
            className={formRow}
            />
            </Typography>
          </Grid>*/}
          <Grid
            item
            xs={12}
            sm={12}
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

export default withWidth(withStyles(styles)(SearchForm));
