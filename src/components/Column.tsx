import { useState, useRef, useEffect } from 'react';
import Card from './Card';
import ModalBox from './modalbox/ModalBox';
import PopOver from './popover/PopOver';
import { useAppState } from '../context/AppProvider';

type ColumnProps = {
	listId: string;
	title: string;
	index: number;
};
const Column = ({ title, index, listId }: ColumnProps) => {
	const { state, dispatch } = useAppState();
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopOver] = useState(false);
	const [label, setLabel] = useState(title);
	const [editedList, setEditList] = useState(false);

	//Add Card Item
	const addCardItem = () => {
		setLabel('');
		dispatch({
			type: 'ADD_CARD',
			payload: { title: label, listId: listId, columnIndex: index },
		});
		setShowModal(false);
		setEditList(false);
	};

	// Edit List Item
	const editListItem = () => {
		dispatch({
			type: 'EDIT_LIST',
			payload: { listId: listId, title: label },
		});
		setShowModal(false);
	};

	//get the column ref to handle the outside click
	const myRef = useRef<any>();

	const handleClickOutside = (e: MouseEvent) => {
		if (!myRef.current.contains(e.target)) {
			setShowPopOver(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	return (
		<>
			<div className="column" ref={myRef}>
				<div className="list">
					<div className="list-header">
						<div className="list-title">{title}</div>
						<div className="list-action">
							<button
								className="dot-button"
								onClick={() => setShowPopOver(!showPopOver)}
							></button>
						</div>
					</div>
					{state.lists[index].cards.map((card) => (
						<Card
							cardId={card.id}
							listId={listId}
							title={card.title}
							key={card.id}
						/>
					))}
					<div className="btn-box">
						<button
							className="add-btn"
							onClick={() => {
								setShowModal(true);
								setLabel('');
								setEditList(false);
							}}
						>
							+ Add a Card
						</button>
					</div>
				</div>
				{showPopOver && (
					<PopOver
						id={listId}
						onDelete={(listId) =>
							dispatch({
								type: 'DELETE_LIST',
								payload: { listId: listId },
							})
						}
						onEdit={() => {
							setShowModal(true);
							setEditList(true);
							setShowPopOver(false);
						}}
					/>
				)}
			</div>
			{showModal && (
				<ModalBox>
					<div className="modal-header">
						<div className="modal-title">
							{editedList ? 'Edit' : 'Add'} Item
						</div>
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
							placeholder={editedList ? 'Edit Label Name' : 'Add Label Name'}
						/>
						<input
							type="button"
							value="Save"
							onClick={() => {
								editedList ? editListItem() : addCardItem();
							}}
						/>
					</div>
				</ModalBox>
			)}
		</>
	);
};

export default Column;
