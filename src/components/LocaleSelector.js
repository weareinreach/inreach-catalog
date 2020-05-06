import React from 'react';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';

import {getLocale} from '../utils/locale';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';

import {searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
  inputClass: Object.assign(searchInput(theme), {
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '0',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: 'none',
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme),
  }),
});

const supportedLocales = [
  {name: '🇨🇦 Canada', code: 'en_CA'},
  {name: '🇲🇽 Mexico', code: 'es_MX'},
  {name: '🇺🇸 United States', code: 'en_US'},
  {name: '🌎 Other / Travel Support', code: 'intl'},
];

class LocaleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocale: this.props.locale ? this.props.locale : false,
      selectedLocaleName: this.props.locale
        ? this.getLocaleNameFromCode(this.props.locale)
        : false,
    };

    this.handleSelectLocale = this.handleSelectLocale.bind(this);
    this.getLocaleNameFromCode = this.getLocaleNameFromCode.bind(this);
    this.setNewLocale = this.setNewLocale.bind(this);
  }

  handleSelectLocale(localeCode, localeName) {
    this.setState({
      selectedLocale: localeCode,
      selectedLocaleName: localeName,
    });

    if (typeof this.props.handleSelectLocale === 'function') {
      this.props.handleSelectLocale(localeCode, localeName);
    }
  }

  setNewLocale(newLocale) {
    console.log('what');
    console.log(this.state.selectedLocale);
    console.log(newLocale);
    if (newLocale !== this.state.selectedLocale) {
      if (typeof this.props.setNewLocale === 'function') {
        this.props.setNewLocale(this.state.selectedLocale);
        // window.location.reload(false);
      }
    }
  }

  getLocaleNameFromCode(code) {
    let selectedLocale = supportedLocales.filter((item) => item.code === code);
    if (selectedLocale.length) {
      return selectedLocale[0].name;
    } else {
      return false;
    }
  }

  componentWillMount() {
    if (this.state.selectedLocale === false) {
      this.setState({
        selectedLocale: getLocale(),
        selectedLocaleName: this.getLocaleNameFromCode(getLocale()),
      });
    }
  }

  render() {
    const {localeLabel} = this.props;
    const {inputClass} = this.props.classes;

    return (
      <AsylumConnectSelector
        label={
          this.state.selectedLocaleName
            ? this.state.selectedLocaleName
            : localeLabel
        }
        selected={[]}
        containerClass={inputClass}
        closeOnClick={true}
      >
        <List>
          {supportedLocales.map((item, index) => (
            <AsylumConnectDropdownListItem
              button
              key={index}
              selected={this.state.selectedLocale === item.name}
              onClick={(event) => {
                this.handleSelectLocale(item.code, item.name);
              }}
              setNewLocale={this.setNewLocale()}
            >
              {item.name}
            </AsylumConnectDropdownListItem>
          ))}
        </List>
      </AsylumConnectSelector>
    );
  }
}

export default withStyles(styles)(LocaleSelector);
