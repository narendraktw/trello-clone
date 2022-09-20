import { useAppState } from '../context/AppProvider';
import UpdateItem from './UpdateItem';

type CardProps = {
	cardId: string;
	title: string;
	listId: string;
};

const Card = ({ title, cardId, listId }: CardProps) => {
	const { dispatch } = useAppState();

	return (
		<div className="card">
			<p>{title}</p>
			<UpdateItem
				onEdit={(label) =>
					dispatch({
						type: 'EDIT_CARD',
						payload: { title: label, listId: listId, cardId: cardId },
					})
				}
				onDelete={() =>
					dispatch({
						type: 'DELETE_CARD',
						payload: { listId: listId, cardId: cardId },
					})
				}
				title={title}
				listId={listId}
				cardId={cardId}
			/>
		</div>
	);
};

export default Card;
