import AddItem from './AddListItem';
import Column from './Column';
import { useAppState } from '../context/AppProvider';

const Board = () => {
	const { state, dispatch } = useAppState();
	return (
		<div className="board">
			{state.lists.map((list, i) => (
				<Column
					listId={list.listId}
					title={list.title}
					key={list.listId}
					index={i}
				/>
			))}
			<div className="column-btn">
				<AddItem
					toggleButtonText="+ Add a Column"
					onAdd={(title) => dispatch({ type: 'ADD_LIST', payload: title })}
				/>
			</div>
		</div>
	);
};

export default Board;
