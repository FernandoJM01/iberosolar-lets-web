function showDetails(profileName) {
  switch (profileName) {
      case 'Profile 1':
          document.getElementById('profile-image').src = 'images/perfiles/profile-1.webp';
          document.getElementById('profile-name').innerText = 'Dr. Alejandro Ordaz Flores';
          document.getElementById('profile-info').innerText = 'Ha realizado múltiples investigaciones con un enfoque a los temas de calentamiento y concentración solar, transferencia de calor aplicada a energías renovables, eficiencia energética, sustentabilidad.\n\n -	“Renewable energy potential in the Usumacinta watershed: status and opportunities”\n-	“Thermal evaluation of a two-phase solar domestic wáter heating systems following the mexican standard NMX-ES-004-NORMEX-2010”\n-	“Findings to improve the performance of a two-phase flat plate solar system, using acetone and metanol as working fluids.”\n-	“Experimental characterisation and technical feasibility of a closed two-phase vs a conventional solar water heating thermosyphon.”\n-	“Annealing effects on the mass diffusion of the CDSITO interface deposited by chemical bath deposition”';
          break;
      case 'Profile 2':
          document.getElementById('profile-image').src = 'images/perfiles/profile2.jpg';
          document.getElementById('profile-name').innerText = 'Dra. Dominique Anne Celine Brun Battistini';
          document.getElementById('profile-info').innerText = 'Desde 1993 la doctora Dominique Anne Celine Brun Battistini se ha desarrollado como docente en las áreas de física y matemáticas en licenciatura y posgrado.\n\nParalelamente, ha llevado una carrera en la gestión de lo académico, a lo largo de la cual ha colaborado con la Dirección de Cooperación Académica, la Dirección de Planeación, con divisiones staff de la Vicerrectoría Académica y con la Rectoría de la Universidad Iberoamericana.\n\nColabora en el proyecto de investigación del establecimiento del Índice Mexicano de Satisfacción de Usuarios, liderado por la Dra. Odette Lobato.\n\nParticipó activamente en la línea de investigación de Física Fundamental, en el proyecto de fluidos relativistas. Sobre dicho tema realizó su disertación doctoral con el título “Procesos de transporte vectoriales en la Termodinámica Irreversible Relativista”, dirigida por el Dr. Alfredo Sandoval.\n\nActualmente es la directora del departamento de Física y Matemáticas de Universidad Iberoamericana de la Ciudad de México, rol que ha llevado a cabo desde el 2016.';
          break;
      case 'Profile 3':
          document.getElementById('profile-image').src = 'images/perfiles/profile-3.webp';
          document.getElementById('profile-name').innerText = 'Mtro. Rodrigo Cuevas Tenango';
          document.getElementById('profile-info').innerText = 'En su carrera ha colaborado en diversos proyectos de desarrollo tecnológico para el aprovechamiento de energías renovables, y también para el monitoreo y cuantificación de recurso solar. Ha trabajado en centros de investigación como el Instituto de Energías Renovables de la UNAM, COMIMSA centro de investigación pública CONACyT, y en proyectos estratégicos del CEMIE-Sol impulsado por SENER.\n\nActualmente se desempeña como técnico académico en la Universidad Iberoamericana CDMX en el departamento de Física y Matemáticas, investigando en las áreas de dinámica de fluidos computacional, desarrollo de sistemas de calentamiento solar para agua de baja y media temperatura, y la refrigeración solar.';
          break;
      case 'Profile 4':
            document.getElementById('profile-image').src = 'images/perfiles/profile-4.webp';
            document.getElementById('profile-name').innerText = 'Mtro. Genaro Finck';
            document.getElementById('profile-info').innerText = 'Especialista en Conversion Fototérmica de Radiación Solar. Jefe del laboratorio de Energía Térmica Solar. Encargado del Laboratorio de particulas delgadas, Jefe del área de Laboratorios.';
            break;
      case 'Profile 5':
          document.getElementById('profile-image').src = 'images/perfiles/profile-5.webp';
          document.getElementById('profile-name').innerText = 'Mtro. Genaro Finck';
          document.getElementById('profile-info').innerText = 'Especialista en Conversion Fototérmica de Radiación Solar. Jefe del laboratorio de Energía Térmica Solar. Encargado del Laboratorio de particulas delgadas, Jefe del área de Laboratorios.';
          break;
  }

  // Show the popup
  document.getElementById('profile-popup').style.display = 'flex';
  
  // Hide the PopUp
  document.getElementById('closeIcon').addEventListener('click', function() {
    hideDetails();
  });

  // Prevent scrolling
  document.body.style.overflow = 'hidden';
}

// Function to hide the popup
function hideDetails() {
  document.getElementById('profile-popup').style.display = 'none';

  // Enable scrolling
  document.body.style.overflow = 'auto';
}

