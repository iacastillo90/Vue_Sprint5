const { createApp} = Vue


const options= ({
    data (){
        return {
            eventos: [],
            porcentajeAsistencia: [],
            mayorCapacidad: [],
            categoriasUnicasFuturas: [],
            categoriasUnicas: []
        }
    },
    created (){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then (repuesta => repuesta.json())
            .then (datos => {
            this.eventos= datos.events
            let currentDate = datos.currentDate;
            let filtradosPasado = this.filtradosPastEvents (this.eventos, currentDate).sort((a,b) =>b.assistance - a.assistance )
            this.porcentajeAsistencia = this.calcularPorcentajeAsistencia (filtradosPasado)
            this.mayorCapacidad = this.eventosConMayorCapacidad (this.eventos)
            
            let filtradosFuturos = this.filtradosUpcoming (this.eventos, currentDate).sort((a,b) =>b.estimate - a.estimate )
            this.categoriasUnicasFuturas = this.upComingByCategoria (filtradosFuturos)
            this.categoriasUnicas = this.pastEventsByCategoria(filtradosPasado);
        })
            .catch(error => {
                console.error(error);
            })
    },
    methods:{
        filtradosUpcoming(eventos, date) {
            return eventos.filter((evento) => evento.date >= date);
        },
        filtradosPastEvents(eventos, date) {
            return eventos.filter((evento) => evento.date <= date);
        },
        calcularPorcentajeAsistencia(eventosPasados) {
            let asistenciaPorPorcentaje = [];
          
            eventosPasados.forEach((evento) => {
              let nombreEvento = evento.name;
              let asistenciaTotal = evento.assistance;
              let capacidadTotal = evento.capacity;
              let porcentajeAsistencia = (asistenciaTotal / capacidadTotal) * 100;
          
              asistenciaPorPorcentaje.push({
                nombreEvento,
                asistenciaTotal,
                capacidadTotal,
                porcentajeAsistencia,
              
              });
            });
            return asistenciaPorPorcentaje.sort((a,b) =>b.porcentajeAsistencia - a.porcentajeAsistencia )
        },
        eventosConMayorCapacidad (eventos){
            return eventos.sort((a,b) =>b.capacity - a.capacity )
        },
        pastEventsByCategoria(eventosPasados) {
            let categoriasUnicas = {};
          
            eventosPasados.forEach(evento => {
              let { category, name, assistance, capacity, price } = evento;
              let porcentajeGanancia = capacity * price;
              let porcentajeAsistencia = (assistance / capacity) * 100;
          
              categoriasUnicas[category] = [];
              categoriasUnicas[category].push({
                nombreEvento: name,
                porcentajeGanancia,
                porcentajeAsistencia
              });
            });
          
            let resultado = [];
          
            for (let categoria in categoriasUnicas) {
              let eventosCategoria = categoriasUnicas[categoria];
              let totalPorcentajeGanancia = eventosCategoria.reduce((total, evento) => total + evento.porcentajeGanancia, 0);
              let totalPorcentajeAsistencia = eventosCategoria.reduce((total, evento) => total + evento.porcentajeAsistencia, 0);
          
              resultado.push({
                categoria,
                totalPorcentajeGanancia,
                totalPorcentajeAsistencia,
            });
         
            }
          
            return resultado;
        },
        upComingByCategoria(eventosFuturos) {
            let categoriasUnicas = {};
          
            eventosFuturos.forEach(evento => {
              let { category, name, estimate, capacity, price } = evento;
              let porcentajeGanancia = capacity * price;
              let porcentajeEstimado = estimate
          
              categoriasUnicas[category] = [];
              categoriasUnicas[category].push({
                nombreEvento: name,
                porcentajeGanancia,
                porcentajeEstimado
              });
            });
          
            let resultado = [];
          
            for (let categoria in categoriasUnicas) {
              let eventosCategoria = categoriasUnicas[categoria];
              let totalPorcentajeGanancia = eventosCategoria.reduce((total, evento) => total + evento.porcentajeGanancia, 0);
              let totalPorcentajeEstimado = eventosCategoria.reduce((total, evento) => total + evento.porcentajeEstimado, 0);
          
              resultado.push({
                categoria,
                totalPorcentajeGanancia,
                totalPorcentajeEstimado,
            });
         
            }
          
            return resultado;
        }
    }
})

const app = createApp (options)
app.mount ('#app')
