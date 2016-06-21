import { createConstants } from '../utils';

export default createConstants(
  'BOARDS_FETCH_REQUEST',
  'BOARDS_FETCH_SUCCESS',
  'BOARDS_FETCH_FAILURE',

  'BOARD_CREATE_REQUEST',
  'BOARD_CREATE_SUCCESS',
  'BOARD_CREATE_FAILURE',

  'BOARD_REMOVE_REQUEST',
  'BOARD_REMOVE_SUCCESS',
  'BOARD_REMOVE_FAILURE',

  'BOARD_UPDATE_REQUEST',
  'BOARD_UPDATE_SUCCESS',
  'BOARD_UPDATE_FAILURE',

  'ACTIVITY_FETCH_REQUEST',
  'ACTIVITY_FETCH_SUCCESS',
  'ACTIVITY_FETCH_FAILURE',

  'USER_FETCH_REQUEST',
  'USER_FETCH_SUCCESS',
  'USER_FETCH_FAILURE',

  'TRASH_FETCH_REQUEST',
  'TRASH_FETCH_SUCCESS',
  'TRASH_FETCH_ERROR',

  'TRASH_RESTORE_REQUEST',
  'TRASH_RESTORE_SUCCESS',
  'TRASH_RESTORE_ERROR',

  'PROGRESSBAR_START',
  'PROGRESSBAR_STOP',
  'PROGRESSBAR_SET_VALUE'
);
