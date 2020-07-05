/**
 * Прослойка авторзации
 * Если пользователь не авторизован, пересылаем его на главную
 * @param redirect
 * @param store
 */
export default async ({ redirect, store }) => {
  if (!store.getters['auth/user']) {
    await redirect('/')
  }
}
