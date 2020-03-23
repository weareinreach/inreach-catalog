import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import AsylumConnectBackButton from '../AsylumConnectBackButton';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import DetailHeaderTabs from './DetailHeaderTabs';
import IconButton from 'material-ui/IconButton';
import ShareIcon from '../icons/ShareIcon';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import SignupFormContainer from '../account/SignupFormContainer';

const Tools = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Grid
      container
      spacing={0}
      alignItems={props.tabs ? 'flex-end' : 'center'}
      justify="center"
      className={
        (props.tabs ? props.classes.header : '') +
        ' ' +
        props.classes.dividerSpacing
      }
    >
      {props.handleBackButtonClick ? (
        <Grid
          item
          xs={12}
          sm={12}
          md={props.handleBackButtonClick && props.tabs ? 12 : 5}
        >
          <AsylumConnectBackButton
            text={props.backText}
            onClick={props.handleBackButtonClick}
          />
        </Grid>
      ) : null}
      {props.tabs ? (
        <Grid item xs={12} sm={12} md={5}>
          <DetailHeaderTabs
            tabs={props.tabs}
            tab={props.tab}
            handleTabClick={props.handleTabClick}
            classes={props.classes}
          />
        </Grid>
      ) : null}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        className={'pull-right ' + props.classes.cushion}
      >
        <div className="center-align">
          <SaveToFavoritesButton
            handleListAddFavorite={props.handleListAddFavorite}
            handleListRemoveFavorite={props.handleListRemoveFavorite}
            handleListNew={props.handleListNew}
            handleLogOut={props.handleLogOut}
            handleMessageNew={props.handleMessageNew}
            handleRequestOpen={props.handleRequestOpen}
            lists={props.lists}
            resourceId={props.resource.id}
            session={props.session}
            user={props.user}
          />
        </div>
        <div className={props.classes.separator + ' center-align'}></div>
        <IconButton
          className="center-align"
          onClick={() => {
            props.session
              ? props.handleRequestOpen('share/' + props.sharePath)
              : setModalIsOpen(true);
          }}
        >
          <ShareIcon />
        </IconButton>
        <Modal
          ariaHideApp={false}
          style={{
            content: {
              position: 'absolute',
              top: '25%',
              left: '30%',
              bottom: 'auto',
              width: '40%',
              padding: 0,
              fontFamily: '"Open Sans", sans-serif',
              background: '#FFFFFF'
            }
          }}
          isOpen={modalIsOpen}
        >
          <div style={{textAlign: 'left', paddingTop: '13px', height: '20px'}}>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 0,
                top: '38px',
                border: '1px solid #E9E9E9',
                zIndex: 0
              }}
            ></div>
            <div
              style={{
                left: '46%',
                position: 'absolute',
                display: 'inline-block',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                zIndex: 1,
                boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{paddingTop: '10px', textAlign: 'center'}}>
                <ShareIcon size={'19px'} />
              </div>
            </div>
          </div>
          <div style={{paddingTop: '40px', padding: '8%'}}>
            <p>Oops! You need to be logged in to share resources.</p>
            <p
              style={{
                fontWeight: 'bold'
              }}
            >
              With a free AsylumConnect account you can unlock additional
              features:
            </p>
            <div>
              <li>Save and share personalized resources lists</li>
              <br />
              <li>Leave public rating/reviews on resources</li>
              <br />
              <li>Suggest new resources in your area</li>
              <br />
              <li>Claim your organization's profile page</li>
            </div>
          </div>
          <div style={{textAlign: 'center', paddingBottom: '15px'}}>
            <Button
              style={{
                display: 'inline-block',
                background: '#CC4747',
                borderRadius: '100px',
                fontWeight: 'bold',
                lineHeight: '22px',
                width: '220px',
                height: '34px',
                color: '#FFFFFF',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                paddingTop: '5px'
              }}
              onClick={() => props.handleRequestOpen('signup')}
            >
              sign up/sign in
            </Button>
          </div>
          <div style={{paddingBottom: '20px', textAlign: 'center'}}>
            <Button
              style={{
                display: 'inline-block',
                background: '#FFFFFF',
                borderRadius: '100px',
                fontWeight: 'bold',
                lineHeight: '22px',
                width: '220px',
                height: '34px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: 'solid',
                color: '#5073B3',
                paddingTop: '5px'
              }}
              onClick={() => setModalIsOpen(false)}
            >
              close
            </Button>
          </div>
        </Modal>
      </Grid>
    </Grid>
  );
};

Tools.propTypes = {
  sharePath: PropTypes.string.isRequired,
  resource: PropTypes.object
};

export default Tools;
