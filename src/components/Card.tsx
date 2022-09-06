import { useAppState } from '../context/AppProvider';

interface CardProps {
	cardId: string;
	title: string;
	listId: string;
}

const Card = ({ title, cardId, listId }: CardProps) => {
	const { dispatch } = useAppState();

	return (
		<div className="card">
			<p>{title}</p>
		</div>
	);
};

export default Card;
