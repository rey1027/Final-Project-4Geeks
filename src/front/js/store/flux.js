const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [],
      loginConfirmation: false,
      current_user: null,
      nombre: '',
      tratamientos: [],
      especialistas: [],
      citas: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      setName: (nombre) => {
        const store = getStore();
        setStore({ ...store, nombre });
      },

      getName: () => {
        const store = getStore();
        return store.nombre
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      fetchPromise: async (path, metodo = "GET", data = null) => {
        const BASE_URL = process.env.BACKEND_URL;
        let url = BASE_URL + path;

        let obj = {
          method: metodo,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        };

        if (metodo == "GET") {
          obj = {
            method: metodo,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          };
        }

        let response = await fetch(url, obj);
        return response;
      },
      activateLoginConfirmation: () => {
        const store = getStore();
        const actions = getActions();

        setStore({ ...store, loginConfirmation: true });
      },
      deactivateLoginConfirmation: () => {
        const store = getStore();
        const actions = getActions();

        setStore({ ...store, loginConfirmation: false });

      },
      setCurrentUser: (user) => {
        const store = getStore();

        setStore({ ...store, current_user: user });

      },

      isAuth: async() => {
        const store = getStore();
        const actions = getActions();

        let response = await actions.fetchPromise(
          "/api/isauth",
          "GET"
        );
    
        if (response.ok) {
          let responseJson = await response.json();
          console.log(responseJson);
          setStore({ ...store, current_user: responseJson.user });
          actions.activateLoginConfirmation();
        }

      },

      obtenerTratamientos: () => {

        fetch(process.env.BACKEND_URL + "/api/tratamientos")

          .then((response) => response.json())
          .then(data => setStore({ tratamientos: data }))

        // if (response.ok) {
        //   let responseJson = response.json();
        //   setTratamientos(responseJson);
        //   console.log(responseJson);
        // } else {
        //   let responseJson = response.json();
        //   console.log(responseJson);
        // }

      },
      obtenerCitas: () => {

        fetch(process.env.BACKEND_URL + "/api/citas")

          .then((response) => response.json())
          .then(data => console.log({ citas: data }))


        // if (response.ok) {
        //   let responseJson = response.json();
        //   setTratamientos(responseJson);
        //   console.log(responseJson);
        // } else {
        //   let responseJson = response.json();
        //   console.log(responseJson);
        // }

      },

      getEspecialistas: async() =>{
        const store = getStore()
        try {
          const response = await fetch(process.env.BACKEND_URL+"/especialistas")
          if(response.ok){
            const data=await response.json()
            setStore({
              especialistas: data
            })
          }
        } catch (error) {
          
        }
      }
    },

  };
};

export default getState;
