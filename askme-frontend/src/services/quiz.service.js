import API from './axiosBase';

const apiRoute = '/api/quiz';
/**
 * Serviço de questionários
 */
export default class QuizService {
  /**
   * Obtem a listem de questionários criados pelo usuário pelo seu token
   * @param {number} offset
   * @param {number} limit
   * @return {object}
   */
  static async listCreatedQuizzes(offset = 0, limit = 10) {
    return await API.get(`${apiRoute}?offset=${offset}&limit=${limit}`);
  }

  /**
   * Realiza requisição para criar um questionário
   * @param {string} title
   * @param {string} isAnonymous
   * @return {object}
   */
  static async createQuiz(title, isAnonymous) {
    return await API.post(`${apiRoute}`, {
      title: title,
      isAnonymous: isAnonymous,
    });
  }
};
