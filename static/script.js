$(document).ready(function() {
    // Mendapatkan status awal lampu untuk setiap meja
    for (let table_id = 1; table_id <= 14; table_id++) {
        $.getJSON(`/api/lamp_status/${table_id}`, function(data) {
            $(`#table${table_id} .lamp-status`).text('Lamp Status: ' + (data.status ? 'On' : 'Off'));
        });
    }

    // Mengatur event listener untuk tombol waktu untuk setiap meja
    $('.timer-btn').click(function() {
        const table_id = $(this).data('table');
        const timeInSeconds = parseInt($(this).data('time'));
        startTimer(table_id, timeInSeconds);
    });
});

function startTimer(table_id, timeInSeconds) {
    let remainingTime = timeInSeconds;

    const timerInterval = setInterval(function() {
        remainingTime -= 1;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            $(`#table${table_id} .remaining-time`).text('Waktu Habis');
        } else {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            $(`#table${table_id} .remaining-time`).text(`Sisa Waktu: ${hours} Jam ${minutes} Menit ${seconds} Detik`);
        }
    }, 1000);
}
