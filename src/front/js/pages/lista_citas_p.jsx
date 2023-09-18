const { store, actions } = useContext(Context);

  return store.current_user ? store.current_user.rol == "user" ? (
    <div className="text-center mt-5">
      <h1>Página para hacer la solicitud de citas vista protegida</h1>
    </div>
  ) : (
    <div className="text-center mt-5">
      <h1>Esta página es solo para Administradores</h1>
    </div>
  ):
  (
    <div className="text-center mt-5">
      <h1>Debes iniciar sesión para visualizar la página</h1>
    </div>
  );