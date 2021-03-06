import camelcaseKeysDeep from 'camelcase-keys-deep';
import qs from 'qs';
import { normalize } from 'normalizr';
import { headers } from '../constants/config';
import 'isomorphic-fetch';
import * as schemas from '../schemas';

const API_ROOT = process.env.NODE_ENV === 'test' ? 'http://localhost' : '';

function callApi(endpoint, schema, request) {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const requestWithHeaders = {
    ...{ headers },
    ...request,
    credentials: 'same-origin',
  };

  return fetch(API_ROOT + endpoint, requestWithHeaders)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        return Promise.reject(body);
      }

      const camelized = camelcaseKeysDeep(body.result || {});
      const receivedAt = Date.now();
      const { notification } = body;

      if (schema) {
        return {
          ...normalize(camelized, schema),
          notification,
          receivedAt,
        };
      }

      return {
        result: camelized,
        notification,
        receivedAt,
      };
    });
}

export default {
  fetchBoards(pageIndex, itemsPerPage) {
    return callApi(`/api/boards?page=${pageIndex}&itemsPerPage=${itemsPerPage}`, {
      boards: schemas.BOARD_ARRAY,
    }, {
      method: 'GET',
    });
  },
  fetchStarredBoards() {
    return callApi(`/api/boards?starred=true`, {
      boards: schemas.BOARD_ARRAY,
    }, {
      method: 'GET',
    });
  },
  fetchBoard(id) {
    return callApi(`/api/boards/${id}`, schemas.BOARD, {
      method: 'GET',
    });
  },
  createBoard(title, description) {
    return callApi('/api/boards', {
      board: schemas.BOARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'POST',
      body: {
        title,
        description,
      },
    });
  },
  removeBoard(id) {
    return callApi(`/api/boards/${id}`, {
      board: schemas.BOARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'DELETE',
    });
  },
  updateBoard(id, props, params) {
    const queryString = params ? qs.stringify(params) : '';
    return callApi(`/api/boards/${id}?${queryString}`, {
      board: schemas.BOARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'PUT',
      body: props,
    });
  },
  createList(boardId, title) {
    return callApi(`/api/boards/${boardId}/lists`, {
      list: schemas.LIST,
      activity: schemas.ACTIVITY,
    }, {
      method: 'POST',
      body: {
        title,
      },
    });
  },
  removeList(id) {
    return callApi(`/api/lists/${id}`, {
        list: schemas.LIST,
        activity: schemas.ACTIVITY,
    }, {
      method: 'DELETE',
    })
  },
  updateList(id, props) {
    return callApi(`/api/lists/${id}`, {
      list: schemas.LIST,
      activity: schemas.ACTIVITY,
    }, {
      method: 'PUT',
      body: props,
    });
  },
  createCard(listId, text) {
    return callApi(`/api/lists/${listId}/cards/`, {
      card: schemas.CARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'POST',
      body: {
        text,
      },
    });
  },
  removeCard(id) {
    return callApi(`/api/cards/${id}`, {
      card: schemas.CARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'DELETE',
    });
  },
  updateCard(id, props) {
    return callApi(`/api/cards/${id}`, {
      card: schemas.CARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'PUT',
      body: props,
    });
  },
  addColorToCard(cardId, colorId) {
    return callApi(`/api/cards/${cardId}/addColor`, schemas.CARD, {
      method: 'POST',
      body: {
        color_id: colorId,
      },
    });
  },
  removeColorFromCard(cardId, colorId) {
    return callApi(`/api/cards/${cardId}/removeColor`, schemas.CARD, {
      method: 'POST',
      body: {
        color_id: colorId,
      },
    });
  },
  fetchCard(id) {
    return callApi(`/api/cards/${id}`, schemas.CARD, {
      method: 'GET',
    });
  },
  createComment(cardId, text) {
    return callApi(`/api/cards/${cardId}/comments`, schemas.COMMENT, {
      method: 'POST',
      body: {
        text,
      },
    });
  },
  removeComment(commentId) {
    return callApi(`/api/comments/${commentId}`, null, {
      method: 'DELETE',
    });
  },
  fetchActivity() {
    return callApi('/api/activity', schemas.ACTIVITY_ARRAY, {
      method: 'GET',
    });
  },
  fetchUser() {
    return callApi('/api/user', schemas.USER, {
      method: 'GET',
    });
  },
  search(query) {
    return callApi('/api/search', null, {
      method: 'POST',
      body: {
        query,
      },
    });
  },
  signIn(formData) {
    return callApi('/auth/sign-in/local', null, {
      method: 'POST',
      body: formData,
    });
  },
  signUp(formData) {
    return callApi('/sign-up', null, {
      method: 'POST',
      body: formData,
    });
  },
  signOut() {
    return callApi('/auth/sign-out', null, {
      method: 'POST',
    });
  },
};
