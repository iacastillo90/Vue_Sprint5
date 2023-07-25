const { createApp} = Vue


const options= ({
    data (){
        return {
            eventos: [],
            categorias: [],
            valorBusqueda: "",
            categoriasChecked: [],
            filtrados:[],
            discount: null,
            showCoupon: false,
            favoritos: [],
            noResultado: false
        }
    },
    created (){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then (repuesta => repuesta.json())
            .then (datos => {
                this.eventos= datos.events
                this.categorias = [... new Set (datos.events.filter(events => events.category).map(events => events.category))]
                this.filtrados = datos.events  
                this.discount = data.discount
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    this.showCoupon = true;
                }, 5000);
            })
    },
    computed: {
        filtrar(){ 
            this.filtrados = this.eventos.filter(evento =>{
                return evento.name.toLowerCase().startsWith(this.valorBusqueda.toLowerCase()) 
                && (this.categoriasChecked.includes(evento.category) || this.categoriasChecked.length == 0)
            })
        this.noResultado = this.filtrados.length === 0;
        }
    }
})

const app = createApp (options)
app.mount ('#app')

