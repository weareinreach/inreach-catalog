import Cookies from 'js-cookie';
import React from 'react';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {PrivacyIcon} from './icons';

const styles = theme => ({
  container: {
    position: 'fixed',
    bottom: '85px',
    left: '0',
    right: '0',
    textAlign: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  hidingBox: {
    display: 'inline-block',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(29, 31, 35, 0.5)'
  },
  box: {
    display: 'inline-block',
    padding: theme.spacing(1),
    textTransform: 'uppercase'
  },
  valignMiddle: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  title: {
    lineHeight: '25px',
    paddingLeft: theme.spacing(1)
  },
  hidingBoxTitle: {
    color: theme.palette.common.white
  },
  closeButton: {
    width: '25px',
    minWidth: '25px'
  },
  [theme.breakpoints.down('xs')]: {}
});

class PrivacyNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.shouldBeDisplayed(),
      hiding: false
    };

    this.shouldBeDisplayed = this.shouldBeDisplayed.bind(this);
    this.completeDismiss = this.completeDismiss.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleLaunchPrivacyPage = this.handleLaunchPrivacyPage.bind(this);
  }

  shouldBeDisplayed() {
    return Cookies.get('privacy-prompt') !== 'off';
  }

  completeDismiss() {
    Cookies.set('privacy-prompt', 'off');
    this.setState({
      hiding: false,
      display: false
    });
  }

  handleDismiss() {
    //Cookies.set('privacy-prompt', "off");
    this.setState({
      hiding: true
    });
    setTimeout(this.completeDismiss, 3000);
  }

  handleLaunchPrivacyPage(ev) {
    console.log(ev);
    if (ev.target.closest('.stop-click-propagation') === null) {
      this.completeDismiss();
      this.props.handleRequestOpen('privacy');
    }
  }

  render() {
    const {
      container,
      box,
      valignMiddle,
      closeButton,
      title,
      hidingBox,
      hidingBoxTitle
    } = this.props.classes;
    if (this.state.display) {
      return (
        <div className={container}>
          {this.state.hiding ? (
            <Paper className={hidingBox} onClick={this.handleLaunchPrivacyPage}>
              <Typography variant="h6" className={hidingBoxTitle}>
                Info Dismissed. You can find our Disclaimer &amp; Privacy
                Statement again under the "more" tab.
              </Typography>
            </Paper>
          ) : (
            <Paper className={box} onClick={this.handleLaunchPrivacyPage}>
              <span className={valignMiddle}>
                <PrivacyIcon width="25px" />
              </span>
              <Typography variant="h6" className={valignMiddle + ' ' + title}>
                READ OUR PRIVACY STATEMENT
              </Typography>
              <span className={valignMiddle + ' stop-click-propagation'}>
                <Button onClick={this.handleDismiss} className={closeButton}>
                  <Fa name="times" />
                </Button>
              </span>
            </Paper>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(PrivacyNotice);
