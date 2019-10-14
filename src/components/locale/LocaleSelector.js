import React from 'react';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import locale from '../../helpers/Locale';

import AsylumConnectSelector from '../AsylumConnectSelector';
import AsylumConnectDropdownListItem from '../AsylumConnectDropdownListItem';

import {searchInput, searchInputMobile, mobilePadding} from '../../theme/sharedClasses';

const styles = theme => ({
  inputClass: Object.assign(searchInput(theme), {
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '0',
    //boxShadow: '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: "none"
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme)
  }),
});

const supportedLocales = [
  {name: "🇨🇦 Canada", code: "en_CA"},
  {name: "🇲🇽 Mexico", code: "es_MX"},
  {name: "🇺🇸 United States", code: "en_US"},
  {name: "🌎 Other / Travel Support", code: "intl"}
]

class LocaleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocale: (this.props.locale ? this.props.locale : false),
      selectedLocaleName: (this.props.locale ? this.getLocaleNameFromCode(this.props.locale) : false),
    }

    this.handleSelectLocale = this.handleSelectLocale.bind(this)
    this.getLocaleNameFromCode = this.getLocaleNameFromCode.bind(this)
  }

  handleSelectLocale(localeCode, localeName) {
    this.setState({
      selectedLocale: localeCode,
      selectedLocaleName: localeName
    });
    if(this.props.setOnChange === true) {
      this.props.changeLocale(localeCode);
    }
    if(typeof this.props.handleSelectLocale === 'function') {
      this.props.handleSelectLocale(localeCode, localeName);
    }
  }

  

  getLocaleNameFromCode(code) {
    let selectedLocale = supportedLocales.filter((item) => (item.code === code));
    if(selectedLocale.length) {
      return selectedLocale[0].name;
    } else {
      return false;
    }
  }

  componentWillMount() {
    if(this.state.selectedLocale == false) {
      this.setState({
        selectedLocale: locale.getLocale(),
        selectedLocaleName: this.getLocaleNameFromCode(locale.getLocale())
      });
    }
  }


  render() {
    const { handleSelectLocale, localeLabel } = this.props;
    const { inputClass } = this.props.classes;

    return(
      <AsylumConnectSelector label={this.state.selectedLocaleName ? this.state.selectedLocaleName : localeLabel} selected={[]} containerClass={inputClass} closeOnClick={true}>
        <List>
          {supportedLocales.map((item, index) => <AsylumConnectDropdownListItem button key={index} selected={this.state.selectedLocale === item.name} onClick={event => {this.handleSelectLocale(item.code, item.name); }}>{item.name}</AsylumConnectDropdownListItem>)}
        </List>
      </AsylumConnectSelector>
    );
  }
}

export default withStyles(styles)(LocaleSelector);