document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');

    // Fetch and display data from JSON file
    function fetchData() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                dataList.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `Name: ${item.name}, Age: ${item.age}`;
                    dataList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Add data to JSON file
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.name.value;
        const age = form.age.value;

        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age }),
        })
        .then(response => {
            if (response.ok) {
                fetchData();
                form.reset();
            } else {
                console.error('Error adding data');
            }
        })
        .catch(error => console.error('Error adding data:', error));
    });

    // Initial fetch to display data
    fetchData();
});
