export default function({ store, redirect }) {
  /* Интересная проверка - естль ли ключи в объекте. */
  if (!Object.keys(store.state.user).length) {
    redirect("/?message=noUser")
  }
}
