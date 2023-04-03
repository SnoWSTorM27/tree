import httpService from "./http.service";

const subsectionEndpoint = "subsection/";

const subsectionService = {
  fetchAll: async () => {
    const { data } = await httpService.get(subsectionEndpoint);
    return data;
  }
};

export default subsectionService;
