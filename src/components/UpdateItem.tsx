import React, { useState } from 'react';
import ModalBox from './modalbox/ModalBox';
import { useAppState } from '../context/AppProvider';

interface UpdateItemProps {
	onDelete(): void;
	onEdit(text: string): void;
	title: string;
	listId: string;
	cardId: string;
}

const UpdateItem = ({
	onEdit,
	onDelete,
	title,
	listId,
	cardId,
}: UpdateItemProps) => {
	const [showModal, setShowModal] = useState(false);
	const [label, setLabel] = useState(title);
	const { state, dispatch } = useAppState();
	const [moveListId, setMoveListId] = useState(listId);

	const deleteItem = () => {
		onDelete();
		setShowModal(false);
	};

	const updateItem = () => {
		onEdit(label);
		setShowModal(false);
	};

	const moveListItem = () => {
		dispatch({
			type: 'MOVE_CARD',
			payload: { listId, cardId, moveListId },
		});
	};

	const handleSetMoveListId = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		console.log('val', value);
		setMoveListId(value);
	};

	return (
		<>
			<button className="add-btn" onClick={() => setShowModal(true)}>
				Modify
			</button>
			{showModal && (
				<ModalBox>
					<div className="modal-header">
						<div className="modal-title">Update Card Details</div>
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
						<div className="card-move">
							Move To: &nbsp;
							<select value={moveListId} onChange={handleSetMoveListId}>
								{state.lists.map((list) => (
									<option value={list.listId} key={list.listId}>
										{list.title}
									</option>
								))}
							</select>
							&nbsp;
							<input type="button" value="Move Card" onClick={moveListItem} />
						</div>
						<div className="group-btn">
							<input type="button" value="Delete" onClick={deleteItem} />
							<input type="button" value="Update Label" onClick={updateItem} />
						</div>
					</div>
				</ModalBox>
			)}
		</>
	);
};

export default UpdateItem;
