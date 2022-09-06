import React from 'react';

interface AddItemProps {
	onAdd(text: string): void;
	toggleButtonText: string;
}

const AddListItem = ({ onAdd, toggleButtonText }: AddItemProps) => {
	return (
		<>
			<button>{toggleButtonText}</button>
		</>
	);
};

export default AddListItem;
