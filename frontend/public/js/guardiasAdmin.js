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
    events: function(info, successCallback, failureCallback) {
      const fecha = new Date(info.start); // inicio del rango visible
      const mes = fecha.getMonth() + 1; // Meses van de 0 a 11
      const anio = fecha.getFullYear();

      fetch(`/api/guardias?mes=${mes}&anio=${anio}`)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => failureCallback(error));
    },

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

    const email = document.getElementById('email').value;
    const inicio = document.getElementById('inicio').value;
    const fin = document.getElementById('fin').value;

    const nuevaGuardia = {
      email: email,
      start: inicio,
      end: fin
    };

    fetch('/api/guardias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaGuardia)
    })
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'Email invalido') {
          document.getElementById('error-email').classList.remove('d-none');
        } else {
          alert(data.error || 'Error desconocido al agregar guardia');
        }
        throw new Error(data.error);
      }

      // exito: oculta error y actualiza
      document.getElementById('error-email').classList.add('d-none');

      const modal = bootstrap.Modal.getInstance(document.getElementById('nuevaGuardiaModal'));
      modal.hide();
      calendar.refetchEvents(); // Recarga el calendario
    })
    .catch(error => {
      console.error(error);
    });

  });

  document.getElementById('email').addEventListener('input', () => {
    document.getElementById('error-email').classList.add('d-none');
  });

});
