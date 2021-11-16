export const UNSET_DIALOG = 'UNSET_DIALOG';
export const SET_DIALOG = 'SET_DIALOG';

export const unsetDialog = (name) => ({
    type: UNSET_DIALOG,
    payload: name
});

export const setDialog = (name) => ({
    type: SET_DIALOG,
    payload: name
});
