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
    events: '/api/guardias',
    eventDisplay: 'list-item',

    eventContent: function(arg) {
      const event = arg.event;

      // funcion para formatear hora 
      function formatTime(date) {
        if (!date) return '';
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }

      const timeText = formatTime(event.start);
      const titleText = event.title || '';

      const container = document.createElement('div');
      container.style.color = 'black';
      container.style.fontSize = '0.85rem';
      container.style.lineHeight = '1.2'; // reduce espacio vertical
      container.style.padding = '0'; // sin padding extra
      container.style.margin = '0'; // sin margen extra

      container.innerHTML = `<span style="font-weight: normal;">${timeText}</span> - <strong>${titleText}</strong>`;

      return { domNodes: [container] };
    }


  });

  calendar.render();

  // Agregar nueva guardia
  document.getElementById('formNuevaGuardia').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const inicio = document.getElementById('inicio').value;
    const fin = document.getElementById('fin').value;

    const nuevaGuardia = {
      nombre: nombre,
      inicio: inicio,
      fin: fin
    };

    fetch('/api/guardias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaGuardia)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error al agregar guardia');
      return response.json();
    })
    .then(data => {
      // Cerrar modal y recargar eventos
      const modal = bootstrap.Modal.getInstance(document.getElementById('nuevaGuardiaModal'));
      modal.hide();
      calendar.refetchEvents(); // Recarga el calendario
    })
    .catch(error => {
      console.error(error);
      alert('Hubo un error al guardar la guardia');
    });
  });

});
