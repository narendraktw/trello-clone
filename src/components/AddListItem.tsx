import { useState } from 'react';
import Modalbox from './modalbox/Modalbox';

interface AddItemProps {
	onAdd(text: string): void;
	toggleButtonText: string;
}

const AddListItem = ({ onAdd, toggleButtonText }: AddItemProps) => {
	const [showModal, setShowModal] = useState(false);
	const [label, setLabel] = useState('');

	//Add column item
	const addItem = () => {
		onAdd(label);
		setShowModal(false);
		setLabel('');
	};

	return (
		<>
			<button className="add-btn" onClick={() => setShowModal(true)}>
				{toggleButtonText}
			</button>
			{showModal && (
				<Modalbox>
					<div className="modal-header">
						<div className="modal-title">Add Item</div>
						<span className="close" onClick={() => setShowModal(false)}>
							&times;
						</span>
					</div>

					<div className="modal-body">
						<input
							type="text"
							autoFocus
							value={label}
							onChange={(e) => setLabel(e.target.value)}
							placeholder="Add Label Name"
						/>
						<input type="button" value="Save" onClick={() => addItem()} />
					</div>
				</Modalbox>
			)}
		</>
	);
};

export default AddListItem;
