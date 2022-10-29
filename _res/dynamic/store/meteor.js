export const state = () => ({
  payloads: {},
  globalPayload: {},
  pageData: {
    payload: null,
    globalPayload: null,
  },
  pagePreData: {
    payload: null,
    globalPayload: null,
  },
  dataSwitched: false,
});

export const mutations = {
  setPayload(state, { key, payload }) {
    state.payloads[key] = payload;
  },
  setGlobalPayload(state, { key, globalPayload }) {
    state.globalPayload[key] = globalPayload;
  },
  setPageData(state, { payload, globalPayload }) {
    state.pageData = {
      payload,
      globalPayload,
    };
  },
  setPagePreData(state, { payload, globalPayload }) {
    state.pagePreData = {
      payload,
      globalPayload,
    };

    state.dataSwitched = false;
  },
  switchData(state) {
    if (state.dataSwitched) {
      return;
    }

    state.pageData = state.pagePreData;
    state.dataSwitched = true;
  },
};
