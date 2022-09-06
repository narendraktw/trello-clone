import './modalbox.css';

interface ModalProps {
	children: React.ReactNode;
}

const ModalBox = ({ children }: ModalProps) => {
	return (
		<div className="modal">
			<div className="modal-content">{children}</div>
		</div>
	);
};

export default ModalBox;
