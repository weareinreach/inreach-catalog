import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import AsylumConnectDialogBody from './AsylumConnectDialogBody';
import {makeStyles} from '@material-ui/core/styles';
import {FormattedMessage} from 'react-intl';
import {Box} from '@material-ui/core';

const useStyles = makeStyles({
	photoGridItem: {
		maxHeight: 150,
		maxWidth: 150,
		'&:hover': {
			cursor: 'pointer'
		}
	},
	photoGalleryContainer: {
		height: 685,
		padding: '5px 0'
	},
	photoBox: {
		margin: '0 auto',
		height: 515
	},
	photoListBar: {
		flexWrap: 'nowrap',
		maxHeight: 150
	},
	centerHoriz: {
		margin: '0 auto'
	}
});

const NoPhotos = () => {
	const classes = useStyles();
	return (
		<Grid container>
			<span className={classes.centerHoriz}>
				No <FormattedMessage id="resource.photos" />
			</span>
		</Grid>
	);
};

export const PhotoGallery = ({photos, initialPhoto = 0}) => {
	const [photoView, setPhotoView] = useState(initialPhoto);
	const classes = useStyles();
	const fourSqDomain = 'https://fastly.4sqi.net/img/general/';

	if (!photos.length) {
		return <NoPhotos />;
	}

	const previewImages = photos.map((item, idx) => (
		<ImageListItem key={idx} className={classes.photoGridItem}>
			<img
				src={item.src}
				alt="Provided by foursquare.com"
				onClick={() => setPhotoView(idx)}
			/>
		</ImageListItem>
	));

	return (
		<Grid container className={classes.photoGalleryContainer}>
			<Grid item className={classes.photoBox}>
				<img
					src={`${fourSqDomain}original${photos[photoView].suffix}`}
					alt="Provided by foursquare.com"
					style={{
						maxWidth: '100%',
						maxHeight: 500,
						padding: '10px'
					}}
				/>
			</Grid>
			<ImageList cols={3} className={classes.photoListBar}>
				{previewImages}
			</ImageList>
		</Grid>
	);
};

export const OrgPhotoGrid = ({photos}) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [initialPhoto, setInitialPhoto] = useState(0);
	const classes = useStyles();

	const handlePhotoOpen = (photo) => {
		setInitialPhoto(photo);
		setModalOpen(true);
	};

	if (!photos.length) {
		return <NoPhotos />;
	}

	const photoGridSrc = photos.map((item, idx) => (
		<Grid key={item.suffix} item>
			<img
				src={item.src}
				alt={`Provided by foursquare.com`}
				height={100}
				width={100}
				onClick={() => handlePhotoOpen(idx)}
				className={classes.photoGridItem}
			/>
		</Grid>
	));

	const mainPhotoGrid =
		photoGridSrc.length <= 5
			? photoGridSrc
			: [
					...photoGridSrc.slice(0, 4),
					<Grid
						item
						// style={{margin: 'auto'}}
						onClick={() => handlePhotoOpen(0)}
						className={classes.photoGridItem}
					>
						<div
							style={{
								height: 100,
								width: 100,
								display: 'flex'
							}}
						>
							<span style={{margin: 'auto'}}>
								<FormattedMessage id="resource.photos-view-more" />
							</span>
						</div>
					</Grid>
			  ];

	return (
		<Box className={classes.centerHoriz}>
			<Grid container spacing={2}>
				{mainPhotoGrid}
			</Grid>
			<Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
				<AsylumConnectDialogBody handleRequestClose={() => setModalOpen(false)}>
					<PhotoGallery photos={photos} initialPhoto={initialPhoto} />
				</AsylumConnectDialogBody>
			</Dialog>
		</Box>
	);
};
