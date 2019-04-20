

const storeRegistry = {};
storeRegistry.localStore = null;

storeRegistry.register = store => {
  storeRegistry.localStore = store;
};

storeRegistry.getStore = () => storeRegistry.localStore;

export default storeRegistry;
