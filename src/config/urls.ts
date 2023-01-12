export const baseURL = "http://localhost:3000/api";

const urls = {
  // All Service url paths added here.
  todo: {
    list: `${baseURL}/tasks`,
    create: `${baseURL}/tasks`,
    update: (id: number) => `${baseURL}/tasks/${id}`,
    delete: (id: number) => `${baseURL}/tasks/${id}`,
  },
};

export default urls;
