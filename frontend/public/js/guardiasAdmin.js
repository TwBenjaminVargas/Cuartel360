document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendario');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: '/api/guardias' // <- Cambia esto si tu ruta es diferente
  });

  calendar.render();
});
