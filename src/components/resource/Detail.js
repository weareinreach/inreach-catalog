import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import {bodyLink, boldFont, italicFont, dividerSpacing, mobilePadding} from '../../theme/sharedClasses';
import Resource from './Resource';
import Service from './Service';


const styles = (theme) => ({
  tabRoot: {
    minWidth: '0'
  },
  tabLabelContainer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  tabLabel: {
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  },
  tabIndicator: {
    height: "4px"
  },
  container: {
    minHeight: '500px',
    paddingTop: '60px',
    paddingBottom: '60px',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      /*height: "100%",*/
      paddingTop: '0px',
      paddingBottom: '0px'
      /*marginBottom: '91px'*/
    })
  },
  cushion: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  separator: {
    padding: "0 "+theme.spacing.unit,
    fontSize: "1.25rem",
    "&:after": {
      content: "\" \"",
    }
  },
  header: {
    borderBottom: "1px solid "+theme.palette.common.darkGrey
  },
  contentSpacing: {
    margin: (theme.spacing.unit * 3) + " 0"
  },
  bottomSpacing: {
    marginBottom: theme.spacing.unit * 2
  },
  mobileSpacing: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 3
    }
  },
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  sectionSpacing: {
    marginBottom: theme.spacing.unit * 0
  },
  dividerSpacing: dividerSpacing(theme),
  orgName: {
    fontSize: "21px",
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  serviceBadge: {
    position: "absolute",
    marginLeft: theme.spacing.unit * -1
  },
  serviceText: {
    display: 'block',
    lineHeight: (theme.spacing.unit * 0.5 + 45).toString() + 'px',
    paddingLeft: theme.spacing.unit * 7,
    marginTop: 0,
    marginBottom: 0
    //marginTop: theme.spacing.unit * 2,
    //marginBottom: theme.spacing.unit * 2
    //paddingTop:"10px"
  },
  serviceTooltip: {
    top: theme.spacing.unit
  },
  boldFont: boldFont(theme),
  italicFont: italicFont(theme),
  moreInfo: Object.assign({
    color: theme.palette.common.darkGrey,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }, boldFont(theme)),
  bodyLink: bodyLink(theme),
  listLink: {
    '& + &:before': {
      content: '\", \"'
    }
  },
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem',
  },
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    paddingLeft: '0',
    paddingRight: '0',
  }
});

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      tab: 0,
      acFilter: false,
      //userReview: null,
      //userComment: null
    };

    this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
    this.handleTabClickMobile = this.handleTabClickMobile.bind(this);
    this.handleSwipeChange = this.handleSwipeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  
  }

  componentWillMount() {
    window.scroll(0,0);
  }

  componentWillUnmount() {
  }

  handleFilterChange(event, acFilter) {
    this.setState({acFilter});
  }

  handleTabClickDesktop (e, tab) {
    this.setState({
      tab
    });
  }

  handleTabClickMobile (e, tab) {
    this.setState({
      tab
    });
  }

  handleSwipeChange(index, indexLatest) {
    this.setState({
      tab: index
    });
  }

  render() {
    const { classes, session, handleMessageNew, history } = this.props;
    const { props } = this;
    //console.log(this.props.resource, this.props.service)
    return (
      <Switch>
        <Route path="/resource/:id/service/:serviceId" render={ props => (
          <Service {...props}
            acFilter={this.state.acFilter}
            defaultClasses={this.props.classes}
            handleFilterChange={this.handleFilterChange}
            handleListAddFavorite={this.props.handleListAddFavorite}
            handleListRemoveFavorite={this.props.handleListRemoveFavorite}
            handleListNew={this.props.handleListNew}
            handleLogOut={this.props.handleLogOut}
            handleMessageNew={this.props.handleMessageNew}
            handleRequestOpen={this.props.handleRequestOpen}
            handleSwipeChange={this.handleSwipeChange}
            handleTabClickDesktop={this.handleTabClickDesktop}
            handleTabClickMobile={this.handleTabClickMobile}
            lists={this.props.lists}
            mapResources={this.props.mapResources}
            resource={this.props.resource}
            service={this.props.service}
            setSelectedResource={this.props.setSelectedResource}
            setSelectedService={this.props.setSelectedService}
            session={this.props.session}
            tab={this.state.tab}
            user={this.props.user}
          />)}
        />
        <Route path="/resource/:id" render={ props => (
          <Resource {...props}
            acFilter={this.state.acFilter}
            defaultClasses={this.props.classes}
            handleFilterChange={this.handleFilterChange}
            handleListAddFavorite={this.props.handleListAddFavorite}
            handleListRemoveFavorite={this.props.handleListRemoveFavorite}
            handleListNew={this.props.handleListNew}
            handleLogOut={this.props.handleLogOut}
            handleMessageNew={this.props.handleMessageNew}
            handleRequestOpen={this.props.handleRequestOpen}
            handleSwipeChange={this.handleSwipeChange}
            handleTabClickDesktop={this.handleTabClickDesktop}
            handleTabClickMobile={this.handleTabClickMobile}
            lists={this.props.lists}
            mapResources={this.props.mapResources}
            resource={this.props.resource}
            setSelectedResource={this.props.setSelectedResource}
            session={this.props.session}
            tab={this.state.tab}
            user={this.props.user}
          />)}
        />
      </Switch>
    )
  } 
}

Detail.propTypes = {
  handleMessageNew: PropTypes.func.isRequired
}

export default withStyles(styles)(Detail);
