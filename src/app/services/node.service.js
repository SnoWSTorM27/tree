import httpService from "./http.service";

const nodeEndpoint = "node/";

const nodeService = {
  fetchAll: async () => {
    const { data } = await httpService.get(nodeEndpoint);
    return data;
  }
};

export default nodeService;
