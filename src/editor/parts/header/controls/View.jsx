
import Control from './Control';

const Controls = styled.div`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	background: white;
	border-bottom: 1px solid var(--border-grey-light);
`;

ReadingEditorHeaderControls.Control = Control;
export default function ReadingEditorHeaderControls(props) {
	return <Controls className="reading-editor-controls" {...props} />;
}
