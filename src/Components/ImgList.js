import React from 'react';
import Img from './Img';
import NoImgs from './NoImgs';

const ImgList = props => {
	const results = props.data;
	let imgs;
	if (results.length > 0) {
		imgs = results.map(img => <Img url={img.urls.small} key={img.id} />);
	} else {
		imgs = <NoImgs />;
	}
	return (
		<div>
        <ul className="img-list">
			{imgs}
		</ul>
        </div>
	);
};

export default ImgList;