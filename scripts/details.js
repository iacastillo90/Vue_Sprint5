const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            eventos: [],
            card: null,
            assistanceOrEstimate: null,
            pAssistanceOrPEstimate: null
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((repuesta) => repuesta.json())
            .then((datos) => {
                    this.eventos = datos.events;
                    let parametroLocation = location.search;
                    let parametros = new URLSearchParams(parametroLocation);    
                    let cardId = parametros.get("parametro");     
                    this.card = this.eventos.find((evento) => evento._id == cardId);
                    this.assistanceOrEstimate = this.card?.assistance || this.card?.estimate;
                    this.pAssistanceOrPEstimate = this.card?.assistance ? 'Assistance' : 'Estimate';
            })
            .catch((error) => {
                console.error(error);
            });
    },
});

app.mount("#app");