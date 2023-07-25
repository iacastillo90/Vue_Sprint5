const { createApp } = Vue;

let currentDate = {}; 

const options = ({
  data() {
    return {
      eventos: [],
      categorias: [],
      valorBusqueda: "",
      categoriasChecked: [],
      filtradosPasado: [],
      noResultado: false
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then(repuesta => repuesta.json())
      .then(datos => {
        this.eventos = datos.events;
        currentDate = datos.currentDate; 
        this.categorias = [...new Set(datos.events.filter(events => events.category).map(events => events.category))];
        this.filtradosPasado = this.filtradosPastEvents();
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    filtradosPastEvents() {
      return this.eventos.filter((evento) => evento.date <= currentDate);
    },
  },
  computed:{
    filtrar() {
        this.filtradosPasado = this.filtradosPastEvents().filter((evento) => {
          return (
            evento.name.toLowerCase().startsWith(this.valorBusqueda.toLowerCase()) &&
            (this.categoriasChecked.includes(evento.category) || this.categoriasChecked.length === 0)
          );         
        });
      this.noResultado = this.filtradosPasado.length === 0;
    },
  }
});

const app = createApp(options);
app.mount("#app");