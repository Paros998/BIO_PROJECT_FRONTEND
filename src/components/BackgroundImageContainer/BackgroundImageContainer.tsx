import React, { FC, ReactNode } from 'react';

interface BackgroundImageContainerProps {
	src: string;
	className?: string;
	children?: ReactNode;
}

const BackgroundImageContainer: FC<BackgroundImageContainerProps> = ({ children, className, src }) => {
	return (
		<div
			className={className}
			style={{
				backgroundImage: `url(${src})`,
				backgroundAttachment: 'fixed',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center'
			}}
		>
			{children}
		</div>
	);
};

export default BackgroundImageContainer;
