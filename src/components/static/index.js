import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

import Section from './Section';

import Loading from '../Loading';
import 'whatwg-fetch';
import ContentMarkdown from '../../helpers/ContentMarkdown';
import {StandaloneIcon} from '../icons';
import url from 'url';
import queryString from 'query-string';

const styles = theme => ({
  root: {
    marginBottom: '70px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: '5% 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10%'
  },
  subtitle: {
    fontStyle: 'italic',
    marginTop: theme.spacing.unit * 2
  },
  section: {
    padding: '6% 30% 8%',
  },
  inlineBlock: {
    display: 'inline-block'
  },
  navigation: {
    marginTop: theme.spacing.unit * 10
  },
  [`@media (max-width: ${breakpoints['md']}px)`]: {
    section: {
      padding: '5% 5% 7%'
    },
    header: {
      padding: '0 5%'
    },
    hr: {
      margin: theme.spacing.unit+' 5%'
    }
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    marginBottom: {
      marginBottom: '5%',
    },
    navigation: {
      marginTop: theme.spacing.unit * 2
    }
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 700
  }
});

class Static extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      loading: true
    };
    this.fetchPage = this.fetchPage.bind(this);
    this.handlePageRequest = this.handlePageRequest.bind(this);
  }

  componentWillMount() {
    window.scroll(0,0);
    this.fetchPage(this.props.match.params.pageName);
  }

  useFreshRequest(search) {
    var query = queryString.parse(search);
    return (query && query.fresh && query.fresh === 'true');
  }

  fetchPage(name) {
    fetch(window.location.origin+'/api/page/'+name + (this.useFreshRequest(window.location.search) ? '?cachebust=true' : ''), 
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(results => 
      (results.json())
    ).then(this.handlePageRequest);
  }

  handlePageRequest(response) {
    if(response && response.status == 'success') {
      this.setState({
        loading: false,
        data: response.data
      });
    } else {
      this.props.history.push('/');
      this.props.handleMessageNew('Page not found.');
    }
    
  }

  render() {
    const classes = this.props.classes;
    const lastSection = this.state.data ? this.state.data.length : 0;
    return (
      <div className="static--page-container">
      { this.state.loading ? <Loading /> :
        <div className={classes.root}> 
            <div>
              {this.state.data 
                && this.state.data.length 
                && this.state.data[0].heading
                && this.state.data[0].heading == "Intro" ?
              <div className={classes.header}>
                <Typography type='title'>
                  <ContentMarkdown source={this.state.data[0].title} />
                </Typography>
                <Typography type='caption' className={classes.subtitle}>
                  <ContentMarkdown source={this.state.data[0].caption} />
                </Typography>
                <Grid container spacing={0} alignItems='flex-start' justify='center' className={classes.navigation}>
                  {this.state.data.map((section, index) => {return section.icon ? (
                        <Grid key={index} item xs={3} sm={2} className={classes.textAlignCenter}>
                          <a href={'#'+section.heading.replace(/ /g, '-')} className={classes.inlineBlock}>
                            <StandaloneIcon name={section.icon} />
                          </a>
                          <Typography type='display4' className={classes.textBold}>{section.heading}</Typography>
                        </Grid>
                    ) : null}
                  )}
                </Grid>
              </div>
              : null }
            </div>
            <div>
            {this.state.data.map((section, index) => {
              if(section.heading == "Intro") return null;
              return (
                <div key={index}>
                  <div className={classes.section} id={section.heading.replace(/ /g, '-')}>
                    <Section color={section.color} icon={section.icon}
                      type={section.heading}
                      title={section.title}
                      description={section.description}
                      resources={section.resources && section.resources.length ? section.resources : []}
                      dropdown={section.dropdown ? section.dropdown : null}
                    />
                  </div>
                  {index+1 < lastSection ? <Grid container spacing={0} alignItems='flex-start' justify='center' ><Grid item xs={12} md={8}><hr className={classes.hr} /></Grid></Grid> : null}
                </div>
              )}
            )}
            </div>
              
        </div>
      }
      </div>
    );
  }

}

const data = Object.freeze({
  color: '#E58C52',
  icon: 'www.google.com',
  type: 'online support',
  title: 'Looking for LGBTQ chat rooms and support online?',
  description: 'Sample organization who offer LGBTQ people emotional and psychological support online',
  resources: [
    {
      name: 'The Trevor Project\'s TrevorSpace',
      link: 'www.TrevorSpace.org',
      description: 'The Trevor Project is the leading U.S. organization providing crisis intervention and suicide prevention services to lesbian, gay, bisezual, transgender, queer and questioning youth.',
      who: 'LGBTQ young people ages 13 to 24',
      how: 'Note: Please know that visiting TrevorSpace may leave a record on your computer or browser'
    },
  ]
})

// Static.propTypes = {

// };

export default withStyles(styles)(withWidth(Static));
