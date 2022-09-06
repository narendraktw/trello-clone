import React from 'react';
interface ColumnProps {
	listId: string;
	title: string;
	index: number;
}
const Column = ({ title, index, listId }: ColumnProps) => {
	return (
		<>
			<div className="column">
				<div className="list">
					<div className="list-header">
						<div className="list-title">{title}</div>
						<div className="list-action">
							<button className="dot-button"></button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Column;
