import API from './axiosBase';

const apiRoute = '/api/quiz';
/**
 * Serviço de questionários
 */
export default class QuizService {
  /**
   * Obtem a listem de questionários criados pelo usuário pelo seu token
   * @return {object}
   */
  static async listCreatedQuizzes() {
    return await API.get(apiRoute);
  }
};
