import { useState } from 'react';
import Column from './Column';
import { useAppState } from '../context/AppProvider';
import ModalBox from './modalbox/ModalBox';
const Board = () => {
	const { state, dispatch } = useAppState();
	const [showModal, setShowModal] = useState(false);
	const [label, setLabel] = useState('');

	//Add column item
	const addItem = () => {
		dispatch({
			type: 'ADD_LIST',
			payload: { title: label },
		});

		setShowModal(false);
		setLabel('');
	};
	return (
		<div className="board">
			{state.lists.map((list, i) => (
				<Column listId={list.id} title={list.title} key={list.id} index={i} />
			))}
			<div className="btn-box">
				{/* <AddItem
					toggleButtonText="+ Add a Column"
					onAdd={(title) => dispatch({ type: 'ADD_LIST', payload: title })}
				/> */}
				<button className="add-btn" onClick={() => setShowModal(true)}>
					+ Add a Column
				</button>
				{showModal && (
					<ModalBox>
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
							<input type="button" value="Save" onClick={addItem} />
						</div>
					</ModalBox>
				)}
			</div>
		</div>
	);
};

export default Board;
