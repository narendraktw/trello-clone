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
type Action = {
	type: 'ADD_LIST';
	payload: string;
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
