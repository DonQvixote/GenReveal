let beba = 0 
let bebo = 0

async function getCounts() {
    try {
        const response = await fetch('http://localhost:5000/get_counts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        beba = data.A;
        bebo = data.O;

        document.getElementById('countA').textContent = beba;
        document.getElementById('countO').textContent = bebo;

        updateChart();
    } catch (error) {
        console.error('Error fetching counts:', error);
    }
}

async function incrementA() {
    try {
        const response = await fetch('http://localhost:5000/increment/A', { method: 'POST' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        beba = data.A;

        document.getElementById('countA').textContent = beba;

        updateChart();
    } catch (error) {
        console.error('Error incrementing A:', error);
    }
}

async function incrementO() {
    try {
        const response = await fetch('http://localhost:5000/increment/O', { method: 'POST' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        bebo = data.O;

        document.getElementById('countO').textContent = bebo;

        updateChart();
    } catch (error) {
        console.error('Error incrementing O:', error);
    }
}

let chart = null;

function updateChart() {
    const ctx = document.getElementById('counterChart').getContext('2d');

    if (chart) {
        // Update existing chart data
        chart.data.datasets[0].data = [beba, bebo];
        chart.update();
    } else {
        // Create a new chart
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Niña', 'Niño'],
                datasets: [{
                    label: 'Click Counts',
                    data: [beba, bebo],
                    backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Initial chart update
updateChart();


getCounts();