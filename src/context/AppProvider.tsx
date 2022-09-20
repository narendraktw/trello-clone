import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { uniqueId, findItemIndexById } from '../utils/utils';

type Card = {
	id: string;
	title: string;
};

type List = {
	id: string;
	title: string;
	cards: Card[];
};

// discriminated union
type Action =
	| {
			type: 'ADD_LIST';
			payload: { title: string };
	  }
	| {
			type: 'EDIT_LIST';
			payload: { title: string; listId: string };
	  }
	| {
			type: 'DELETE_LIST';
			payload: { listId: string };
	  }
	| {
			type: 'ADD_CARD';
			payload: { title: string; listId: string; columnIndex: number };
	  }
	| {
			type: 'EDIT_CARD';
			payload: { title: string; cardId: string; listId: string };
	  }
	| {
			type: 'DELETE_CARD';
			payload: { cardId: string; listId: string };
	  }
	| {
			type: 'MOVE_CARD';
			payload: { listId: string; cardId: string; moveListId: string };
	  };

export type AppState = {
	lists: List[];
};

type AppContextProps = {
	state: AppState;
	dispatch: React.Dispatch<any>;
};

const appReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'ADD_LIST': {
			return {
				...state,
				lists: [
					...state.lists,
					{ id: uniqueId(), title: action.payload.title, cards: [] },
				],
			};
		}

		case 'EDIT_LIST': {
			const listIndex = findItemIndexById(state.lists, action.payload.listId);
			state.lists[listIndex].title = action.payload.title;
			return {
				...state,
			};
		}
		case 'DELETE_LIST': {
			return {
				...state,
				lists: state.lists.filter((list) => list.id !== action.payload.listId),
			};
		}

		case 'ADD_CARD': {
			const listIndex = findItemIndexById(state.lists, action.payload.listId);

			const cardIndex = state.lists[listIndex].cards.findIndex(
				(item) => item.title === action.payload.title
			);
			cardIndex === -1 &&
				state.lists[listIndex].cards.push({
					id: uniqueId(),
					title: action.payload.title,
				});
			return {
				...state,
			};
		}

		case 'EDIT_CARD': {
			const listIndex = findItemIndexById(state.lists, action.payload.listId);
			const index = state.lists[listIndex].cards.findIndex(
				(item) => item.id === action.payload.cardId
			);

			state.lists[listIndex].cards[index].title = action.payload.title;
			return {
				...state,
			};
		}
		case 'DELETE_CARD': {
			const listIndex = findItemIndexById(state.lists, action.payload.listId);
			const index = state.lists[listIndex].cards.findIndex(
				(item) => item.id === action.payload.cardId
			);
			index !== -1 && (state.lists[listIndex].cards || []).splice(index, 1);
			return {
				...state,
			};
		}

		case 'MOVE_CARD': {
			const listIndex = findItemIndexById(state.lists, action.payload.listId);
			const targetListIndex = action.payload.moveListId;

			const cardIndex = state.lists[listIndex].cards.findIndex(
				(item) => item.id === action.payload.cardId
			);
			if (cardIndex !== -1) {
				const item = state.lists[listIndex].cards.splice(cardIndex, 1)[0];
				state.lists[Number(targetListIndex)].cards.push(item);
			}

			return { ...state };
		}

		default: {
			return state;
		}
	}
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

const appData: AppState = {
	lists: [
		{
			id: '0',
			title: 'To Do',
			cards: [{ id: 'lc0', title: 'List1 Card1' }],
		},
		{
			id: '1',
			title: 'In Progress',
			cards: [{ id: 'lc2', title: 'List2 Card1' }],
		},
		{
			id: '2',
			title: 'Done',
			cards: [{ id: 'lc3', title: 'List3 Card1' }],
		},
	],
};

export const useAppState = () => {
	return useContext(AppContext);
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const initialState = appData;
	const [state, dispatch] = useReducer(appReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};
