import httpService from "./http.service";

const nodeEndpoint = "tree/";

const nodeService = {
  fetchAll: async () => {
    const { data } = await httpService.get(nodeEndpoint);
    return data;
  },
  update: async (payload) => {
    console.log("payload", payload);
    const { data } = await httpService.put(nodeEndpoint, payload);
    return data;
  }
};

export default nodeService;
