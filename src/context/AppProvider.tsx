import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { uniqueId } from '../utils/utils';

interface Card {
	cardId: string;
	title: string;
}

interface List {
	listId: string;
	title: string;
	cards: Card[];
}

// discriminated union
type Action =
	| {
			type: 'ADD_LIST';
			payload: string;
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

export interface AppState {
	lists: List[];
}

interface AppContextProps {
	state: AppState;
	dispatch: React.Dispatch<any>;
}

const appReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'ADD_LIST': {
			return {
				...state,
				lists: [
					...state.lists,
					{ listId: uniqueId(), title: action.payload, cards: [] },
				],
			};
		}

		case 'EDIT_LIST': {
			const listItemIndex = state.lists.findIndex(
				(item) => item.listId === action.payload.listId
			);
			state.lists[listItemIndex].title = action.payload.title;
			return {
				...state,
			};
		}
		case 'DELETE_LIST': {
			const index = state.lists.findIndex(
				(item) => item.listId === action.payload.listId
			);
			index !== -1 && (state.lists || []).splice(index, 1);
			return {
				...state,
			};
		}

		case 'ADD_CARD': {
			const listItemIndex = state.lists.findIndex(
				(item) => item.listId === action.payload.listId
			);
			const index = state.lists[listItemIndex].cards.findIndex(
				(item) => item.title === action.payload.title
			);
			index === -1 &&
				state.lists[listItemIndex].cards.push({
					cardId: uniqueId(),
					title: action.payload.title,
				});
			return {
				...state,
			};
		}

		case 'EDIT_CARD': {
			const listItemIndex = state.lists.findIndex(
				(item) => item.listId === action.payload.listId
			);
			const index = state.lists[listItemIndex].cards.findIndex(
				(item) => item.cardId === action.payload.cardId
			);

			state.lists[listItemIndex].cards[index].title = action.payload.title;
			return {
				...state,
			};
		}
		case 'DELETE_CARD': {
			const listItemIndex = state.lists.findIndex(
				(item) => item.listId === action.payload.listId
			);
			const index = state.lists[listItemIndex].cards.findIndex(
				(item) => item.cardId === action.payload.cardId
			);
			index !== -1 && (state.lists[listItemIndex].cards || []).splice(index, 1);
			return {
				...state,
			};
		}

		case 'MOVE_CARD': {
			const listItemIndex = state.lists.findIndex(
				(item) => item.listId === action.payload.listId
			);
			const targetListIndex = action.payload.moveListId;

			const cardIndex = state.lists[listItemIndex].cards.findIndex(
				(item) => item.cardId === action.payload.cardId
			);
			if (cardIndex !== -1) {
				const item = state.lists[listItemIndex].cards.splice(cardIndex, 1)[0];
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
			listId: '0',
			title: 'To Do',
			cards: [{ cardId: 'lc0', title: 'List1 Card1' }],
		},
		{
			listId: '1',
			title: 'In Progress',
			cards: [{ cardId: 'lc2', title: 'List2 Card1' }],
		},
		{
			listId: '2',
			title: 'Done',
			cards: [{ cardId: 'lc3', title: 'List3 Card1' }],
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
