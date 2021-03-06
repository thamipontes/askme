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

  /**
   * Realiza requisição para obter informações de um Quiz
   * @param {string} id
   */
  static async getQuizById(id) {
    return await API.get(`${apiRoute}/${id}`);
  }

  /**
   * Realiza requisição para salvar as questões de um quiz
   * @param {string} id
   * @param {string} questions
   * @return {object}
   */
  static async updateQuizQuestions(id, questions) {
    return await API.put(`${apiRoute}/${id}/questions`, {
      questions: questions,
    });
  }
};
