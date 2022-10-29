export default async function (context) {
  const { route, store } = context;

  // 404 error
  if (!route.matched[0]) {
    const globalPayload = await loadGlobalPayload(
      context.$axios,
      { lang: 'fr' },
      store
    );
    const payload = { ...globalPayload };
    store.commit('meteor/setPagePreData', { globalPayload, payload });
    return;
  }

  const props = route.matched[0].props.default;

  // Load payload
  let payload = await loadPayload(context.$axios, props, route, store);
  const globalPayload = await loadGlobalPayload(context.$axios, props, store);

  const idNotFound = payload == null;

  payload = { ...payload, ...globalPayload };

  store.commit('meteor/setPagePreData', { globalPayload, payload });

  if (idNotFound) {
    context.error({ statusCode: 404 });
  }
}

async function loadPayload(axios, props, route, store) {
  const keyPayload = `${props.fakeId}${route.path}${props.lang}`;
  let payload = null;

  if (store.state.meteor.payloads[keyPayload]) {
    payload = store.state.meteor.payloads[keyPayload];
  } else {
    const { data } = await axios({
      method: 'post',
      url:
        '/engine/' + process.env.ENGINE + '/getproute/' + process.env.NAMESPACE,
      data: {
        fakeId: props.fakeId,
        lang: props.lang,
        route: route.path,
      },
    });

    if (data.success) {
      payload = data.payload;
      payload.id = data.id;
      store.commit('meteor/setPayload', { key: keyPayload, payload });
    } else {
      payload = null;
    }
  }

  return payload;
}

async function loadGlobalPayload(axios, props, store) {
  const keyGlobalPayload = `${props.lang}`;
  let globalPayload = null;

  if (store.state.meteor.globalPayload[keyGlobalPayload]) {
    globalPayload = store.state.meteor.globalPayload[keyGlobalPayload];
  } else {
    const { data } = await axios({
      method: 'post',
      url:
        '/engine/' + process.env.ENGINE + '/getgroute/' + process.env.NAMESPACE,
      data: {
        lang: props.lang,
      },
    });

    globalPayload = data;
    store.commit('meteor/setGlobalPayload', {
      key: keyGlobalPayload,
      globalPayload,
    });
  }

  return globalPayload;
}
