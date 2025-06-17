document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendario');

  const guardiasSource = {
    id: 'guardiasFW',
    events: function(info, successCallback, failureCallback) {
      
      const endDate = new Date(info.endStr);
      let month = endDate.getMonth();
      let year  = endDate.getFullYear();
      if (month === 0) { month = 12; year--; }

      fetch(`/api/guardias?month=${month}&year=${year}`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(data => {
          // Mapeo al formato FullCalendar
          const events = data.map(item => ({
            id:    item.id,           
            title: item.title || item.nombre || `${item.nombre} ${item.apellido}`,
            start: item.start,            
            end:   item.end               
          }));
          successCallback(events);
        })
        .catch(err => failureCallback(err));
    }
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: { left: 'prev,next today', center: 'title', right: '' },
    eventDisplay: 'list-item',
    eventContent: function(arg) {
      const event = arg.event;
      const h = event.start.getHours().toString().padStart(2,'0');
      const m = event.start.getMinutes().toString().padStart(2,'0');
      const container = document.createElement('div');
      container.style.cssText = 'color:black;font-size:.85rem;line-height:1.2;padding:0;margin:0';
      container.innerHTML = `<span>${h}:${m}</span> - <strong>${event.title}</strong>`;
      return { domNodes: [container] };
    },
    eventSources: [ guardiasSource ]  
  });

  calendar.render();

  // Autocomplete de bombero 
  const inputProp = document.getElementById('propietarioInput');
  const inputEmail = document.getElementById('propietarioEmail');
  const sugerencias = document.getElementById('listaSugerencias');
  let debounceTimer;

  function clearSugerencias() {
    sugerencias.innerHTML = '';
    sugerencias.style.display = 'none';
  }

  // input de búsqueda
  inputProp.addEventListener('input', e => {
    const term = e.target.value.trim();
    if (term.length < 2) {
      clearSugerencias();
      return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetch(`/api/search?term=${encodeURIComponent(term)}`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(data => {
          sugerencias.innerHTML = '';
          if (!data.length) return clearSugerencias();
          data.forEach(b => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.textContent = `${b.nombre} ${b.apellido} — ${b.email}`;
            li.addEventListener('click', () => {
              inputProp.value = `${b.nombre} ${b.apellido}`;
              inputEmail.value = b.email;
              clearSugerencias();
            });
            sugerencias.appendChild(li);
          });
          sugerencias.style.display = 'block';
        })
        .catch(() => clearSugerencias());
    }, 300);
  });

  // ocultar si clic fuera
  document.addEventListener('click', e => {
    if (!sugerencias.contains(e.target) && e.target !== inputProp) {
      clearSugerencias();
    }
  });

  // Agregar nueva guardia
  document.getElementById('formNuevaGuardia').addEventListener('submit', function (e) {
    e.preventDefault();

    const email  = inputEmail.value.trim();
    const inicio = document.getElementById('inicio').value;
    const fin    = document.getElementById('fin').value;
    if (!email || !inicio || !fin) {
      return alert('Complete todos los campos');
    }

    fetch('/api/guardias', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, start: inicio, end: fin })
    })
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('nuevaGuardiaModal'));
      modal.hide();

      const source = calendar.getEventSourceById('guardiasFW');
      if (source) source.refetch();
    })
    .catch(err => {
      console.error(err);
      alert('Error al agregar guardia');
    });

  });

  // limpia email al cerrar modal
  const modalG = document.getElementById('nuevaGuardiaModal');
  modalG.addEventListener('hidden.bs.modal', () => {
    document.getElementById('formNuevaGuardia').reset();
    inputEmail.value = '';
    clearSugerencias();
  });

});
