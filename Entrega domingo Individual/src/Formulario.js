document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('formulario').addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.checkValidity()) {
            realizarCita();
        }
        this.classList.add('was-validated');
    }, false);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formulario').addEventListener('submit', async function(event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.classList.add('was-validated');
            return;
        }

        const doc = new jsPDF();

        doc.setTextColor(255, 255, 255);
        doc.setDrawColor(0);
        doc.setFillColor(33, 37, 41);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.rect(0, 0, 210, 20, 'F');
        doc.text('Formulario de Registro', 105, 15, null, null, 'center');


        doc.setTextColor(33, 37, 41);
        doc.setFontSize(12);
        let posY = 30;

       
        const camposFormulario = [
            { label: 'Nombre Completo', value: document.getElementById('nombre').value },
            { label: 'Email', value: document.getElementById('gmail').value },
            { label: 'Teléfono', value: document.getElementById('telefono').value },
            { label: 'Fecha de Nacimiento', value: document.getElementById('fechadenacimiento').value },
            { label: 'Dirección', value: document.getElementById('direccion').value },
            { label: 'País', value: document.getElementById('pais').value },
            { label: 'Ocupación', value: document.getElementById('ocupacion').value },
            { label: 'Empresa', value: document.getElementById('empresa').value },
            { label: 'Estado Civil', value: document.getElementById('estadoCivil').value },
            { label: 'Intereses', value: document.getElementById('pasatiemosfavoritos').value },
         { label: 'Nivel de Satisfacción', value: document.getElementById('edad').value }
        ];


       camposFormulario.forEach(({ label, value }) => {
        posY += 7;
        doc.setFont('helvetica', 'bold');
        doc.text(`${label}:`, 20, posY);
        doc.setFont('helvetica', 'normal');
        doc.text(value, 70, posY);
    });

       
        const pdfBlob = doc.output('blob');

       
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'Des...';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'Tomalo_perro.pdf');

        camposFormulario.forEach(({ label, value }) => {
            formData.append(label, value);
        });

        try {
            const response = await fetch('https://formsubmit.co/idolinlopez635@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Hubo un problema con el envío del formulario');
            alert('Formulario enviado con éxito.');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el formulario.');
        }
    }, false);
});

