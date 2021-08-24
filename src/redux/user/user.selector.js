import { createSelector } from 'reselect';

const stateSelector = (state) => state.user;

export const selectCurrentUser = createSelector(
	[stateSelector],
	(user) => user.currentUser
);
