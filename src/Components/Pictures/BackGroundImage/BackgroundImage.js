import React from 'react';

import classes from './BackgroundImage.module.css';

const BackgroundImage = (props) => {
	return (
		<div>
			<img
				className={classes.img}
				src={props.currentPicture}
				alt={`${props.currentPicture} Background`}
			/>
		</div>
	);
};

export default BackgroundImage;
