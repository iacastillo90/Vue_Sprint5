const { createApp} = Vue

let currentDate = {}; 

const options= ({
    data (){
        return {
            eventos: [],
            categorias: [],
            valorBusqueda: "",
            categoriasChecked: [],
            filtradosFuturos:[],
            noResultado: false
        }
    },
    created (){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then (repuesta => repuesta.json())
            .then (datos => {
                this.eventos= datos.events
                currentDate = datos.currentDate; 
                this.categorias = [... new Set (datos.events.filter(events => events.category).map(events => events.category))]
                this.filtradosFuturos = this.filtradosUpcoming (this.eventos, currentDate)

            })
            .catch(error => {
                console.error(error);
            })
    },
    methods:{
        filtradosUpcoming() {
            return this.eventos.filter((evento) => evento.date >= currentDate);
        },
    },
    computed:{
        filtrar(){ 
            this.filtradosFuturos = this.filtradosUpcoming().filter((evento) => {
                return (
                    evento.name.toLowerCase().startsWith(this.valorBusqueda.toLowerCase()) &&
                    (this.categoriasChecked.includes(evento.category) || this.categoriasChecked.length === 0)
                );
            });
        this.noResultado = this.filtradosFuturos.length === 0;
        },   
    }
})

const app = createApp (options)
app.mount ('#app')
