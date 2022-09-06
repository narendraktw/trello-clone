import './popover.css';

interface DeleteItemProps {
	onDelete(id: string): void;
	onEdit(id: string): void;
	id: string;
}

const PopOver = ({ id, onDelete, onEdit }: DeleteItemProps) => {
	const deleteItem = () => {
		onDelete(id);
	};

	const updateItem = () => {
		onEdit(id);
	};

	return (
		<div className="popover__content" onClick={(e) => e.stopPropagation()}>
			<ul className="popover__list">
				<li onClick={updateItem}>Edit</li>
				<li onClick={deleteItem}>Delete</li>
			</ul>
		</div>
	);
};

export default PopOver;
