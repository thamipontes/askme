import API, {refreshToken} from './axiosBase';

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
    refreshToken();
    return await API.get(apiRoute);
  }
};
