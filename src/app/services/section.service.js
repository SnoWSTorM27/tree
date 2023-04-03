import httpService from "./http.service";

const sectionEndpoint = "section/";

const sectionService = {
  fetchAll: async () => {
    const { data } = await httpService.get(sectionEndpoint);
    return data;
  }
};

export default sectionService;
