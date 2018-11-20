import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

import Section from './Section';

import Loading from '../Loading';
import 'whatwg-fetch';
import ContentMarkdown from '../../helpers/ContentMarkdown';
import {StandaloneIcon} from '../icons';

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
  },
  subtitle: {
    fontStyle: 'italic',
    marginTop: theme.spacing.unit * 4
  },
  section: {
    padding: '5% 20%',
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    section: {
      padding: 0
    },
    marginBottom: {
      marginBottom: '5%',
    },
  },
  textAlignCenter: {
    textAlign: 'center',
  },
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

  fetchPage(name) {
    fetch(window.location.origin+'/api/page/'+name, 
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
    return (
      <div>
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
                <div className={classes.cta}>
                  {/* 4 Icons */}
                </div>
              </div>
              : null }
            </div>
            <div>
            {this.state.data.map((section, index) => {
              if(section.heading == "Intro") return null;
              return (
                <div key={index} className={classes.section}>
                  <div>
                    <StandaloneIcon name={section.icon} />
                  </div>
                  <Section color={section.color} icon={section.icon}
                    type={section.heading}
                    title={section.title}
                    description={section.description}
                    resources={section.resources && section.resources.length ? section.resources : []}
                  />
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
