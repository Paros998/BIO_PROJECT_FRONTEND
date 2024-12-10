import React, { FC } from 'react';

import BackButtonArrowCircle from '../../components/BackButton/BackButtonArrowCircle';
import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainWrapper from '../../components/Wrappers/MainWrapper';
// import background from '../../images/lends.jpg';

interface UserLendsProps {
	userId?: string;
}

// OLD
const UserLends: FC<UserLendsProps> = ({ userId }) => {
	return (
		<BackgroundImageContainer src={'//background'} className={'w-100 h-100'}>
			<Header>
				<div className={`d-flex gap-3`}>
					<BackButtonArrowCircle />
					<h3 className="text-light mb-0">My Lends</h3>
				</div>
			</Header>

			<MainWrapper className="px-4 py-2 h-100 d-flex align-items-center justify-content-center overflow-scroll overflow-x-hidden thumb-dark ">
				<></>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default UserLends;
