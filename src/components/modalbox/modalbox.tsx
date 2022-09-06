import './modalbox.css';

interface ModalProps {
	children: React.ReactNode;
}

const Modalbox = ({ children }: ModalProps) => {
	return (
		<div className="modal">
			<div className="modal-content">{children}</div>
		</div>
	);
};

export default Modalbox;
