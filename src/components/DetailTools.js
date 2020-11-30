import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from 'react-modal';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { EditIcon, ShareIcon } from './icons';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import ResourceHeaderTabs from './ResourceHeaderTabs';
import SaveToFavoritesButton from './SaveToFavoritesButton';
import SuggestEditsModal from './SuggestEditsModal'

const Tools = (props) => {
  const {
    backText,
    classes,
    handleBackButtonClick,
    handleListAddFavorite,
    handleListNew,
    handleListRemoveFavorite,
    handleLogOut,
    handleMessageNew,
    handleRequestOpen,
    handleTabClick,
    lists,
    resource,
    session,
    sharePath,
    tab,
    tabs,
    user,
    userData,
  } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const handleOpen = (type) => {
    setModalIsOpen(false);
    handleRequestOpen(type);
  };
  const isVerified = _.some(resource?.owners, owner => { return owner.userId == user })

  return (
    <Grid
      container
      spacing={0}
      alignItems={tabs ? 'flex-end' : 'center'}
      justify="center"
      className={classnames(
        {
          [classes.header]: tabs,
        },
        classes.dividerSpacing
      )}
    >
      {handleBackButtonClick ? (
        <Grid item xs={12} sm={12} md={handleBackButtonClick && tabs ? 12 : 5}>
          <AsylumConnectBackButton
            text={backText}
            onClick={handleBackButtonClick}
          />
        </Grid>
      ) : null}
      {tabs ? (
        <Grid item xs={12} sm={12} md={5}>
          <ResourceHeaderTabs
            tabs={tabs}
            tab={tab}
            handleTabClick={handleTabClick}
            classes={classes}
          />
        </Grid>
      ) : null}
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        className={classnames('pull-right', classes.cushion)}
      >
        {isVerified && (
          <IconButton
            className={classnames('center-align', classes.editButton)}
            onClick={() => {
              setDetailModalOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
        <div className={classnames(classes.separator, 'center-align')}></div>
        <div className="center-align">
          <SaveToFavoritesButton
            handleListAddFavorite={handleListAddFavorite}
            handleListRemoveFavorite={handleListRemoveFavorite}
            handleListNew={handleListNew}
            handleLogOut={handleLogOut}
            handleMessageNew={handleMessageNew}
            handleRequestOpen={handleOpen}
            lists={lists}
            parentResourceId={resource?.organization?._id}
            resourceId={resource?._id}
            session={session}
            user={user}
            userData={userData}
          />
        </div>
        <div className={classnames(classes.separator, 'center-align')}></div>
        <IconButton
          className="center-align"
          onClick={() => {
            session ? handleOpen('share/' + sharePath) : setModalIsOpen(true);
          }}
        >
          <ShareIcon />
        </IconButton>
        <Modal
          ariaHideApp={false}
          style={{
            overlay: {
              zIndex: 9999,
            },
            content: {
              position: 'absolute',
              top: '25%',
              left: '30%',
              bottom: 'auto',
              width: '40%',
              padding: 0,
              fontFamily: '"Open Sans", sans-serif',
              background: '#FFFFFF',
            },
          }}
          isOpen={modalIsOpen}
        >
          <div style={{ textAlign: 'left', paddingTop: '13px', height: '20px' }}>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 0,
                top: '38px',
                border: '1px solid #E9E9E9',
                zIndex: 0,
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
                boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                <ShareIcon size={'19px'} />
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '40px', padding: '8%' }}>
            <p>Oops! You need to be logged in to share resources.</p>
            <p
              style={{
                fontWeight: 'bold',
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
          <div style={{ textAlign: 'center', paddingBottom: '15px' }}>
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
                paddingTop: '5px',
              }}
              onClick={() => handleOpen('signup')}
            >
              sign up/sign in
            </Button>
          </div>
          <div style={{ paddingBottom: '20px', textAlign: 'center' }}>
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
                paddingTop: '5px',
              }}
              onClick={() => setModalIsOpen(false)}
            >
              close
            </Button>
          </div>
        </Modal>
        <SuggestEditsModal
          open={detailModalOpen}
          setOpen={setDetailModalOpen}
          resource={resource}
          userData={userData}
        />
      </Grid>
    </Grid>
  );
};

Tools.propTypes = {
  sharePath: PropTypes.string.isRequired,
  resource: PropTypes.object,
};

export default Tools;
