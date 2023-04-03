import httpService from "./http.service";

const lessonEndpoint = "lesson/";

const lessonService = {
  fetchAll: async () => {
    const { data } = await httpService.get(lessonEndpoint);
    return data;
  }
};

export default lessonService;
