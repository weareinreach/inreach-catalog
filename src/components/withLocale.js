import React from 'react';

import locale, {fetchLocale, validLocales} from '../helpers/locale';

export default function withLocale(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        locale: locale.getLocale(),
        content: fetchLocale(locale.getLocale())
      };

      this.t = this.t.bind(this);
      this.changeLocale = this.changeLocale.bind(this);
      this.getCountry = this.getCountry.bind(this);
    }

    componentWillMount() {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.locale &&
        this.state.locale !== this.props.match.params.locale
      ) {
        this.changeLocale(this.props.match.params.locale);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.match &&
        nextProps.match.params &&
        nextProps.match.params.locale &&
        nextProps.match.params.locale !== this.state.locale
      ) {
        this.changeLocale(nextProps.match.params.locale);
      }
    }

    componentWillUnmount() {}

    changeLocale(newLocale) {
      //localStorage newLocale
      if (validLocales.indexOf(newLocale) < 0) {
        locale.clearLocale();
      } else {
        locale.setLocale(newLocale);
      }
      //this.content = fetchLocale(locale.getLocale());
      this.setState({
        locale: newLocale,
        content: fetchLocale(locale.getLocale())
      });
    }

    getCountry() {
      let pieces = this.state.locale.split('_');
      return pieces[pieces.length - 1];
    }

    t(key) {
      if (
        typeof this.state.content !== 'undefined' &&
        typeof this.state.content[key] !== 'undefined'
      ) {
        return this.state.content[key];
      } else {
        return key;
      }
    }

    render() {
      return (
        <WrappedComponent
          t={this.t}
          country={this.getCountry()}
          locale={this.state.locale}
          changeLocale={this.changeLocale}
          {...this.props}
        />
      );
    }
  };
}
